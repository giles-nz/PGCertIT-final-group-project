const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//ths function is receive whole all articles
async function retrieveAllArticles() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles`);
    
    return result;
}

//ths function is receive whole all articles sort by name
async function retrieveAllArticlesByName() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles, users
    WHERE articles.creator_user_id = users.id
    ORDER BY users.username`);
    
    return result;
}

//ths function is receive whole all articles sort by date
async function retrieveAllArticlesByDate() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles
    ORDER BY timestamp`);
    
    return result;
}

//ths function is receive whole all articles sort by title
async function retrieveAllArticlesByTitle() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles
    ORDER BY title`);
    
    return result;
}

//ths function is receive a articles from people click
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