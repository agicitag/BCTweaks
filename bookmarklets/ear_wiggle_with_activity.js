javascript: (() => {

  var mainEar = "PuppyEars2";
  var secondaryEar = "FoxEars1";
  var mainEarColor = "#893121";  /* You can also set multiple colors like ["#893121", "Default"] */
  var secondaryEarColor = "#893121";
  var delay = 350; /* in ms */
  var numberWiggles = 2;

  /* Do the activity */
  var focusGroup = Player.FocusGroup;
  Player.FocusGroup = {Name:"ItemEars"};
  ActivityRun(Player, ActivityAllowedForGroup(Player, "ItemEars").find(function(activity){
    return activity.Name == "Wiggle";
  }));
  Player.FocusGroup = focusGroup;

  /* Do the animation */
  function wiggleEars(){
    for(var i = 0; i<numberWiggles;i++){
      setTimeout(function(){InventoryWear(Player, secondaryEar, "HairAccessory2", secondaryEarColor);},i*delay);
      setTimeout(function(){InventoryWear(Player, mainEar, "HairAccessory2", mainEarColor );},i*delay+delay/2);
    }
  }
  setTimeout(wiggleEars,500);

})();
