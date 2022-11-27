const BCT_VERSION = "0.5.0";
const BCT_Settings_Version = 7;

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
	BCT_BEEP_DELETE_SHARED = "DelRoom";
	
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

		function handleMenuClicks(mouseX){
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
							if (mouseX <= MENU_ELEMENT_X_OFFSET + currentElement.width/2) currentElement.index = PreferenceGetPreviousIndex(currentElement.backNextOptions, currentElement.index);
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
			handleMenuClicks(MouseX);
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
			handleMenuClicks(MouseX);
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
			handleMenuClicks(MouseX);
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
			handleMenuClicks(MouseX);
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

			if(C.BCT != null){
				try {
					if(C.BCT.bctSettings.splitOrgasmArousal === true){
						let Activity = args[1];
						let Zone = args[2];
						let Progress = args[3];
	
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
				if(!C.BCT || PreferenceGetZoneOrgasm(C, args[2]) || C.BCT.bctSettings.splitOrgasmArousal === false){
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

		modAPI.hookFunction('TimerProcess', 2, (args, next) => {
			if (ActivityAllowed()) {
				// Arousal can change every second, based on ProgressTimer
				if ((BCTTimerLastArousalProgress + 1000 < CurrentTime) || (BCTTimerLastArousalProgress - 1000 > CurrentTime)) {
					BCTTimerLastArousalProgress = CurrentTime;
					BCTTimerLastArousalProgressCount++;
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
												// Subtract arousal to match the set multiplier for orgasm progress
												subtractOrgasmProgress(Character[C], (1 - getOrgasmProgressMultiplier(Character[C])));
											}
										}
										if (Factor == 3) {
											BCTActivityVibratorLevel(Character[C], 3);
											if (BCTTimerLastArousalProgressCount % 3 == 0) {
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
												subtractOrgasmProgress(Character[C], (1 - getOrgasmProgressMultiplier(Character[C])));
											}
										}
										if (Factor == 2) {
											BCTActivityVibratorLevel(Character[C], 2);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 95 && BCTTimerLastArousalProgressCount % 4 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
												subtractOrgasmProgress(Character[C], (1 - getOrgasmProgressMultiplier(Character[C])));
											}
										}
										if (Factor == 1) {
											BCTActivityVibratorLevel(Character[C], 1);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 65 && BCTTimerLastArousalProgressCount % 6 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
												subtractOrgasmProgress(Character[C], (1 - getOrgasmProgressMultiplier(Character[C])));
											}
										}
										if (Factor == 0) {
											BCTActivityVibratorLevel(Character[C], 1);
											if (Character[C].BCT.splitOrgasmArousal.arousalProgress <= 35 && BCTTimerLastArousalProgressCount % 8 == 0){
												BCTActivityTimerProgress(Character[C], 1 * Character[C].BCT.bctSettings.arousalProgressMultiplier);
												subtractOrgasmProgress(Character[C], (1 - getOrgasmProgressMultiplier(Character[C])));
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
			next(args);
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
		// online friends list <TODO>
		let onlineFriends = new Set();
		// true if bct has made the request for online friends <TODO>
		let bctOnlineCheck = false;
		
		registerSocketListener("ChatRoomMessage", (data) => SendRoomNameOnChatRoomOnEntryUpdate(data));
		registerSocketListener("AccountBeep", (data) => parseBeeps(data));
		registerSocketListener("ChatRoomCreateResponse", (data) => SendRoomNameOnCreateChat(data));
		registerSocketListener("LoginResponse", () => SendRoomRequestOnRelog());

		function AddToBFList(charNumber) {
			Player.BCT.bctSettings.bestFriendsList.push(charNumber);
			bctSettingsSave(false);
		}
		function RemoveFromBFList(charNumber) {
			Player.BCT.bctSettings.bestFriendsList = Player.BCT.bctSettings.bestFriendsList.filter(member => member !== charNumber);
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
									if ((CurrentScreen === "ChatRoom") && (Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber))) {
										SendRoomName(beep.MemberNumber);
									}
									break;
								case BCT_BEEP_DELETE_SHARED:
									if (beep.MemberNumber in currentFriendsRoom) {
										delete currentFriendsRoom[beep.MemberNumber];
									}
									break;
								default:
									console.log("Invalid Message Type for BCT Beep: ", beep);
							}
						}
				}
		}
	}

	// Images
	const IMAGES = {
		AROUSAL_THERMOMETER: "data:image/png;base64,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",
		LOGO: "data:image/png;base64,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",
	}
}
runBCT();
