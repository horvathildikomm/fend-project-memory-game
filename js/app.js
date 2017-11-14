//this array contains all of the cards in order
var symbolsArray = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];

shuffle(symbolsArray); //Now the cards are in random order

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
  won:false
};
var card1 = null;
var card2 = null;
$(".card").click(function(){
   if(!gameState.oneCardIsOpenShow){
     card1 = $(this);
     card1.attr("class","card open show");
     gameState.oneCardIsOpenShow=true;
   } else{
     card2 = $(this);
     card2.attr("class","card open show");
     if(card1.find("i").attr("class")===card2.find("i").attr("class")){
       card1.attr("class","card match");
       card2.attr("class","card match");
       card1.click(false);
       card2.click(false);
       gameState.numberOfMatses++;
     }
     else{
       card1.attr("class","card");
       card2.attr("class","card");
     }
     gameState.oneCardIsOpenShow=false;
   }
});




//$(".deck").find("li").toggleClass("match");




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
