window.addEventListener("load", function(){
    const cardImg = document.querySelectorAll(".card-image");
    const cardBody = document.querySelectorAll(".card-body");


    cardImg.forEach(function(ele){
        ele.addEventListener("click", function(){
            console.log("woanim");
        });

    });

    cardBody.forEach(function(ele){
        ele.addEventListener("click", function(){
            console.log("clicled");
        });

    });


});