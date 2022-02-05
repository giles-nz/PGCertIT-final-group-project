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

// this function retrieves all of the user's articles (most recent first)
async function retrieveUserArticles(user_id) {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles AS a
    WHERE a.creator_user_id = ${user_id}
    ORDER BY timestamp DESC`);

    return result;
}

// this function sorts user's articles by date (oldest first)
async function retrieveUserArticlesByDate(user_id) {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles AS a
    WHERE a.creator_user_id = ${user_id}
    ORDER BY timestamp`);

    return result;
}

// this function sorts user's articles by title
async function retrieveUserArticlesByTitle(user_id) {
    const db = await dbPromise;

    const result = await db.all(SQL`
    SELECT *
    FROM articles AS a
    WHERE a.creator_user_id = ${user_id}
    ORDER BY title`);

    return result;
}

//ths function is receive a articles from people click
async function retrieveArticleFromID(id) {
    const db = await dbPromise;

    const result = await db.get(SQL`
    SELECT a.title, a.image, a.ingredients, a.method, a.creator_user_id, a.timestamp, u.username, u.avatar  
    FROM articles AS a, users AS u
    WHERE a.creator_user_id = u.id AND a.id= ${id}`);
    
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
    retrieveAllArticlesByName,
    retrieveAllArticlesByDate,
    retrieveAllArticlesByTitle,
    retrieveUserArticles,
    retrieveUserArticlesByDate,
    retrieveUserArticlesByTitle,
    retrieveArticleFromID,
    addArticle
};