const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");

router.get("/commentUpload", async function(req, res) {


    const article_id = req.cookies["articleID"];
    const content = req.query.content;
    const userID = res.locals.user.id;

    await commentDao.addComment(article_id, content, userID)
    res.redirect(`/content?id=${article_id}`);
});

router.get("/deleteComment", async function (req, res) {

    const article_id = req.cookies["articleID"];

    const commentId = req.query.id;

    await commentDao.deleteComment(commentId);

    res.redirect(`/content?id=${article_id}`);
});

router.get("/voteCommentUp", async function (req, res) {

    const article_id = req.cookies["articleID"];

    const commentId = req.query.id;

    const data = await commentDao.retrieveACommentFromID(commentId);
    
    if(req.cookies["upvote"] == 0){
        const value = data.upvote + 1;

        await commentDao.upvote(commentId, value);
        res.cookie("upvote", 1);
    }else if(req.cookies["upvote"] == 1){
        const value = data.upvote - 1;
        await commentDao.unUpvote(commentId, value);
        res.cookie("upvote", 0);
    };



    res.redirect(`/content?id=${article_id}`);
})

router.get("/voteCommentDown", async function (req, res) {

    const article_id = req.cookies["articleID"];

    const commentId = req.query.id;

    const data = await commentDao.retrieveACommentFromID(commentId);

    if(req.cookies["downvote"] == 0){
        const value = data.downvote + 1;

        await commentDao.downvote(commentId, value);
        res.cookie("downvote", 1);
    }else if(req.cookies["downvote"] == 1){
        const value = data.downvote - 1;
        await commentDao.unDownvote(commentId, value);
        res.cookie("downvote", 0);
    };

    res.redirect(`/content?id=${article_id}`);
})

module.exports = router;