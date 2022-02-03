const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");
const articleDao = require("../modules/article-dao.js");
const voteDao = require("../modules/vote-dao.js");
const { response } = require("express");

router.post("/commentUpload", async function(req, res) {

    const article_id = req.cookies["articleID"];
    const content = req.body.content;
    const userId = res.locals.user.id;

    await commentDao.addComment(article_id, content, userId);
});

router.get("/commentUpdate", async function(req, res) {

    const article_id = req.cookies["articleID"];
    const data = await getAllComments(article_id);
    res.json(data);
});

router.get("/deleteComment", async function (req, res) {

    const commentId = req.query.id;

    await commentDao.deleteComment(commentId);

});

router.get("/voteCommentUp", async function (req, res) {

    const commentId = req.query.id;
    const userId = res.locals.user.id;

    const vote = await voteDao.retreiveAVote(commentId, userId);
    if(!vote){
        await voteDao.upvote(commentId, userId);
    }else if(vote.isvoted == 0){
        await voteDao.deleteVote(commentId, userId);
    }else if(vote.isvoted == 1){
        await voteDao.deleteVote(commentId, userId);
        await voteDao.upvote(commentId, userId);
    }
    const countUp = await voteDao.retrieveUpvote(commentId);
    await commentDao.upvote(commentId, countUp);

    const countDown = await voteDao.retrieveDownvote(commentId);
    await commentDao.downvote(commentId, countDown);

    // res.redirect(`/content?id=${article_id}`);
})

router.get("/voteCommentDown", async function (req, res) {

    const commentId = req.query.id;
    const userId = res.locals.user.id;

    const vote = await voteDao.retreiveAVote(commentId, userId);
    if(!vote){
        await voteDao.downvote(commentId, userId);
    }else if(vote.isvoted == 1){
        await voteDao.deleteVote(commentId, userId);
    }else if(vote.isvoted == 0){
        await voteDao.deleteVote(commentId, userId);
        await voteDao.downvote(commentId, userId);
    }

    const countUp = await voteDao.retrieveUpvote(commentId);
    await commentDao.upvote(commentId, countUp);

    const countDown = await voteDao.retrieveDownvote(commentId);
    await commentDao.downvote(commentId, countDown);
    // res.redirect(`/content?id=${article_id}`);
})


async function getAllComments(article_id){

    const comments1 = await commentDao.retrieveAllCommentsFromContent(article_id);
    return comments1;
}
module.exports = router;