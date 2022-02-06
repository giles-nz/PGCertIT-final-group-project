const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const userDao = require("../modules/users-dao.js");

// this function uploads a new recipe to the articles database
router.post("/uploadRecipe", upload.single("imageFile"), async function(req, res) { 
    
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    console.log(user.id);
    
    const title = req.body.title;
    console.log(title);

    const ingredients = req.body.ingredients;
    console.log(ingredients);

    const newRecipe = req.body.method;
    console.log(newRecipe);

    const fileInfo = req.file;
    
    if (fileInfo) {
        
        // console.log(fileInfo);
            
        const oldFileName = fileInfo.path;
        const newFileName = `./public/images/uploaded_images/${fileInfo.originalname}`;
    
        fs.renameSync(oldFileName, newFileName);

        const image = await jimp.read(newFileName);
        image.resize(1280, 720);
        await image.write(`./public/images/thumbnails/${fileInfo.originalname}`)

        await articleDao.addArticle(title, fileInfo.originalname, ingredients, newRecipe, user.id);
    
    } else {
        
        await articleDao.addArticle(title, "default.jpg", ingredients, newRecipe, user.id);
    }
    
    res.redirect("./userArticles");

});

module.exports = router;