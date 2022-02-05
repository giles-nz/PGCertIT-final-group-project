const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

// const upload = require("../middleware/multer-uploader.js");
// const fs = require("../middleware/fs-directory_scanner.js");
// const jimp = require("../middleware/jimp-image_processor.js");

const articleDao = require("../modules/article-dao.js");
const commentDao = require("../modules/comment-dao.js");
const userDao = require("../modules/users-dao.js");

//this function is receive the whole articles from the database
router.get("/articles", async function(req, res) {
    res.locals.title = "All Recipes | @FLAVOURFUL";
    const allArticles = await articleDao.retrieveAllArticles();
    res.locals.allArticles = allArticles;
    res.render("articles");
});

router.get("/userArticles", async function(req, res) {
    
    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);

    if (user) {
        const userArticles = await articleDao.retrieveUserArticles(user.id);
        if (!userArticles.length) {
            // console.log("Array is empty");
            res.locals.noUserRecipes = "Please upload recipes on your @FLAVOURFUL homepage!";
        }    
        res.locals.userArticles = userArticles;
        res.locals.title = "Your Recipes | @FLAVOURFUL";
        res.render("user_articles");
    } else {
        // res.setToastMessage("Please login or create a new @FLAVOURFUL account")
        res.redirect("articles");
    }
});

//this function is receive the specific article from database and show in the content handlebar
router.get("/content", async function(req, res) {

    const articleID = req.query.id;
    res.cookie("articleID", articleID);

    const content = await articleDao.retrieveArticleFromID(articleID);
    res.locals.content = content;
    console.log(content);

    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    if (user) {
        console.log(user.id);
        if (content.creator_user_id == user.id) {
            console.log("This user is the author");
        }
    }
    
// this part is check auth to make sure the delect button appear
    const data = req.cookies["authToken"];
    const comments = await commentDao.retrieveAllCommentsFromContent(articleID);
    for(let i = 0; i < comments.length; i++){
        if(data == comments[i].authToken){
            comments[i].delectAuth = true;

        }else{
            comments[i].delectAuth = false;
        }
        if(data != null){
            comments[i].voteAuth = true;
        }else{
            comments[i].voteAuth = false;
        }
    }
    res.locals.comments = comments;

 //this part is make auth from the user to leave comment, if they dont log in, they can't comment.
//  const authToken = await commentDao.writeAuthFromArticleId(articleID);
//  if(res.locals.user){
//      if(data == authToken){
//          true;
//      }else{
//          false;
//      }

//  }


    

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

// sorts list of user's articles by date or title
router.post("/userArticlesSortBy", async function(req, res) {

    const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);
    const sortName = req.body.sortName;

    if (sortName == "date") {
        const userArticlesSortByDate= await articleDao.retrieveUserArticlesByDate(user.id);
        res.locals.userArticles = userArticlesSortByDate;
        res.locals.sele1 = `selected = ${"selected"}`;
        res.render("user_articles");
    } else if (sortName == "title") {
        const userArticlesSortByTitle= await articleDao.retrieveUserArticlesByTitle(user.id);
        res.locals.userArticles = userArticlesSortByTitle;
        res.locals.sele2 = `selected = ${"selected"}`;
        res.render("user_articles");
    }    
});

module.exports = router;