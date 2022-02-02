const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");

router.get("/commentUpload", async function(req, res) {

    const article_id = res.locals.content
    const content = req.query.content;
    const userID = res.locals.user.id;

    console.log(article_id);
    console.log(content);
    console.log(userID);
    res.redirect("/content?id=1");
});

module.exports = router;