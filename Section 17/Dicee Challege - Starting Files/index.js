var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var number1Image = "images/dice" + randomNumber1 + ".png";
var number2Image = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src",number1Image);
document.querySelectorAll("img")[1].setAttribute("src", number2Image);

var title = document.querySelector("h1");
if(randomNumber1 > randomNumber2){
    title.innerHTML = "🚩 Play 1 Wins!";
}else if(randomNumber1 < randomNumber2){
    title.innerHTML = "Player 2 Wins! 🚩";
}else{
    title.innerHTML = "Draw!";
}