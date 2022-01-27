const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

// router.get("/", async function(req, res) {

//     res.locals.title = "My route title!";
//     res.locals.allTestData = await testDao.retrieveAllTestData();

//     res.render("home");
// });

router.get("/articles", async function(req, res) {
    res.locals.title = "Articles | WEBSITE NAME";


    res.render("articles");
});

module.exports = router;