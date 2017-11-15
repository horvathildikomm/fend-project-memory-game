//this array contains all of the cards in order
var symbolsArray = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];

shuffle(symbolsArray); //Now the cards are in random order

$(".won").hide(); //hide the won-massage. It appears when the player win.

//This method iterates through the card elements and puts the symbols to their place.
$(".card").each(function(index){
  $(this).find("i").attr("class",symbolsArray[index]);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var gameState={
  oneCardIsOpenShow:false,
  numberOfMatses:0,
  numberOfStars:3,
  moves:0,
  won:false
};
var card1 = null;
var card2 = null;

//This is the event listener for a card
$(".card").click(function onClickFunction(){

  //this will run, when the player click on the first card
  if(!gameState.oneCardIsOpenShow){
    card1 = $(this);
    card1.off("click");
    card1.attr("class","card open show");
    gameState.moves++;
    gameState.oneCardIsOpenShow=true;
  }
  //this will run, when the player click on the second card
  else{
    card2 = $(this);
    card2.off("click");
    card2.attr("class","card open show");

    //This will run, if the two cards are matched
    if(card1.find("i").attr("class")===card2.find("i").attr("class")){
      card1.attr("class","card match");
      card2.attr("class","card match");
      gameState.numberOfMatses++;
      if(gameState.numberOfMatses===8){
        gameState.won=true;
      }
    }
    //This will run, if the two cards are NOT matched
    else{
      setTimeout(() =>  {
        card2.attr("class","card");
        card1.attr("class","card");
        card1.on("click",onClickFunction);
        card2.on("click",onClickFunction);
      },50);
    }

    gameState.oneCardIsOpenShow=false;

    //displays the number of moves
    $(".moves").text(gameState.moves);

    //removes one star if it is necessary
    if(gameState.moves===12 || gameState.moves===22 || gameState.moves===32){
      gameState.numberOfStars--;
      $(".fa-star").first().attr("class","fa fa-star-o");
    }

    //displayes the won-massage if the game is ended
    if(gameState.won){
      clearTimeout(timer);
      $(".container").hide();
      $(".won").show();
      $(".moves-number").text(gameState.moves);
      $(".stars-number").text(gameState.numberOfStars);
      $(".game-time").text(counter);
      $("button").click(() => location.reload());
    }
  }
});

//tis is an event listener, it reloads the page, when the restart is clicked
$(".restart").click(() => location.reload());


//this is a counter function from http://www.webdeveloper.com
var counter = 0;
var timer;
countUP ();
function countUP () {
	counter++;
	timer = setTimeout ( "countUP()", 1000 );
	$(".time").text(counter);
}
