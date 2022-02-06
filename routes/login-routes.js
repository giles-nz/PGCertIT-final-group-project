const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userDao = require("../modules/users-dao.js");
const {verifyAuthenticated} = require("../middleware/auth-middleware.js");


router.get("/login", function (req, res) {

    res.locals.title = "Login | @FLAVOURFUL";
    if (res.locals.user) {
        res.redirect("/");
    }

    else {
        res.render("login");
    }

});

router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!");
    res.redirect("./login");
});

router.get("/", verifyAuthenticated, async function (req, res) {
    res.locals.title = "Home | @FLAVOURFUL";
    const user = res.locals.user;
    res.render("home");
});

// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/". Otherwise, redirect to "/login", with a "login failed" message.
router.post("/login", async function (req, res) {
    
    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;


    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);

    // if there is a matching user...
    if (user) {
        // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie("authToken", authToken);
        res.locals.user = user;
        res.redirect("/");
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentication failed!");
        res.redirect("./login");
    }
});


router.get("/myAccount", verifyAuthenticated, function (req, res) {
    res.locals.title = "My Account | @FLAVOURFUL";
     const user = res.locals.user;
    res.render("myaccount");

});

router.get("/newAccount", async function(req, res) {
    res.locals.title = "New Account | @FLAVOURFUL";
    res.render("new-account");
});

router.get("/getAllUsersDetails", async function(req,res){
    const allUserDetail = await userDao.retrieveAllUsers();
    res.json(allUserDetail);
});

router.post("/deleteAccount", async function(req,res){
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    try{
        userDao.deleteUser(user.id);
        res.setToastMessage("Sorry to see you go! Your account has been deleted.");
        res.redirect("/login")
    } catch(err){
        res.setToastMessage("Sorry, something went wrong!");
        res.redirect("/myAccount");
    }
 });

router.post("/newAccount", function(req, res) {
    let user = {
        username: req.body.username,
        lname: req.body.lname,
        password: req.body.password,
        fname: req.body.fname,
        bio: req.body.bio,
        avatar: req.body.avatar,
        dob: req.body.dob
    };

    try {
        userDao.createUser(user);
        res.setToastMessage(`Thanks, ${user.fname}! We've created your account. Please log in using your new credentials.`);
        res.redirect("/login")
    }
    catch (err) {
        res.setToastMessage("That username was already taken!");
        res.redirect("/newAccount");
    }

 });

 router.post("/myAccount", function(req, res) {
    const currentUser = res.locals.user;

    let newUsername = req.body.username;
    if(newUsername == ""){
        newUsername = currentUser.username;
    };

    let newLname = req.body.lname;
    if(newLname == ""){
        newLname = currentUser.lname;
    };

    let newPassword = req.body.password;
    if(newPassword == ""){
        newPassword = currentUser.password;
    }else{
        newPassword = bcrypt.hashSync(newPassword, saltRounds);
    }

    let newFname = req.body.fname;
    if(newFname == ""){
        newFname = currentUser.fname;
    };

    let newBio = req.body.bio
    if(newBio == ""){
        newBio = currentUser.bio;
    };

    let newAvatar = req.body.avatar;
    if(newAvatar == null){
        newAvatar = currentUser.avatar;
    };

    let newDob = req.body.dob;
    if(newDob == ""){
        newDob = currentUser.dob;
    };

    let newData = {
        username: newUsername,
        lname: newLname,
        password: newPassword,
        fname: newFname,
        bio: newBio,
        avatar: newAvatar,
        dob: newDob,
        authToken: currentUser.authToken,
        id: currentUser.id
    };

    try {
        userDao.updateUser(newData);
        res.setToastMessage(`Thanks${newData.fname}! We've updated your details!`);
        res.redirect("/")
    }
    catch (err) {
        res.setToastMessage("Something went wrong!");
        res.redirect("/myaccount");
    }

 });

//This is an api function, when a authentication success the 204 response will return, if fail the 401 response will return.
 router.post("/api/login", async function (req, res) {
    // request username and password from html
    const username = req.body.username;
    const password = req.body.password;


    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);

    // if matching...
    if (user) {
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie("authToken", authToken);
        //return 204 response...
        return res.status(204).send("Successfully authenticated");
    }
    // Otherwise.
    else {
       //return 402 response...
       return res.status(401).send("Fail authenticated");
    }
});

//This is an api function, when user log out successfully the 204 response will return...
router.get("/api/logout", function (req, res) {
    res.clearCookie("authToken");
    //return 204 response...
    return res.status(204).send("Successfully authenticated");
});

//This is an api function, when admin request all users deatil as json, if all action success the 204 response will return. Otherwise, 401 response will return...
router.get("/api/users", async function(req, res){
    
    //retrieve authtoken from cookies...
    const authToken = req.cookies.authToken;

    //matching user with authtoken...
    const adminUser = await userDao.retrieveUserWithAuthToken(authToken);

    //check the user...
    if(adminUser){
        //if the isadmin = 1, all user detail will return as json...(if isadmin  = 1, user is admin, if isadmin = 0, user is not a admin)...
        if(adminUser.isadmin == 1){

            const allUserInfo = await userDao.retrieveAllUserProfile();
            return res.json(allUserInfo);
        }else{
            //if not equal 1, return 401 response...
            return res.status(401).send("Authentication failed because you are not admin!");
        }
    }else{
        //this user is not exist, return 401 response...
        return res.status(401).send("Authentication failed because user doesn't exist!");
    }

});

//This is an api function, when admin request to delete a users and along with all of their articles and comments, if all action success the 204 response will return. Otherwise, 401 response will return...
router.delete("/api/users/:id", async function(req, res){

    //retrieve authtoken from cookies...
    const authToken = req.cookies.authToken;

    //matching user with authtoken...
    const adminUser = await userDao.retrieveUserWithAuthToken(authToken);

    //matching the user id as the :id properties...
    const userId = req.params.id

    //check the user...
    if(adminUser){
        //if the isadmin = 1, all user detail will return as json...(if isadmin  = 1, user is admin, if isadmin = 0, user is not a admin)...
        if(adminUser.isadmin == 1){
            await userDao.deleteUserByAdimn(userId);
            return res.status(204).send("Successfully delete");
        }else{
             //if not equal 1, return 401 response...
            return res.status(401).send("Delete failed because you are not admin!");
        }
    }else{
         //this user is not exist, return 401 response...
        return res.status(401).send("Delete failed because user doesn't exist!");
    }
});

module.exports = router;