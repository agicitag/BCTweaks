const BCT_VERSION = "B.0.5.1";
const BCT_Settings_Version = 7;

const BCT_API = {};

async function runBCT(){
	
	await waitFor(() => ServerSocket && ServerIsConnected);
	
	// Bondage Club Mod Development Kit (1.1.0)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	var bcModSdk=function(){"use strict";const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return!!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e))}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name)}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d}}return{hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else{let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e}return((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0)}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l()}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l())}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l()},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l()},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o}return window.bcModSdk}();return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();


	const modAPI = bcModSdk.registerMod({
		name: 'BCT',
		fullName: 'Bondage Club Tools',
		version: BCT_VERSION,
		repository: 'https://github.com/agicitag/BondageClubTools'
	});
	
	const BCT_MSG = "bctMsg",
	BCT_BEEP = "bctBeep",
	HIDDEN = "Hidden", // Needs to be capital 'H' !
	BCT_MSG_ACTIVITY_AROUSAL_SYNC = "bctMsgActivityArousalSync",
	BCT_MSG_INITILIZATION_SYNC = "bctMsgInitilizationSync",
	BCT_MSG_SETTINGS_SYNC = "bctMsgSettingsSync";

	const BCT_BEEP_ROOM_NAME_MSG = "RoomName",
	BCT_BEEP_IS_BEST_FRIEND_MSG = "Friends",
	BCT_BEEP_ACK_FRIEND_MSG = "AckFriends",
	BCT_BEEP_REQUEST_ROOM = "ReqRoom",
	BCT_BEEP_DELETE_SHARED = "DelRoom",
	BCT_BEEP_BFLOCK_ACCESS = "BFLockAcc",
	BCT_BEEP_REMOVE_LOCK_ACCESS= "BFRemoveLockAcc";
	
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

	const SHARED_SETTINGS = [
		"splitOrgasmArousal",
		"arousalProgressMultiplier",
		"arousalDecayMultiplier",
		"orgasmProgressMultiplier",
		"orgasmDecayMultiplier",
		"arousalAffectsOrgasmProgress",
		"bestFriendsEnabled",
	];

	let addBFDialog = {Function: "ChatRoomListManage(\"Add\", \"BestFriend\")",
						Option: "(Add as Best Friend.)",
						Prerequisite: "CanAddAsBF()",
						Result: "(This member is considered to be a best friend by you.)",
						Stage: "10"};
	let removeBFDialog = {Function: "ChatRoomListManage(\"Remove\", \"BestFriend\")",
							Option: "(Remove from Best Friend.)",
							Prerequisite: "CanRemoveAsBF()",
							Result: "(This member is no longer considered to be a best friend by you.)",
							Stage: "10"};
	
	let BFLockAccessOn = new Set();	// BFs currently online. (Needed for BF lock)
								// Add when you add someone as BF and vice versa

	await bctSettingsLoad();
	splitOrgasmArousal()
	settingsPage();
	tailWagging();
	bctBestFriend();
	//send Initilization when started when already in a chatroom
	sendBctInitilization(true);
	
	async function bctSettingsLoad() {
		await waitFor(() => !!Player?.AccountName);

		const BCT_DEFAULT_SETTINGS = {
			splitOrgasmArousal: true,
			arousalbarLocation: "Bottom",
			arousalProgressMultiplier: 1.0,
			arousalDecayMultiplier: 1.0,
			orgasmProgressMultiplier: 1.0,
			orgasmDecayMultiplier: 1.0,
			arousalAffectsOrgasmProgress: true,
			tailWaggingEnable: false,
			tailWaggingTailOneName: "PuppyTailStrap1",
			tailWaggingTailOneColor: "#431A12",
			tailWaggingTailTwoName: "WolfTailStrap3",
			tailWaggingTailTwoColor: "#310D0C",
			tailWaggingDelay: 500,
			tailWaggingCount: 3,
			menuButtonFixEnabled: true,
			bestFriendsEnabled: true,
			bestFriendsRoomShare: true,
			bestFriendsList: [],
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
			if(!settings) settings = {};

			// Reorganize old settings into the new structure
			for (const setting in settings){
				if(settings[setting].value) settings[setting] = settings[setting].value;
			}

			//fill up missing settings with the default ones
			for (const setting in BCT_DEFAULT_SETTINGS) {
				if (!Object.prototype.hasOwnProperty.call(BCT_DEFAULT_SETTINGS, setting)) {
					continue;
				}
				if (!(setting in settings)) {
					settings[setting] = BCT_DEFAULT_SETTINGS[setting];
				}
			}

			// remove lovers and non friends from Best Friends
			for(const friend of settings.bestFriendsList) {
				if((!Player.FriendList.includes(friend))
				&& (Player.Lovership.some(lover => lover.MemberNumber == friend))) {
					settings.bestFriendsList = settings.bestFriendsList.filter(member => member !== friend);
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
			for(const setting in settings){
				if(SHARED_SETTINGS.indexOf(setting) >= 0){
					Player.BCT.bctSharedSettings[setting] = settings[setting];
				}
			}
			bctSettingsSave();
		}
	}
	
	function bctSettingsSave(share = true) {
		//local settings
		localStorage.setItem(bctSettingsKey(),JSON.stringify(Player.BCT.bctSettings));

		//online settings
		Player.OnlineSettings.BCT = LZString.compressToBase64(JSON.stringify(Player.BCT.bctSettings));
		ServerAccountUpdate.QueueData({
			OnlineSettings: Player.OnlineSettings,
		});

		//shared settings
		for(setting in Player.BCT.bctSettings){
			if(SHARED_SETTINGS.indexOf(setting) >= 0){
				Player.BCT.bctSharedSettings[setting] = Player.BCT.bctSettings[setting];
			}
		}
		if(share === true) {
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
	}

	async function beepChangelog() {
		await waitFor(() => !!Player?.AccountName);
		await sleep(5000);
		bctBeepNotify("BCT updated", "BCT got updated. You can find the changelog in the settings.");
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
								// Add new Dialog to Best Friend feature users
								if (sender.BCT?.bctSettings?.bestFriendsEnabled === true) AddRelationDialog(sender);
								if(message.replyRequested)	sendBctInitilization(false);
								break;
							case BCT_MSG_ACTIVITY_AROUSAL_SYNC:
								sender.BCT.splitOrgasmArousal.arousalProgress = message.bctArousalProgress;
								sender.BCT.splitOrgasmArousal.ProgressTimer = message.bctProgressTimer;
								break;
							case BCT_MSG_SETTINGS_SYNC:
								sender.BCT.bctSettings = message.bctSettings;
								if (sender.BCT?.bctSettings?.bestFriendsEnabled === true) AddRelationDialog(sender);
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
			"BCTBestFriends"
		];
		const bctSettingCategoryLabels = {
			BCTArousal: "Arousal Bar",
			BCTTailwag: "Tail Wagging",
			BCTTweaks: "Tweaks",
			BCTBestFriends: "Best Friends"
		};
		const MENU_ELEMENT_X_OFFSET = 1050;
		
		let menuElements = {};
		for (category of bctSettingsCategories){
			menuElements[category] = [];
		}

		let settingsHint = "";
		let currentHint = 0;

		// keep same position in menu
		PreferenceSubscreenList.splice(14, 0 ,"BCTSettings");

		modAPI.hookFunction("TextGet", 2, (args, next) => {
			if(args[0] == "HomepageBCTSettings") return "BCT Settings";
			else return next(args);
		});

		modAPI.hookFunction("DrawButton", 2, (args, next) => {
			// 7th argument is the image url
			if(args[6] == "Icons/BCTSettings.png") args[6] = IMAGES.LOGO;
			return next(args);
		});

				/**
		 * Draws a word wrapped text in a rectangle
		 * @param {string} Text - Text to draw
		 * @param {number} X - Position of the rectangle on the X axis
		 * @param {number} Y - Position of the rectangle on the Y axis
		 * @param {number} Width - Width of the rectangle
		 * @param {number} Height - Height of the rectangle
		 * @param {string} ForeColor - Foreground color
		 * @param {string} [BackColor] - Background color
		 * @param {number} [MaxLine] - Maximum of lines the word can wrap for
		 * @returns {void} - Nothing
		 */
		function DrawTextWrapGood(Text, X, Y, Width, Height, ForeColor, BackColor = null, MaxLine = null) {
			if (ControllerActive == true) {
				setButton(X, Y);
			}
			// Draw the rectangle if we need too
			if (BackColor != null) {
				MainCanvas.beginPath();
				MainCanvas.rect(X, Y, Width, Height);
				MainCanvas.fillStyle = BackColor;
				MainCanvas.fillRect(X, Y, Width, Height);
				MainCanvas.fill();
				MainCanvas.lineWidth = 2;
				MainCanvas.strokeStyle = ForeColor;
				MainCanvas.stroke();
				MainCanvas.closePath();
			}
			if (!Text) return;

			// Sets the text size if there's a maximum number of lines
			let TextSize;
			if (MaxLine != null) {
				TextSize = MainCanvas.font;
				GetWrapTextSize(Text, Width, MaxLine);
			}

			// Split the text if it wouldn't fit in the rectangle
			MainCanvas.fillStyle = ForeColor;
			Y = Y + Math.floor(0.66 * (parseInt(MainCanvas.font.substring(0, 2))));
			if (MainCanvas.measureText(Text).width > Width) {
				const words = fragmentText(Text, Width);
				let line = '';

				// Splits the words and draw the text
				line = '';
				for (let n = 0; n < words.length; n++) {
					const testLine = line + words[n] + ' ';
					if (MainCanvas.measureText(testLine).width > Width && n > 0) {
						MainCanvas.fillText(line, X + 5, Y);
						line = words[n] + ' ';
						Y += 46;
					}
					else {
						line = testLine;
					}
				}
				MainCanvas.fillText(line, X + 5, Y);

			} else MainCanvas.fillText(Text, X + 5, Y);

			// Resets the font text size
			if ((MaxLine != null) && (TextSize != null))
				MainCanvas.font = TextSize;

		}

		function BCTPreferenceDrawBackNextButton(Left, Top, Width, Height, List, Index) {
			DrawBackNextButton(Left, Top, Width, Height, List[Index], "White", "",
				() => List[PreferenceGetPreviousIndex(List, Index)],
				() => List[PreferenceGetNextIndex(List, Index)],
			);
		}

		function getNewYPos(){
			let yPos = 200;
			if (menuElements[PreferenceSubscreen].length > 0){
				let lastElement = menuElements[PreferenceSubscreen][menuElements[PreferenceSubscreen].length - 1];
				yPos = lastElement.yPos + lastElement.yModifier + 75;
			}
			return yPos;
		}

		function addMenuCheckbox(width, height, text, setting, hint, grayedOutReference = "false", xModifier = 0, yModifier = 0, elementText = ""){
			menuElements[PreferenceSubscreen].push({
				type: "Checkbox",
				yPos: getNewYPos(),
				width: width,
				height: height,
				text: text,
				setting: setting,
				hint: hint,
				grayedOutReference: grayedOutReference,
				xModifier: xModifier,
				yModifier: yModifier,
				elementText: elementText,
			});
		}
		function addMenuButton(width, height, text, elementText, clickFunction, hint, xModifier = 0, yModifier = 0){
			menuElements[PreferenceSubscreen].push({
				type: "Button",
				yPos: getNewYPos(),
				width: width,
				height: height,
				text: text,
				elementText: elementText,
				clickFunction: clickFunction,
				hint: hint,
				xModifier: xModifier,
				yModifier: yModifier,
			});
		}
		function addMenuInput(width, text, setting, identifier, hint, xModifier = 0, yModifier = 0){
			menuElements[PreferenceSubscreen].push({
				type: "Input",
				yPos: getNewYPos(),
				width: width,
				text: text,
				setting: setting,
				identifier: identifier,
				hint: hint,
				xModifier: xModifier,
				yModifier: yModifier,
			});
			ElementCreateInput(identifier, "text", Player.BCT.bctSettings[setting], "100");
		}
		function addMenuBackNext(width, height, text, setting, backNextOptions, hint, xModifier = 0, yModifier = 0){
			menuElements[PreferenceSubscreen].push({
				type: "BackNext",
				yPos: getNewYPos(),
				width: width,
				height: height,
				text: text,
				setting: setting,
				backNextOptions: backNextOptions,
				hint: hint,
				xModifier: xModifier,
				yModifier: yModifier,
				index: (backNextOptions.indexOf(Player.BCT.bctSettings[setting]) < 0) ? 0 : backNextOptions.indexOf(Player.BCT.bctSettings[setting])
			});
		}

		function drawMenuElements(){
			// Draw the player & controls
			DrawCharacter(Player, 50, 50, 0.9);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
			
			MainCanvas.textAlign = "left";
			if (PreferenceMessage != "") DrawText(PreferenceMessage, 900, 125, "Red", "Black");
			DrawText("- " + bctSettingCategoryLabels[PreferenceSubscreen] + " Settings -", 500, 125, "Black", "Gray");
			if(settingsHint != ""){
				DrawTextWrapGood(settingsHint, 1350, 200, 555, 725, "Black", "Yellow");
			}

			let currentElement;
			for (i = 0; i < menuElements[PreferenceSubscreen].length; i++){
				currentElement = menuElements[PreferenceSubscreen][i];
				MainCanvas.textAlign = "left";
				let textColor = "Black";
				if(eval(currentElement?.grayedOutReference) === true) textColor = "Gray";
				if(MouseIn(500, currentElement.yPos - 18, MENU_ELEMENT_X_OFFSET - 525, 36)) textColor = "Yellow";
				if(currentElement.yPos === currentHint) textColor = "Red";
				DrawText(currentElement.text, 500, currentElement.yPos, textColor, "Gray");
				switch (currentElement.type) {
					case "Checkbox":
						DrawCheckbox(
							MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
							currentElement.yPos - currentElement.height/2,
							currentElement.width,
							currentElement.height,
							currentElement.elementText,
							(eval(currentElement.grayedOutReference)) ? false : Player.BCT.bctSettings[currentElement.setting],
							eval(currentElement.grayedOutReference)
						);
						break;
					case "Button":
						MainCanvas.textAlign = "center";
						DrawButton(
							MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
							currentElement.yPos - currentElement.height/2,
							currentElement.width,
							currentElement.height,
							currentElement.elementText,
							"White",
							""
						);
						break;
					case "Input":
						ElementPosition(
							currentElement.identifier,
							MENU_ELEMENT_X_OFFSET + currentElement.xModifier + currentElement.width/2,
							currentElement.yPos,
							currentElement.width
						);
						break;
					case "BackNext":
						MainCanvas.textAlign = "center";
						BCTPreferenceDrawBackNextButton(
							MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
							currentElement.yPos - currentElement.height/2,
							currentElement.width,
							currentElement.height,
							currentElement.backNextOptions,
							currentElement.index
						);
						break;
					default:
						break;
				}
			}
		}

		function handleMenuClicks(){
			// Exit button
			if (MouseIn(1815, 75, 90, 90)){
				PreferenceExit();
				return;
			}
			let currentElement;
			let foundElement = false;
			for (i = 0; i < menuElements[PreferenceSubscreen].length; i++){
				currentElement = menuElements[PreferenceSubscreen][i];
				switch (currentElement.type) {
					case "Checkbox":
						if (eval(currentElement.grayedOutReference) === false){
							if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height/2, currentElement.width, currentElement.height)){
								Player.BCT.bctSettings[currentElement.setting] = !Player.BCT.bctSettings[currentElement.setting];
								foundElement = true;
							}
						}
						break;
					case "Button":
						if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height/2, currentElement.width, currentElement.height)){
							currentElement.clickFunction();
							foundElement = true;
						}
						break;
					case "BackNext":
						if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height/2, currentElement.width, currentElement.height)){
							if (MouseX <= MENU_ELEMENT_X_OFFSET + currentElement.width/2) currentElement.index = PreferenceGetPreviousIndex(currentElement.backNextOptions, currentElement.index);
							else currentElement.index = PreferenceGetNextIndex(currentElement.backNextOptions, currentElement.index);
							Player.BCT.bctSettings[currentElement.setting] = currentElement.backNextOptions[currentElement.index];
							foundElement = true;
						}
						break;
					default:
						break;
				}
				// Fontsize = 36
				if (MouseIn(500, currentElement.yPos - 18, MENU_ELEMENT_X_OFFSET - 525, 36)){
					settingsHint = currentElement.hint;
					currentHint = currentElement.yPos;
				}
				if (foundElement) i = menuElements[PreferenceSubscreen].length;
			}
		}

		function defaultExit(){
			menuElements[PreferenceSubscreen] = [];
			PreferenceSubscreen = "BCTSettings";
			PreferenceMessage = "";
			settingsHint = "";
			currentHint = 0;
		}


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

			DrawTextWrapGood("Show hints for the settings by clicking on them.", 1450+400/2, 500, 400, 100, "Black");

			DrawText("Your BCT version: " + BCT_VERSION, 1450+400/2, 665, "Black", "Gray");
			DrawButton(1450, 715, 400, 90, "Open Changelog", "White", "", "Open Changelog on Github");
			DrawButton(1450, 825, 400, 90, "Open Beta Changelog", "White", "", "Open Beta Changelog on Github");
			
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
			if (MouseIn(1450, 715, 400, 90)) window.open("https://github.com/agicitag/BondageClubTools/blob/main/extension/Changelog.md", "_blank");
			if (MouseIn(1450, 825, 400, 90)) window.open("https://github.com/agicitag/BondageClubTools/blob/beta/extension/Changelog.md", "_blank");
			
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
			PreferenceSubscreen = "BCTArousal";
			addMenuInput(200, "Arousal Progress Multiplier:", "arousalProgressMultiplier", "InputArousalProgressMultiplier",
			"Sets a multiplier for the arousal progress. E.g. if an activity would normally result in a progress of 10%, " +
			"with a multiplier of 0.5 it only results in a progress of 5%. BC limits the progress for one action at 25%."
			);
			addMenuInput(200, "Orgasm Progress Multiplier:", "orgasmProgressMultiplier", "InputOrgasmProgressMultiplier",
			"Sets a multiplier for the orgasm progress. E.g. if an activity would normally result in a progress of 10%, " +
			"with a multiplier of 0.5 it only results in a progress of 5%. BC limits the progress for one action at 25%."
			);
			addMenuInput(200, "Arousal Decay Multiplier:", "arousalDecayMultiplier", "InputArousalDecayMultiplier",
			"Sets a multiplier for the arousal decay. Normally arousal progress decays by 1% every 12 seconds. With a multiplier of " +
			"0.5 it only decays by 0.5% every 12 seconds."
			);
			addMenuInput(200, "Orgasm Decay Multiplier:", "orgasmDecayMultiplier", "InputOrgasmDecayMultiplier",
			"Sets a multiplier for the orgasm decay. Normally orgasm progress decays by 1% every 12 seconds. With a multiplier of " +
			"0.5 it only decays by 0.5% every 12 seconds."
			);
			addMenuCheckbox(64, 64, "Split Arousal Bar:", "splitOrgasmArousal",
			"Splits the normal BC arousal bar into two separate bars. The red one is the orgasm bar which only gets filled by actions " +
			"on areas you have set in BC as \"This zone can give you an orgasm\". This bar can be seen by everyone, also those without " +
			"the addon and is the one that affects the game (e.g. speech). The pink one is the arousal bar which is basically the same " +
			"as the normal BC one, but cant make you orgasm."
			);
			addMenuCheckbox(64, 64, "Arousal Affects Orgasm Progress:", "arousalAffectsOrgasmProgress",
			"Let your arousal affect the orgasm progress speed. With this option enabled at 0% arousal the orgasm progress gets " + 
			"a 0.5x multiplier, at 50% a 1x multiplier and at 100% a 2x multiplier.",
			"!Player.BCT.bctSettings.splitOrgasmArousal"
			);
			addMenuBackNext(250, 60, "Arousal Bar Location:", "arousalbarLocation", ["Bottom", "Right"],
			"Position the arousal bar either bottom of the orgasm bar or to the right of the character."
			);
		}

		PreferenceSubscreenBCTArousalRun = function () {
			drawMenuElements();
		}

		PreferenceSubscreenBCTArousalClick = function () {
			handleMenuClicks();
		}

		PreferenceSubscreenBCTArousalExit = function () {
			if(CommonIsNumeric(ElementValue("InputArousalProgressMultiplier"))
				&& CommonIsNumeric(ElementValue("InputOrgasmProgressMultiplier"))
				&& CommonIsNumeric(ElementValue("InputArousalDecayMultiplier"))
				&& CommonIsNumeric(ElementValue("InputOrgasmDecayMultiplier"))){
				Player.BCT.bctSettings.arousalProgressMultiplier = ElementValue("InputArousalProgressMultiplier");
				Player.BCT.bctSettings.orgasmProgressMultiplier = ElementValue("InputOrgasmProgressMultiplier");
				Player.BCT.bctSettings.arousalDecayMultiplier = ElementValue("InputArousalDecayMultiplier");
				Player.BCT.bctSettings.orgasmDecayMultiplier = ElementValue("InputOrgasmDecayMultiplier");
				ElementRemove("InputArousalProgressMultiplier");
				ElementRemove("InputOrgasmProgressMultiplier");
				ElementRemove("InputArousalDecayMultiplier");
				ElementRemove("InputOrgasmDecayMultiplier");
				defaultExit();
			}
			else PreferenceMessage = "Put a valid number"

			// Unzoom all arousal bars on changing to setting the arousal bar to "Bottom", to prevent both bars being zoomed
			// and thus none of the bars being shown
			if (Player.BCT.bctSettings.arousalbarLocation === "Bottom"){
				for (char of Character){
					if(char.BCT?.splitOrgasmArousal?.arousalZoom) char.BCT.splitOrgasmArousal.arousalZoom = false;
				}
			}
		};

		let tailPreviewMain;
		let tailPreviewSecondary;

		PreferenceSubscreenBCTTailwagLoad = function () {
			PreferenceSubscreen = "BCTTailwag";
			addMenuCheckbox(64, 64, "Enable Tail Wagging:", "tailWaggingEnable",
			"Enables tail wagging upon sending emotes like \"*wags her tail\" or \"*'s tail is wagging\"."
			);
			addMenuButton(150, 64, "Update Main Tail:", "Update", function(){
				if(!InventoryGet(Player,"TailStraps")){
					PreferenceMessage = "No Tail Equipped";
				}
				else{
					PreferenceMessage = "Main Tail updated";
					Player.BCT.bctSettings.tailWaggingTailOneName = InventoryGet(Player,"TailStraps").Asset.Name;
					Player.BCT.bctSettings.tailWaggingTailOneColor = InventoryGet(Player,"TailStraps").Color;
					InventoryWear(tailPreviewMain, Player.BCT.bctSettings.tailWaggingTailOneName, "TailStraps", Player.BCT.bctSettings.tailWaggingTailOneColor);
					CharacterRefresh(tailPreviewMain);
				}
			}, 
			"Updates the tail that is gonna stay after wagging to the currently worn one."
			);
			addMenuButton(150, 64, "Update Secondary Tail:", "Update", function(){
				if(!InventoryGet(Player,"TailStraps")){
					PreferenceMessage = "No Tail Equipped";
				}
				else{
					PreferenceMessage = "Secondary Tail updated";
					Player.BCT.bctSettings.tailWaggingTailTwoName = InventoryGet(Player,"TailStraps").Asset.Name;
					Player.BCT.bctSettings.tailWaggingTailTwoColor = InventoryGet(Player,"TailStraps").Color;
					InventoryWear(tailPreviewSecondary, Player.BCT.bctSettings.tailWaggingTailTwoName, "TailStraps", Player.BCT.bctSettings.tailWaggingTailTwoColor);
					CharacterRefresh(tailPreviewSecondary);
				}
			},
			"Updates the temporary tail for wagging to the currently worn one."
			);
			addMenuInput(200, "Number Tail Wags:", "tailWaggingCount", "InputTailWaggingCount",
			"The number of wags."
			);
			addMenuInput(200, "Tail Wagging Delay (in ms):", "tailWaggingDelay", "InputTailWaggingDelay",
			"The delay in between switches between the two tails in ms."
			);

			// Tail previews
			tailPreviewMain = CharacterLoadSimple(`TailPreviewMain-${Player.MemberNumber}`);
			tailPreviewSecondary = CharacterLoadSimple(`TailPreviewSecondary-${Player.MemberNumber}`);
			InventoryWear(tailPreviewMain, Player.BCT.bctSettings.tailWaggingTailOneName, "TailStraps", Player.BCT.bctSettings.tailWaggingTailOneColor);
			InventoryWear(tailPreviewSecondary, Player.BCT.bctSettings.tailWaggingTailTwoName, "TailStraps", Player.BCT.bctSettings.tailWaggingTailTwoColor);
			CharacterRefresh(tailPreviewMain);
			CharacterRefresh(tailPreviewSecondary);
		}

		PreferenceSubscreenBCTTailwagRun = function () {
			drawMenuElements();
			MainCanvas.textAlign = "center";
			DrawTextWrapGood("Main Tail:", 550, 750, 100, 80, "Black");
			DrawCharacter(tailPreviewMain, 600, 600, 0.5, false);
			DrawTextWrapGood("Secondary Tail:", 1000, 750, 200, 80, "Black");
			DrawCharacter(tailPreviewSecondary, 1100, 600, 0.5, false);
		}

		PreferenceSubscreenBCTTailwagClick = function () {
			handleMenuClicks();
		}

		PreferenceSubscreenBCTTailwagExit = function () {
			if(CommonIsNumeric(ElementValue("InputTailWaggingCount"))
				&& CommonIsNumeric(ElementValue("InputTailWaggingDelay"))){
				Player.BCT.bctSettings.tailWaggingCount = parseInt(ElementValue("InputTailWaggingCount"));
				Player.BCT.bctSettings.tailWaggingDelay = parseInt(ElementValue("InputTailWaggingDelay"));
				ElementRemove("InputTailWaggingCount");
				ElementRemove("InputTailWaggingDelay");
				defaultExit();
			}
			else PreferenceMessage = "Put a valid number"
		};

		PreferenceSubscreenBCTTweaksLoad = function () {
			PreferenceSubscreen = "BCTTweaks";
			addMenuCheckbox(64, 64, "Enable Menu Button Hitbox Fix: ", "menuButtonFixEnabled",
			"The hitboxes for the buttons in the default BC settings menu move to the left of the actual button in the right rows. " +
			"This tweak fixes that."
			);
		}

		PreferenceSubscreenBCTTweaksRun = function () {
			drawMenuElements();
		}

		PreferenceSubscreenBCTTweaksClick = function () {
			handleMenuClicks();
		}

		PreferenceSubscreenBCTTweaksExit = function () {
			defaultExit();
		};

		PreferenceSubscreenBCTBestFriendsLoad = function () {
			PreferenceSubscreen = "BCTBestFriends";
			addMenuCheckbox(64,64,"Enable Best Friends Feature:","bestFriendsEnabled",
			`This feature allows you to add someone as a "Best Friend". 
There will be a new option in the "Manage your Relationship" section to add someone as a best friend.
Lovers can't be added as best friends and only friends can be added.
For example they are sorted between lovers and normal friends in the online friends list.
They can be deleted in Friend List by hovering over "Best Friend" and clicking on delete.`
			);
			addMenuCheckbox(64,64,"Enable Room Name Share:","bestFriendsRoomShare",
			`Share your private room names with best friends. This works similar to how lovers' and submissives' rooms show up.`,
			"!Player.BCT.bctSettings.bestFriendsEnabled"
			);
		}
		PreferenceSubscreenBCTBestFriendsRun = function () {
			drawMenuElements();
		}
		PreferenceSubscreenBCTBestFriendsClick = function () {
			handleMenuClicks();
		}
		PreferenceSubscreenBCTBestFriendsExit = function () {
			if (!(Player.BCT.bctSettings.bestFriendsEnabled) || !(Player.BCT.bctSettings.bestFriendsRoomShare)) {
				for (const friend of Player.BCT.bctSettings.bestFriendsList) {
					SendBeep(friend,BCT_BEEP,BCT_BEEP_DELETE_SHARED,true);
				}
			}
			defaultExit();
		};

	}

	//fix wrong settings button hitboxes (changed 500 to 420)
	modAPI.hookFunction("PreferenceClick", 2, (args, next) => {
		if(Player.BCT.bctSettings.menuButtonFixEnabled === true){
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
		BCT_API.ActivityChatRoomBCTArousalSync = ActivityChatRoomBCTArousalSync;

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
		BCT_API.ActivitySetBCTArousal = ActivitySetBCTArousal;

		function BCTActivityTimerProgress(C, Progress) {
			if(C.BCT != null && C.BCT.bctSettings.splitOrgasmArousal === true){
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
				if (C.BCT.splitOrgasmArousal != null && C.BCT.bctSettings.splitOrgasmArousal === true) {
					if (Level != C.BCT.splitOrgasmArousal.vibrationLevel) {
						C.BCT.splitOrgasmArousal.vibrationLevel = Level;
						C.BCT.splitOrgasmArousal.changeTime = CommonTime();
					}
				}
			}
		}

		function DrawBCTArousalMeter(C, X, Y, Zoom) {
			if(C.BCT != null){
				if (Player.BCT.bctSettings.arousalbarLocation == "Right") X = X + 290 * Zoom;
				else Y = Y + 125 * Zoom;
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

		function subtractOrgasmProgress(C, Progress){
			let value = Progress;
			// If BCE's alternate arousal is used, we need to update that as well
			if(C.BCEArousal){
				// BCE's alternate arousal formula
				value = Progress * C.BCEEnjoyment * 0.2;
				C.BCEArousalProgress -= value;
			}
			C.ArousalSettings.Progress -= value;
		}

		function getOrgasmProgressMultiplier(C){
			let arousalInfluence = 1;
			// < 95 to prevent the screen flickering near orgasm
			if(C.ArousalSettings.Progress < 95){
				if(C.BCT.bctSettings.splitOrgasmArousal === true && 
				C.BCT.bctSettings.arousalAffectsOrgasmProgress === true){
					let arousalProgress = C.BCT.splitOrgasmArousal.arousalProgress / 100;
					// 0.5x at 0%, 1x at 50%, 2x at 100%
					arousalInfluence = arousalProgress ** 2 + arousalProgress / 2 + 0.5;
				}
				arousalInfluence = arousalInfluence * C.BCT.bctSettings.orgasmProgressMultiplier
			}
			return arousalInfluence;
		}
		BCT_API.getOrgasmProgressMultiplier = getOrgasmProgressMultiplier;

		modAPI.hookFunction('ActivityOrgasmStart', 2, (args, next) => {
			let C = args[0];
			try {
				if(C.BCT != null){
					if(C.BCT.bctSettings.splitOrgasmArousal === true){
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

		// To sync arousal after a resisted Orgasm
		modAPI.hookFunction('ActivityOrgasmStop', 2, (args, next) => {
			next(args);
			ActivityChatRoomBCTArousalSync(args[0]);
		});

		modAPI.hookFunction('ActivitySetArousalTimer', 2, (args, next) => {
			let C = args[0];
			let Activity = args[1];
			let Zone = args[2];
			let Progress = args[3];
			let Asset = args[4];

			if(C.BCT != null){
				try {
					if(C.BCT.bctSettings.splitOrgasmArousal === true){
	
						//Arousal Progress Multiplier
						Progress = Progress * C.BCT.bctSettings.arousalProgressMultiplier;
						
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
					args[3] = args[3] * getOrgasmProgressMultiplier(C);		
				} catch (error) {
					console.error("Error setting arousal timer for character: " + C.Name + ".");
					// console.log(error);
				}
			}
			//only let the orgasm bar progress if its and orgasm zone
			try {
				if(!C.BCT || PreferenceGetZoneOrgasm(C, Zone) || C.BCT.bctSettings.splitOrgasmArousal === false
				// Male genital support
					|| (Asset.Name == "Penis" && PreferenceGetZoneOrgasm(C, "ItemVulva"))){
					next(args);
				}
			} catch (error) {
				next(args);
			}

		});

		modAPI.hookFunction('ChatRoomClickCharacter', 2, (args, next) => {
			let C = args[0];
			try {
				if(C.BCT != null && C.BCT.bctSettings.splitOrgasmArousal === true){
					let CharX = args[1];
					let CharY = args[2];
					let Zoom = args[3];
					let ClickX = args[4];
					let ClickY = args[5];
					let Pos = args[6];
					// Handle clicks on the BCT arousal bar only if the BC arousal bar is not zoomed or its set to "Right"
					if(!C.ArousalZoom || Player.BCT.bctSettings.arousalbarLocation === "Right"){
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
								let arousalMeterYMovement = 0;
								let arousalMeterXMovement = 0;
								if (Player.BCT.bctSettings.arousalbarLocation == "Right") arousalMeterXMovement = 290 * Zoom;
								else arousalMeterYMovement = 125 * Zoom;
								// The arousal meter can be maximized or minimized by clicking on it
								if (MouseIn(CharX + 60 * Zoom + arousalMeterXMovement, CharY + 400 * Zoom + arousalMeterYMovement, 80 * Zoom, 100 * Zoom) && !C.BCT.splitOrgasmArousal.arousalZoom) { C.BCT.splitOrgasmArousal.arousalZoom = true; return; }
								if (MouseIn(CharX + 50 * Zoom + arousalMeterXMovement, CharY + 615 * Zoom + arousalMeterYMovement, 100 * Zoom, 85 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) { C.BCT.splitOrgasmArousal.arousalZoom = false; return; }
	
								// If the player can manually control her arousal, we set the progress manual
								if (C.ID === 0 && MouseIn(CharX + 50 * Zoom + arousalMeterXMovement, CharY + 200 * Zoom + arousalMeterYMovement, 100 * Zoom, 500 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) {
									if (PreferenceArousalAtLeast(Player, "Manual") && !PreferenceArousalAtLeast(Player, "Automatic")) {
										var Arousal = Math.round((CharY + 625 * Zoom + arousalMeterYMovement - MouseY) / (4 * Zoom));
										ActivitySetBCTArousal(Player, Arousal);
									}
									return;
								}
	
								// Don't do anything if the thermometer is clicked without access to it
								if (MouseIn(CharX + 50 * Zoom + arousalMeterXMovement, CharY + 200 * Zoom + arousalMeterYMovement, 100 * Zoom, 415 * Zoom) && C.BCT.splitOrgasmArousal.arousalZoom) return;
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
					|| args[0].BCT.bctSettings.splitOrgasmArousal === false
					|| !args[0].BCT.splitOrgasmArousal.arousalZoom
					|| Player.BCT.bctSettings.arousalbarLocation === "Right"){
					next(args);
				}
				if((args[0].BCT != null
					&& args[0].BCT.bctSettings.splitOrgasmArousal === true)
					&& (!args[0].ArousalZoom
						|| Player.BCT?.bctSettings?.arousalbarLocation === "Right")){
					DrawBCTArousalMeter(...args);
				}
			} catch (error) {
				console.error("Error drawing arousal meter for character: " + args[0].Name + ".");
				// console.log(error);
				next(args);
			}
		});

		var BCTTimerLastArousalProgress = 0;
		var BCTTimerLastArousalProgressCount = 0;
		var BCTTimerLastArousalDecay = 0;

		// low priority to not affect other mods, since the number of next() calls are severely reduced
		modAPI.hookFunction('TimerProcess', 1, (args, next) => {
			let runNext = false;
			if (ActivityAllowed()) {
				// Arousal can change every second, based on ProgressTimer
				if ((BCTTimerLastArousalProgress + 1000 < CurrentTime) || (BCTTimerLastArousalProgress - 1000 > CurrentTime)) {
					BCTTimerLastArousalProgress = CurrentTime;
					BCTTimerLastArousalProgressCount++;
					runNext = true;
					for (let C = 0; C < Character.length; C++) {				
						try {
							if(Character[C].BCT != null){
								// Depending on the character settings, we progress the arousal meter
								if (PreferenceArousalAtLeast(Character[C], "Hybrid")) {
									// Activity impacts the progress slowly over time, if there's an activity running, vibrations are ignored
									if (Character[C].BCT.bctSettings.splitOrgasmArousal === true
										&& (Character[C].BCT.splitOrgasmArousal.ProgressTimer != null)
										&& (typeof Character[C].BCT.splitOrgasmArousal.ProgressTimer === "number")
										&& !isNaN(Character[C].BCT.splitOrgasmArousal.ProgressTimer) 
										&& (Character[C].BCT.splitOrgasmArousal.ProgressTimer != 0)
									){
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
										if (Factor >= 4) {
											BCTActivityVibratorLevel(Character[C], 4);
											if (BCTTimerLastArousalProgressCount % 2 == 0) {
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
											}
										}
										if (Factor == 3) {
											BCTActivityVibratorLevel(Character[C], 3);
											if (BCTTimerLastArousalProgressCount % 3 == 0) {
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
											}
										}
										if (Factor == 2) {
											BCTActivityVibratorLevel(Character[C], 2);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 95 && BCTTimerLastArousalProgressCount % 4 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
											}
										}
										if (Factor == 1) {
											BCTActivityVibratorLevel(Character[C], 1);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 65 && BCTTimerLastArousalProgressCount % 6 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
											}
										}
										if (Factor == 0) {
											BCTActivityVibratorLevel(Character[C], 1);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 35 && BCTTimerLastArousalProgressCount % 8 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
											}
										}
										if (Factor == -1) {
											BCTActivityVibratorLevel(Character[C], 0);
										}
	
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
									if(Character[C].BCT.bctSettings.splitOrgasmArousal === true){
										if ((Character[C].BCT.splitOrgasmArousal.arousalProgress != null) && (typeof Character[C].BCT.splitOrgasmArousal.arousalProgress === "number") && !isNaN(Character[C].BCT.splitOrgasmArousal.arousalProgress) && (Character[C].BCT.splitOrgasmArousal.arousalProgress > 0)) {
											if ((Character[C].BCT.splitOrgasmArousal.ProgressTimer == null) || (typeof Character[C].BCT.splitOrgasmArousal.ProgressTimer !== "number") || isNaN(Character[C].BCT.splitOrgasmArousal.ProgressTimer) || (Character[C].BCT.splitOrgasmArousal.ProgressTimer == 0)) {
												// No arousal decay if there's a vibrating item running
												if (Factor < 0) BCTActivityTimerProgress(Character[C], -1 * Character[C].BCT.bctSettings.arousalDecayMultiplier);
											}
										}
									}
									// No orgasm decay if there's a vibrating item running
									if ((Character[C].ArousalSettings.Progress != null) && (typeof Character[C].ArousalSettings.Progress === "number") && !isNaN(Character[C].ArousalSettings.Progress) && (Character[C].ArousalSettings.Progress > 0)) {
										if ((Character[C].ArousalSettings.ProgressTimer == null) || (typeof Character[C].ArousalSettings.ProgressTimer !== "number") || isNaN(Character[C].ArousalSettings.ProgressTimer) || (Character[C].ArousalSettings.ProgressTimer == 0)) {
											// Prevent another orgasm from triggering while one is already running
											if(Character[C].ArousalSettings.Progress <= 98){
												// If BCE's alternate arousal is used, we need to update that as well
												if(Character[C].BCEArousal){
													Character[C].BCEArousalProgress = Character[C].BCEArousalProgress +  (1 - Character[C].BCT.bctSettings.orgasmDecayMultiplier)
												}
												if (Factor < 0) ActivityTimerProgress(Character[C], (1 - Character[C].BCT.bctSettings.orgasmDecayMultiplier));
											}
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
			if(runNext){
				let restoreValues = {};
				for (let C = 0; C < ChatRoomCharacter.length; C++) {
					try {
						if((ChatRoomCharacter[C].BCT != null && ChatRoomCharacter[C]?.BCT?.bctSettings?.splitOrgasmArousal === true)
							// conditions to count vibrations in BC timerProcess
							&& !((ChatRoomCharacter[C].ArousalSettings.ProgressTimer != null) && (typeof ChatRoomCharacter[C].ArousalSettings.ProgressTimer === "number") && !isNaN(ChatRoomCharacter[C].ArousalSettings.ProgressTimer) && (ChatRoomCharacter[C].ArousalSettings.ProgressTimer != 0))
							&& ChatRoomCharacter[C].IsEgged()){
							let Factor = -1;
							for (let A = 0; A < ChatRoomCharacter[C].Appearance.length; A++) {
								// disable zones that cant give orgasms for vibrating items check
								let Item = ChatRoomCharacter[C].Appearance[A];
								if(!PreferenceGetZoneOrgasm(ChatRoomCharacter[C], Item.Asset.ArousalZone) &&
									//only slots where vibes can be placed
									(Item.Asset.ArousalZone == "ItemNipples" ||
										Item.Asset.ArousalZone == "ItemNipplesPiercings" ||
										Item.Asset.ArousalZone == "ItemVulva" ||
										Item.Asset.ArousalZone == "ItemVulvaPiercings" ||
										Item.Asset.ArousalZone == "ItemButt"
									)
								){
									if(restoreValues[ChatRoomCharacter[C].ID] == null) restoreValues[ChatRoomCharacter[C].ID] = {};
									restoreValues[ChatRoomCharacter[C].ID][Item.Asset.ArousalZone] = PreferenceGetZoneFactor(ChatRoomCharacter[C], Item.Asset.ArousalZone);
									// here it gets disabled
									PreferenceSetZoneFactor(ChatRoomCharacter[C], Item.Asset.ArousalZone, 1)
								}

								// calculate Factor BC would calculate to apply orgasm progress multiplicators
								// If the character is egged, we find the highest intensity factor and affect the progress, low and medium vibrations have a cap
								let ZoneFactor = PreferenceGetZoneFactor(ChatRoomCharacter[C], Item.Asset.ArousalZone) - 2;
								if (InventoryItemHasEffect(Item, "Egged", true) && (Item.Property != null) && (Item.Property.Intensity != null) && (typeof Item.Property.Intensity === "number") && !isNaN(Item.Property.Intensity) && (Item.Property.Intensity >= 0) && (ZoneFactor >= 0) && (Item.Property.Intensity + ZoneFactor > Factor)){
									if ((ChatRoomCharacter[C].ArousalSettings.Progress < 95) || PreferenceGetZoneOrgasm(ChatRoomCharacter[C], Item.Asset.ArousalZone))
										Factor = Item.Property.Intensity + ZoneFactor;
								}

							}
							// Adds the fetish value to the factor
							if (Factor >= 0) {
								var Fetish = ActivityFetishFactor(ChatRoomCharacter[C]);
								if (Fetish > 0) Factor = Factor + Math.ceil(Fetish / 3);
								if (Fetish < 0) Factor = Factor + Math.floor(Fetish / 3);
							}
							
							// Subtract arousal to match the set multiplier for orgasm progress
							if ((Factor >= 4) && TimerLastArousalProgressCount % 2 == 0) {
								subtractOrgasmProgress(ChatRoomCharacter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
							}
							else if ((Factor == 3) && TimerLastArousalProgressCount % 3 == 0) {
								subtractOrgasmProgress(CharaChatRoomCharactercter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
							}
							else if ((Factor == 2) && TimerLastArousalProgressCount % 4 == 0 && ChatRoomCharacter[C].ArousalSettings.Progress <= 95) {
								subtractOrgasmProgress(ChatRoomCharacter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
							}
							else if ((Factor == 1) && TimerLastArousalProgressCount % 6 == 0 && ChatRoomCharacter[C].ArousalSettings.Progress <= 65) {
								subtractOrgasmProgress(ChatRoomCharacter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
							}
							else if ((Factor >= 0) && TimerLastArousalProgressCount % 8 == 0 && ChatRoomCharacter[C].ArousalSettings.Progress <= 35) {
								subtractOrgasmProgress(ChatRoomCharacter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
							}
						}
					} catch (error) {
						console.error("Error setting zone factor for character: " + ChatRoomCharacter[C].Name + ".");
					}
				}
				next(args);
				// restore Values
				for (value in restoreValues){
					let char = ChatRoomCharacter.find(function(char){
						return char.ID == value;
					});
					for (zone in restoreValues[value]){
						PreferenceSetZoneFactor(char, zone, restoreValues[value][zone]);
					}
				}
			}
			// Do the work TimerProcess wouldve normally done
			else{
				// Increments the time from the last frame
				TimerRunInterval = args[0] - TimerLastTime;
				TimerLastTime = args[0];
				CurrentTime = CurrentTime + TimerRunInterval;

				if (ControllerActive == true) {
					if (ControllerCurrentButton >= ControllerButtonsX.length) {
						ControllerCurrentButton = 0;
					}
					DrawRect(MouseX - 5, MouseY - 5, 10, 10, "Cyan");
				}
			
				// Launches the main again for the next frame
				requestAnimationFrame(MainRun);
			}
		});

	}

	//Tail Wagging
	function tailWagging(){

		registerSocketListener("ChatRoomMessage", (data) => {
			getEmote(data);
		});

		function getEmote(data) {
			if(Player.BCT.bctSettings.tailWaggingEnable === true){
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
			for(var i = 0; i<Player.BCT.bctSettings.tailWaggingCount; i++){
				setTimeout(function(){InventoryWear(
					Player,
					Player.BCT.bctSettings.tailWaggingTailTwoName,
					"TailStraps",
					Player.BCT.bctSettings.tailWaggingTailTwoColor
					);},i * Player.BCT.bctSettings.tailWaggingDelay * 2);
				setTimeout(function(){InventoryWear(
					Player,
					Player.BCT.bctSettings.tailWaggingTailOneName,
					"TailStraps",
					Player.BCT.bctSettings.tailWaggingTailOneColor
					);},i * Player.BCT.bctSettings.tailWaggingDelay * 2 + Player.BCT.bctSettings.tailWaggingDelay);
			  }
		}
		BCT_API.tailWag = tailWag;
	}

	// Best Friend Feature start

	ChatRoomCanAddAsBF = () => {
		return (CurrentCharacter && CurrentCharacter.MemberNumber && Player.FriendList.includes(CurrentCharacter.MemberNumber)
			&& !(Player.Lovership.some(lover => lover.MemberNumber == CurrentCharacter.MemberNumber))
			&& Player.BCT.bctSettings.bestFriendsEnabled && !Player.BCT.bctSettings.bestFriendsList.includes(CurrentCharacter.MemberNumber));
	};

	ChatRoomCanRemoveAsBF = () => {
		return (CurrentCharacter && CurrentCharacter.MemberNumber 
			&& Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.bestFriendsList.includes(CurrentCharacter.MemberNumber));
	};
	
	// Adding the dialog option in Manage your relationshp
	function AddRelationDialog(character) {
		let pos = character.Dialog.findIndex((ele) => ele.Option === "(Remove from friendlist.)");
		let alreadyAdded = character.Dialog.findIndex((ele) => ele.Option === "(Add as Best Friend.)");
		if ((pos > -1) && (alreadyAdded === -1)) {
			character.Dialog.splice(pos+1,0,addBFDialog);
			character.Dialog.splice(pos+2,0,removeBFDialog);
		}
	}

	function RemoveRelationDialog(character) {
		let pos = character.Dialog.findIndex((ele) => ele.Option === "(Add as Best Friend.)");
		if(pos > -1) {
			character.Dialog.splice(pos,2);
		}
	}

	function SendBeep(target,type,message,secret=false) {
		const beep = { MemberNumber: target,
						BeepType: type,
						Message: message,
						IsSecret: secret,
					}
		ServerSend("AccountBeep",beep);
	}

	async function bctBestFriend() {
		// this is required to make sure the friend has added player too
		let friendFlag = {};
		let timeoutFriend = {};
		// save currently online friends room
		let currentFriendsRoom = {};
		// online friends list
		let onlineFriends = new Set();
		// true if bct has made the request for online friends
		let bctOnlineCheck = false;
		
		registerSocketListener("ChatRoomMessage", (data) => SendRoomNameOnChatRoomOnEntryUpdate(data));
		registerSocketListener("AccountBeep", (data) => parseBeeps(data));
		registerSocketListener("ChatRoomCreateResponse", (data) => SendRoomNameOnCreateChat(data));
		registerSocketListener("LoginResponse", () => SendRoomRequestOnRelog());

		function AddToBFList(charNumber) {
			Player.BCT.bctSettings.bestFriendsList.push(charNumber);
			SendBeep(charNumber,BCT_BEEP,BCT_BEEP_REQUEST_ROOM,true); // Add their room name and lock access
			bctSettingsSave(false);
		}
		function RemoveFromBFList(charNumber) {
			Player.BCT.bctSettings.bestFriendsList = Player.BCT.bctSettings.bestFriendsList.filter(member => member !== charNumber);
			BFLockAccessOn.delete(charNumber);
			SendBeep(charNumber,BCT_BEEP,BCT_BEEP_REMOVE_LOCK_ACCESS,true);
			bctSettingsSave(false);
		}

		modAPI.hookFunction("ChatRoomListManage", 3, (args,next) => {
			let Operation = args[0];
			let ListType = args[1];
			if (CurrentCharacter && CurrentCharacter.MemberNumber && ListType === "BestFriend") {
				if (Operation === "Add") {
					AddToBFList(CurrentCharacter.MemberNumber);
				}
				else if (Operation === "Remove") {
					RemoveFromBFList(CurrentCharacter.MemberNumber);
				}
			}
			next(args);
		});

		// change FriendListLoadFriendList() to get private rooms into the friendlist
		// if (friend.ChatRoomName != null) and (friend.Private) then do stuff
		// shows the Roomname in the list
		modAPI.hookFunction("FriendListLoadFriendList", 11, (args,next) => {
			let data = args[0];
			if (!bctOnlineCheck) {
				if (Player.BCT.bctSettings.bestFriendsEnabled) {
					const mode = FriendListMode[FriendListModeIndex];
					if (mode === "Friends") {
						let sortedOSL = [];
						let	bfList = [];
						let normalfriends = [];
						// In Friend List mode, the online friends are shown
						for (const friend of data) { 
							if (Player.BCT.bctSettings.bestFriendsList.includes(friend.MemberNumber)) {
								bfList.push(friend);
								if ((friend.Private) && (friend.ChatRoomName === null)
								&& (friend.MemberNumber in currentFriendsRoom)) {
									friend.ChatRoomName = currentFriendsRoom[friend.MemberNumber].ChatRoomName;
									friend.ChatRoomSpace = currentFriendsRoom[friend.MemberNumber].ChatRoomSpace;
								}
							}
							else if ((Player.Ownership != null && Player.Ownership.MemberNumber === friend.MemberNumber)
									|| (Player.Lovership.some(lover => lover.MemberNumber == friend.MemberNumber))
									|| (Player.SubmissivesList.has(friend.MemberNumber))) {
								sortedOSL.push(friend);
							}
							else {
								normalfriends.push(friend);
							}
						}
						args[0] = sortedOSL.concat(bfList).concat(normalfriends)
						return next(args);
					}
				}
				next(args);
			}else {
				onlineFriends = new Set();
				for(const friend of data) {
					onlineFriends.add(friend.MemberNumber);
				}
				bctOnlineCheck = false;
			}
		});

		// shows Best Friends in BC's friend list and have the option to delete them
		modAPI.hookFunction("ElementContent", 2, (args,next) => {
			const mode = FriendListMode[FriendListModeIndex];
			let ID = args[0];
			let Content = args[1];
			next(args);
			if ((Player.BCT.bctSettings.bestFriendsEnabled) && (mode === "Delete") && (ID === "FriendList")) {
				let htmlDoc = document.getElementById(ID);
				for (let i = 0; i < htmlDoc.getElementsByClassName("FriendListTextColumn").length / 3; i++) {
					let member = parseInt(htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 1].innerHTML);
					if (Player.BCT.bctSettings.bestFriendsList.includes(member) 
					&& !(Player.Ownership != null && Player.Ownership.MemberNumber === member)
					&& !(Player.Lovership.some(lover => lover.MemberNumber == member))
					&& !(Player.SubmissivesList.has(member))) {
							let BFelement = htmlDoc.getElementsByClassName("FriendListTextColumn")[i*3 + 2]
							BFelement.innerHTML = "Best Friend";
							BFelement.style.cursor = "pointer";
							BFelement.style.textDecoration = "underline";
							BFelement.style.color = "lime";
							let  onHoverBF = () => {
								BFelement.innerHTML = "Delete BF?";
							}
							let onOutBF = () => {
								BFelement.innerHTML = "Best Friend";
							}
							let onClickBF = () => {
								BFelement.innerHTML = "Deleted";
								RemoveFromBFList(member);
								BFelement.removeEventListener("mouseover",onHoverBF);
								BFelement.removeEventListener("mouseout",onOutBF);
							}
							BFelement.addEventListener("mouseover", onHoverBF);
							BFelement.addEventListener("mouseout", onOutBF);
							BFelement.addEventListener("click",onClickBF)
					}
				}
			}
		});

		// This sends a non secret type beep to the target giving their room name
		function SendRoomName(target) {
			SendBeep(target,BCT_BEEP,BCT_BEEP_ROOM_NAME_MSG);
		}

		// check if the target has added you to receive room name
		async function IsBestFriend(target) {
			SendBeep(target,BCT_BEEP,BCT_BEEP_IS_BEST_FRIEND_MSG,true);
			//wait somehow?
			await sleep(2000);
			timeoutFriend[target];
		}

		// Returns intersection of Online Friends and Best Friends
		async function ReuiredFriendList() {
			bctOnlineCheck = true;
			onlineFriends = null;
			ServerSend("AccountQuery", { Query: "OnlineFriends" });
			await waitFor(() => !!onlineFriends)
			let intersect = Player.BCT.bctSettings.bestFriendsList.filter(ele => onlineFriends.has(ele));
			return intersect;
		}
		
		// Ask best friends room name on quick relog or first entry
		// For complete load it should work directly
		async function RequestRoomName() {
			let reqList = await ReuiredFriendList();
			for (const friend of reqList) {
				SendBeep(friend,BCT_BEEP,BCT_BEEP_REQUEST_ROOM,true);
			}
		}
		RequestRoomName();
		function SendRoomRequestOnRelog() {
			RequestRoomName();
		}

		// checks if the other person has added player and then sends room
		async function CheckAndSendRoomName() {
			let reqList = await ReuiredFriendList();
			for (const friend of reqList) {
				IsBestFriend(friend);
				await waitFor(() => friendFlag[friend] || timeoutFriend[friend])
				if (friendFlag[friend]) { 
					SendRoomName(friend);
				}
			}
			timeoutFriend = {};
			friendFlag = {};
		}

		// send player room name when they enter a chatroom or update the room
		async function SendRoomNameOnChatRoomOnEntryUpdate(data) 
		{
			if (Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.bestFriendsRoomShare) {
				if ((data != null) && (typeof data === "object") && (data.Content != null) && (typeof data.Content === "string")
				&& (data.Content != "") && (data.Sender != null) && (typeof data.Sender === "number")) 
				{
					if ((data.Content === "ServerUpdateRoom") || 
						(data.Content === "ServerEnter" && Player.MemberNumber === data.Sender)) {
							CheckAndSendRoomName();
						}
				}
			}
		}

		// send player room name when they create room
		async function SendRoomNameOnCreateChat(data) 
		{
			if (Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.bestFriendsRoomShare) {
				if ((data != null) && (typeof data === "string") && (data === "ChatRoomCreated")) {
					CheckAndSendRoomName();
				}
			}
		}
		
		// parse Beep for Room Name 
		function parseBeeps(data) {
			if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && 
					(typeof data.MemberNumber === "number") && (data.MemberName != null) && (typeof data.MemberName === "string"))	{
						
						if(data.BeepType === BCT_BEEP){
							//console.log("BEEP Type : ",data);
							let beep = data;
							switch(beep.Message) {
								case BCT_BEEP_ROOM_NAME_MSG:
									currentFriendsRoom[beep.MemberNumber] = {};
									currentFriendsRoom[beep.MemberNumber].ChatRoomName = beep.ChatRoomName;
									currentFriendsRoom[beep.MemberNumber].ChatRoomSpace = beep.ChatRoomSpace;
									break;
								case BCT_BEEP_IS_BEST_FRIEND_MSG:
									if(Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber)) {
										SendBeep(beep.MemberNumber,BCT_BEEP,BCT_BEEP_ACK_FRIEND_MSG,true);
									}
									break;
								case BCT_BEEP_ACK_FRIEND_MSG:
									friendFlag[beep.MemberNumber] = true;
									break;
								case BCT_BEEP_REQUEST_ROOM:
									if(Player.BCT.bctSettings.bestFriendsEnabled && (Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber))) {
										if ((CurrentScreen === "ChatRoom" && Player.BCT.bctSettings.bestFriendsRoomShare)) {
											SendRoomName(beep.MemberNumber);
										}
										SendBeep(beep.MemberNumber,BCT_BEEP,BCT_BEEP_BFLOCK_ACCESS,true);
										BFLockAccessOn.add(beep.MemberNumber); // Room request happens on each login and best friend add
									}
									break;
								case BCT_BEEP_DELETE_SHARED:
									if (beep.MemberNumber in currentFriendsRoom) {
										delete currentFriendsRoom[beep.MemberNumber];
									}
									break;
								case BCT_BEEP_BFLOCK_ACCESS:
									BFLockAccessOn.add(beep.MemberNumber);
									break;
								case BCT_BEEP_REMOVE_LOCK_ACCESS:
									BFLockAccessOn.delete(beep.MemberNumber);
									break;
								default:
									console.log("Invalid Message Type for BCT Beep: ", beep);
							}
						}
				}
		}
	}

	// --------Lock Features----------

	// Best Friend Lock 
	const bfLockName = "Best Friend Padlock";
	// Best Friend Timer Lock
	const bfTimerLockName = "Best Friend Timer Padlock";

	const bfLockQuote = `"Good friends help; best ones make you helpless"`;

	const bflock = {
		AllowType : ["LockPickSeed"],
		Effect : [],
		ExclusiveUnlock: true,
		Extended: true,
		IsLock: true,
		Name: bfLockName,
		PickDifficulty: 20,
		Time: 10,
		Value: 70,
		Wear: false
	}
	const bftimerlock = {
		AllowType : ["LockPickSeed"],
		Effect : [],
		ExclusiveUnlock: true,
		Extended: true,
		IsLock: true,
		Name: bfTimerLockName,
		PickDifficulty: 20,
		Time: 10,
		Value: 80,
		Wear: false,
		MaxTime: 604800,
		//Changed RemoveTimer -> RemovalTime because server go nope, but literally adding a new property is fine
		RemovalTime: 300
	}

	function removeTimerLock(A) {
		const LockName = A.Property.Name;
		const ShouldRemoveItem = A.Property.RemoveItem;

		// Remove any lock or timer
		ValidationDeleteLock(A.Property, false);

		// If we're removing a lock and we're in a chatroom, send a chatroom message
		if (LockName && ServerPlayerIsInChatRoom()) {
			// var Dictionary = [
			// 	{Tag: "DestinationCharacterName", Text: CharacterNickname(Player), MemberNumber: Player.MemberNumber},
			// 	{Tag: "FocusAssetGroup", AssetGroupName: A.Asset.Group.Name},
			// 	{Tag: "LockName", AssetName: LockName}
			// ];
			let msg = "The " + LockName.toLowerCase() + " on " + CharacterNickname(Player) + "'s " + A.Asset.Group.Description + " opens up with a click"
			// ServerSend("ChatRoomChat", {Content: "TimerRelease", Type: "Action", Dictionary});
			ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [{Tag: "Beep", Text: msg }]});
		}

		// If we must remove the linked item from the character or the facial expression
		if (ShouldRemoveItem && A.Asset.Group.Category === "Item")
			InventoryRemove(Player, A.Asset.Group.Name);
		else if (A.Asset.Group.AllowExpression != null)
			CharacterSetFacialExpression(Player, A.Asset.Group.Name, null);
		else
			CharacterRefresh(Player);

		// Sync with the server and exit
		if (Player.ID == 0) ChatRoomCharacterUpdate(Player);
		else ServerPrivateCharacterSync();
		return;
	}


	function bctTimerLocksRemove() {
		for(let A of Player.Appearance) {
			if(TimerLastCycleCall + 1700 <= CommonTime()) {
				if(Array.isArray(A?.Property?.Effect) && (A.Property.Effect[0] === "Lock") && (A.Property.Name === bfTimerLockName)) {
					if((A.Property.RemovalTime) && (A.Property.RemovalTime <= CurrentTime) ) {
						removeTimerLock(A);
					}
				}
			}
		}
	}

	modAPI.hookFunction('TimerProcess', 2, (args, next) => { 
		bctTimerLocksRemove();
		next(args);
	})

	function createBFlocks() {
		AssetFemale3DCG.forEach(ele => {
			if(ele.Group == "ItemMisc") {
				// console.log(ele);
				ele.Asset.push(bftimerlock);
				ele.Asset.push(bflock);
			}
		})

		const G = AssetGroupGet("Female3DCG","ItemMisc");
		AssetAdd(G,bflock, AssetFemale3DCGExtended);
		AssetAdd(G,bftimerlock, AssetFemale3DCGExtended);
		InventoryAdd(Player,bfLockName,"ItemMisc");
		InventoryAdd(Player,bfTimerLockName,"ItemMisc");
	}
	createBFlocks();

	function convertHStoBF(C,item,group) {
		item.Property.Name = bfLockName;
		item.Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
		let listOwnerLovers = new Set();
		if (C.Ownership && C.Ownership.MemberNumber != null) {
			listOwnerLovers.add(C.Ownership.MemberNumber);
		}
		if(C.Lovership) {
			for (let L = 0; L < C.Lovership.length; L++) {
				const lover = C.Lovership[L];
				if (lover.MemberNumber != null)
				listOwnerLovers.add(C.Lovership[L].MemberNumber);
			}
		}
		item.Property.MemberNumberListKeys = "-1" + Array.from(listOwnerLovers).join(",");
		//+ (item.Property.LockMemberNumber) ? item.Property.LockMemberNumber : "";
		ChatRoomCharacterItemUpdate(C,group);
	}

	function convertHStoBFTimer(C,item,group) {
		item.Property.Name = bfTimerLockName;
		item.Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
		let listOwnerLovers = new Set();
		if (C.Ownership && C.Ownership.MemberNumber != null) {
			listOwnerLovers.add(C.Ownership.MemberNumber);
		}
		if(C.Lovership) {
			for (let L = 0; L < C.Lovership.length; L++) {
				const lover = C.Lovership[L];
				if (lover.MemberNumber != null)
				listOwnerLovers.add(C.Lovership[L].MemberNumber);
			}
		}
		item.Property.MemberNumberListKeys = "-1" + Array.from(listOwnerLovers).join(",");
		item.Property.MaxTime = bftimerlock.MaxTime;
		// TimerInventoryRemoveSet(C, group, bftimerlock.RemoveTimer);
		item.Property.RemovalTime = Math.round(CurrentTime + bftimerlock.RemovalTime * 1000);
		CharacterRefresh(C);
		ChatRoomCharacterItemUpdate(C, group);
	}
	//ValidationAllLockProperties decides the lock properties to be removed when unlocked
	ValidationAllLockProperties.push("Name","RemovalTime", "MaxTime");

	modAPI.hookFunction("DialogItemClick",2, (args,next) => {
		let ClickedCharBF = CharacterGetCurrent();
		let CharFocusGroup = undefined;
		let CurrentItemBF = undefined;
		let LockType = undefined;
		if((args[0].Asset.Name === bfLockName || args[0].Asset.Name === bfTimerLockName) && !DialogItemPermissionMode && !InventoryBlockedOrLimited(ClickedCharBF, args[0])) {
			// console.log("yes");
			LockType = args[0].Asset.Name;
			CharFocusGroup = ClickedCharBF.FocusGroup.Name
			CurrentItemBF = InventoryGet(ClickedCharBF, CharFocusGroup);
			args[0].Asset = AssetGet(Player.AssetFamily,"ItemMisc","HighSecurityPadlock");
		}
		next(args);
		if(!!CurrentItemBF) {
			if(LockType === bfLockName) convertHStoBF(ClickedCharBF,CurrentItemBF,CharFocusGroup);
			else if(LockType === bfTimerLockName) convertHStoBFTimer(ClickedCharBF,CurrentItemBF,CharFocusGroup);
		}
	})

	modAPI.hookFunction("DrawPreviewBox",2, (args,next) => {
		//args[2] is the path
		if(args[2] === "Assets/Female3DCG/ItemMisc/Preview/"+bfLockName+".png") {
			args[2] = "Assets/Female3DCG/ItemMisc/Preview/LoversPadlock.png";
		}else if(args[2] === "Assets/Female3DCG/ItemMisc/Preview/"+bfTimerLockName+".png") {
			args[2] = "Assets/Female3DCG/ItemMisc/Preview/LoversTimerPadlock.png";
		}
		next(args);
	})

	modAPI.hookFunction("DialogCanUnlock",2,(args,next) => {
		let C = args[0];
		let Item = args[1];
		if ((C.ID != 0) && !Player.CanInteract()) return false;
		if ((Item != null) && (Item.Property != null) && 
		(Item.Property.Name === bfLockName || Item.Property.Name === bfTimerLockName) && BFLockAccessOn.has(C.MemberNumber)) return true;
		
		return next(args);
	})

	// returns true if lover / owner / best friend 
	function checkBForAbove(C) {
		return (C.IsLoverOfPlayer() || C.IsOwnedByPlayer() || BFLockAccessOn.has(C.MemberNumber));
	}

	//DialogInventoryAdd to stop the item from being shown in the list
	//args[0] = C, args[1] = item
	modAPI.hookFunction("DialogInventoryAdd",11,(args,next) => {
		if(!DialogItemPermissionMode) {
			let asset = args[1].Asset;
			//dont add bf locks if (not self and asset = bflock and not a bct user and not a bf)
			if((args[0].ID != 0) && (asset.Name === bfLockName || asset.Name === bfTimerLockName) && !(checkBForAbove(args[0]))) {
				return;
			}
		}
		next(args);
	})

	// Handle inspect best friend timer lock: BEGIN

	function InventoryItemMiscBestFriendTimerPadlockLoad() {
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property == null)) DialogFocusSourceItem.Property = {};
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.RemoveItem == null)) DialogFocusSourceItem.Property.RemoveItem = false;
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.ShowTimer == null)) DialogFocusSourceItem.Property.ShowTimer = true;
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.EnableRandomInput == null)) DialogFocusSourceItem.Property.EnableRandomInput = false;
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.MemberNumberList == null)) DialogFocusSourceItem.Property.MemberNumberList = [];	
	}
	const BestFriendTimerChooseList = [1, 2, 4, 8, 16, 24, 48, 72, 96, 120, 144, 168, -144, -72, -48, -24, -8, -4];
	let BestFriendTimerChooseIndex = 0;

	function InventoryItemMiscBestFriendTimerPadlockDraw() {
		var C = CharacterGetCurrent();
		if ((DialogFocusItem == null) || (DialogFocusSourceItem.Property.RemovalTime < CurrentTime)) { InventoryItemMiscBestFriendTimerPadlockExit(); return; }
		if (DialogFocusSourceItem.Property.ShowTimer) {
			DrawText(DialogFindPlayer("TimerLeft") + " " + TimerToString(DialogFocusSourceItem.Property.RemovalTime - CurrentTime), 1500, 150, "white", "gray");
		} else { DrawText(DialogFindPlayer("TimerUnknown"), 1500, 150, "white", "gray"); }
		//changed Asset to draw
		DrawAssetPreview(1387, 225, AssetGet("Female3DCG","ItemMisc",bfTimerLockName));//AssetGet("Female3DCG","ItemMisc","LoversTimerPadlock"));
		DrawText(bfLockQuote, 1500, 600, "white", "gray");
	
		// Draw the settings
		if (Player.CanInteract() && checkBForAbove(C)) {
			MainCanvas.textAlign = "left";
			DrawButton(1100, 666, 64, 64, "", "White", (DialogFocusSourceItem.Property.RemoveItem) ? "Icons/Checked.png" : "");
			DrawText(DialogFindPlayer("RemoveItemWithTimer"), 1200, 698, "white", "gray");
			DrawButton(1100, 746, 64, 64, "", "White", (DialogFocusSourceItem.Property.ShowTimer) ? "Icons/Checked.png" : "");
			DrawText(DialogFindPlayer("ShowItemWithTimerRemaining"), 1200, 778, "white", "gray");
			DrawButton(1100, 826, 64, 64, "", "White", (DialogFocusSourceItem.Property.EnableRandomInput) ? "Icons/Checked.png" : "");
			DrawText(DialogFindPlayer("EnableRandomInput"), 1200, 858, "white", "gray");
			MainCanvas.textAlign = "center";
		} else {
			if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.LockMemberNumber != null))
				DrawText(DialogFindPlayer("LockMemberNumber") + " " + DialogFocusSourceItem.Property.LockMemberNumber.toString(), 1500, 700, "white", "gray");
	
			let msg = "Can only be unlocked or extended by Best Friends and above";//DialogFindPlayer(DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name + "Detail");
			// const subst = ChatRoomPronounSubstitutions(CurrentCharacter, "TargetPronoun", false);
			// msg = CommonStringSubstitute(msg, subst);
			DrawText(msg, 1500, 800, "white", "gray");
	
			DrawText(DialogFindPlayer((DialogFocusSourceItem.Property.RemoveItem) ? "WillRemoveItemWithTimer" : "WontRemoveItemWithTimer"), 1500, 868, "white", "gray");
		}
	
		// Draw buttons to add/remove time if available
		if (Player.CanInteract() && checkBForAbove(C)) {
			DrawButton(1100, 910, 250, 70, DialogFindPlayer("AddTimerTime"), "White");
			DrawBackNextButton(1400, 910, 250, 70, BestFriendTimerChooseList[BestFriendTimerChooseIndex] + " " + DialogFindPlayer("Hours"), "White", "",
				() => BestFriendTimerChooseList[(BestFriendTimerChooseList.length + BestFriendTimerChooseIndex - 1) % BestFriendTimerChooseList.length] + " " + DialogFindPlayer("Hours"),
				() => BestFriendTimerChooseList[(BestFriendTimerChooseIndex + 1) % BestFriendTimerChooseList.length] + " " + DialogFindPlayer("Hours"));
		}
		else if (Player.CanInteract() && DialogFocusSourceItem.Property.EnableRandomInput) {
			for (let I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++) {
				if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
			}
			DrawButton(1100, 910, 250, 70, "- 2 " + DialogFindPlayer("Hours"), "White");
			DrawButton(1400, 910, 250, 70, DialogFindPlayer("Random"), "White");
			DrawButton(1700, 910, 250, 70, "+ 2 " + DialogFindPlayer("Hours"), "White");
		}
	}

	function InventoryItemMiscBestFriendTimerPadlockClick() {
		if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) InventoryItemMiscBestFriendTimerPadlockExit();
		if (!Player.CanInteract()) return;
		var C = CharacterGetCurrent();
	
		if (!!C.BCT && checkBForAbove(C)) {
			if ((MouseX >= 1100) && (MouseX <= 1164)) {
				if ((MouseY >= 666) && (MouseY <= 730)) { DialogFocusSourceItem.Property.RemoveItem = !(DialogFocusSourceItem.Property.RemoveItem); }
				if ((MouseY >= 746) && (MouseY <= 810)) { DialogFocusSourceItem.Property.ShowTimer = !(DialogFocusSourceItem.Property.ShowTimer); }
				if ((MouseY >= 826) && (MouseY <= 890)) { DialogFocusSourceItem.Property.EnableRandomInput = !(DialogFocusSourceItem.Property.EnableRandomInput); }
				if (CurrentScreen == "ChatRoom") ChatRoomCharacterItemUpdate(CharacterGetCurrent());
			}
		}
	
		if ((MouseY >= 910) && (MouseY <= 975)) {
			if (!!C.BCT && checkBForAbove(C)) {
				if ((MouseX >= 1100) && (MouseX < 1350)) InventoryItemMiscBestFriendTimerPadlockAdd(BestFriendTimerChooseList[BestFriendTimerChooseIndex] * 3600);
				if ((MouseX >= 1400) && (MouseX < 1650)) {
					if (MouseX <= 1525) BestFriendTimerChooseIndex = (BestFriendTimerChooseList.length + BestFriendTimerChooseIndex - 1) % BestFriendTimerChooseList.length;
					else BestFriendTimerChooseIndex = (BestFriendTimerChooseIndex + 1) % BestFriendTimerChooseList.length;
				}
			}
			else if (DialogFocusSourceItem.Property.EnableRandomInput) {
				for (let I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++) {
					if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
				}
				if ((MouseX >= 1100) && (MouseX < 1350)) { InventoryItemMiscBestFriendTimerPadlockAdd(-2 * 3600, true); }
				if ((MouseX >= 1400) && (MouseX < 1650)) { InventoryItemMiscBestFriendTimerPadlockAdd(4 * 3600 * ((Math.random() >= 0.5) ? 1 : -1), true); }
				if ((MouseX >= 1700) && (MouseX < 1950)) { InventoryItemMiscBestFriendTimerPadlockAdd(2 * 3600, true); }
			}
		}
	}

	function InventoryItemMiscBestFriendTimerPadlockAdd(TimeToAdd, PlayerMemberNumberToList) {
		const C = CharacterGetCurrent();
		const property = DialogFocusSourceItem.Property;
		const TimerBefore = property.RemovalTime;
	
		if (PlayerMemberNumberToList) {
			property.MemberNumberList.push(Player.MemberNumber);
		}
		if (property.RemovalTime > 0) {
			property.RemovalTime = Math.round(Math.min(property.RemovalTime + (TimeToAdd * 1000), CurrentTime + (property.MaxTime * 1000)));
		}
		if (CurrentScreen === "ChatRoom") {
			const timeAdded = (property.RemovalTime - TimerBefore) / (1000 * 3600);
			let msg = "TimerAddRemoveUnknownTime";
			if (property.ShowTimer) {
				msg = timeAdded < 0 ? "TimerRemoveTime" : "TimerAddTime";
			}
	
			const dictionary = new DictionaryBuilder()
				.sourceCharacter(Player)
				.destinationCharacter(C)
				.focusGroup(C.FocusGroup.Name)
				.if(property.ShowTimer)
					.text("TimerTime", Math.round(Math.abs(timeAdded)).toString())
					.textLookup("TimerUnit", "Hours")
				.endif()
				.build();
	
			ChatRoomPublishCustomAction(msg, true, dictionary);
		} 
		else { CharacterRefresh(C); }
		InventoryItemMiscBestFriendTimerPadlockExit();
	}
	
	function InventoryItemMiscBestFriendTimerPadlockExit() {
		DialogFocusItem = null;
		if (DialogInventory != null) DialogMenuButtonBuild(CharacterGetCurrent());
	}
	// Handle inspect best friend timer lock: END

	// Handle inspect best friend lock: BEGIN

	function InventoryItemMiscBestFriendPadlockLoad() {}

	function InventoryItemMiscBestFriendPadlockDraw() {
		DrawAssetPreview(1387, 225, AssetGet("Female3DCG","ItemMisc",bfLockName));
		DrawText(bfLockQuote, 1500, 600, "white", "gray");
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.LockMemberNumber != null))
			DrawText(DialogFindPlayer("LockMemberNumber") + " " + DialogFocusSourceItem.Property.LockMemberNumber.toString(), 1500, 700, "white", "gray");
	
		let msg = "Can only be unlocked by Best Friends and above";//DialogFindPlayer(DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name + "Detail");
		// const subst = ChatRoomPronounSubstitutions(CurrentCharacter, "TargetPronoun", false);
		// msg = CommonStringSubstitute(msg, subst);
		DrawText(msg, 1500, 800, "white", "gray");
	}

	function InventoryItemMiscBestFriendPadlockClick() {
		if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	}
	// Handle inspect best friend lock: END

	modAPI.hookFunction("InventoryItemMiscHighSecurityPadlockLoad",11,(args,next) => {
		if(DialogFocusSourceItem.Property.Name === bfTimerLockName) {
			InventoryItemMiscBestFriendTimerPadlockLoad();
		}else if(DialogFocusSourceItem.Property.Name === bfLockName) {
			// next(args);
			InventoryItemMiscBestFriendPadlockLoad();
		}
		else {
			next(args);
		}
	})
	modAPI.hookFunction("InventoryItemMiscHighSecurityPadlockDraw",11,(args,next) => {
		if(DialogFocusSourceItem.Property.Name === bfTimerLockName) {
			InventoryItemMiscBestFriendTimerPadlockDraw();
		}else if(DialogFocusSourceItem.Property.Name === bfLockName) {
			// DialogFocusItem = {Asset : AssetGet("Female3DCG","ItemMisc","LoversPadlock")};
			// next(args);
			InventoryItemMiscBestFriendPadlockDraw();
		}
		else {
			next(args);
		}
	})
	modAPI.hookFunction("InventoryItemMiscHighSecurityPadlockClick",11,(args,next) => {
		if(DialogFocusSourceItem.Property.Name === bfTimerLockName) {
			InventoryItemMiscBestFriendTimerPadlockClick();
		}else if(DialogFocusSourceItem.Property.Name === bfLockName) {
			// next(args);
			InventoryItemMiscBestFriendPadlockClick();
		}
		else {
			next(args);
		}
	})

	//InventoryTogglePermission < save if item is blocked/limited as server removes it
	//Add it again and ServerPlayerBlockItemsSync()

	// Images
	const IMAGES = {
		AROUSAL_THERMOMETER: "data:image/png;base64,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",
		LOGO: "data:image/png;base64,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",
		EXTREME_SEC_TIMER_LOCK: " data:image/png;base64,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" ,
		EXTREME_SEC_LOCK: " data:image/png;base64,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" ,
	}
}
runBCT();
