window.addEventListener("load", function(){

    const comments = document.querySelector("#comment-display");

    const toggleButton = document.querySelector("#toggle");
    toggleButton.addEventListener("click", function(){
        comments.classList.toggle("comment-dispear");
    });

    const submitComments = document.querySelector("#submit");
    const commentDisplay = document.querySelector("#comment-display");

    submitComments.addEventListener("click", commentreFresh);


    const iconButton = this.document.querySelectorAll(".small-icon");
    iconButton.forEach(function(ele){
        ele.addEventListener("click", commentreFresh);
    });


    const replyToggle = document.querySelectorAll(".replyToggle");
    const replyPopup1 = document.querySelectorAll(".replyPopup1");
    replyToggle.forEach(function(ele, count){
        ele.addEventListener("click", function(){
            replyPopup1[count].classList.toggle("replyPopup2");
        });
    });
    
    
     const submit_second = document.querySelectorAll(".submit-second");
     submit_second.forEach(function(ele){
         ele.addEventListener("click", commentreFresh);
     })








     async function commentreFresh(){
        let request = await fetch(`http://localhost:3000/commentUpdate`);
        let allComments = await request.json();
        console.log(allComments.length);
        commentDisplay.innerHTML = "";
        for(let i = 0; i < allComments.length; i++){
            commentDisplay.innerHTML += `
            <div class="comment-card">
            <div class="comment-avater"><img class="comment-image" src="./images/avatars/${allComments[i].avatar}.png"></div>
        <div class="comment-contents">
            <div class="comment-title">
                <p class="comment-username">${allComments[i].username}</p>
                <p class="comment-time">${allComments[i].timestamp}</p>
            
                <a href="./voteCommentUp?id=${allComments[i].id}"><img src="./images/avatars/up.png" class="small-icon"></a><p>${allComments[i].upvote}</p>
                <a href="./voteCommentDown?id=${allComments[i].id}"><img src="./images/avatars/down.png" class="small-icon"></a><p>${allComments[i].downvote}</p>
             
        
                <a href="./deleteComment?id=${allComments[i].id}"><img src="./images/avatars/delete.png" class="small-icon"></a>
      
            </div>
            <p class="comment-text">${allComments[i].content}</p>
        </div>
    </div>`
        }
        location.reload();
     }

});
