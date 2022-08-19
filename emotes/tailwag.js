{
    let tailVariations = ["FoxTailStrap2", "FoxTailStrap1"];
        function TailWag(times, color)
        {
            for(let i=0; i < times; i++)
            {
                setTimeout(function() {
                    InventoryWear(Player, tailVariations[i%tailVariations.length], "TailStraps", color);
                    ChatRoomCharacterItemUpdate(Player, "TailStraps");
                }, i * 500);
            }
        }
    var Readchat = function(data){
      if(data.Type === "Emote" && data.Sender === Player.MemberNumber){
        var message = data.Content;
        let pattern = /wags \w* tail/mi ;
        let result = pattern.test(message);
        if(result){
        TailWag(20,["Default", "#6E0232"]);
      }
    }
    };
    ServerSocket.on("ChatRoomMessage",Readchat);
}