javascript: (() => {

var mainEar = "PuppyEars2";
var secondaryEar = "FoxEars1";
var mainEarColor = "#893121";
var secondaryEarColor = "#893121";
var delay = 350; /* in ms */

/* Do the activity */
Player.FocusGroup = {Name:"ItemEars"};
ActivityRun(Player, ActivityAllowedForGroup(Player, "ItemEars").find(function(activity){
  return activity.Name == "Wiggle";
}));
Player.FocusGroup = null;
setTimeout(wiggleEars,500);

/* Do the animation */
function wiggleEars(){
  for(var i = 0; i<2;i++){
    setTimeout(function(){InventoryWear(Player, secondaryEar, "HairAccessory2", secondaryEarColor);},i*delay);
    setTimeout(function(){InventoryWear(Player, mainEar, "HairAccessory2", mainEarColor );},i*delay+delay/2);
  }
}
})();
