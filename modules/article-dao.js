const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//ths function is receive whole all articles
async function retrieveAllArticles() {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles
    ORDER BY timestamp DESC`);
    
    return result;
}

// this function retrieves all of the user's articles
async function retrieveAllUserArticles(user_id) {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles AS a
    WHERE a.creator_user_id = ${user_id}`);

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

// this function adds a new article (recipe) to the articles table in project-database.db
async function addArticle(title, image, ingredients, method, creator_user_id) {
    const db = await dbPromise;

    await db.run(SQL`
        INSERT INTO articles (title, image, ingredients, method, creator_user_id)
        VALUES (${title}, ${image}, ${ingredients}, ${method}, ${creator_user_id})`);
}

module.exports = {
    retrieveAllArticles,
    retrieveAllUserArticles,
    retrieveArticleFromID,
    retrieveAllArticlesByName,
    retrieveAllArticlesByDate,
    retrieveAllArticlesByTitle,
    addArticle
};