javascript: (() => {

  var mainTail = "PuppyTailStrap1";
  var secondaryTail = "WolfTailStrap3";
  var mainTailColor = "#431A12"; /* You can also set multiple colors like ["#431A12", "Default"] */
  var secondaryTailColor = "#310D0C";
  var delay = 1000; /* in ms */
  var numberWags = 3;
  var displayMessage = false; /* true or false */
  var message = " wags her tail.";

  /* Do the animation */
  for(var i = 0; i<numberWags;i++){
    setTimeout(function(){InventoryWear(Player, secondaryTail, "TailStraps", secondaryTailColor);},i*delay);
    setTimeout(function(){InventoryWear(Player, mainTail, "TailStraps", mainTailColor );},i*delay+delay/2);
  }
  
  /* Display the message */
  if (displayMessage){
    ServerSend("ChatRoomChat", {
      Content: "Beep",
      Type: "Action",
      Target: null,
      Dictionary: [
        { Tag: "Beep", Text: "msg" },
        { Tag: "Biep", Text: "msg" },
        { Tag: "Sonner", Text: "msg" },
        { Tag: "发送私聊", Text: "msg" },
        { Tag: "msg", Text: Player.Nickname + message}
      ]
    });
  }

})();
