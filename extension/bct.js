const BCT_VERSION = "0.2.1";
const BCT_Settings_Version = 2;

async function runBCT(){
	
	await waitFor(() => ServerSocket && ServerIsConnected);
	
	// Bondage Club Mod Development Kit (1.0.2)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	var bcModSdk=function(){"use strict";const o="1.0.2";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const a=new Map,i=new Set;function d(o){i.has(o)||(i.add(o),console.warn(o))}function c(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||d(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}function s(o){const e=[],t=new Map,n=new Set;for(const r of u.values()){const a=r.patching.get(o.name);if(a){e.push(...a.hooks);for(const[e,i]of a.patches.entries())t.has(e)&&t.get(e)!==i&&d(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${i}`),t.set(e,i),n.add(r.name)}}return e.sort(((o,e)=>e.priority-o.priority)),{hooks:e,patches:t,patchesSources:n,final:c(o.original,t)}}function l(o,e=!1){let r=a.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const i=o.split(".");for(let t=0;t<i.length-1;t++)if(e=e[i[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${i.slice(0,t+1).join(".")} is not object`);const d=e[i[i.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${o} to be patched not found`);const c=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:o,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l)}),a.set(o,r),e[i[i.length-1]]=function(o){return function(...e){const t=o.precomputed,n=t.hooks,r=t.final;let a=0;const i=d=>{var c,s,l,f;if(a<n.length){const e=n[a];a++;const t=null===(s=(c=w.errorReporterHooks).hookEnter)||void 0===s?void 0:s.call(c,o.name,e.mod),r=e.hook(d,i);return null==t||t(),r}{const n=null===(f=(l=w.errorReporterHooks).hookChainExit)||void 0===f?void 0:f.call(l,o.name,t.patchesSources),a=r.apply(this,e);return null==n||n(),a}};return i(e)}}(r)}return r}function f(){const o=new Set;for(const e of u.values())for(const t of e.patching.keys())o.add(t);for(const e of a.keys())o.add(e);for(const e of o)l(e,!0)}function p(){const o=new Map;for(const[e,t]of a)o.set(e,{name:e,originalHash:t.originalHash,hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const u=new Map;function h(o){u.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),u.delete(o.name),o.loaded=!1}function g(o,t,r){"string"==typeof o&&o||e("Failed to register mod: Expected non-empty name string, got "+typeof o),"string"!=typeof t&&e(`Failed to register mod '${o}': Expected version string, got ${typeof t}`),r=!0===r;const a=u.get(o);a&&(a.allowReplace&&r||e(`Refusing to load mod '${o}': it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),h(a));const i=t=>{"string"==typeof t&&t||e(`Mod '${o}' failed to patch a function: Expected function name string, got ${typeof t}`);let n=c.patching.get(t);return n||(n={hooks:[],patches:new Map},c.patching.set(t,n)),n},d={unload:()=>h(c),hookFunction:(t,n,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);"number"!=typeof n&&e(`Mod '${o}' failed to hook function '${t}': Expected priority number, got ${typeof n}`),"function"!=typeof r&&e(`Mod '${o}' failed to hook function '${t}': Expected hook function, got ${typeof r}`);const d={mod:c.name,priority:n,hook:r};return a.hooks.push(d),f(),()=>{const o=a.hooks.indexOf(d);o>=0&&(a.hooks.splice(o,1),f())}},patchFunction:(t,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);n(r)||e(`Mod '${o}' failed to patch function '${t}': Expected patches object, got ${typeof r}`);for(const[n,i]of Object.entries(r))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod '${o}' failed to patch function '${t}': Invalid format of patch '${n}'`);f()},removePatches:o=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);i(o).patches.clear(),f()},callOriginal:(t,n,r)=>(c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`),"string"==typeof t&&t||e(`Mod '${o}' failed to call a function: Expected function name string, got ${typeof t}`),Array.isArray(n)||e(`Mod '${o}' failed to call a function: Expected args array, got ${typeof n}`),function(o,e,t=window){return l(o).original.apply(t,e)}(t,n,r)),getOriginalHash:t=>("string"==typeof t&&t||e(`Mod '${o}' failed to get hash: Expected function name string, got ${typeof t}`),l(t).originalHash)},c={name:o,version:t,allowReplace:r,api:d,loaded:!0,patching:new Map};return u.set(o,c),Object.freeze(d)}function m(){const o=[];for(const e of u.values())o.push({name:e.name,version:e.version});return o}let w;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:m,getPatchingInfo:p,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return w=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.0.2' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.0.2' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

	const modAPI = bcModSdk.registerMod('BCT', BCT_VERSION, false);
	
	const BCT_MSG = "bctMsg",
	BCT_BEEP = "bctBeep",
	HIDDEN = "Hidden", // Needs to be capital 'H' !
	BCT_MSG_ACTIVITY_AROUSAL_SYNC = "bctMsgActivityArousalSync",
	BCT_MSG_INITILIZATION_SYNC = "bctMsgInitilizationSync",
	BCT_MSG_SETTINGS_SYNC = "bctMsgSettingsSync"
	
	const bctSettingsKey = () => `bctSettings.${Player?.AccountName}`;

	const listeners = [];
	function registerSocketListener(event, listener) {
		if (!listeners.some((l) => l[1] === listener)) {
			listeners.push([event, listener]);
			ServerSocket.on(event, listener);
		}
	}	
	registerSocketListener("ChatRoomSync", () => {
		sendBctInitilization(true);
	});
	registerSocketListener("ChatRoomMessage", (data) => {
		parseMessage(data);
	});

	await bctSettingsLoad();
	splitOrgasmArousal()
	settingsPage();
	tailWagging();
	//send Initilization when pasted when already in a chatroom
	sendBctInitilization(true);
	
	async function bctSettingsLoad() {
		await waitFor(() => !!Player?.AccountName);

		const BCT_DEFAULT_SETTINGS = {
			splitOrgasmArousal: {
				value: false,
				shared: true
				// applySetting(){
				// 	Player.BCT.splitOrgasmArousal.enabled = this.value;
				// }
			},
			arousalProgressMultiplier: {
				value: 1.0,
				shared: true
			},
			arousalDecayMultiplier: {
				value: 1.0,
				shared: true
			},
			orgasmProgressMultiplier: {
				value: 1.0,
				shared: true
			},
			orgasmDecayMultiplier: {
				value: 1.0,
				shared: true
			},
			tailWaggingEnable: {
				value: false,
				shared: false
			},
			tailWaggingTailOneName: {
				value: "PuppyTailStrap1",
				shared: false
			},
			tailWaggingTailOneColor: {
				value: "#431A12",
				shared: false
			},
			tailWaggingTailTwoName: {
				value: "WolfTailStrap3",
				shared: false
			},
			tailWaggingTailTwoColor: {
				value: "#310D0C",
				shared: false
			},
			tailWaggingDelay: {
				value: 500,
				shared: false
			},
			tailWaggingCount: {
				value: 3,
				shared: false
			},
			menuButtonFixEnabled: {
				value: true,
				shared: false
			},

		};
		
		Player.BCT = {};
		Player.BCT.version = BCT_VERSION;
		Player.BCT.bctSettings = {};
		Player.BCT.bctSharedSettings = {};
		
		Player.BCT.splitOrgasmArousal = {};
		Player.BCT.splitOrgasmArousal.arousalProgress = 0;
		Player.BCT.splitOrgasmArousal.arousalZoom = false;
		Player.BCT.splitOrgasmArousal.ProgressTimer = 0;
		Player.BCT.splitOrgasmArousal.vibrationLevel = 0;
		Player.BCT.splitOrgasmArousal.changeTime = 0;

		//if settings are not already loaded
		if (!Object.keys(Player.BCT.bctSettings).length > 0){
			let settings = JSON.parse(localStorage.getItem(bctSettingsKey()));
			const bctOnlineSettings = JSON.parse(
				LZString.decompressFromBase64(Player.OnlineSettings.BCT) || null
			);		
			//if online settings are not an older version then local ones, use them instead
			if (
				bctOnlineSettings?.version >= settings?.version ||
				(typeof settings?.version === "undefined" &&
					typeof bctOnlineSettings?.version !== "undefined")
			) {
				settings = bctOnlineSettings;
			}

			//fill up missing settings with the default ones
			if(!settings) settings = {};
			for (const setting in BCT_DEFAULT_SETTINGS) {
				if (!Object.prototype.hasOwnProperty.call(BCT_DEFAULT_SETTINGS, setting)) {
					continue;
				}
				if (!(setting in settings)) {
					settings[setting] = BCT_DEFAULT_SETTINGS[setting];
				}
			}

			//if the version of the current settings is newer then the loaded ones, beep that bct got an update
			if (
				typeof settings.version === "undefined" ||
				settings.version < BCT_Settings_Version
			) {
				beepChangelog();
			}
			
			settings.version = BCT_Settings_Version;
			Player.BCT.bctSettings = settings;

			//shared settings
			for(setting in settings){
				if(settings[setting].shared === true){
					Player.BCT.bctSharedSettings[setting] = settings[setting];
				}
			}
			bctSettingsSave();
		}
	}
	
	function bctSettingsSave() {
		//local settings
		localStorage.setItem(bctSettingsKey(),JSON.stringify(Player.BCT.bctSettings));

		//online settings
		Player.OnlineSettings.BCT = LZString.compressToBase64(JSON.stringify(Player.BCT.bctSettings));
		ServerAccountUpdate.QueueData({
			OnlineSettings: Player.OnlineSettings,
		});

		for(setting in Player.BCT.bctSettings){
			//shared settings
			if(Player.BCT.bctSettings[setting].shared === true){
				Player.BCT.bctSharedSettings[setting] = Player.BCT.bctSettings[setting];
			}
			//apply settings
			if(Player.BCT.bctSettings[setting].applySetting){
				Player.BCT.bctSettings[setting].applySetting();
			}
		}

		//send new shared Settings
		const bctSettingsMessage = {
			Type: HIDDEN,
			Content: BCT_MSG,
			Sender: Player.MemberNumber,
			Dictionary: [
				{
					message: {
						type: BCT_MSG_SETTINGS_SYNC,
						bctVersion: BCT_VERSION,
						bctSettings: Player.BCT.bctSharedSettings,
						target: null,
					},
				},
			],
		};
		
		ServerSend("ChatRoomChat", bctSettingsMessage);
	}

	async function beepChangelog() {
		await waitFor(() => !!Player?.AccountName);
		await sleep(5000);
		bctBeepNotify("BCT Changelog", "BCT got updated.");
	}

	function bctBeepNotify (title, text){
		modAPI.callOriginal("ServerAccountBeep", [
			{
				MemberNumber: Player.MemberNumber,
				MemberName: "BCT",
				ChatRoomName: title,
				Private: true,
				Message: text,
				ChatRoomSpace: "",
			},
		]);
	}

	function sendBctInitilization(requestReply){
		const bctInitilizationMessage = {
			Type: HIDDEN,
			Content: BCT_MSG,
			Sender: Player.MemberNumber,
			Dictionary: [
				{
					message: {
						type: BCT_MSG_INITILIZATION_SYNC,
						bctVersion: BCT_VERSION,
						bctSettings: Player.BCT.bctSharedSettings,
						bctArousalProgress: Player.BCT.splitOrgasmArousal.arousalProgress,
						bctProgressTimer: Player.BCT.splitOrgasmArousal.ProgressTimer,
						target: null,
						replyRequested: requestReply
					},
				},
			],
		};
		
		ServerSend("ChatRoomChat", bctInitilizationMessage);
	}
	
	async function parseMessage(data) {
		await waitFor(() => ServerSocket && ServerIsConnected);
		if (data.Type === HIDDEN && data.Content === BCT_MSG) {
			const sender = Character.find((a) => a.MemberNumber === data.Sender);
			if (!sender) {
				return;
			}
			if(sender.ID != 0){
				if (data.Dictionary[0].message) {
					let message = data.Dictionary[0].message;
					try {
						switch(message.type){
							case BCT_MSG_INITILIZATION_SYNC:
								sender.BCT = {};
								sender.BCT.version = message.bctVersion;
								sender.BCT.bctSettings = message.bctSettings;
								sender.BCT.splitOrgasmArousal = {};
								sender.BCT.splitOrgasmArousal.arousalProgress = message.bctArousalProgress;
								sender.BCT.splitOrgasmArousal.ProgressTimer = message.bctProgressTimer;						
								if(message.replyRequested)	sendBctInitilization(false);
								break;
							case BCT_MSG_ACTIVITY_AROUSAL_SYNC:
								sender.BCT.version = message.bctVersion;
								sender.BCT.splitOrgasmArousal.arousalProgress = message.bctArousalProgress;
								sender.BCT.splitOrgasmArousal.ProgressTimer = message.bctProgressTimer;
								break;
							case BCT_MSG_SETTINGS_SYNC:
								sender.BCT.version = message.bctVersion;
								sender.BCT.bctSettings = message.bctSettings;
								break;
							default:
								console.log("Unidentified BCT message:");
								console.log(message);
						}
		
					} catch (error) {
						console.error("Error parsing BCT Message from: "  + sender.Name + ".");
						console.log(error);
					}
				}
			}
		}    
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
	
	
	//Settings Page
	async function settingsPage() {
		await waitFor(() => !!PreferenceSubscreenList);

		const bctSettingsCategories = [
			"BCTArousal",
			"BCTTailwag",
			"BCTTweaks",
		];
		const bctSettingCategoryLabels = {
			BCTArousal: "Arousal Bar",
			BCTTailwag: "Tail Wagging",
			BCTTweaks: "Tweaks",
		};

		// keep same position in menu
		PreferenceSubscreenList.splice(13, 0 ,"BCTSettings");

		modAPI.hookFunction("TextGet", 2, (args, next) => {
			if(args[0] == "HomepageBCTSettings") return "BCT Settings";
			else return next(args);
		});

		modAPI.hookFunction("DrawButton", 2, (args, next) => {
			// 7th argument is the image url
			if(args[6] == "Icons/BCTSettings.png") args[6] = IMAGES.LOGO;
			return next(args);
		});

		PreferenceSubscreenBCTSettingsLoad = function () {
			currentPageNumber = 0;
		};

		PreferenceSubscreenBCTSettingsRun = function () {
			
			// Draw the player & controls
			DrawCharacter(Player, 50, 50, 0.9);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
			MainCanvas.textAlign = "left";
			DrawText("- Bondage Club Tools Settings -",	500, 125, "Black", "Gray");
			MainCanvas.textAlign = "center";
			
			if (PreferenceMessage != "") DrawText(PreferenceMessage, 865, 125, "Red", "Black");
			
			// Draw all the buttons to access the submenus
			for (let A = 0; A < bctSettingsCategories.length; A++) {
				ControllerIgnoreButton = true;
				//DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "Icons/" + bctSettingsCategories[A] + ".png");
				DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "Icons/Arcade.png");
				ControllerIgnoreButton = false;
				DrawTextFit(bctSettingCategoryLabels[bctSettingsCategories[A]], 745 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7), 310, "Black");
				if (ControllerActive == true) {
					setButton(745 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7));
				}
			}
		};
		
		PreferenceSubscreenBCTSettingsClick = function () {
			
			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();
			
			// Open the selected subscreen
			for (let A = 0; A < bctSettingsCategories.length; A++){
				if (MouseIn(500 + 500 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90)) {
					if (typeof window["PreferenceSubscreen" + bctSettingsCategories[A] + "Load"] === "function")
					CommonDynamicFunction("PreferenceSubscreen" + bctSettingsCategories[A] + "Load()");
					PreferenceSubscreen = bctSettingsCategories[A];
					PreferencePageCurrent = 1;
					break;
				}
			}
		}
		
		PreferenceSubscreenBCTSettingsExit = function () {
			bctSettingsSave();
			PreferenceSubscreen = "";
			PreferenceMessage = "";
		};

		PreferenceSubscreenBCTArousalLoad = function () {
			ElementCreateInput("InputArousalProgressMultiplier", "text", Player.BCT.bctSettings.arousalProgressMultiplier.value, "100");
			ElementCreateInput("InputOrgasmProgressMultiplier", "text", Player.BCT.bctSettings.orgasmProgressMultiplier.value, "100");
			ElementCreateInput("InputArousalDecayMultiplier", "text", Player.BCT.bctSettings.arousalDecayMultiplier.value, "100");
			ElementCreateInput("InputOrgasmDecayMultiplier", "text", Player.BCT.bctSettings.orgasmDecayMultiplier.value, "100");
		}

		PreferenceSubscreenBCTArousalRun = function () {
			// Draw the player & controls
			DrawCharacter(Player, 50, 50, 0.9);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");

			if (PreferenceMessage != "") DrawText(PreferenceMessage, 900, 125, "Red", "Black");

			MainCanvas.textAlign = "left";
			DrawText("- Arousal Bar Settings -", 500, 125, "Black", "Gray");
			DrawText("Arousal Progress Multiplier:", 500, 225, "Black", "Gray");
			ElementPosition("InputArousalProgressMultiplier", 1050, 212, 200);
			DrawText("Orgasm Progress Multiplier:", 500, 300, "Black", "Gray");
			ElementPosition("InputOrgasmProgressMultiplier", 1050, 287, 200);
			DrawText("Arousal Decay Multiplier:", 500, 375, "Black", "Gray");
			ElementPosition("InputArousalDecayMultiplier", 1050, 362, 200);
			DrawText("Orgasm Decay Multiplier:", 500, 450, "Black", "Gray");
			ElementPosition("InputOrgasmDecayMultiplier", 1050, 437, 200);
			DrawCheckbox(500, 525, 64, 64, "Split Arousal Bar", Player.BCT.bctSettings.splitOrgasmArousal.value);

		}

		PreferenceSubscreenBCTArousalClick = function () {
			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();

			//Checkboxes
			if (MouseIn(500, 525, 64, 64)) Player.BCT.bctSettings.splitOrgasmArousal.value = !Player.BCT.bctSettings.splitOrgasmArousal.value;

		}

		PreferenceSubscreenBCTArousalExit = function () {
			if(CommonIsNumeric(ElementValue("InputArousalProgressMultiplier"))
				&& CommonIsNumeric(ElementValue("InputOrgasmProgressMultiplier"))
				&& CommonIsNumeric(ElementValue("InputArousalDecayMultiplier"))
				&& CommonIsNumeric(ElementValue("InputOrgasmDecayMultiplier"))){
				Player.BCT.bctSettings.arousalProgressMultiplier.value = ElementValue("InputArousalProgressMultiplier");
				Player.BCT.bctSettings.orgasmProgressMultiplier.value = ElementValue("InputOrgasmProgressMultiplier");
				Player.BCT.bctSettings.arousalDecayMultiplier.value = ElementValue("InputArousalDecayMultiplier");
				Player.BCT.bctSettings.orgasmDecayMultiplier.value = ElementValue("InputOrgasmDecayMultiplier");
				ElementRemove("InputArousalProgressMultiplier");
				ElementRemove("InputOrgasmProgressMultiplier");
				ElementRemove("InputArousalDecayMultiplier");
				ElementRemove("InputOrgasmDecayMultiplier");
				PreferenceSubscreen = "BCTSettings";
				PreferenceMessage = "";
			}
			else PreferenceMessage = "Put a valid number"
		};

		PreferenceSubscreenBCTTailwagLoad = function () {
			ElementCreateInput("InputTailWaggingCount", "text", Player.BCT.bctSettings.tailWaggingCount.value, "100");
			ElementCreateInput("InputTailWaggingDelay", "text", Player.BCT.bctSettings.tailWaggingDelay.value, "100");
		}

		PreferenceSubscreenBCTTailwagRun = function () {
			// Draw the player & controls
			DrawCharacter(Player, 50, 50, 0.9);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");

			if (PreferenceMessage != "") DrawText(PreferenceMessage, 1100, 125, "Red", "Black");

			MainCanvas.textAlign = "left";
			DrawText("- Tail Wagging Settings -", 500, 125, "Black", "Gray");
			DrawCheckbox(500, 200, 64, 64, "Enable Tail Wagging", Player.BCT.bctSettings.tailWaggingEnable.value);

			DrawText("Number Tail Wags:", 500, 450, "Black", "Gray");
			ElementPosition("InputTailWaggingCount", 1100, 437, 200);
			DrawText("Tail Wagging Delay (in ms):", 500, 525, "Black", "Gray");
			ElementPosition("InputTailWaggingDelay", 1100, 512, 200);

			MainCanvas.textAlign = "center";
			DrawButton(500, 275, 250, 64, "Update Main Tail", "White", "");
			DrawButton(500, 350, 250, 64, "Update Secondary Tail", "White", "");

		}

		PreferenceSubscreenBCTTailwagClick = function () {
			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();

			// Checkboxes
			if (MouseIn(500, 200, 64, 64)) Player.BCT.bctSettings.tailWaggingEnable.value = !Player.BCT.bctSettings.tailWaggingEnable.value;

			// Boxes
			if (MouseIn(500, 275, 250, 64)){
				if(!InventoryGet(Player,"TailStraps")){
					PreferenceMessage = "No Tail Equipped"
				}
				else{
					Player.BCT.bctSettings.tailWaggingTailOneName.value = InventoryGet(Player,"TailStraps").Asset.Name;
					Player.BCT.bctSettings.tailWaggingTailOneColor.value = InventoryGet(Player,"TailStraps").Color;		
				}
			}
			if (MouseIn(500, 350, 250, 64)){
				if(!InventoryGet(Player,"TailStraps")){
					PreferenceMessage = "No Tail Equipped"
				}
				else{
					Player.BCT.bctSettings.tailWaggingTailTwoName.value = InventoryGet(Player,"TailStraps").Asset.Name;
					Player.BCT.bctSettings.tailWaggingTailTwoColor.value = InventoryGet(Player,"TailStraps").Color;	
				}
			}
		}

		PreferenceSubscreenBCTTailwagExit = function () {
			if(CommonIsNumeric(ElementValue("InputTailWaggingCount"))
				&& CommonIsNumeric(ElementValue("InputTailWaggingDelay"))){
				Player.BCT.bctSettings.tailWaggingCount.value = parseInt(ElementValue("InputTailWaggingCount"));
				Player.BCT.bctSettings.tailWaggingDelay.value = parseInt(ElementValue("InputTailWaggingDelay"));
				ElementRemove("InputTailWaggingCount");
				ElementRemove("InputTailWaggingDelay");
				PreferenceSubscreen = "BCTSettings";
				PreferenceMessage = "";
			}
			else PreferenceMessage = "Put a valid number"
		};

		PreferenceSubscreenBCTTweaksLoad = function () {

		}

		PreferenceSubscreenBCTTweaksRun = function () {
			// Draw the player & controls
			DrawCharacter(Player, 50, 50, 0.9);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
			
			if (PreferenceMessage != "") DrawText(PreferenceMessage, 1100, 125, "Red", "Black");

			MainCanvas.textAlign = "left";
			DrawText("- Tweaks Settings -", 500, 125, "Black", "Gray");

			DrawCheckbox(500, 200, 64, 64, "Enable Menu Button Hitbox Fix", Player.BCT.bctSettings.menuButtonFixEnabled.value);


		}

		PreferenceSubscreenBCTTweaksClick = function () {
			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();

			if (MouseIn(500, 200, 64, 64)) Player.BCT.bctSettings.menuButtonFixEnabled.value = !Player.BCT.bctSettings.menuButtonFixEnabled.value;

		}

		PreferenceSubscreenBCTTweaksExit = function () {
			PreferenceSubscreen = "BCTSettings";
			PreferenceMessage = "";
		};
	}

	//fix wrong settings button hitboxes (changed 500 to 420)
	modAPI.hookFunction("PreferenceClick", 2, (args, next) => {
		if(Player.BCT.bctSettings.menuButtonFixEnabled.value === true){
			if (ControllerActive == true) {
				ClearButtons();
			}
			// Pass the click into the opened subscreen
			if (PreferenceSubscreen != "") return CommonDynamicFunction("PreferenceSubscreen" + PreferenceSubscreen + "Click()");

			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();

			// Open the selected subscreen
			for (let A = 0; A < PreferenceSubscreenList.length; A++){
				if (MouseIn(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90)) {
					if (typeof window["PreferenceSubscreen" + PreferenceSubscreenList[A] + "Load"] === "function")
						CommonDynamicFunction("PreferenceSubscreen" + PreferenceSubscreenList[A] + "Load()");
					PreferenceSubscreen = PreferenceSubscreenList[A];
					PreferencePageCurrent = 1;
					break;
				}
			}
		}
		else{
			next(args);
		}
	});

	//Bar Splitter
	function splitOrgasmArousal(){

		function ActivityChatRoomBCTArousalSync(C) {
			if ((C.ID == 0) && (CurrentScreen == "ChatRoom")){
				const message = {
					Type: HIDDEN,
					Content: BCT_MSG,
					Sender: Player.MemberNumber,
					Dictionary: [
						{
							message: {
								type: BCT_MSG_ACTIVITY_AROUSAL_SYNC,
								bctVersion: BCT_VERSION,
								bctArousalProgress: C.BCT.splitOrgasmArousal.arousalProgress,
								bctProgressTimer: C.BCT.splitOrgasmArousal.ProgressTimer,
								target: null,
							},
						},
					],
				};

				ServerSend("ChatRoomChat", message);
			}
		}

		function ActivitySetBCTArousal(C, Progress) {
			if(C.BCT != null){
				if ((C.BCT.splitOrgasmArousal.arousalProgress == null) || (typeof C.BCT.splitOrgasmArousal.arousalProgress !== "number") || isNaN(C.BCT.splitOrgasmArousal.arousalProgress)) C.BCT.splitOrgasmArousal.arousalProgress = 0;
				if ((Progress == null) || (Progress < 0)) Progress = 0;
				if (Progress > 100) Progress = 100;
				if (C.BCT.splitOrgasmArousal.arousalProgress != Progress) {
					C.BCT.splitOrgasmArousal.arousalProgress = Progress;
					C.BCT.splitOrgasmArousal.arousalProgressTimer = 0;
					ActivityChatRoomBCTArousalSync(C);
				}
			}
		}

		function BCTActivityTimerProgress(C, Progress) {
			if(C.BCT != null){
				// Changes the current arousal progress value
				C.BCT.splitOrgasmArousal.arousalProgress = C.BCT.splitOrgasmArousal.arousalProgress + Progress;
				// Decrease the vibratorlevel to 0 if not being aroused, while also updating the change time to reset the vibrator animation
				if (Progress < 0) {
					if (C.BCT.splitOrgasmArousal.vibrationLevel != 0) {
						C.BCT.splitOrgasmArousal.vibrationLevel = 0;
						C.BCT.splitOrgasmArousal.changeTime = CommonTime();
					}
				}

				if (C.BCT.splitOrgasmArousal.arousalProgress < 0) C.BCT.splitOrgasmArousal.arousalProgress = 0;
				if (C.BCT.splitOrgasmArousal.arousalProgress > 100) C.BCT.splitOrgasmArousal.arousalProgress = 100;

				// Update the recent change time, so that on other player's screens the character's arousal meter will vibrate again when vibes start
				if (C.BCT.splitOrgasmArousal.arousalProgress == 0) {
					C.BCT.splitOrgasmArousal.changeTime = CommonTime();
				}
			}

		}

		function BCTActivityVibratorLevel(C, Level) {
			if (C.BCT != null) {
				if (C.BCT.splitOrgasmArousal != null) {
					if (Level != C.BCT.splitOrgasmArousal.vibrationLevel) {
						C.BCT.splitOrgasmArousal.vibrationLevel = Level;
						C.BCT.splitOrgasmArousal.changeTime = CommonTime();
					}
				}
			}
		}

		function DrawBCTArousalMeter(C, X, Y, Zoom) {
			if(C.BCT != null){
				Y = Y + 125 * Zoom;
				if (ActivityAllowed() && PreferenceArousalAtLeast(C, "Manual"))
					if (C.ID == 0 || (C.ArousalSettings.Visible == "Access" && C.AllowItem) || C.ArousalSettings.Visible == "All")
						if (C.ID == 0 || (Player.ArousalSettings.ShowOtherMeter == null) || Player.ArousalSettings.ShowOtherMeter) {
							ActivitySetBCTArousal(C, C.BCT.splitOrgasmArousal.arousalProgress);
							if (Player.ArousalSettings.VFX != "VFXInactive" && C.BCT.splitOrgasmArousal.arousalProgress > 0 && PreferenceArousalAtLeast(C, "Hybrid")) {
								let Progress = 0;
								if (!(C.BCT.splitOrgasmArousal.vibrationLevel == null || typeof C.BCT.splitOrgasmArousal.vibrationLevel !== "number" || isNaN(C.ArousalSettings.VibratorLevel))) {
									Progress = C.BCT.splitOrgasmArousal.vibrationLevel;
								}

								if (Progress > 0) { // -1 is disabled
									const animationTimeMax = 5000; // 5 seconds
									const animationTimeLeft = Math.min(C.BCT.splitOrgasmArousal.changeTime - CommonTime(), 0) + animationTimeMax;

									DrawArousalGlow(
										X + (C.BCT.splitOrgasmArousal.arousalZoom ? 50 : 90) * Zoom,
										Y + (C.BCT.splitOrgasmArousal.arousalZoom ? 200 : 400) * Zoom,
										C.BCT.splitOrgasmArousal.arousalZoom ? Zoom : Zoom * 0.2,
										Progress,
										Player.ArousalSettings.VFX == "VFXAnimated" || (Player.ArousalSettings.VFX == "VFXAnimatedTemp" && C.BCT.splitOrgasmArousal.changeTime != null && animationTimeLeft > 0),
										Math.max(0, animationTimeLeft / animationTimeMax),
										C.ArousalSettings.OrgasmTimer != null && typeof C.ArousalSettings.OrgasmTimer === "number" && !isNaN(C.ArousalSettings.OrgasmTimer) && C.ArousalSettings.OrgasmTimer > 0);
								}
							}

							DrawBCTArousalThermometer(
								X + (C.BCT.splitOrgasmArousal.arousalZoom ? 50 : 90) * Zoom,
								Y + (C.BCT.splitOrgasmArousal.arousalZoom ? 200 : 400) * Zoom,
								C.BCT.splitOrgasmArousal.arousalZoom ? Zoom : Zoom * 0.2,
								C.BCT.splitOrgasmArousal.arousalProgress,
								PreferenceArousalAtLeast(C, "Automatic"),
								C.ArousalSettings.OrgasmTimer != null && typeof C.ArousalSettings.OrgasmTimer === "number" && !isNaN(C.ArousalSettings.OrgasmTimer) && C.ArousalSettings.OrgasmTimer > 0);

						}
				}
		}

		function DrawBCTArousalThermometer(X, Y, Zoom, Progress, Automatic, Orgasm) {
			//BCT Arousal Meter png
			DrawImageZoomCanvas(IMAGES.AROUSAL_THERMOMETER, MainCanvas, 0, 0, 100, 500, X, Y, 100 * Zoom, 500 * Zoom);
			//DrawImageZoomCanvas("Screens/Character/Player/ArousalMeter" + (Orgasm ? "Orgasm" : "") + (Automatic ? "Automatic" : "") + ".png", MainCanvas, 0, 0, 100, 500, X, Y, 100 * Zoom, 500 * Zoom);
			if ((Progress > 0) && !Orgasm) DrawRect(X + (30 * Zoom), Y + (15 * Zoom) + (Math.round((100 - Progress) * 4 * Zoom)), (40 * Zoom), (Math.round(Progress * 4 * Zoom)), "#F430C0");
		}

		modAPI.hookFunction('ActivityOrgasmStart', 2, (args, next) => {
			let C = args[0];
			try {
				if(C.BCT != null){
					if(C.BCT.bctSettings.splitOrgasmArousal.value === true){
						if (!ActivityOrgasmRuined) {
							C.BCT.splitOrgasmArousal.arousalProgress = C.BCT.splitOrgasmArousal.arousalProgress * 0.6;
						}
						if ((C.ID == 0) && (CurrentScreen == "ChatRoom")){
							ActivityChatRoomBCTArousalSync(C);
						}
					}
				}				
			} catch (error) {
				console.error("Error handling orgasm for character: " + C.Name + ".");
				// console.log(error);
			}
			next(args);
		});

		modAPI.hookFunction('ActivitySetArousalTimer', 2, (args, next) => {
			let C = args[0];

			if(C.BCT != null){
				try {
					if(C.BCT.bctSettings.splitOrgasmArousal.value === true){
						let Activity = args[1];
						let Zone = args[2];
						let Progress = args[3];
	
						//Arousal Progress Multiplier
						Progress = Progress * C.BCT.bctSettings.arousalProgressMultiplier.value;
						
						// If there's already a progress timer running, we add it's value but divide it by 2 to lessen the impact, the progress must be between -25 and 25
						if ((C.BCT.splitOrgasmArousal.ProgressTimer == null) || (typeof C.BCT.splitOrgasmArousal.ProgressTimer !== "number") || isNaN(C.BCT.splitOrgasmArousal.ProgressTimer)) C.BCT.splitOrgasmArousal.ProgressTimer = 0;
						Progress = Math.round((C.BCT.splitOrgasmArousal.ProgressTimer / 2) + Progress);
						if (Progress < -25) Progress = -25;
						if (Progress > 25) Progress = 25;
	
						// Limit max arousal values
						var Max = ((Activity == null || Activity.MaxProgress == null) || (Activity.MaxProgress > 100)) ? 100 : Activity.MaxProgress;
						//if ((Max > 95) && !PreferenceGetZoneOrgasm(C, Zone)) Max = 95;
						//if ((Max > 67) && (Zone == "ActivityOnOther")) Max = 67;
						if ((Progress > 0) && (C.BCT.splitOrgasmArousal.arousalProgress + Progress > Max)) Progress = (Max - C.BCT.splitOrgasmArousal.arousalProgress >= 0) ? Max - C.BCT.splitOrgasmArousal.arousalProgress : 0;
	
						// If we must apply a progress timer change, we publish it
						if (C.BCT.splitOrgasmArousal.ProgressTimer !== Progress) {
							C.BCT.splitOrgasmArousal.ProgressTimer = Progress;
							ActivityChatRoomBCTArousalSync(C);
						}
					}
					args[3] = args[3] * C.BCT.bctSettings.orgasmProgressMultiplier.value;		
				} catch (error) {
					console.error("Error setting arousal timer for character: " + C.Name + ".");
					// console.log(error);
				}
			}
			//only let the orgasm bar progress if its and orgasm zone
			try {
				if(!C.BCT || PreferenceGetZoneOrgasm(C, args[2]) || C.BCT.bctSettings.splitOrgasmArousal.value === false){
					next(args);
				}
			} catch (error) {
				next(args);
			}

		});

		modAPI.hookFunction('ChatRoomClickCharacter', 2, (args, next) => {
			let C = args[0];
			try {
				if(C.BCT != null && C.BCT.bctSettings.splitOrgasmArousal.value === true){
					let CharX = args[1];
					let CharY = args[2];
					let Zoom = args[3];
					let ClickX = args[4];
					let ClickY = args[5];
					let Pos = args[6];
					// Handle clicks on the BCT arousal bar only if the BC arousal bar is not zoomed
					if(!C.ArousalZoom){
						let zoneMovement = 125 * Zoom;
						// If the arousal meter is shown for that character, we can interact with it
						if (PreferenceArousalAtLeast(C, "Manual")) {
							let MeterShow = C.ID === 0;
							if (C.ID !== 0 && Player.ArousalSettings.ShowOtherMeter && C.ArousalSettings) {
								if (C.ArousalSettings.Visible === "Access") {
									MeterShow = C.AllowItem;
								} else if (C.ArousalSettings.Visible === "All") {
									MeterShow = true;
								}
							}
							if (MeterShow) {
								// The arousal meter can be maximized or minimized by clicking on it
								if (MouseIn(CharX + 60 * Zoom, CharY + 400 * Zoom + zoneMovement, 80 * Zoom, 100 * Zoom) && !C.BCT.splitOrgasmArousal.arousalZoom) { C.BCT.splitOrgasmArousal.arousalZoom = true; return; }
								if (MouseIn(CharX + 50 * Zoom, CharY + 615 * Zoom + zoneMovement, 100 * Zoom, 85 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) { C.BCT.splitOrgasmArousal.arousalZoom = false; return; }
	
								// If the player can manually control her arousal, we set the progress manual
								if (C.ID === 0 && MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom + zoneMovement, 100 * Zoom, 500 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) {
									if (PreferenceArousalAtLeast(Player, "Manual") && !PreferenceArousalAtLeast(Player, "Automatic")) {
										var Arousal = Math.round((CharY + 625 * Zoom + zoneMovement - MouseY) / (4 * Zoom));
										ActivitySetBCTArousal(Player, Arousal);
									}
									return;
								}
	
								// Don't do anything if the thermometer is clicked without access to it
								if (MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom + zoneMovement, 100 * Zoom, 415 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) return;
							}
						}
					}
				}			
			} catch (error) {
				console.error("Error handling character click for character: " + C.Name);
				// console.log(error);
			}

			//call the rest of the function
			next(args);
		});


		modAPI.hookFunction('DrawArousalMeter', 2, (args, next) => {
			try {
				if(	!args[0].BCT
					|| args[0].BCT.bctSettings.splitOrgasmArousal.value === false
					|| !args[0].BCT.splitOrgasmArousal.arousalZoom){
					next(args[0], args[1], args[2], args[3]);
				}
				if(!args[0].ArousalZoom && args[0].BCT != null && args[0].BCT.bctSettings.splitOrgasmArousal.value === true){
					DrawBCTArousalMeter(args[0], args[1], args[2], args[3]);
				}
			} catch (error) {
				console.error("Error drawing arousal meter for character: " + args[0].Name + ".");
				// console.log(error);
				next(args[0], args[1], args[2], args[3]);
			}
		});

		var BCTTimerLastArousalProgress = 0;
		var BCTTimerLastArousalProgressCount = 0;
		var BCTTimerLastArousalDecay = 0;

		modAPI.hookFunction('TimerProcess', 2, (args, next) => {
			if (ActivityAllowed()) {
				// Arousal can change every second, based on ProgressTimer
				if ((BCTTimerLastArousalProgress + 1000 < CurrentTime) || (BCTTimerLastArousalProgress - 1000 > CurrentTime)) {
					BCTTimerLastArousalProgress = CurrentTime;
					BCTTimerLastArousalProgressCount++;
					for (let C = 0; C < Character.length; C++) {				
						try {
							if(Character[C].BCT != null && Character[C].BCT.bctSettings.splitOrgasmArousal.value === true){
								// Depending on the character settings, we progress the arousal meter
								if (PreferenceArousalAtLeast(Character[C], "Hybrid")) {
									// Activity impacts the progress slowly over time, if there's an activity running, vibrations are ignored
									if ((Character[C].BCT.splitOrgasmArousal.ProgressTimer != null) && (typeof Character[C].BCT.splitOrgasmArousal.ProgressTimer === "number") && !isNaN(Character[C].BCT.splitOrgasmArousal.ProgressTimer) && (Character[C].BCT.splitOrgasmArousal.ProgressTimer != 0)) {
										if (Character[C].BCT.splitOrgasmArousal.ProgressTimer < 0) {
											Character[C].BCT.splitOrgasmArousal.ProgressTimer = 0;
											
											BCTActivityTimerProgress(Character[C], -1);
											BCTActivityVibratorLevel(Character[C], 0);																
										}
										else {
											Character[C].BCT.splitOrgasmArousal.ProgressTimer--;
											
											BCTActivityTimerProgress(Character[C], 1);								
											BCTActivityVibratorLevel(Character[C], 4);
										}
									} else if (Character[C].IsEgged()) {
	
										// If the character is egged, we find the highest intensity factor and affect the progress, low and medium vibrations have a cap
										let Factor = -1;
										for (let A = 0; A < Character[C].Appearance.length; A++) {
											let Item = Character[C].Appearance[A];
											let ZoneFactor = PreferenceGetZoneFactor(Character[C], Item.Asset.ArousalZone) - 2;
											if (InventoryItemHasEffect(Item, "Egged", true) && (Item.Property != null) && (Item.Property.Intensity != null) && (typeof Item.Property.Intensity === "number") && !isNaN(Item.Property.Intensity) && (Item.Property.Intensity >= 0) && (ZoneFactor >= 0) && (Item.Property.Intensity + ZoneFactor > Factor)){
												Factor = Item.Property.Intensity + ZoneFactor;
											}
										}
	
										// Adds the fetish value to the factor
										if (Factor >= 0) {
											var Fetish = ActivityFetishFactor(Character[C]);
											if (Fetish > 0) Factor = Factor + Math.ceil(Fetish / 3);
											if (Fetish < 0) Factor = Factor + Math.floor(Fetish / 3);
										}
	
										// Kicks the arousal timer faster from personal arousal
										if ((Factor >= 4)) {BCTActivityVibratorLevel(Character[C], 4); if (BCTTimerLastArousalProgressCount % 2 == 0)BCTActivityTimerProgress(Character[C], 1);}
										if ((Factor == 3)) {BCTActivityVibratorLevel(Character[C], 3); if (BCTTimerLastArousalProgressCount % 3 == 0) BCTActivityTimerProgress(Character[C], 1);}
										if ((Factor == 2)) {BCTActivityVibratorLevel(Character[C], 2); if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 95 && BCTTimerLastArousalProgressCount % 4 == 0) BCTActivityTimerProgress(Character[C], 1);}
										if ((Factor == 1)) {BCTActivityVibratorLevel(Character[C], 1); if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 65 && BCTTimerLastArousalProgressCount % 6 == 0) BCTActivityTimerProgress(Character[C], 1);}
										if ((Factor == 0)) {BCTActivityVibratorLevel(Character[C], 1); if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 35 && BCTTimerLastArousalProgressCount % 8 == 0) BCTActivityTimerProgress(Character[C], 1);}
										if ((Factor == -1)) {BCTActivityVibratorLevel(Character[C], 0);}
	
									}
								} else {
									BCTActivityVibratorLevel(Character[C], 0);
								}
							}
						} catch (error) {
							console.error("Error handling timer tick for character: " + Character[C].Name + ".");
							// console.log(error);
						}		
					}
				}

				// Arousal decays by 1 naturally every 12 seconds, unless there's already a natural progression from an activity
				if ((BCTTimerLastArousalDecay + 12000 < CurrentTime) || (BCTTimerLastArousalDecay - 12000 > CurrentTime)) {
					BCTTimerLastArousalDecay = CurrentTime;
					for (let C = 0; C < Character.length; C++){
						try {
							if(Character[C].BCT != null){
								if (PreferenceArousalAtLeast(Character[C], "Hybrid")){
									// If the character is egged, we find the highest intensity factor
									let Factor = -1;
									for (let A = 0; A < Character[C].Appearance.length; A++) {
										let Item = Character[C].Appearance[A];
										let ZoneFactor = PreferenceGetZoneFactor(Character[C], Item.Asset.ArousalZone) - 2;
										if (InventoryItemHasEffect(Item, "Egged", true) && (Item.Property != null) && (Item.Property.Intensity != null) && (typeof Item.Property.Intensity === "number") && !isNaN(Item.Property.Intensity) && (Item.Property.Intensity >= 0) && (ZoneFactor >= 0) && (Item.Property.Intensity + ZoneFactor > Factor))
											Factor = Item.Property.Intensity + ZoneFactor;
									}
									if(Character[C].BCT.bctSettings.splitOrgasmArousal.value === true){
										if ((Character[C].BCT.splitOrgasmArousal.arousalProgress != null) && (typeof Character[C].BCT.splitOrgasmArousal.arousalProgress === "number") && !isNaN(Character[C].BCT.splitOrgasmArousal.arousalProgress) && (Character[C].BCT.splitOrgasmArousal.arousalProgress > 0)) {
											if ((Character[C].BCT.splitOrgasmArousal.ProgressTimer == null) || (typeof Character[C].BCT.splitOrgasmArousal.ProgressTimer !== "number") || isNaN(Character[C].BCT.splitOrgasmArousal.ProgressTimer) || (Character[C].BCT.splitOrgasmArousal.ProgressTimer == 0)) {
												// No arousal decay if there's a vibrating item running
												if (Factor < 0) BCTActivityTimerProgress(Character[C], -1 * Character[C].BCT.bctSettings.arousalDecayMultiplier.value);
											}
										}
									}
									// No orgasm decay if there's a vibrating item running
									if ((Character[C].ArousalSettings.Progress != null) && (typeof Character[C].ArousalSettings.Progress === "number") && !isNaN(Character[C].ArousalSettings.Progress) && (Character[C].ArousalSettings.Progress > 0)) {
										if ((Character[C].ArousalSettings.ProgressTimer == null) || (typeof Character[C].ArousalSettings.ProgressTimer !== "number") || isNaN(Character[C].ArousalSettings.ProgressTimer) || (Character[C].ArousalSettings.ProgressTimer == 0)) {
											// If BCE's alternate arousal is used, we need to update that as well
											if(Character[C].BCEArousal){
												Character[C].BCEArousalProgress = Character[C].BCEArousalProgress +  (1 - Character[C].BCT.bctSettings.orgasmDecayMultiplier.value)
											}
											if (Factor < 0) ActivityTimerProgress(Character[C], (1 - Character[C].BCT.bctSettings.orgasmDecayMultiplier.value));
										}
									}
								}
							}				
						} catch (error) {
							console.error("Error handling timer decay tick for character: " + Character[C].Name + ".");
							// console.log(error);
						}
					}
				}
			}
			next(args);
		});

	}

	//Tail Wagging
	function tailWagging(){

		registerSocketListener("ChatRoomMessage", (data) => {
			getEmote(data);
		});

		function getEmote(data) {
			if(Player.BCT.bctSettings.tailWaggingEnable.value === true){
				if(data.Type === "Emote" && data.Sender === Player.MemberNumber){
					var message = data.Content;
					let patterns = [/wags.*tail/mi, /tail.*wagging/mi, /wagging.*tail/mi] ; // matches {<any> wags <any> tail <any>}
					let result = patterns.find(pattern => pattern.test(message));
					if(result){
						tailWag();
					}
				}
			}
		}

		function tailWag(){
			for(var i = 0; i<Player.BCT.bctSettings.tailWaggingCount.value; i++){
				setTimeout(function(){InventoryWear(
					Player,
					Player.BCT.bctSettings.tailWaggingTailTwoName.value,
					"TailStraps",
					Player.BCT.bctSettings.tailWaggingTailTwoColor.value
					);},i * Player.BCT.bctSettings.tailWaggingDelay.value * 2);
				setTimeout(function(){InventoryWear(
					Player,
					Player.BCT.bctSettings.tailWaggingTailOneName.value,
					"TailStraps",
					Player.BCT.bctSettings.tailWaggingTailOneColor.value
					);},i * Player.BCT.bctSettings.tailWaggingDelay.value * 2 + Player.BCT.bctSettings.tailWaggingDelay.value);
			  }
		}

	}
	//REMOVE LATER
	let DEBUG_FRIENDS = [];
	let DEBUG_FRIENDS_ROOM = {};
	async function ShowBestFriendRoom() {
		await waitFor(() => ServerSocket && ServerIsConnected);
		
		var friendFlag = {};
		const BCT_BEEP_ROOM_NAME_MSG = "RoomName",
		BCT_BEEP_IS_BEST_FRIEND_MSG = "Friends",
		BCT_BEEP_Ack_FRIEND_MSG = "AckFriends",
		BCT_BEEP_REQUEST_ROOM = "ReqRoom";

		registerSocketListener("ChatRoomMessage", (data) => SendRoomNameOnChatRoomOnEntryUpdate(data));
		registerSocketListener("AccountBeep", (data) => parseBeeps(data));
		registerSocketListener("ChatRoomCreateResponse", (data) => SendRoomNameOnCreateChat(data))

		// change FriendListLoadFriendList() to get private rooms into the friendlist
		// if (friend.ChatRoomName != null) and (friend.Private) then do stuff
		
		modAPI.hookFunction("FriendListLoadFriendList", 3, (args,next) => {
			let data = args[0];
			const mode = FriendListMode[FriendListModeIndex];
			if (mode === "Friends") {
				// In Friend List mode, we show the friend list and allow doing beeps
				for (const friend of data) { 
					
					if ((friend.Private)  && (friend.ChatRoomName === "-")
					&& (DEBUG_FRIENDS.includes(friend.MemberNumber)) && (friend.MemberNumber in DEBUG_FRIENDS_ROOM)) {
						friend.ChatRoomName = DEBUG_FRIENDS_ROOM[friend.MemberNumber];
					}
				}
			}
			next(data);
		});
		modAPI.hookFunction("ElementContent", 2, (args,next) => {
			const mode = FriendListMode[FriendListModeIndex];
			let ID = args[0];
			let Content = args[1];
			next(ID,Content);
			if ((mode === "Delete") && (ID === "FriendList")) {
				let htmlDoc = document.getElementById(ID);
				for (let i = 0; i < htmlDoc.getElementsByClassName("FriendListTextColumn").length / 3; i++) {
					let member = parseInt(htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 1].innerHTML);
					if (DEBUG_FRIENDS.includes(member) 
					&& !(Player.Ownership != null && Player.Ownership.MemberNumber === member)
					&& !(Player.Lovership.some(lover => lover.MemberNumber == member))
					&& !(Player.SubmissivesList.has(member))) {
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].innerHTML = "Best Friend";
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].style.cursor = "pointer";
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].style.textDecoration = "underline";
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].style.color = "lime";
						let  onHoverBF = () => {
							htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].innerHTML = "Delete BF?";
						}
						let onOutBF = () => {
							htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].innerHTML = "Best Friend";
						}
						let onClickBF = () => {
							htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].innerHTML = "Deleted";
							DEBUG_FRIENDS = DEBUG_FRIENDS.filter(friend => friend !== member);
							htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].removeEventListener("mouseover",onHoverBF);
							htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].removeEventListener("mouseout",onOutBF);
						}
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].addEventListener("mouseover", onHoverBF);
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].addEventListener("mouseout", onOutBF);
						htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2].addEventListener("click",onClickBF)
					}
				}
			}
		});

		function SendBeep(target,type,message,secret=false) {
			const beep = { MemberNumber: target,
							BeepType: type,
							Message: message,
							IsSecret: secret,
						}
			ServerSend("AccountBeep",beep);
		}

		// This sends a non secret type beep to the target giving their room name
		function SendRoomName(target) {
			SendBeep(target,BCT_BEEP,BCT_BEEP_ROOM_NAME_MSG);
		}
		// check if the target has added you to receive room name
		async function IsBestFriend(target) {
			
			SendBeep(target,BCT_BEEP,BCT_BEEP_IS_BEST_FRIEND_MSG,true);
			//wait somehow?
			await sleep(2000);
			return friendFlag[target];
		}
		
		// Ask best friends room name on quick relog or first entry
		// Requires LoginResponse for the quick relog
		// For complete load it should work directly 
		function RequestRoomName() {
			for (const member in DEBUG_FRIENDS) {//Player.BCT.bctSettings.BestFriendList) {
				SendBeep(DEBUG_FRIENDS[member],BCT_BEEP,BCT_BEEP_REQUEST_ROOM,true)
			}
		}
		RequestRoomName();
		modAPI.hookFunction("LoginResponse", 3, async (args, next) => {
			RequestRoomName();
			next(...args);
		})
		

		// send player room name when they enter a chatroom or update the room
		async function SendRoomNameOnChatRoomOnEntryUpdate(data) 
		{
			if ((data.Content === "ServerUpdateRoom") || 
				(data.Content === "ServerEnter" && Player.MemberNumber === data.Sender) ) 
				{
					for (const member in DEBUG_FRIENDS) {//Player.BCT.bctSettings.BestFriendList) {
						if (await IsBestFriend(DEBUG_FRIENDS[member])) { // check online?
							SendRoomName(DEBUG_FRIENDS[member]);
						}
					}
					friendFlag = {};
				}
		}

		// send player room name when they create room
		async function SendRoomNameOnCreateChat(data) 
		{
			if ( data === "ChatRoomCreated") 
				{
					for (const member in DEBUG_FRIENDS) {//Player.BCT.bctSettings.BestFriendList) {
						if (await IsBestFriend(DEBUG_FRIENDS[member])) { // check online?
							SendRoomName(DEBUG_FRIENDS[member]);
						}
					}
					friendFlag = {};
				}
		}
		
		// parse Beep for Room Name 
		function parseBeeps(data) {
			if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && 
					(typeof data.MemberNumber === "number") && (data.MemberName != null) && (typeof data.MemberName === "string"))	{
						
						if(data.BeepType === BCT_BEEP){
							console.log("BEEP Type : ",data);
							let beep = data;
							switch(beep.Message) {
								case BCT_BEEP_ROOM_NAME_MSG: 
									//TODO
									DEBUG_FRIENDS_ROOM[beep.MemberNumber] = beep.ChatRoomName;
									break;
								case BCT_BEEP_IS_BEST_FRIEND_MSG:
									if(DEBUG_FRIENDS.includes(beep.MemberNumber)) {//Player.BCT.bctSettings.BestFriendList) {
										SendBeep(beep.MemberNumber,BCT_BEEP,BCT_BEEP_Ack_FRIEND_MSG,true);
									}
									break;
								case BCT_BEEP_Ack_FRIEND_MSG:
									friendFlag[beep.MemberNumber] = true;
									break;
								case BCT_BEEP_REQUEST_ROOM:
									if ((CurrentScreen === "ChatRoom") && (DEBUG_FRIENDS.includes(beep.MemberNumber))) {//Player.BCT.bctSettings.BestFriendList)) {
										SendRoomName(beep.MemberNumber);
									}
									break;
								default:
									console.log("Invalid Message Type for BCT Beep: ", beep);
							}
						}
				}
		}
	}
	ShowBestFriendRoom();
	// Images
	const IMAGES = {
		AROUSAL_THERMOMETER: "data:image/png;base64,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",
		LOGO: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAABVVmH3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjDBcEOi0zRWt7AAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAACdJJREFUeF7t3AWsbVcRxvGHS4HiFG3R4u4UKA4hWIN7sODuVqTBCZbg7tDiDkHa4k6wFnd3d/h+yVvJys7aR+55j2SfvSb55937zrUze+1ZM9/M2ru6dSt23HDKcJFw6XCO3f/XbQM7ebhceG54V3h/eG24fzh1OF7otqZx2uXDW8LPw1/CX8NvwxfD/cJ+YWhW8wXDzcO9w+3D/uGEoVvsrOFBgTP/E/5b8efw8WA1nygwF+J0gUOfHz4Rvhk+Hx4Tzh+OE2ZvVw6vDv8OQ8f+I/wk3CKcNnDuucO9wufCn0L5Wt/7o8Dh5SLM2q4X3hM4ZuhYzuY8sfa84cLhkeFngdPrry0IC6cKs7frhneGlmMLTwpW7dOC2Nv6msIDglAxe7tieGVohYLCl8N3gpjber3mTuHEYfZ2YDgs/CuMOfbv4Z+B81uvw2vfCjcMPT2L7RNuGzhvzLGrwPEvDhcPPSuIccLVwzHBqm05bRkuyg+COHz60G23SfRfEOSyLcctQgiQkr0wnCecIEze9g0S/LMEZemYLbs1la03Cn8ILect4tfhHeEK4SRh0qac5EjJuLzyYeHG4czh+IFZORxmFVmRZwsnCy3j+APC18LfQsuBLX4TONXfsRVmw7lS+HpwK0rWvxEeEs4UOFfdXsrOV4VHB1XWSUPLXIQnhx+GlhOHWN30heuHrTGiyOOC2FZ2cv8SUDjznOEu4SuhOEL8fEm4UGiZMpQm8OmwKK3ye2QAnHqNsFXl6xnCo8KPQ+1YfDeQ/7zxepf3mv+zalsm9/RzXxF+Ecr3DVHifixQxMZW/2RNrDw4SJGKY+FjYcGG8vvdn5fX/hieF84Xxoxz7xE+G8r31fwuvDfIVYWjrctXbV4ygtcEGmrLCZxaO/aj4XaBQxaZ7gG1a1i+Uq5eGlxQG+NWFwFiHLVfzKudUCMcfD/cN9j5l5kLRp89NpSfQSd4RjgozEISlDfSRr8QamcWOJzEJyU7V1h1lclJXx6KHvuEcMkwK51VnkpEGW44ykzK/jODTWmdW7fkyDappwZCTcmPZ2N6TFcLhwcrTFyVWn01PDEQnXfSbRU2KFU6t7NVqyT3h4RvB7u/0PDgoFjotqG53e8Z3hystGW7f7cVze0uv9X0s6nVMdXHW50e/b/NJqRCemxQqVnJhJrabEpKZPkpwZs2Sy3bSVyehUniJftvD/JQHB0eH4wPlQ1JFXVoOCoY0FBISM8oYt0adppwm0DaK5pBUcGoWF4XNu4TNAvrVO1TgYjTrWEEcD1+8l6tVikalKd3DDcIOrRUsdqxigIt724NkyXcORBOhjKglSvPlfu2qjZhQ3jo1jCZwbWDJt8iLaHFB8PNQrcRu0B4U6hnrJbhIjwrmNHqNmJWLfHEqm05scVnwq3D5BuDe9MUBXJZ/S6CTMuRBXHYJiZjMPzWC4olJtE/e9DvGhPFQbixWmm8W9dy2Vtm9emmvi20hjLkuVIwWYRsotsaphi4WzB5PWzbiMHPCWcMlDJCt+KCJmtCu8fbJWZ42Di7ZmPJbX8Z9Li0xY1f0gpeFsRk7fNnh8uERcMePR7HOPB1QRdXGmaShZZLO7BadXK11TndqlZMSL9oCrUwIw4Ta3QXpGaGjSfbZdAt0Hcqb9DHmn+nCKsOo3nzRJgPhyODQWGr0fdb0doxw0pNJXbX4HdZnf4O8wlWv4tkFkHbfJKnZrxxt6Q2jFjIjBnpd5ndUgysapxLvbpUKF0GYcDPE4NrpxZME1q1VuplA6Gm3gitbH+HizYps/F8JEiJ9LJsKh8IYqSVZ2ZgHXOhrK4iH9qgpFpjHV8xV7tHt/dDgQZRb4BWuVY8XXdSWi6xWq9fXNTb4lQHLbwhq+cOYRPj5EsEF652aMEUotdsbP6GYbjwOS3X5jcpx14ncKY34LZTJfnYGyZmXzVsYiX2vi+0cl2Yjhmb66IxcLoSelJZAmFaDDOvVb+h7wVxdtPE3iorWYFiof4dy+BUVZ2NcJKdYbeqUR9xtbypN4RNV2sxcdfu7pYf3upjiLP+HtmBVG6S0zL+6DKcYdLF8R8NwD3Z6nbu641hLBwM0aGwmYmtk265m2xxmlBa5BSgXXpPmtLXRrlKOBDnjw5b0x+zMuScY2XmpkYj0LVtObNgA5UFuGO2yvbmPJUKiobbcmjB7e+kzd66uFtpUi8yo1M0w01MDusZBdcKBua6ALOmyWkfEWySxalmFDzaRGl90fDA8PBgMIS5i2ywq+oWszTaAQeq9mQIMhCHRpSszKNKbFxKXf9vdEkRY3L8VkHXYvLm1hXrFBF7MvaSAhUfTtuIuUSYYuYOOF33QYltLEmHwtkzzz+YfPvcSpFDSnmsFm/IStsTh4XpB6REq9SGVpuRUSkfx1rRDt4peX1OetSBmKzJaalebkk5pTdGdXp3MELE6csEEa9b7b6WYO3wnYsiFJTuQGuDosdamXUMBi3h6cER08mafNNThuo3VrCjS/Q5acy5VqQZL7HRAY4jglkuj4RySpF2MLbr02U5UJun/E7T5E6RGx2dtMklF5WelP+HBmlRy+zmTsdwyPB7iT2ygkWPIblloAX7ekKMc2AXC5M1b1bHQLOvFpuHeLP6V+KuUrWYFUwN01IhoLQEF5WVTUncbj3QjPmZNjXTiR7EIx5PUoQppsflsU5SoEWOBedK6K8SSkgQU63kZU/VUAwYkLMKW9mGn8eZiomteEqcTUuu6FZf5liv29SeEsh6Zad3XnZ4rHMIEV1Kdc0wVrr6eVtzkETMvElwq67iWEiNZBCetuk8gvZ36+tr7PgunrtDh3brzY5s5x2e/l6E2/qtwdCbjEEMbX1djRUr4RdGZjENo9JSFbmdF8XIIWp9G43NapWV7mLoDAshsxJbKP2c1XLMpnCsPpb8Vq47KyOEeNTIquFgHWQTzilQsWY3FCePLI8obTlnEzzjwMnxSeelOzV5JE3gk6HlnJ1iY6NoObI/q9ham1EjNfuynHQdbFjUKZvkbE3qddNAqms5aV3If/LcVR5zsvVmRpUziCk7jbc2QCHAw8/KA3Vmb3ZtD8LRst5pSFAMfCmo6HQiuu02GYKNzCzXOkUDpFbOIdBhh8fuu8UIIp6wsU7RIHT8NJAQ+4zAiEmNDM4ZAG45sYWWzusDxWy2qdUqZtUSpz3UoeXIGuoVp5pWHGvfdKuMaGLcc1lIMMgsVeshYEWTJZirMp3dUrKkVeRAA239mdprmjNYdw8ewVdnCZqPdFzHO8vpm25rmI1IC+ZFoXQL6KumtZ1+6bf/BqbclSUY6PhVINbY2By17xnAhiZLIKgYxPDEoroN3m1Dk0rJU63Ubt2GtmvX/wCQfoHENzX45gAAAABJRU5ErkJggg==",
	}
}
runBCT();
