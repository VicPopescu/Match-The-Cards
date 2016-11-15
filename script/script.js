// jQuery selectors
var $loginSection = $(".login");
var $gameSection = $(".game");
var $cardContainer = $(".cardContainer");
var $userName = $(".userName");
var $loginButton = $(".startButton");
var $difficultySelect = $(".difficulty");
var $userTitle = $(".userTitle");
var $gameOverSection = $(".gameOver");

// variables
var numberOfCards = 0;
var countDeletedCards = 0;
var difficulty = '';
var arrayOfCards = [];
var arrayOfAttributes = [];
var arrayOfColors = [];
var userName = "";
userName = $userName.val();


// handling difficulty
(function difficultyHandling() {

    difficulty = $difficultySelect.val();
    $difficultySelect.change(function() {
        difficulty = $difficultySelect.val();
    });
})();

// on start
$loginButton.on("click", function() {

    doTimer();

    // initialising userName

    if (userName == "") {
        userName = "Player1";
    };
    //display username
    $userTitle.text(userName);

    //change view from login to game
    $loginSection.css("display", "none");
    $gameSection.css({
        "display": "block",
    });


    //handling game difficulty
    switch (difficulty) {
        case 'easy':
            howManyCards(8, "easyStyle")
            break;
        case 'medium':
            howManyCards(18, "mediumStyle")
            break;
        case 'hard':
            howManyCards(32, "hardStyle")
            break;
        default:
            break;
    }
})


//append cards in DOM deppending on difficulty
var howManyCards = function(cardNumber, style) {

    var cardStyle = "";
    var card = "";
    numberOfCards = cardNumber * 2;//number of total cards

    if (style == "easyStyle") cardStyle = "cardEasy";
    if (style == "mediumStyle") cardStyle = "cardMedium";
    if (style == "hardStyle") cardStyle = "cardHard";

    //generate array of cards
    for (var i = 0; i < cardNumber; i++) {

        card = "<div class='card " + cardStyle + " cardColor" + i + " cardAfter' data-cardNumber= " + i + "></div>";
        arrayOfCards.push(card);
        arrayOfCards.push(card);
    }

    //generate random number
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //append cards in DOM
    for (var j = arrayOfCards.length; j > 0; j--) {

        var rand = getRandomArbitrary(0, arrayOfCards.length - 1);
        $cardContainer.append(arrayOfCards[rand]);
        arrayOfCards.splice(rand, 1);
    }
}

// handling click on cards
var cardOnClick = function() {

    $(document).on("click", '.card', function() {

        if (arrayOfAttributes.length < 2) {

            var dataAttribute = $(this).attr("data-cardNumber");

            $(this).removeClass('cardAfter');
            arrayOfAttributes.push(dataAttribute);

            if (arrayOfAttributes.length == 2) {

                if (arrayOfAttributes[0] == arrayOfAttributes[1]) {
                    var firstEqualCard = arrayOfAttributes.slice(1);
                    equals(firstEqualCard);

                    arrayOfAttributes = [];

                } else {

                    setTimeout(function() {
                        var firstCard = arrayOfAttributes.slice(0, 1);
                        var secondCard = arrayOfAttributes.slice(1);

                        $cardContainer.find('div[data-cardNumber =' + firstCard + ']').addClass("cardAfter");
                        $cardContainer.find('div[data-cardNumber =' + secondCard + ']').addClass("cardAfter");
                        arrayOfAttributes = [];
                    }, 1000);

                    unequals();
                }
            }
        }


// game over alert
        function equals(attr) {

            setTimeout(function() {
                $cardContainer.find('div[data-cardNumber =' + attr + ']').css('display', 'none');
                countDeletedCards += 2;
                console.log(countDeletedCards);
                console.log(numberOfCards);
                if (countDeletedCards == numberOfCards){
                  $gameSection.css(
                    "display", "none"
                  );
                  $gameOverSection.css({
                    "display": "block",
                  });
                  $(".endName").append("Name: ", userName);
                  $(".endTime").append("Time: " + minutes + 'm' + " " + c + 's');

                  $('.retryButton').click(function() {
                    location.reload();
                  });
                  function stopCount() {
                    clearTimeout(t);
                    timer_is_on = false;

                  };
                }
            }, 1000)

        }

        function unequals() {}


    });


}
cardOnClick();


// handling timer
var c = 0;
var minutes = 0;
var t;
var timer_is_on = false;

function timedCount() {
    $('#timer').html(minutes + 'm' + " " + c + 's');
    c = c + 1;
    if (c % 60 == 0) {
        minutes += 1;
        c = 0;
    }
    t = setTimeout("timedCount()", 1000);

}

function doTimer() {
    if (!timer_is_on) {
        timer_is_on = true;
        timedCount();
    }
}
// end of handling timer
