var loginSection = $(".login");
var gameSection = $(".game");

var loginButton = $(".loginButton");

loginButton.on("click", function(){
    loginSection.css("display", "none");
    gameSection.css({
        "display":"block",
        "background-color":"red"
    });
})