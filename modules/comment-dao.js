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

    const result = await db.all(SQL`
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

    await db.run(SQL`
        delete from comments
        where id = ${commentId}`);
}

module.exports = {
    retrieveAllComments,
    retrieveAllCommentsFromContent,
    addComment,
    writeAuthFromArticleId,
    deleteComment
};