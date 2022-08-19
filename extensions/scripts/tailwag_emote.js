async function TailWagEmote() {

    await waitFor(() => ServerIsConnected && ServerSocket);

    let tailVariations = ["FoxTailStrap2", "FoxTailStrap1"]; // change based on tail type
    let tailColor = ["Default", "#6E0232"]; // change color based on your own preference 
    let numberWags = 10;
    let delay = 500; // delay in ms
        function TailWag(times, color)
        {
            for(let i=0; i < times; i++)
            {
                setTimeout(function() {
                    InventoryWear(Player, tailVariations[i%tailVariations.length], "TailStraps", color);
                    ChatRoomCharacterItemUpdate(Player, "TailStraps");
                }, i * delay);
            }
        }
    var GetEmote = function(data) {
    if(data.Type === "Emote" && data.Sender === Player.MemberNumber){
        var message = data.Content;
        let pattern = /wags \w* tail/mi ; // matches {<any> wags <any single word or none> tail <any>}
        let result = pattern.test(message);
        if(result){
        TailWag(numberWags,tailColor);
    }
    }
    };
    ServerSocket.on("ChatRoomMessage",GetEmote);
    
    async function waitFor(func, cancelFunc = () => false) {
        while (!func()) {
          if (cancelFunc()) {
            return false;
          }
          await sleep(100);
        }
        return true;
    }
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

TailWagEmote();