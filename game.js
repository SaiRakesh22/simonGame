var level = 0;
$(document).keydown(function(){
    $(".btn").removeClass("wrong");
    $("h1").css("color","white");
    $("h1").css("fontSize","3rem");
    $("img").remove();
    $("body").removeClass("game-over");
    if(level===0){
        nextSequence();
    }
});

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(key){
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function lost(){
    $("h1").css("color","red");
    $("h1").css("fontSize","2rem");
    $("body").addClass("game-over");
    $(".btn").addClass("wrong");
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            },500);
        }
        else{
            return;
        }
    }
    else{
        playSound("wrong");
        lost();
        $("h1").html("Game Over. Press any key to restart :<br> Completed Levels "+ (level-1));
        level=0;
        userClickedPattern = [];
        gamePattern=[];
    }
}