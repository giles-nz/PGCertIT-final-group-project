const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const commentDao = require("../modules/comment-dao.js");
const userDao = require("../modules/users-dao.js");

// this function deletes the recipe from the articles database
router.post("/deleteRecipe", async function(req, res) {
    
    const article_id = req.cookies["articleID"];
    console.log(article_id);

    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    console.log(user.id)

    // first delete all comments linked to the recipe
    await commentDao.deleteArticleCommentsVotes(article_id);

    // then delete the recipe
    await articleDao.deleteArticle(article_id, user.id);

    res.redirect("./userArticles");

});

module.exports = router;