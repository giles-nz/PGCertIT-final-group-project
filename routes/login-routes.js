const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");
const {verifyAuthenticated} = require("../middleware/auth-middleware.js");


router.get("/login", function (req, res) {

    res.locals.title = "Login | WEBSITE NAME";
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
    res.locals.title = "Home | WEBSITE NAME";
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

router.get("/newAccount", function(req, res) {
    res.locals.title = "New Account | WEBSITE NAME";
    res.render("new-account");
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

//  router.post("/newAccount", function (req,res){

//     let user = {
//         username: req.body.username,
//         password: req.body.password,
//         fname: req.body.fname,
//         lname: req.body.lname,
//     }
   
//     userDao.createUser(user);
//     console.log(user.fname);
//     res.setToastMessage("User created successfully!");
//     res.redirect("/login")
// });

module.exports = router;