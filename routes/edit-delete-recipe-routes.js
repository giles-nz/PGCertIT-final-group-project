const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const commentDao = require("../modules/comment-dao.js");
const userDao = require("../modules/users-dao.js");

// this function deletes the recipe from the articles table in project-database.db
// all comments and all votes linked to the recipe will also be deleted
router.post("/deleteRecipe", async function(req, res) {
    
    const article_id = req.cookies["articleID"];
    console.log(article_id);

    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    console.log(user.id)

    await articleDao.deleteArticle(article_id, user.id);

    res.redirect("./userArticles");

});

// this router redirects the user to the edit_article.handlebars page
router.post("/editRecipe", async function(req, res) {
    
    const article_id = req.cookies["articleID"];

    const content = await articleDao.retrieveArticleFromID(article_id);
    // console.log(content);

    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    
    res.locals.content = content;
    res.locals.user = user;
    
    res.render("edit_article");

});  

module.exports = router;