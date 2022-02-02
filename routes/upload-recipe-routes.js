const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const commentDao = require("../modules/comment-dao.js");
const userDao = require("../modules/users-dao.js");

// this function uploads a new recipe to the articles database
router.post("/uploadRecipe", upload.single("imageFile"), async function(req, res) { 
    
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    console.log(user.id);
    
    const title = req.body.title;
    console.log(title);

    const newRecipe = req.body.textEditor;
    console.log(newRecipe);

    const fileInfo = req.file;
    
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/uploaded_images/${fileInfo.originalname}`;
    
    fs.renameSync(oldFileName, newFileName);

    const image = await jimp.read(newFileName);
    image.resize(320, jimp.AUTO);
    await image.write(`./public/images/thumbnails/${fileInfo.originalname}`)

    const thumbnail = `images/thumbnails/${fileInfo.originalname}`;

    await articleDao.addArticle(title, fileInfo.originalname, newRecipe, user.id);

    res.locals.title = "Your new recipe | @Flavourful";
    // res.locals.image = thumbnail;
    // res.render("content");

});

module.exports = router;