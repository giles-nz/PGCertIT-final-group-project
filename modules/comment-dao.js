const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveAllCommentsFromContent(articleId){
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT comments.*, users.username, users.avatar
    FROM comments, users, articles
    WHERE comments.article_id = articles.id AND comments.user_id = users.id AND  comments.article_id = ${articleId}
    ORDER BY comments.timestamp DESC`);
    
    return result;

}

async function addComment(article_id, content, user_id){
    const db = await dbPromise;
    await db.run(SQL`
    INSERT INTO comments (article_id, content, user_id)	VALUES
    (${article_id}, ${content}, ${user_id})`);
}

module.exports = {
    retrieveAllCommentsFromContent,
    addComment
};