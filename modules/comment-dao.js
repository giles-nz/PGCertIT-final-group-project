const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveAllComments() {
    const db = await dbPromise;

    const comments = db.all(SQL`
        select * from comments
        order by timestamp desc`);
    return comments;
}

async function retrieveAllCommentsFromContent(articleId){
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT comments.*, users.username, users.avatar, users.authToken
    FROM comments, users, articles
    WHERE comments.article_id = articles.id AND comments.user_id = users.id AND  comments.article_id = ${articleId}
    ORDER BY comments.timestamp DESC`);
    
    return result;

}

async function writeAuthFromArticleId(articleId){
    const db = await dbPromise;

    const result = await db.get(SQL`
    SELECT  users.authToken
    FROM users, articles
    WHERE users.id = articles.creator_user_id AND articles.id = ${articleId}`);
    
    return result;
}


async function addComment(article_id, content, user_id) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into comments (article_id, timestamp, content, user_id) values
        (${article_id}, datetime('now', 'localtime'), ${content}, ${user_id})`);
}

async function deleteComment(commentId) {
    const db = await dbPromise;

    // ON DELETE CASCADE referential action for votes table FOREIGN KEY commentId
    // this ensures that all votes linked to the comment being deleted will also be deleted

    // await db.run(SQL`
    // delete from votes
    // where commentId = ${commentId}`);

    await db.run(SQL`
    delete from comments
    where id = ${commentId}`);
}

async function retrieveACommentFromID(commentId) {
    const db = await dbPromise;

    const result = await db.get(SQL`
            SELECT * FROM  comments
            WHERE id = ${commentId}`);

    return result;
}

async function upvote(id, value) {

    const db = await dbPromise;

    //also needs a hash
    await db.run(SQL`
    UPDATE comments
    SET upvote = ${value}
    WHERE id = ${id}`);
}

async function downvote(id, value) {

    const db = await dbPromise;

    //also needs a hash
    await db.run(SQL`
    UPDATE comments
    SET downvote = ${value}
    WHERE id = ${id}`);
}


module.exports = {
    retrieveAllComments,
    retrieveAllCommentsFromContent,
    addComment,
    writeAuthFromArticleId,
    deleteComment,
    retrieveACommentFromID,
    upvote,
    downvote
};