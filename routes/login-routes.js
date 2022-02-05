const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userDao = require("../modules/users-dao.js");
const {verifyAuthenticated} = require("../middleware/auth-middleware.js");
const { all } = require("express/lib/application");


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

    res.cookie("upvote", 0);
    res.cookie("downvote", 0);

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
        res.setToastMessage(`Thanks, ${user.fname}! We've Created your account. Please log in using your new credentials.`);
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



module.exports = router;