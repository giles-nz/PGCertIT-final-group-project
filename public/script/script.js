window.addEventListener("load", function(){
    const cardImg = document.querySelectorAll(".card-image");
    const cardBody = document.querySelectorAll(".card-body");
    const selectBox = document.querySelector("#checkBox");
    const sortName = document.getElementById("sort_id");
    // console.log(sortName.value);

    const comments = document.querySelector("#comment-display");

    const toggleButton = document.querySelector("#toggle");
    toggleButton.addEventListener("click", function(){
        comments.classList.toggle("comment-dispear");
    });

});
//Can't have these here.
const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function updateValue(username) {
    //check username for database
    //if username is in database, change #log inner html to "not available"
    //if username is not in database, change #log inner html to "that username is available"
         const db = await dbPromise;
    
        const user = await db.get(SQL`
            select * from users
            where username = ${username}`);
        
        if(user){
            return "That username is not available!"
        } else{
            return "That username is available"
        }

};