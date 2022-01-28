const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("../middleware/fs-directory_scanner.js");
const jimp = require("../middleware/jimp-image_processor.js");

const testDao = require("../modules/test-dao.js");

// router.get("/", async function(req, res) {

//     res.locals.title = "My route title!";
//     res.locals.allTestData = await testDao.retrieveAllTestData();

//     res.render("home");
// });

router.get("/articles", async function(req, res) {
    res.locals.title = "Articles | WEBSITE NAME";


    res.render("articles");
});

router.get("/content", async function(req, res) {



    res.render("content");
});

router.post("/uploadImage", upload.single("imageFile"), async function(req, res) { 
    
    const fileInfo = req.file;
    
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/uploadedFiles/${fileInfo.originalname}`;
    
    fs.renameSync(oldFileName, newFileName);

    const image = await jimp.read(newFileName);
    image.resize(320, jimp.AUTO);
    await image.write(`./public/images/thumbnails/${fileInfo.originalname}`)

    res.locals.title = "Your new recipe | @Flavourful";
    res.render("content");

});

module.exports = router;