var userClickedPattern = [];
var gamePattern = [];
var randomChosenColour = "";
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Use jQuery to select the button with the same id as the randomChosenColour
    $("#"+randomChosenColour).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);
    level++;
}

function playSound(randomChosenColour){
    switch(randomChosenColour){
        case "green":
            var audio = new Audio("./sounds/green.mp3");
            audio.autoplay = true;
            audio.play();
            break;

        case "blue":
            var audio = new Audio("./sounds/blue.mp3");
            audio.autoplay = true;
            audio.play();
            break;

        case "red":
            var audio = new Audio("./sounds/red.mp3");
            audio.autoplay = true;
            audio.play();
            break;
        
        case "yellow":
            var audio = new Audio("./sounds/yellow.mp3");
            audio.autoplay = true;
            audio.play();
            break;

        default:
            var audio = new Audio("sounds/wrong.mp3");
            audio.autoplay = true;
            audio.play();
    }
}

//When the player clicks on a button
$("[type='button']").on("click", onButtonClick);

//What happens when a button is clicked
function onButtonClick(event){
    var userChosenColour = $(event.target).attr("id").replace('#', '');
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function startGame(){
    $(document).on("keypress", nextSequence);
    console.log(level);
}

startGame();