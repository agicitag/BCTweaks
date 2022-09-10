var BCT_DEFAULT_SETTINGS = {
    "tailwag": true,
    "splitOrgasmArousal": true,
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