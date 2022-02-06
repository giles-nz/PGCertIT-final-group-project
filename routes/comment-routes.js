const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");
const voteDao = require("../modules/vote-dao.js");
const { response } = require("express");

//this router is add first level comment.
router.post("/commentUpload", async function(req, res) {

    //read the article id from the cookies when people click in a specific content.
    const article_id = req.cookies["articleID"];
    const content = req.body.content;
    const userId = res.locals.user.id;

    //add comment from comment DAO.
    const addComment= await commentDao.addComment(article_id, content, userId);
});

//this router is a function to send all comment from a specific article to the client side.
router.get("/commentUpdate", async function(req, res) {

    //read the article id from the cookies when people click in a specific content.
    const article_id = req.cookies["articleID"];
    const data = await getAllComments(article_id);
    res.json(data);
});

//this router is a function to delete a specific comment.
router.get("/deleteComment", async function (req, res) {

    const commentId = req.query.id;
    //this is a function when people click the delete icon, this comment will delete.
    await commentDao.deleteComment(commentId);

    //this is a function when an comment have child comment, check and delete this.
    const firstChild = await commentDao.retrieveChildcomments(commentId);

    //loop if have any child, and delete this.
    for(let i = 0; i < firstChild.length; i++){
        await commentDao.deleteComment(firstChild[i].id);
        const secondChild = await commentDao.retrieveChildcomments(firstChild[i].id);
        for(let l = 0; l < secondChild.length; l++){
            await commentDao.deleteComment(secondChild[l].id);
        }
    }
});

//this router is a function to record and display the upvote.
router.get("/voteCommentUp", async function (req, res) {

    const commentId = req.query.id;
    const userId = res.locals.user.id;
    
    //this is a function when people cilck upvote icon it will record a upvote
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
})

//this router is a function to record and display the downvote.
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

router.get("/replyComment", async function(req, res) {

    const article_id = req.cookies["articleID"];
    const commentId = req.query.comment_id;
    const content = req.query.content;
    const id = res.locals.user.id;

    await commentDao.addChildComment(article_id, content, commentId, id);

    const comments = await commentDao.retrieveAllCommentsFromContent(article_id);

    return comments;


});


async function getAllComments(article_id){

    const comments1 = await commentDao.retrieveAllCommentsFromContent(article_id);
    return comments1;
}
module.exports = router;