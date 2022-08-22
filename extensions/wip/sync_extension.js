msgType = "Default";
BCT_VERSION = "0.1a";
bctSettings = {"hasOrgasmArousal" : true};

function sendSync(target = null) {
    const message = {
        Type: "Hidden",
        Content: "BCT_msg",
        Sender: Player.MemberNumber,
        Dictionary: [
            {
                message: {
                    type: msgType,
                    version: BCT_VERSION,
                    orgasmArousal: bctSettings.hasOrgasmArousal,
                    target: target,
                    test: "This is a test message",
                },
            },
        ],
    };
    ServerSend("ChatRoomChat", message);
}

async function parseSync(data) {
    await waitFor(() => ServerSocket && ServerIsConnected);
    if (data.Type === "Hidden" && data.Content === "BCT_msg") {
        const sender = Character.find((a) => a.MemberNumber === data.Sender);
        if (!sender) {
            return;
        }
        if (data.Dictionary[0].message) {
            let message = data.Dictionary[0].message;
            if (message.type === "Default") {
                // Do stuff here
                let getTest = message.test
                console.log(sender.Name)
                console.log(getTest);
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