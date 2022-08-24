const modAPI = bcModSdk.registerMod('BCT', '0.1');


const BCT_VERSION = "0.1",
BCT_MSG = "bctMsg",
HIDDEN = "hidden",
BCT_MSG_ACTIVITY_AROUSAL_SYNC = "bctMsgActivityArousalSync",
BCT_MSG_INITILIZATION_SYNC = "bctMsgInitilizationSync"

Player.BCT = {};
Player.BCT.version = BCT_VERSION;
Player.BCT.bctSettings = {"splitArousalBar" : true};
Player.BCT.orgasmBar = {};
Player.BCT.orgasmBar.arousalProgress = 0;
Player.BCT.orgasmBar.arousalZoom = false;
Player.BCT.orgasmBar.ProgressTimer = 0;
Player.BCT.orgasmBar.vibrationLevel = 0;
Player.BCT.orgasmBar.changeTime = 0;

const bctInitilizationMessage = {
    Type: HIDDEN,
    Content: BCT_MSG,
    Sender: Player.MemberNumber,
    Dictionary: [
        {
            message: {
                type: BCT_MSG_INITILIZATION_SYNC,
                version: BCT_VERSION,
                bctSettings: Player.BCT.bctSettings,
                bctArousalProgress: Player.BCT.orgasmBar.arousalProgress,
                bctProgressTimer: Player.BCT.orgasmBar.ProgressTimer,
                target: null,
            },
        },
    ],
};

ServerSend("ChatRoomChat", bctInitilizationMessage);


async function parseSync(data) {
    await waitFor(() => ServerSocket && ServerIsConnected);
    if (data.Type === HIDDEN && data.Content === "BCT_MSG") {
        const sender = Character.find((a) => a.MemberNumber === data.Sender);
        if (!sender) {
            return;
        }
        if (data.Dictionary[0].message) {
            let message = data.Dictionary[0].message;
            if (message.type === BCT_MSG_INITILIZATION_SYNC) {
                sender.BCT = {};
                sender.BCT.version = message.bctVersion;
                sender.BCT.bctSettings = message.bctSetting;
                if(message.bctSettings["splitArousalBar"] === true){
                    sender.BCT.orgasmBar = {};
                    sender.BCT.orgasmBar.arousalProgress = message.bctArousalProgress;
                    sender.BCT.orgasmBar.ProgressTimer = message.bctProgressTimer;
                }
            }
            if (message.type === BCT_MSG_ACTIVITY_AROUSAL_SYNC) {
                // Do stuff here
                sender.BCT.version = message.bctVersion;
                sender.BCT.orgasmBar.arousalProgress = message.bctArousalProgress;
                sender.BCT.orgasmBar.ProgressTimer = message.bctProgressTimer;
            }
        }
    }    
}

ServerSocket.on("ChatRoomMessage",parseSync)
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