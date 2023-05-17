var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPatter = [];
var level = 0;
var started = false;

$(document).keypress(function (e) {

    if(!started){

        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
  
});


$(".btn").click(function(e){
    // var userChosenColor = $(this).attr("id");

    //taking the id or pressed button
    
    var userChosenColor = e.target.id;
    // console.log(userChosenColor)
    
    //storing ID in empty array
    userClickedPatter.push(userChosenColor)
    
    playSound(userChosenColor)

    animatePress(userChosenColor)

    checkAnswer(userClickedPatter)

    // nextSequence(userChosenColor);
    
    // console.log(userClickedPatter)
    // $("userClickedPatter").css("backgroundColor", "white")
})

function nextSequence(){

    userClickedPatter = [];

    // score
    level++;
    
    //random number
    var randomNumber = Math.floor(Math.random() * 4);
    //random color
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);


    // changing the score text
    $("#level-title").text(`Level ${level}`);

    //animation for random color
    // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    
}

function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    // $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100);

}

$("body").click(() => {
    if(!userClickedPatter){
        $("body").addClass("game-over")
        $("#level-title").text("game over, press any key to restart the game");
    }

    setTimeout(function(){
        $("body").removeClass("game-over")
    },200);

})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPatter[currentLevel]){

        if(userClickedPatter.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);

        } else{
            playSound("wrong");

            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);

            restart();
        }

    }

}

function restart(){
    level = 0;
    gamePattern = [];
    started = false;
}

// $("#" + randomChosenColour).click(function(){
//      $("#" + randomChosenColour).addClass("pressed");

//      var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//      audio.play();

//      setTimeout(function(){
//         $("#" + randomChosenColour).removeClass("pressed")
//      },100);

// })