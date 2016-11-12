// jQuery selectors
var $loginSection = $(".login");
var $gameSection = $(".game");
var $cardContainer = $(".cardContainer");
var $userName = $(".userName");
var $loginButton = $(".startButton");
var $difficultySelect = $(".difficulty");
var $userTitle = $(".userTitle");

// variables
var numberOfCards = 0;
var difficulty = '';

//append cards
var howManyCards = function(cardNumber, style) {
    var cardStyle = "";
    var card = "";

    if (style == "easyStyle") cardStyle = "cardEasy";
    if (style == "mediumStyle") cardStyle = "cardMedium";
    if (style == "hardStyle") cardStyle = "cardHard";

    card = "<div class='" + cardStyle + "'></div>";

    for (var i = 0; i < cardNumber; i++) {
        $cardContainer.append(card);
    }

}

// on start
$loginButton.on("click", function(){

    // initialising userName
    var userName = "";
    userName = $userName.val();
    if (userName == ""){
      userName = "Player1";
    };
    console.log(userName);
    $userTitle.text(userName);


    $loginSection.css("display", "none");
    $gameSection.css({
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
difficulty = $difficultySelect.val();
console.log(difficulty);

$difficultySelect.change(function(){
  difficulty = $difficultySelect.val();
  console.log(difficulty);
});
