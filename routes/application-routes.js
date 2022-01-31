const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const commentDao = require("../modules/comment-dao.js");

//this function is receive the whole articles from the database
router.get("/articles", async function(req, res) {
    res.locals.title = "Articles | FlavourFul";
    const allArticles = await articleDao.retrieveAllArticles();
    res.locals.allArticles = allArticles;
    res.render("articles");
});

//this function is receive the specific article from database and show in the content handlebar
router.get("/content", async function(req, res) {

    const articleID = req.query.id;

    const content = await articleDao.retrieveArticleFromID(articleID);
    res.locals.content = content;

    const comments = await commentDao.retrieveAllCommentsFromContent(articleID);
    res.locals.comments = comments;

    res.render("content");
});


//this function will be invoke when people click the sort button
router.post("/sortBy", async function(req, res) {

    const sortName = req.body.sortName;

    if(sortName == "name"){
        const allArticlesSortByName = await articleDao.retrieveAllArticlesByName();
        res.locals.allArticles = allArticlesSortByName;
        res.locals.sele1 = `selected = ${"selected"}`;
        res.render("articles");
    }else if(sortName == "date"){
        const allArticlesSortByDate= await articleDao.retrieveAllArticlesByDate();
        res.locals.allArticles = allArticlesSortByDate;
        res.locals.sele2 = `selected = ${"selected"}`;
        res.render("articles");
    }else if(sortName == "title"){
        const allArticlesSortByTitle= await articleDao.retrieveAllArticlesByTitle();
        res.locals.allArticles = allArticlesSortByTitle;
        res.locals.sele3 = `selected = ${"selected"}`;
        res.render("articles");
    }    
});

router.post("/uploadImage", upload.single("imageFile"), async function(req, res) { 
    
    const fileInfo = req.file;
    
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/uploadedFiles/${fileInfo.originalname}`;
    
    fs.renameSync(oldFileName, newFileName);

    const image = await jimp.read(newFileName);
    image.resize(320, jimp.AUTO);
    await image.write(`./public/images/thumbnails/${fileInfo.originalname}`)

    const thumbnail = `images/thumbnails/${fileInfo.originalname}`;

    res.locals.title = "Your new recipe | @Flavourful";
    res.locals.image = thumbnail;
    res.render("content");

});

router.post("/uploadRecipe", function(req, res) {
    const textNewArticle = req.body.textEditor;
    console.log(textNewArticle);
});

module.exports = router;