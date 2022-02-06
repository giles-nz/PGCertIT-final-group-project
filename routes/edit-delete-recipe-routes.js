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
    
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    const article_id = req.cookies["articleID"];

    const content = await articleDao.retrieveArticleFromID(article_id);
    // console.log(content);

    const defaultImage = "default.jpg";

    if (content.image == defaultImage) {
        console.log(defaultImage);
        res.locals.defaultImage = defaultImage;
    }
    
    res.locals.user = user;
    res.locals.content = content;
    res.locals.title = "Edit Recipe | @FLAVOURFUL";
    
    res.render("edit_article");

});

// this function updates a recipe in the articles table of project-database.db
router.post("/updateRecipe", upload.single("imageFile"), async function(req, res) { 
    
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    console.log(user.id);

    const article_id = req.cookies["articleID"];
    console.log(article_id); 
    
    const editTitle = req.body.title;
    console.log(editTitle);

    const editIngredients = req.body.ingredients;
    console.log(editIngredients);

    const editRecipe = req.body.method;
    console.log(editRecipe);

    const fileInfo = req.file;
    
    if (fileInfo) {
        
        // console.log(fileInfo);
            
        const oldFileName = fileInfo.path;
        const newFileName = `./public/images/uploaded_images/${fileInfo.originalname}`;
    
        fs.renameSync(oldFileName, newFileName);

        const image = await jimp.read(newFileName);
        image.resize(1280, 720);
        await image.write(`./public/images/thumbnails/${fileInfo.originalname}`)

        await articleDao.updateArticleAndImage(article_id, editTitle, fileInfo.originalname, editIngredients, editRecipe);
    
    } else {
        
        await articleDao.updateArticleNotImage(article_id, editTitle, editIngredients, editRecipe);
    }
    
    res.redirect("./userArticles");

});

module.exports = router;