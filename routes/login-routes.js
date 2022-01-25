const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

router.get("/login", function (req, res) {


    res.render("login");

});

router.post("/login", function (req, res) {



});

router.get("/newAccount", function(req, res) {


    res.render("new-account");
});


router.post("/newAccount", function(req, res) {


});

module.exports = router;