javascript: (() => {

var mainTail = "PuppyTailStrap1";
var secondaryTail = "WolfTailStrap3";
var mainTailColor = "#431A12";
var secondaryTailColor = "#310D0C";
var delay = 1000; /* in ms */

/* Do the animation */
for(var i = 0; i<3;i++){
  setTimeout(function(){InventoryWear(Player, secondaryTail, "TailStraps", secondaryTailColor);},i*delay);
  setTimeout(function(){InventoryWear(Player, mainTail, "TailStraps", mainTailColor );},i*delay+delay/2);
}

})();
