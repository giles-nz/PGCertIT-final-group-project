const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


async function retrieveAllArticles() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles`);
    
    return result;
}

async function retrieveAllArticlesByName() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles, users
    WHERE articles.creator_user_id = users.id
    ORDER BY users.username`);
    
    return result;
}

async function retrieveAllArticlesByDate() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles
    ORDER BY timestamp`);
    
    return result;
}

async function retrieveAllArticlesByTitle() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles
    ORDER BY title`);
    
    return result;
}

async function retrieveArticleFromID(id) {
    const db = await dbPromise;

    const result = await db.get(SQL`
    SELECT articles.title, articles.image, articles.ingredients, articles.method, articles.timestamp, users.fname 
    FROM articles, users
    WHERE articles.creator_user_id = users.id AND articles.id= ${id}`);
    
    return result;
}

module.exports = {
    retrieveAllArticles,
    retrieveArticleFromID,
    retrieveAllArticlesByName,
    retrieveAllArticlesByDate,
    retrieveAllArticlesByTitle
};