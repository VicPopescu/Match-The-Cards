var loginSection = $(".login");
var gameSection = $(".game");
var cardContainer = $(".cardContainer");
var numberOfCards = 0;

var loginButton = $(".startButton");

//append cards
var howManyCards = function(cardNumber, style){
    var cardStyle = "";
    if (style == "easyStyle") cardStyle = "cardEasy";
    if (style == "mediumStyle") cardStyle = "cardMedium";
    if (style == "hardStyle") cardStyle = "cardHard";

  var card = "<div class='" + cardStyle + "'></div>";

  for (var i = 0; i < cardNumber; i++){
    cardContainer.append(card);
  }

}

loginButton.on("click", function(){
    loginSection.css("display", "none");
    gameSection.css({
        "display":"block",
        "background-color":"red"
    });
    switch (difficulty) {
      case 'easy': howManyCards(16, "easyStyle")
      break;
      case 'medium': howManyCards(36, "mediumStyle")
      break;
      case 'hard': howManyCards(64, "hardStyle")
      break;
      default: break;
    }
})



// handling difficulty
var difficultySelect = $(".difficulty");
var difficulty = '';

difficulty = difficultySelect.val();
console.log(difficulty);

difficultySelect.change(function(){
  difficulty = difficultySelect.val();
  console.log(difficulty);
});
