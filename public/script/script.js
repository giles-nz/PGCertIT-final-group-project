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
