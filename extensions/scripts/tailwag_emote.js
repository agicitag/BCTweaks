var BCT_DEFAULT_SETTINGS = {
    "tailwag": true,
    "ArousalBar": true,
    "tailDesc": null,
};
var bctSettings = {};

const bctSettingsKey = () => `bctSettings.${Player?.AccountName}`;
async function bctSettingsLoad() {
    await waitFor(() => !!Player?.AccountName);
    let settings = JSON.parse(localStorage.getItem(bctSettingsKey()));
    if (settings) {
        bctSettings = settings;
    }
    else {
        bctSettings = BCT_DEFAULT_SETTINGS;
        bctSettingsSave();
    }
    Player.OnlineSettings.BCT = LZString.compressToBase64(JSON.stringify(bctSettings));
    ServerAccountUpdate.QueueData({
        OnlineSettings: Player.OnlineSettings,
    });

}
function bctSettingsSave() {
    localStorage.setItem(bctSettingsKey(),JSON.stringify(bctSettings));
}
bctSettingsLoad();
async function TailWagEmote() {

    await waitFor(() => ServerIsConnected && ServerSocket);
    
    var tailDefault = bctSettings.tailDesc ? bctSettings.tailDesc : {
        "strap1" : "FoxTailStrap1", // change based on tail type
        "strap2" : "FoxTailStrap2",
        "color1" : ["Default", "#6E0232"], // change color based on your own preference
        "color2" : ["Default", "#6E0232"],
        "count" : 10, // no. of tail wags
        "delay" : 500, // delay in ms
    };
    
    function TailWag()
    {
        let tailVariations = [tailDefault.strap2,tailDefault.strap1]; 
        let tailColor = [tailDefault.color2,tailDefault.color1];  
        let numberWags = parseInt(tailDefault.count);
        let delay = parseInt(tailDefault.delay);
        for(let i=0; i < numberWags; i++)
        {
            setTimeout(function() {
                InventoryWear(Player, tailVariations[i%tailVariations.length], "TailStraps", tailColor[i%tailColor.length]);
                ChatRoomCharacterItemUpdate(Player, "TailStraps");
            }, i * delay);
        }
    }
    var GetEmote = function(data) {
    if(data.Type === "Emote" && data.Sender === Player.MemberNumber){
        var message = data.Content;
        let patterns = [/wags.*tail/mi, /tail.*wagging/mi, /wagging.*tail/mi] ; // matches {<any> wags <any> tail <any>}
        let result = patterns.find(pattern => pattern.test(message));
        if(result){
        TailWag();
    }
    }
    };
    ServerSocket.on("ChatRoomMessage",GetEmote);
    
    function CommandTailChange(argsList)
	{
		let change = argsList[0];
		let changeto = argsList.slice(1);
        
        //console.log("change = "+ change, "changeto = "+ changeto);

        if (change === "current1") {
            strap = InventoryGet(Player,"TailStraps");
            tailDefault.strap1 = strap.Asset.Name;
            tailDefault.color1 = strap.Color;
        }
        else if (change === "current2") {
            strap = InventoryGet(Player,"TailStraps");
            tailDefault.strap2 = strap.Asset.Name;
            tailDefault.color2 = strap.Color;
        }
        else{
            tailDefault[change]? tailDefault[change] = changeto : console.log("Invalid Input");
        }
        bctSettings.tailDesc = tailDefault;
        bctSettingsSave();
	}

    CommandCombine([
		{
			Tag: 'tailchange',
			AutoComplete: args => {
				
			},
			Action: args => {
				CommandTailChange(args.split(" "));
			}
		}
	])

}
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

TailWagEmote();