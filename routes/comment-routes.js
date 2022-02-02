const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");

router.get("/commentUpload", async function(req, res) {


    const article_id = req.cookies["articleID"];
    const content = req.query.content;
    const userID = res.locals.user.id;

    console.log(article_id);
    console.log(content);
    console.log(userID);
    await commentDao.addComment(article_id, content, userID)
    res.redirect(`/content?id=${article_id}`);
});

router.get("/deleteComment", async function (req, res) {

    const article_id = req.cookies["articleID"];

    const commentId = req.query.id;

    await commentDao.deleteComment(commentId);

    res.redirect(`/content?id=${article_id}`);
})

module.exports = router;