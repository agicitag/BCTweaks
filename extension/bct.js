const BCT_VERSION = "B.0.7.6";
const BCT_Settings_Version = 19;
const BCT_CHANGELOG = `${BCT_VERSION}
- Show Room Slots Fixed
`

const BCT_API = {
	HintForeColor : "Black",
	HintBackColor : "Yellow",
	HintBorderColor : "Black",
};

async function runBCT(){
	
	await waitFor(() => ServerSocket && ServerIsConnected);
	
	// Bondage Club Mod Development Kit (1.2.0)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();


	const modAPI = bcModSdk.registerMod({
		name: 'BCTweaks',
		fullName: 'Bondage Club Tweaks',
		version: BCT_VERSION,
		repository: 'https://github.com/agicitag/BCTweaks'
	});
	
	const BCT_MSG = "bctMsg",
	BCT_BEEP = "bctBeep",
	HIDDEN = "Hidden", // Needs to be capital 'H' !
	BCT_MSG_ACTIVITY_AROUSAL_SYNC = "bctMsgActivityArousalSync",
	BCT_MSG_INITILIZATION_SYNC = "bctMsgInitilizationSync",
	BCT_MSG_SETTINGS_SYNC = "bctMsgSettingsSync",
	BCT_CHAT_BACKGROUND_COLOR = "#539";

	const BCT_MSG_MONEY_SEND = "moneysend",
	BCT_MSG_MONEY_TAKEN = "moneytaken";

	const BCT_BEEP_ROOM_NAME_MSG = "RoomName",
	BCT_BEEP_IS_BEST_FRIEND_MSG = "Friends",
	BCT_BEEP_ACK_FRIEND_MSG = "AckFriends",
	BCT_BEEP_REQUEST_ROOM = "ReqRoom",
	BCT_BEEP_DELETE_SHARED = "DelRoom",
	BCT_BEEP_BFLOCK_ACCESS = "BFLockAcc",
	BCT_BEEP_REMOVE_LOCK_ACCESS= "BFRemoveLockAcc";

	const BF_LOCK_NAME = "Best Friend Padlock";
	
	const BF_TIMER_LOCK_NAME = "Best Friend Timer Padlock";

	const BCT_TIPS = [
		"Tip: Send money to other players using /send-money",
		"Tip: You can add players as Best Friends through Friendlist.",
		"Tip: Setting hints are shown by clicking on them.",
		"Note: Permission to use High-sec lock is required to use BF locks.",
		"Tip for male genitals: Check Arousal setting if you want to use auto-erection.",
		"Tip: You can share private rooms directly with anyone through Best Friends settings."
	]

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
	showRoomSlots();
	splitOrgasmArousal();
	commands();
	settingsPage();
	tailWagging();
	bctBestFriend();
	//send Initilization when started when already in a chatroom
	sendBctInitilization(true);
	
	async function bctSettingsLoad(reset = false) {
		await waitFor(() => !!Player?.AccountName);

		const BCT_DEFAULT_SETTINGS = {
			splitOrgasmArousal: true,
			arousalbarLocation: "Bottom",
			arousalProgressMultiplier: 1.0,
			arousalDecayMultiplier: 1.0,
			orgasmProgressMultiplier: 1.0,
			orgasmDecayMultiplier: 1.0,
			arousalAffectsOrgasmProgress: true,
			arousalAffectsErection: true,
			automaticErectionThreshold: 25,
			tailWaggingEnable: false,
			tailWaggingTailOneName: "PuppyTailStrap1",
			tailWaggingTailOneColor: "#431A12",
			tailWaggingTailTwoName: "WolfTailStrap3",
			tailWaggingTailTwoColor: "#310D0C",
			tailWaggingDelay: 500,
			tailWaggingCount: 3,
			bestFriendsEnabled: true,
			bestFriendsRoomShare: true,
			bestFriendsList: [],
			miscShareRoomList: [],
			hsToBFLockconvert: false,
			ItemPerm : {
				[BF_LOCK_NAME] : "Normal",
				[BF_TIMER_LOCK_NAME] : "Normal",
			},
			allIconOnlyShowOnHover : false,
			bctIconOnlyShowOnHover : true,
			showChangelog: true,
			friendlistSlotsEnabled: true,
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

		if (reset == true) {
			Player.OnlineSettings.BCT = null;
			localStorage.removeItem(bctSettingsKey());
			bctBeepNotify("BCTweaks Reset", "All your settings have been changed to default.");

		}

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
				(typeof settings.version === "undefined" ||
				settings.version < BCT_Settings_Version) &&
				(reset != true)
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
		bctBeepNotify("BCTweaks updated", "BCTweaks got updated. You can find the changelog in the settings or through /bctweaks-changelog command.");
		await waitFor(() => !!document.getElementById("TextAreaChatLog"));
		if(Player.BCT.bctSettings.showChangelog) bctChatNotify(`BCTweaks got updated. Changelog (/bctweaks-changelog):\n${BCT_CHANGELOG}`);
	}

	function bctChatNotify(node) {
		const div = document.createElement("div");
		div.setAttribute("class", "ChatMessage ChatMessageChat");
		div.setAttribute("data-time", ChatRoomCurrentTime());
		div.setAttribute("data-sender", Player.MemberNumber.toString());
		div.style.backgroundColor = BCT_CHAT_BACKGROUND_COLOR;
		div.style.fontWeight = "bold";
		if (typeof node === "string") {
			div.appendChild(document.createTextNode(node));
		} else if (Array.isArray(node)) {
			div.append(...node);
		} else {
			div.appendChild(node);
		}

		ChatRoomAppendChat(div);
	};

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
								AddRelationDialog(sender);
								if(message.replyRequested)	sendBctInitilization(false);
								break;
							case BCT_MSG_ACTIVITY_AROUSAL_SYNC:
								if (!sender.BCT) break;
								sender.BCT.splitOrgasmArousal.arousalProgress = message.bctArousalProgress;
								sender.BCT.splitOrgasmArousal.ProgressTimer = message.bctProgressTimer;
								break;
							case BCT_MSG_SETTINGS_SYNC:
								if (!sender.BCT) break;
								sender.BCT.bctSettings = message.bctSettings;
								AddRelationDialog(sender);
								break;
							case BCT_MSG_MONEY_SEND:
								MoneyAcceptorDeclineButton(data.Sender, message.bctMoneySentAmount);
								break;
							case BCT_MSG_MONEY_TAKEN:
								if(message.bctMoneyTaken) AcceptedMoneyHandler(CharacterNickname(sender), data.Sender, message.bctAmount);
								else DeclinedMoneyHandler(CharacterNickname(sender), data.Sender,message.bctAmount);
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

	function controllerIsActive() {
		if (typeof ControllerIsActive === "function") { // R92
			return ControllerIsActive();
		} else if (typeof ControllerActive === "boolean") { // R91
			return ControllerActive;
		} else {
			return false;
		}
	}
	
	async function commands() {
		await waitFor(() => !!Commands);
		const BCT_COMMANDS = [
			{
				Tag:"send-money",
				Description:"[MemberNumber] [Amount] Sends the target player the specified amount of money.",
				Action:(x,y,args) => {
					let pattern = /^\d+$/;
					let MemberNumber;
					let Amount;
					if(args.length == 0) {
						bctChatNotify("/send-money [MemberNumber] [Amount] - Sends the target player the specified amount of money.");
						return;
					}
					if(pattern.test(args[0]) && (parseInt(args[0]) != Player.MemberNumber)) MemberNumber = parseInt(args[0]);
					else {
						bctChatNotify("Invalid Member Number");
						return;
					}
					if(pattern.test(args[1]) && (parseInt(args[1]) < Player.Money)) Amount = parseInt(args[1]);
					else {
						bctChatNotify("Invalid Amount");
						return;
					}

					let charData = ChatRoomCharacter.find((char) => char.MemberNumber === MemberNumber);
					if(!!charData) {
						SendMoneyToMember(MemberNumber, CharacterNickname(charData),Amount);
					}
					else bctChatNotify("Target player currently not in the same chatroom");
				},
			},
			{
				Tag:"bctweaks-changelog",
				Description:"Shows the changes in the newer version of BCTweaks.",
				Action:() => {
					bctChatNotify(BCT_CHANGELOG);
				}
			},
		]
		CommandCombine(BCT_COMMANDS);
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
			BCTArousal: "Arousal",
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
		PreferenceSubscreenList.splice(16, 0 ,"BCTSettings");

		modAPI.hookFunction("TextGet", 2, (args, next) => {
			if(args[0] == "HomepageBCTSettings") return "BCTweaks Settings";
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
		function DrawTextWrapGood(Text, X, Y, Width, Height, ForeColor = "Black", BackColor = null, BorderColor = "Black", MaxLine = null) {
			if (controllerIsActive()) {
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
				MainCanvas.strokeStyle = BorderColor;
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
		function backNextWithBF(setting, backNextOptions) {
			if (setting == BF_LOCK_NAME || setting == BF_TIMER_LOCK_NAME) {
				if((backNextOptions.indexOf(Player.BCT.bctSettings.ItemPerm[setting]) < 0)) {
					return 0;
				}else {
					return backNextOptions.indexOf(Player.BCT.bctSettings.ItemPerm[setting]);
				}
			}
			if((backNextOptions.indexOf(Player.BCT.bctSettings[setting]) < 0)) {
				return 0;
			}else {
				return backNextOptions.indexOf(Player.BCT.bctSettings[setting]);
			}
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
				index: backNextWithBF(setting, backNextOptions),
				//(backNextOptions.indexOf(Player.BCT.bctSettings[setting]) < 0) ? 0 : backNextOptions.indexOf(Player.BCT.bctSettings[setting])
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
				DrawTextWrapGood(settingsHint, 1350, 200, 555, 725, ForeColor = BCT_API.HintForeColor, BackColor = BCT_API.HintBackColor, BorderColor = BCT_API.HintBorderColor);
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
							if(currentElement.setting == BF_LOCK_NAME || currentElement.setting == BF_TIMER_LOCK_NAME) {
								Player.BCT.bctSettings.ItemPerm[currentElement.setting] = currentElement.backNextOptions[currentElement.index];
							}
							else Player.BCT.bctSettings[currentElement.setting] = currentElement.backNextOptions[currentElement.index];
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
			DrawText("- Bondage Club Tweaks Settings -",	500, 125, "Black", "Gray");
			MainCanvas.textAlign = "center";
			//Show tips every 10 secs
			DrawTextWrapGood(BCT_TIPS[Math.floor(((TimerGetTime()%100000)/100000)*(BCT_TIPS.length))], 1650, 400, 400, 100, ForeColor = BCT_API.HintForeColor);

			DrawText("Your BCTweaks version: " + BCT_VERSION, 1450+400/2, 625, "Black", "Gray");
			DrawButton(1450, 650, 400, 90, "Open Changelog", "White", "", "Open Changelog on Github");
			DrawButton(1450, 755, 400, 90, "Open Beta Changelog", "White", "", "Open Beta Changelog on Github");
			DrawButton(1500, 860, 300, 90, "Reset", "Red", "Icons/Reset.png", "Reset ALL Settings (including best friends list).")
			
			if (PreferenceMessage != "") DrawText(PreferenceMessage, 865, 125, "Red", "Black");
			
			// Draw all the buttons to access the submenus
			for (let A = 0; A < bctSettingsCategories.length; A++) {
				ControllerIgnoreButton = true;
				//DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "Icons/" + bctSettingsCategories[A] + ".png");
				DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "Icons/Arcade.png");
				ControllerIgnoreButton = false;
				DrawTextFit(bctSettingCategoryLabels[bctSettingsCategories[A]], 745 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7), 310, "Black");
				if (controllerIsActive()) {
					setButton(745 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7));
				}
			}
		};

		function resetSettings() {
				CommonDynamicFunction("PreferenceSubscreenResetLoad()")
				PreferenceSubscreen = "Reset";
				PreferencePageCurrent = 1;
		}
		PreferenceSubscreenResetLoad = function () {
			currentPageNumber = 1;
		}
		PreferenceSubscreenResetRun = function () {
			DrawTextWrapGood("Do you want to reset all settings to Defaults?",1000, 200, 800, 100, ForeColor = BCT_API.HintForeColor);
			DrawButton(400, 650, 300, 100, "Confirm", "Red","","Confirm Reset and Exit");
			DrawButton(1300, 650, 300, 100, "Cancel","White","","Cancel Reset");
		}
		PreferenceSubscreenResetClick = function () {
			if (MouseIn(400, 650, 300, 100)) {
				bctSettingsLoad(reset = true);
				defaultExit();
			}
			if (MouseIn(1300, 650, 300, 100)) {
				defaultExit();
			}
		}
		PreferenceSubscreenResetExit = function () {
			defaultExit();
		}
		
		PreferenceSubscreenBCTSettingsClick = function () {
			
			// Exit button
			if (MouseIn(1815, 75, 90, 90)) PreferenceExit();
			if (MouseIn(1450, 650, 400, 90)) window.open("https://github.com/agicitag/BCTweaks/blob/main/extension/Changelog.md", "_blank");
			if (MouseIn(1450, 755, 400, 90)) window.open("https://github.com/agicitag/BCTweaks/blob/beta/extension/Changelog.md", "_blank");
			if (MouseIn(1500, 860, 300, 90)) resetSettings();
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
			addMenuCheckbox(64, 64, "Arousal Affects Erection:", "arousalAffectsErection",
			"Let your arousal affect the state of your erection.",
			"!Player.HasPenis()"
			);
			addMenuInput(200, "Erection Threshold:", "automaticErectionThreshold", "InputAutomaticErectionThreshold",
			"Set the threshold when your penis should get erect (in %)."
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
				&& CommonIsNumeric(ElementValue("InputAutomaticErectionThreshold"))
				&& CommonIsNumeric(ElementValue("InputOrgasmDecayMultiplier"))){
				Player.BCT.bctSettings.arousalProgressMultiplier = ElementValue("InputArousalProgressMultiplier");
				Player.BCT.bctSettings.orgasmProgressMultiplier = ElementValue("InputOrgasmProgressMultiplier");
				Player.BCT.bctSettings.arousalDecayMultiplier = ElementValue("InputArousalDecayMultiplier");
				Player.BCT.bctSettings.automaticErectionThreshold = ElementValue("InputAutomaticErectionThreshold");
				Player.BCT.bctSettings.orgasmDecayMultiplier = ElementValue("InputOrgasmDecayMultiplier");
				ElementRemove("InputArousalProgressMultiplier");
				ElementRemove("InputOrgasmProgressMultiplier");
				ElementRemove("InputArousalDecayMultiplier");
				ElementRemove("InputAutomaticErectionThreshold");
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
			DrawTextWrapGood("Main Tail:", 550, 750, 100, 80, ForeColor = BCT_API.HintForeColor);
			DrawCharacter(tailPreviewMain, 600, 600, 0.5, false);
			DrawTextWrapGood("Secondary Tail:", 1000, 750, 200, 80, Forecolor = BCT_API.HintForeColor);
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
			addMenuCheckbox(64, 64, "Show BCT Icon on hover: ", "bctIconOnlyShowOnHover",
			"BCTweaks overlay icon (the ones that show above a character in chatroom) would only show when the mouse hovers above the character. Otherwise it will be hidden."
			);
			addMenuCheckbox(64, 64, "Show Base BC Icon on hover: ", "allIconOnlyShowOnHover",
			"Base BC's overlay icons would only show when the mouse hovers above the character. Otherwise it will be hidden. Reduces the icon clutter without losing functionality."
			);
			addMenuCheckbox(64, 64, "Show Changelog on Update: ", "showChangelog",
			"Show the newest changes in your chat the first time you join a room after an update. You can always show them by typing /bctweaks-changelog"
			);
			addMenuCheckbox(64, 64, "Enable Friendlist Slots: ", "friendlistSlotsEnabled",
			`Enable showing free/max slots for rooms on your friendlist and makes the space for the roomname bigger`
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
			addMenuCheckbox(64,64,"Convert HS to BF Lock:","hsToBFLockconvert",
			`Converts any High-Security Padlock added by a best friend to Best Friend Padlock.`,
			"!Player.BCT.bctSettings.bestFriendsEnabled"
			);
			addMenuInput(300, "Show Room Name directly to:", "miscShareRoomList", "InputMiscShareRoomList",
			`Show these users your private room without adding them as Best Friend (You need to have Room Share Enabled).
Input should be comma separated Member IDs. (Maximum 30 members)`
			);
			addMenuBackNext(250, 60, "BF Lock Permission", BF_LOCK_NAME, ["Normal", "Limited", "Blocked", "Fav"],
			"Use this instead of regular item permissions."
			);
			addMenuBackNext(250, 60, "BF Timer Lock Permission", BF_TIMER_LOCK_NAME, ["Normal", "Limited", "Blocked", "Fav"],
			"Use this instead of regular item permissions."
			);
		}
		PreferenceSubscreenBCTBestFriendsRun = function () {
			drawMenuElements();
		}
		PreferenceSubscreenBCTBestFriendsClick = function () {
			handleMenuClicks();
		}
		PreferenceSubscreenBCTBestFriendsExit = function () {
			//Filter for item permissions of locks
			FilterItemPermissions();
			//Add perms
			UpdateItemPermissions();
			if (!(Player.BCT.bctSettings.bestFriendsEnabled) || !(Player.BCT.bctSettings.bestFriendsRoomShare)) {
				for (const friend of Player.BCT.bctSettings.bestFriendsList) {
					SendBeep(friend,BCT_BEEP,BCT_BEEP_DELETE_SHARED,true);
				}
			}
			let ShareList = ElementValue("InputMiscShareRoomList").split(",");
			let memberCheck = (ele) => {
				if (CommonIsNumeric(ele) && Number.isInteger(parseFloat(ele))) return true;
			}
			if (ElementValue("InputMiscShareRoomList") === "") {
				Player.BCT.bctSettings.miscShareRoomList = [];
				ElementRemove("InputMiscShareRoomList");
				defaultExit();
			}
			else if (ShareList.length <= 30 && ShareList.every(memberCheck)) {
				Player.BCT.bctSettings.miscShareRoomList = [...new Set(ShareList.map((ele) => {return parseInt(ele);}))];
				ElementRemove("InputMiscShareRoomList");
				defaultExit();
			}
			else PreferenceMessage = "Member ID List is invalid";
		};
	}

	const BCT_AUTHORS = [80525,78366];
	var countchange = 0;
	const BCT_CHARS = ["𝓑","𝓒","𝓣"];
	var oth = 0;

	function addEveryTs() {
		oth = oth % 100 + 1;
	}
	function addEverySec() {
		countchange = countchange % 100 + 1;
	}
	const rainbowcolors = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080"];
	// const bctIconOnlyShowOnHover = true;
	// const allIconOnlyShowOnHover = false;
	setInterval(addEverySec, 1000);
	setInterval(addEveryTs, 3000);

	modAPI.patchFunction("ChatRoomCharacterViewDrawOverlay", {
		"if (ChatRoomHideIconState == 0)":
		"if (ChatRoomHideIconState == 0 && (!Player.BCT.bctSettings.allIconOnlyShowOnHover || MouseHovering(CharX,CharY,500*Zoom,70*Zoom)))"
	});
	modAPI.hookFunction("ChatRoomCharacterViewDrawOverlay", 2, (args,next) => {		
		const [C, CharX, CharY, Zoom] = args;
		// if (!allIconOnlyShowOnHover && !MouseHovering(CharX,CharY,500*Zoom,70*Zoom)) return;
		if (C.BCT && ChatRoomHideIconState == 0 && (!Player.BCT.bctSettings.bctIconOnlyShowOnHover || MouseHovering(CharX,CharY,500*Zoom,70*Zoom))) {
			if ((Player.BCT.bctSettings.bestFriendsList.includes(C.MemberNumber))) {
					DrawImageResize("Assets/Female3DCG/Emoticon/Hearts/Emoticon.png",CharX + 133 * Zoom, CharY + 27 * Zoom, 40 * Zoom, 40 * Zoom);
				}
			DrawTextFit(BCT_CHARS[oth%BCT_CHARS.length], CharX + 130 * Zoom, CharY + 55 * Zoom, 25 * Zoom, rainbowcolors[countchange%rainbowcolors.length]);
			if (BCT_AUTHORS.includes(C.MemberNumber)) {
				DrawTextFit("Author",CharX + 130 * Zoom, CharY + 75 * Zoom, 40 * Zoom, rainbowcolors[countchange%rainbowcolors.length]);
			}
		}
		next(args);
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
				BCTAutoErect(C);
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

				BCTAutoErect(C);
			}
		}

		function BCTAutoErect(C){
			if(C.BCT != null && C.BCT.bctSettings.splitOrgasmArousal === true){
				if(C.ID === 0 && C.BCT.bctSettings.arousalAffectsErection && C.HasPenis()){
					if(C.BCT.splitOrgasmArousal.arousalProgress >= C.BCT.bctSettings.automaticErectionThreshold){
						CharacterSetFacialExpression(C, "Pussy", "Hard");
					}
					else if (C.BCT.splitOrgasmArousal.arousalProgress < C.BCT.bctSettings.automaticErectionThreshold){
						CharacterSetFacialExpression(C, "Pussy", null);
					}
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

		function BCTActivitySetArousalTimer(C, Activity, Zone, Progress, Asset){
			try {
				if(C?.BCT?.bctSettings?.splitOrgasmArousal === true){
					//Arousal Progress Multiplier
					Progress = Progress * C.BCT.bctSettings.arousalProgressMultiplier;
					
					// If there's already a progress timer running, we add it's value but divide it by 2 to lessen the impact, the progress must be between -25 and 25
					if ((C.BCT.splitOrgasmArousal.ProgressTimer == null) || (typeof C.BCT.splitOrgasmArousal.ProgressTimer !== "number") || isNaN(C.BCT.splitOrgasmArousal.ProgressTimer)) C.BCT.splitOrgasmArousal.ProgressTimer = 0;
					Progress = Math.round((C.BCT.splitOrgasmArousal.ProgressTimer / 2) + Progress);
					if (Progress < -25) Progress = -25;
					if (Progress > 25) Progress = 25;

					// Limit max arousal values
					var Max = ((Activity == null || Activity.MaxProgress == null) || (Activity.MaxProgress > 100)) ? 100 : Activity.MaxProgress;

					if ((Progress > 0) && (C.BCT.splitOrgasmArousal.arousalProgress + Progress > Max)) Progress = (Max - C.BCT.splitOrgasmArousal.arousalProgress >= 0) ? Max - C.BCT.splitOrgasmArousal.arousalProgress : 0;

					// If we must apply a progress timer change, we publish it
					if (C.BCT.splitOrgasmArousal.ProgressTimer !== Progress) {
						C.BCT.splitOrgasmArousal.ProgressTimer = Progress;
						ActivityChatRoomBCTArousalSync(C);
					}
				}	
			} catch (error) {
				console.error("Error setting arousal timer for character: " + C.Name + ".");
			}
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

		// Handle random effects
		modAPI.hookFunction('ActivityEffectFlat', 2, (args, next) => {
			let C = args[1];
			let Amount = args[2];
			let Zone = args[3];
			let Count = args[4];
			let Asset = args[5];

			// next also already calls BCTActivitySetArousalTimer
			if (PreferenceGetZoneOrgasm(C, Zone)){
				next(args)
			}
			else{
				// Converts from activity name to the activity object
				if ((Amount == null) || (typeof Amount != "number")) return;
				if ((Count == null) || (Count == undefined) || (Count == 0)) Count = 1;
	
				// Calculates the next progress factor
				var Factor = Amount; // Check how much the character likes the activity, from -10 to +10
				Factor = Factor + (PreferenceGetZoneFactor(C, Zone) * 5) - 10; // The zone used also adds from -10 to +10
				Factor = Factor + ActivityFetishFactor(C) * 2; // Adds a fetish factor based on the character preferences
				Factor = Factor + Math.round(Factor * (Count - 1) / 3); // if the action is done repeatedly, we apply a multiplication factor based on the count

				BCTActivitySetArousalTimer(C, null, Zone, Factor, Asset);
			}
		});

		modAPI.hookFunction('ActivitySetArousalTimer', 2, (args, next) => {
			let C = args[0];
			let Activity = args[1];
			let Zone = args[2];
			let Progress = args[3];
			let Asset = args[4];

			BCTActivitySetArousalTimer(C, Activity, Zone, Progress, Asset);

			if(C.BCT != null) args[3] = args[3] * getOrgasmProgressMultiplier(C);

			//only let the orgasm bar progress if its and orgasm zone
			try {
				if(Zone !== "ActivityOnOther" && (!C.BCT || PreferenceGetZoneOrgasm(C, Zone) || C.BCT.bctSettings.splitOrgasmArousal === false)){
					next(args);
				}
				// Male genital support
				else if (Asset?.Name == "Penis" && Zone == "ActivityOnOther" && PreferenceGetZoneOrgasm(C, "ItemVulva")){
					next(args);
				}
			} catch (error) {
				console.error("Error handling activity for character: " + C.Name + ".")
				next(args);
			}

		});

		modAPI.hookFunction('ChatRoomCharacterViewClickCharacter', 2, (args, next) => {
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
									if(!(Item.Asset.ArousalZone in restoreValues[ChatRoomCharacter[C].ID])){
										restoreValues[ChatRoomCharacter[C].ID][Item.Asset.ArousalZone] = PreferenceGetZoneFactor(ChatRoomCharacter[C], Item.Asset.ArousalZone);
										// here it gets disabled
										PreferenceSetZoneFactor(ChatRoomCharacter[C], Item.Asset.ArousalZone, 1);
									}
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
								subtractOrgasmProgress(ChatRoomCharacter[C], (1 - getOrgasmProgressMultiplier(ChatRoomCharacter[C])));
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
					);
					ChatRoomCharacterItemUpdate(Player,"TailStraps");}
					,i * Player.BCT.bctSettings.tailWaggingDelay * 2);
				setTimeout(function(){InventoryWear(
						Player,
						Player.BCT.bctSettings.tailWaggingTailOneName,
						"TailStraps",
						Player.BCT.bctSettings.tailWaggingTailOneColor
					);
					ChatRoomCharacterItemUpdate(Player,"TailStraps");}
					,i * Player.BCT.bctSettings.tailWaggingDelay * 2 + Player.BCT.bctSettings.tailWaggingDelay);
			  }
		}
		BCT_API.tailWag = tailWag;
	}

	// Money transfer
	//Add Money to Player
	function AddMoney(Amount) {
		Player.Money += Amount;
		ServerPlayerSync();
	}
	// Withdraw from Player
	function DeductMoney(Amount) {
		Player.Money -= Amount;
		if(Player.Money < 0) Player.Money = 0;
		ServerPlayerSync();
	}

	let moneyInTransaction = [];

	modAPI.hookFunction("ChatRoomLeave",2,(args,next) => {
		next(args);
		moneyInTransaction = [];
	});

	modAPI.hookFunction("ChatRoomSyncMemberLeave",2, (args,next) => {
		moneyInTransaction = moneyInTransaction.filter((x) => x.MemberNumber != args[0].SourceMemberNumber);
		next(args);
	});

	// Sends Money through hidden chat message
	function SendMoneyToMember(TargetNumber, TargetName, Amount) {
		var currTransactionAmount = moneyInTransaction.reduce((previousValue,curr) => previousValue + curr.Amount,0) + Amount;
		if(Player.Money - currTransactionAmount < 0) {
			bctChatNotify(`Not enough Money (Current Balance: ${Player.Money}$, in transaction: ${currTransactionAmount}$ and sending ${Amount}$)`);
			return;
		}
		bctChatNotify(`Sending ${Amount}$ to ${TargetName}...`);
		moneyInTransaction.push({
			"MemberNumber" : TargetNumber,
			"Amount": Amount,
		});

		const message = {
			Type: HIDDEN,
			Content: BCT_MSG,
			Sender: Player.MemberNumber,
			Dictionary: [
				{
					message: {
						type: BCT_MSG_MONEY_SEND,
						bctVersion: BCT_VERSION,
						bctMoneySentAmount: Amount,
						target: TargetNumber,
					},
				},
			],
			Target: TargetNumber,
		};
		ServerSend("ChatRoomChat", message);
	}
	// Send if player accepted or rejected the money
	let MoneySendCount = 0;
	function SendMoneyAcceptAck(SenderNumber, SentNum, Amount, Accept) {
		document.getElementById(`moneyaccept-${SenderNumber}-${SentNum}`).style.display = "none";
		document.getElementById(`moneydecline-${SenderNumber}-${SentNum}`).style.display = "none";
		//Sender not in chatroom then don't accept
		if(!ChatRoomCharacter.some((character) => character.MemberNumber === SenderNumber)) {
			bctChatNotify("Sender left the chatroom.");
			return;
		}
		if(Accept) {
			bctChatNotify("Money Accepted");
			AddMoney(Amount);
		}
		else {
			bctChatNotify("Money Declined");
		}

		const message = {
			Type: HIDDEN,
			Content: BCT_MSG,
			Sender: Player.MemberNumber,
			Dictionary: [
				{
					message: {
						type: BCT_MSG_MONEY_TAKEN,
						bctMoneyTaken: Accept,
						bctAmount: Amount,
						target: SenderNumber,
					},
				},
			],
			Target: SenderNumber,
		};
		ServerSend("ChatRoomChat", message);
	}

	//Handle Declined money message 
	function DeclinedMoneyHandler(SenderName, SenderNumber, Amount) {
		//show some message that the sent money got rejected
		let remIdx = moneyInTransaction.findIndex((ele) => SenderNumber === ele.MemberNumber && Amount === ele.Amount);
		moneyInTransaction.splice(remIdx,1);
		bctChatNotify(`${SenderName} declined the offered money ${Amount}$.`);
	}
	//Handle Accepted money message (If the money was accepted, take money out of player's account)
	function AcceptedMoneyHandler(SenderName, SenderNumber, Amount) {
		DeductMoney(Amount);
		//messsage
		let remIdx = moneyInTransaction.findIndex((ele) => SenderNumber === ele.MemberNumber && Amount === ele.Amount);
		moneyInTransaction.splice(remIdx,1);
		bctChatNotify(`${SenderName} accepted the offered money ${Amount}$.`);
	}
	function htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return template.content.firstChild;
	}
	//Show a button on screen to accept or reject money from sender
	function MoneyAcceptorDeclineButton(Sender, Amount) {
		//on accept or decline pressed
		const SenderDet = ChatRoomCharacter.find((a) => a.MemberNumber === Sender);
		if(!SenderDet) return;
		const SenderName = CharacterNickname(SenderDet);
		const moneySendDiv = `<div id="moneysend" class="ChatMessage ChatMessageChat" data-time="${ChatRoomCurrentTime()}" data-sender="${Sender}" style="background: ${BCT_CHAT_BACKGROUND_COLOR};"><span class="ChatMessageName" style="color:${SenderDet.LabelColor};">${SenderName} is sending you ${Amount}$: </span><button id="moneyaccept-${Sender}-${MoneySendCount}" class="ChatMessageName" style="color:#572844;background-color: lightgreen;margin-left: 5px;font-size: inherit;"> Accept </button><button id="moneydecline-${Sender}-${MoneySendCount}" class="ChatMessageName" style="color:#572844;background-color: red;margin-left: 5px;font-size: inherit;"> Decline </button></div>`
		const div = htmlToElement(moneySendDiv);
		ChatRoomAppendChat(div);
		const accbtn = document.getElementById(`moneyaccept-${Sender}-${MoneySendCount}`);
		accbtn.addEventListener("click", (args => () => SendMoneyAcceptAck(...args))([Sender,MoneySendCount,Amount,true]));
		const decbtn = document.getElementById(`moneydecline-${Sender}-${MoneySendCount}`);
		decbtn.addEventListener("click", (args => () => SendMoneyAcceptAck(...args))([Sender,MoneySendCount,Amount,false]));
		MoneySendCount += 1;
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
			if (!Player.BCT.bctSettings.bestFriendsList.includes(charNumber)) {
				Player.BCT.bctSettings.bestFriendsList.push(charNumber);
				SendBeep(charNumber,BCT_BEEP,BCT_BEEP_REQUEST_ROOM,true); // Add their room name and lock access
				bctSettingsSave(false);
			}
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
					if (mode === "OnlineFriends") { 
						let sortedOSL = [];
						let	bfList = [];
						let normalfriends = [];
						// In Friend List mode, the online friends are shown
						for (const friend of data) { 
							if (Player.BCT.bctSettings.bestFriendsList.includes(friend.MemberNumber)) {
								bfList.push(friend);
							}
							else if ((Player.Ownership != null && Player.Ownership.MemberNumber === friend.MemberNumber)
									|| (Player.Lovership.some(lover => lover.MemberNumber == friend.MemberNumber))
									|| (Player.SubmissivesList.has(friend.MemberNumber))) {
								sortedOSL.push(friend);
							}
							else {
								normalfriends.push(friend);
							}
							if ((friend.Private) && (friend.ChatRoomName === null) && (friend.MemberNumber in currentFriendsRoom)) {
									friend.ChatRoomName = currentFriendsRoom[friend.MemberNumber].ChatRoomName;
									friend.ChatRoomSpace = currentFriendsRoom[friend.MemberNumber].ChatRoomSpace;
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

		modAPI.hookFunction("FriendListLoadFriendList", 2, (args,next) => {
			const mode = FriendListMode[FriendListModeIndex];
			next(args);
			if ((Player.BCT.bctSettings.bestFriendsEnabled) && (mode === "AllFriends")) {
				let htmlDoc = document.getElementById(FriendListIDs.friendList);
				for (let i = 0; i < htmlDoc.getElementsByClassName("friend-list-row").length; i++) {
					let member = parseInt(htmlDoc.getElementsByClassName("friend-list-column MemberNumber")[i].innerText);
					if (Player.BCT.bctSettings.bestFriendsList.includes(member) 
					&& !(Player.Ownership != null && Player.Ownership.MemberNumber === member)
					&& !(Player.Lovership.some(lover => lover.MemberNumber == member))) {
							let BFelement = htmlDoc.getElementsByClassName("friend-list-column RelationType")[i];
							const BFelementText = Array.from(BFelement.childNodes).find(e => e.nodeType === Node.TEXT_NODE);
							BFelementText.textContent = "Best Friend";
							BFelement.style.cursor = "pointer";
							BFelement.style.textDecoration = "underline";
							BFelement.style.color = "lime";
							let  onHoverBF = () => {
								BFelementText.textContent = "Delete BF?";
							}
							let onOutBF = () => {
								BFelementText.textContent = "Best Friend";
							}
							let onClickBF = () => {
								BFelementText.textContent = "Deleted";
								RemoveFromBFList(member);
								BFelement.removeEventListener("mouseenter",onHoverBF);
								BFelement.removeEventListener("mouseleave",onOutBF);
							}
							BFelement.addEventListener("mouseenter", onHoverBF);
							BFelement.addEventListener("mouseleave", onOutBF);
							BFelement.addEventListener("click",onClickBF);
					}
					else if (!(Player.Ownership != null && Player.Ownership.MemberNumber === member)
					&& !(Player.Lovership.some(lover => lover.MemberNumber == member))){
							let NonBFelement = htmlDoc.getElementsByClassName("friend-list-column RelationType")[i];
							const NonBFelementText = Array.from(NonBFelement.childNodes).find(e => e.nodeType === Node.TEXT_NODE);
							NonBFelement.style.cursor = "pointer";
							let forUndo = "";
							let  onHoverBF = () => {
								forUndo = NonBFelementText.textContent;
								NonBFelementText.textContent = "Add as BF?";
								NonBFelement.style.textDecoration = "underline";
							}
							let onOutBF = () => {
								NonBFelementText.textContent = forUndo;
								NonBFelement.style.textDecoration = "";
							}
							let onClickBF = () => {
								NonBFelementText.textContent = "Added";
								AddToBFList(member);
								NonBFelement.removeEventListener("mouseenter",onHoverBF);
								NonBFelement.removeEventListener("mouseleave",onOutBF);
							}
							NonBFelement.addEventListener("mouseenter", onHoverBF);
							NonBFelement.addEventListener("mouseleave", onOutBF);
							NonBFelement.addEventListener("click",onClickBF);
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
		}

		// Returns intersection of Online Friends and Best Friends
		async function AvailableBFList() {
			bctOnlineCheck = true;
			onlineFriends = null;
			ServerSend("AccountQuery", { Query: "OnlineFriends" });
			await waitFor(() => !!onlineFriends);
			let intersect = Player.BCT.bctSettings.bestFriendsList.filter(ele => onlineFriends.has(ele));
			return intersect;
		}

		// Returns intersection of Online Friends and Room Share Only Friends
		async function AvailableMiscList() {
			bctOnlineCheck = true;
			onlineFriends = null;
			ServerSend("AccountQuery", { Query: "OnlineFriends" });
			await waitFor(() => !!onlineFriends);
			let intersect = Player.BCT.bctSettings.miscShareRoomList.filter(ele => onlineFriends.has(ele));
			return intersect;
		}

		// Returns Online Friends List
		async function AvailableFriendList() {
			bctOnlineCheck = true;
			onlineFriends = null;
			ServerSend("AccountQuery", { Query: "OnlineFriends" });
			await waitFor(() => !!onlineFriends);
			return onlineFriends;
		}
		
		// Ask best friends room name on quick relog or first entry
		// For complete load it should work directly
		async function RequestRoomName() {
			let onlineFriends = await AvailableFriendList();
			let i = 1;
			for (const friend of onlineFriends) {
				await sleep(300 * i);
				SendBeep(friend,BCT_BEEP,BCT_BEEP_REQUEST_ROOM,true);
				i++;
			}
		}
		RequestRoomName();
		function SendRoomRequestOnRelog() {
			RequestRoomName();
		}

		// checks if the other person has added player and then sends room
		async function CheckAndSendRoomName() {
			let reqList = await AvailableBFList();
			let i = 1;
			for (const friend of reqList) {
				await sleep(100 * i);
				IsBestFriend(friend);
				i++;
			}
		}
		async function SendRoomNameToMisc() {
			let reqList = await AvailableMiscList();
			let i = 1;
			for(const member of reqList) {
				await sleep(100 * i);
				SendRoomName(member);
				i++;
			}
		}

		// send player room name when they enter a chatroom or update the room
		let CurrentChatRoomName = "";
		async function SendRoomNameOnChatRoomOnEntryUpdate(data) 
		{
			if (Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.bestFriendsRoomShare) {
				if ((data != null) && (typeof data === "object") && (data.Content != null) && (typeof data.Content === "string")
				&& (data.Content != "") && (data.Sender != null) && (typeof data.Sender === "number")) 
				{
					if (((data.Content === "ServerUpdateRoom") || (data.Content === "ServerEnter" && Player.MemberNumber === data.Sender)) 
					&& (ChatRoomData.Private) && (ChatRoomData.Name !== CurrentChatRoomName)) {
							CurrentChatRoomName = ChatRoomData.Name;
							CheckAndSendRoomName();
							SendRoomNameToMisc();
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
					SendRoomNameToMisc();
				}
			}
		}
		
		// parse Beep for Room Name 
		function parseBeeps(data) {
			if ((data != null) && (typeof data === "object") && !Array.isArray(data) && (data.MemberNumber != null) && 
					(typeof data.MemberNumber === "number") && (data.MemberName != null) && (typeof data.MemberName === "string"))	{
						
						if(data.BeepType === BCT_BEEP){
							// console.log("BEEP Type : ",data);
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
									if(Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber)) {
										if (( Player.BCT.bctSettings.bestFriendsRoomShare 
										&& CurrentScreen === "ChatRoom" && ChatRoomData.Private)) {
											SendRoomName(beep.MemberNumber);
										}
										SendBeep(beep.MemberNumber,BCT_BEEP,BCT_BEEP_BFLOCK_ACCESS,true);
										BFLockAccessOn.add(beep.MemberNumber); // Room request happens on each login and best friend add
									}
									break;
								case BCT_BEEP_REQUEST_ROOM:
									if(Player.BCT.bctSettings.bestFriendsEnabled) {
										if ((Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber))) {
											IsBestFriend(beep.MemberNumber);
										} else if(Player.BCT.bctSettings.miscShareRoomList.includes(beep.MemberNumber) && Player.BCT.bctSettings.bestFriendsRoomShare 
										&& CurrentScreen === "ChatRoom" && ChatRoomData.Private) {
											SendRoomName(beep.MemberNumber);
										}
									}
									break;
								case BCT_BEEP_DELETE_SHARED:
									if (beep.MemberNumber in currentFriendsRoom) {
										delete currentFriendsRoom[beep.MemberNumber];
									}
									break;
								case BCT_BEEP_BFLOCK_ACCESS:
									if (Player.BCT.bctSettings.bestFriendsList.includes(beep.MemberNumber)) BFLockAccessOn.add(beep.MemberNumber);
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

	function showRoomSlots(){
		window.searchResult = {};
		let previouslyFoundRooms = [];
		window.timeout = false;
		window.bctRoomSlotCallGeneral = 0;
		window.bctRoomSlotCallNarrow = 0;
		let delayCount = 0;

		function getRoomSlotsQueue(query,space) {
			delayCount += 1;
			setTimeout(getRoomSlots(query,space), delayCount * 2000);
		}

		function getRoomSlots(query = "", space = "X"){
			const SearchData = {Query: query.toUpperCase().trim(), Language: "", Space: space, Game: "", FullRooms: true};
			
			if(query == ""){
				searchResult["bct-" + space] = [];
				bctRoomSlotCallGeneral += 1;
			}
			else{
				searchResult[query] = [];
				bctRoomSlotCallNarrow += 1;
			}
			timeout = false;
			ServerSend("ChatRoomSearch", SearchData);
		}

// Only interested in the actual list when we ask for it
const replaceResponseBegin = `
if(bctRoomSlotCallGeneral > 0){
	if (Array.isArray(data) && data.length > 0) {
		searchResult["bct-" + data[0].Space] = data;
	}
	bctRoomSlotCallGeneral -= 1;
	timeout = true;
}
else if(bctRoomSlotCallNarrow > 0) {
	if (Array.isArray(data) && data.length > 0) {
		searchResult[data[0].Name] = data;
	}
	bctRoomSlotCallNarrow -= 1;
	timeout = true;
}
else {
	ElementContent("InputSearch-datalist", "");`

const replaceResponseEnd = `ChatSearchAutoJoinRoom(); }`
		
		modAPI.patchFunction("ChatSearchResultResponse",{
			'ElementContent("InputSearch-datalist", "");': replaceResponseBegin,
			"ChatSearchAutoJoinRoom();": replaceResponseEnd,
		})

		// update previouslyFoundRooms only if room name is new or room slots has changed
		function foundRoomUpdate(newRoom) {
			let foundRoomIndex = previouslyFoundRooms.findIndex(function(room){
				return (room.Name === newRoom.Name) && (room.Space === newRoom.Space);
			});
			let foundRoom;
			if (foundRoomIndex !== -1) foundRoom = previouslyFoundRooms[foundRoomIndex];
			if (!foundRoom) {
				const addRoom = {
					"Name": newRoom.Name,
					"Space": newRoom.Space,
					"MemberCount": newRoom.MemberCount,
					"MemberLimit": newRoom.MemberLimit,
				}
				previouslyFoundRooms.push(addRoom);
			} else if(foundRoom && (foundRoom.MemberCount != newRoom.MemberCount || foundRoom.MemberLimit != newRoom.MemberLimit)) {
				previouslyFoundRooms[foundRoomIndex].MemberCount = newRoom.MemberCount;
				previouslyFoundRooms[foundRoomIndex].MemberLimit = newRoom.MemberLimit;
			}
		}

		// update from a list
		function foundRoomListUpdate(newRoomsList) {
			for(const room of newRoomsList) {
				foundRoomUpdate(room);
			}
		}

		let friendListNumberToName = {};

		modAPI.hookFunction("FriendListLoadFriendList", 2, async (args,next) => {
			let friends = args[0];
			for(const friend of friends) {
				friendListNumberToName[friend.MemberNumber] = {};
				friendListNumberToName[friend.MemberNumber]["ChatRoomName"] = friend.ChatRoomName;
				friendListNumberToName[friend.MemberNumber]["ChatRoomSpace"] = friend.ChatRoomSpace;
				friendListNumberToName[friend.MemberNumber]["IsPrivateRoom"] = friend.Private;
			}
			next(args);
			if(Player.BCT.bctSettings.friendlistSlotsEnabled){
				const mode = FriendListMode[FriendListModeIndex];
				if (mode === "OnlineFriends" && document.getElementById("friend-list")) {
					let listRoomSpaces = [];
					// Set up the page layout
					const newSlot = document.createElement("span");

					let BCTweaksID = "BCTweaksSlots";
					if (!document.getElementById(BCTweaksID) && document.getElementsByClassName("friend-list-row")) {
						newSlot.id = BCTweaksID;
                        newSlot.classList.add("friend-list-column");
                        newSlot.classList.add("mode-specific-content");
                        newSlot.classList.add("fl-online-friends-content");

                        const getBeepEle = document.getElementsByClassName("friend-list-row");
                        newSlot.innerText = "Slots";
                        getBeepEle[0].insertBefore(newSlot,getBeepEle[0].children[4]);
                        getBeepEle[0].children[1].style.width = "16%";
                        getBeepEle[0].children[2].style.width = "25%";
						getBeepEle[0].children[3].style.width = "24%";
						getBeepEle[0].children[3].style.textAlign = "right";
                        getBeepEle[0].children[4].style.width = "13%";
                    	getBeepEle[0].children[5].style.width = "16%";
						getBeepEle[0].children[6].style.textAlign = "right";
					}
					const friendTable = document.getElementById("friend-list");

					for(const row of friendTable.children){
						const slotSpan = document.createElement("span");
                        slotSpan.classList.add("friend-list-column");

						// Initialize with old results
						let foundRoom;
						let friendNumber = parseInt(row.children[1].innerText);
                        let roomName = friendListNumberToName[friendNumber].ChatRoomName;
                        let roomSpace = friendListNumberToName[friendNumber].ChatRoomSpace;
						
						if(!!roomName) {
							foundRoom = previouslyFoundRooms.find(function(room){
								return (room.Name === roomName) && (room.Space === roomSpace);
							});
						}
						// which spaces should be queried for slots
						if (roomSpace != null && !listRoomSpaces.includes(roomSpace)) {
							listRoomSpaces.push(roomSpace);
						}
						let slotContent;
						if(foundRoom) slotContent = document.createTextNode(foundRoom.MemberCount + "/" + foundRoom.MemberLimit);	
						else slotContent = document.createTextNode("-");
						slotSpan.appendChild(slotContent);
						row.insertBefore(slotSpan, row.children[2].nextSibling);
                        row.children[1].style.width = "15%";
                        row.children[2].style.width = "26%";
                        row.children[3].style.width = "13%";
                        row.children[4].style.width = "15%";
					}

					let roomsWithFriends = [];
					for(const space of listRoomSpaces) {
						getRoomSlotsQueue("",space);
						await waitFor(() => searchResult["bct-" + space] && (searchResult["bct-" + space].length > 0 || timeout));
						for(room of searchResult["bct-" + space]){
							if(room.Friends.length > 0) roomsWithFriends.push(room);
						}
					}
					
					foundRoomListUpdate(roomsWithFriends)
					let privateRooms = [];

					// Fill in the correct slots
					for(const row of friendTable.children){
						let maxSlots = 0;
						let currentSlots = 0;
						let friendNumber = parseInt(row.children[1].innerText);
                        let roomName = friendListNumberToName[friendNumber].ChatRoomName;
                        let roomSpace = friendListNumberToName[friendNumber].ChatRoomSpace;
                        let isPrivateRoom = friendListNumberToName[friendNumber].IsPrivateRoom;

						// Public rooms
						if(!isPrivateRoom){
							for(const room of previouslyFoundRooms){
								if(room.Name === roomName && room.Space === roomSpace){
									maxSlots = room.MemberLimit;
									currentSlots = room.MemberCount;
									break;
								}
							}
						}
						// Room name exists and Private Room
						else if(!!roomName){
							let foundRoom = privateRooms.find(function(room){
								return (room.Name === roomName) && (room.Space === roomSpace);
							});
							// If not, search for it
							if(!foundRoom){
								getRoomSlotsQueue(roomName,roomSpace);
								await waitFor(() => !!searchResult[roomName] && (searchResult[roomName].length > 0 || timeout));
								// Retry one more time
								if(searchResult[roomName].length == 0) {
									getRoomSlotsQueue(roomName,roomSpace);
									await waitFor(() => !!searchResult[roomName] && (searchResult[roomName].length > 0 || timeout));
								}
								if(searchResult[roomName].length > 0){
									foundRoom = searchResult[roomName][0];
									privateRooms.push(foundRoom);
									foundRoomUpdate(foundRoom);
								}
							}
							if(foundRoom){
								maxSlots = foundRoom.MemberLimit;
								currentSlots = foundRoom.MemberCount;
							} else {
								for(const room of previouslyFoundRooms){
									if(room.Name === roomName && room.Space === roomSpace){
										maxSlots = room.MemberLimit;
										currentSlots = room.MemberCount;
										break;
									}
								}
							}
						}
						if(currentSlots > 0) row.children[3].innerText = currentSlots + "/" + maxSlots;
						else row.children[3].innerText = "-";
					}
					searchResult = {};
					delayCount = 0;
				}
			}
		});
	}

	// --------Lock Features----------

	const BF_LOCK_QUOTE = `"Good friends help; best ones make you helpless"`;

	const bflock = {
		AllowType : ["LockPickSeed"],
		Effect : [],
		ExclusiveUnlock: true,
		Extended: true,
		IsLock: true,
		Name: BF_LOCK_NAME,
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
		Name: BF_TIMER_LOCK_NAME,
		PickDifficulty: 20,
		Time: 10,
		Value: 80,
		Wear: false,
		MaxTime: 604800,
		RemovalTime: 300
	}

	function removeTimerLock(A) {
		const LockName = A.Property.Name;
		const ShouldRemoveItem = A.Property.RemoveItem;

		// Remove any lock or timer
		ValidationDeleteLock(A.Property, false);

		// If we're removing a lock and we're in a chatroom, send a chatroom message
		if (LockName && ServerPlayerIsInChatRoom()) {
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
				if(Array.isArray(A?.Property?.Effect) && (A.Property.Name === BF_TIMER_LOCK_NAME)) {
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
		InventoryAdd(Player,BF_LOCK_NAME,"ItemMisc");
		InventoryAdd(Player,BF_TIMER_LOCK_NAME,"ItemMisc");
	}
	createBFlocks();

	function convertHStoBF(C,item,group) {
		item.Property.Name = BF_LOCK_NAME;
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
		item.Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
		//+ (item.Property.LockMemberNumber) ? item.Property.LockMemberNumber : "";
		ChatRoomCharacterItemUpdate(C,group);
	}

	function convertHStoBFTimer(C,item,group) {
		item.Property.Name = BF_TIMER_LOCK_NAME;
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
		item.Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
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
		if((args[0].Asset.Name === BF_LOCK_NAME || args[0].Asset.Name === BF_TIMER_LOCK_NAME) && !DialogItemPermissionMode && !InventoryBlockedOrLimited(ClickedCharBF, args[0])) {
			// console.log("yes");
			LockType = args[0].Asset.Name;
			CharFocusGroup = ClickedCharBF.FocusGroup.Name
			CurrentItemBF = InventoryGet(ClickedCharBF, CharFocusGroup);
			args[0].Asset = AssetGet(Player.AssetFamily,"ItemMisc","HighSecurityPadlock");
		}
		next(args);
		if(!!CurrentItemBF) {
			if(LockType === BF_LOCK_NAME) convertHStoBF(ClickedCharBF,CurrentItemBF,CharFocusGroup);
			else if(LockType === BF_TIMER_LOCK_NAME) convertHStoBFTimer(ClickedCharBF,CurrentItemBF,CharFocusGroup);
		}
	})

	modAPI.hookFunction("DrawImageResize",2, (args,next) => {
		//args[0] is the path
		if(args[0] === "Assets/Female3DCG/ItemMisc/Preview/"+BF_LOCK_NAME+".png") {
			args[0] = IMAGES.BEST_FRIEND_LOCK;
		}else if(args[0] === "Assets/Female3DCG/ItemMisc/Preview/"+BF_TIMER_LOCK_NAME+".png") {
			args[0] = IMAGES.BEST_FRIEND_TIMER_LOCK;
		}
		next(args);
	})

	// Preview Lock Icon for BF locks
	{
		const replace = `if (InventoryItemHasEffect(item, "Lock")) {`;
		const replaceBy = `if (InventoryItemHasEffect(item, "Lock")) {
			if (item.Property && item.Property.Name === "${BF_LOCK_NAME}") {
				icons.push("${BF_LOCK_NAME}");
				return icons; }
			else if (item.Property && item.Property.Name === "${BF_TIMER_LOCK_NAME}") {
				icons.push("${BF_TIMER_LOCK_NAME}");
				return icons; }
		`;
		modAPI.patchFunction("DialogGetLockIcon",{[replace]:replaceBy});
	}

	modAPI.hookFunction("DialogCanUnlock",2,(args,next) => {
		let C = args[0];
		let Item = args[1];
		if ((C.ID != 0) && !Player.CanInteract()) return false;
		if ((Item != null) && (Item.Property != null) && 
		(Item.Property.Name === BF_LOCK_NAME || Item.Property.Name === BF_TIMER_LOCK_NAME) && BFLockAccessOn.has(C.MemberNumber)) return true;
		
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
			if((args[0].ID != 0) && (asset.Name === BF_LOCK_NAME || asset.Name === BF_TIMER_LOCK_NAME) && !(checkBForAbove(args[0]))) {
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
	const BestFriendTimerChooseList = [1, 2, 4, 8, 16, 24, 48, 72, 96, 120, 144, 168, -144, -72, -48, -24, -8, -4, -1];
	let BestFriendTimerChooseIndex = 0;

	function InventoryItemMiscBestFriendTimerPadlockDraw() {
		const C = CharacterGetCurrent();
		if ((DialogFocusItem == null) || (DialogFocusSourceItem.Property.RemovalTime < CurrentTime)) { DialogLeaveFocusItem(); return; }
		if (DialogFocusSourceItem.Property.ShowTimer) {
			DrawText(InterfaceTextGet("TimerLeft") + " " + TimerToString(DialogFocusSourceItem.Property.RemovalTime - CurrentTime), 1500, 150, "white", "gray");
		} else { DrawText(InterfaceTextGet("TimerUnknown"), 1500, 150, "white", "gray"); }
		//changed Asset to draw
		DrawAssetPreview(1387, 225, AssetGet("Female3DCG","ItemMisc",BF_TIMER_LOCK_NAME));//AssetGet("Female3DCG","ItemMisc","LoversTimerPadlock"));
		DrawText(BF_LOCK_QUOTE, 1500, 600, "white", "gray");
	
		// Draw the settings
		if (Player.CanInteract() && checkBForAbove(C)) {
			MainCanvas.textAlign = "left";
			DrawButton(1100, 666, 64, 64, "", "White", (DialogFocusSourceItem.Property.RemoveItem) ? "Icons/Checked.png" : "");
			DrawText(InterfaceTextGet("RemoveItemWithTimer"), 1200, 698, "white", "gray");
			DrawButton(1100, 746, 64, 64, "", "White", (DialogFocusSourceItem.Property.ShowTimer) ? "Icons/Checked.png" : "");
			DrawText(InterfaceTextGet("ShowItemWithTimerRemaining"), 1200, 778, "white", "gray");
			DrawButton(1100, 826, 64, 64, "", "White", (DialogFocusSourceItem.Property.EnableRandomInput) ? "Icons/Checked.png" : "");
			DrawText(InterfaceTextGet("EnableRandomInput"), 1200, 858, "white", "gray");
			MainCanvas.textAlign = "center";
		} else {
			if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.LockMemberNumber != null))
				DrawText(InterfaceTextGet("LockMemberNumber") + " " + DialogFocusSourceItem.Property.LockMemberNumber.toString(), 1500, 700, "white", "gray");
	
			let msg = "Can only be unlocked or extended by Best Friends and above";//DialogFindPlayer(DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name + "Detail");
			// const subst = ChatRoomPronounSubstitutions(CurrentCharacter, "TargetPronoun", false);
			// msg = CommonStringSubstitute(msg, subst);
			DrawText(msg, 1500, 800, "white", "gray");
	
			DrawText(InterfaceTextGet((DialogFocusSourceItem.Property.RemoveItem) ? "WillRemoveItemWithTimer" : "WontRemoveItemWithTimer"), 1500, 868, "white", "gray");
		}
	
		// Draw buttons to add/remove time if available
		if (Player.CanInteract() && checkBForAbove(C)) {
			DrawButton(1100, 910, 250, 70, InterfaceTextGet("AddTimerTime"), "White");
			DrawBackNextButton(1400, 910, 250, 70, BestFriendTimerChooseList[BestFriendTimerChooseIndex] + " " + InterfaceTextGet("Hours"), "White", "",
				() => BestFriendTimerChooseList[(BestFriendTimerChooseList.length + BestFriendTimerChooseIndex - 1) % BestFriendTimerChooseList.length] + " " + InterfaceTextGet("Hours"),
				() => BestFriendTimerChooseList[(BestFriendTimerChooseIndex + 1) % BestFriendTimerChooseList.length] + " " + InterfaceTextGet("Hours"));
		}
		else if (Player.CanInteract() && DialogFocusSourceItem.Property.EnableRandomInput && C.MemberNumber != Player.MemberNumber && !DialogFocusSourceItem.Property.MemberNumberList.includes(Player.MemberNumber)) {
			for (let I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++) {
				if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
			}
			DrawButton(1100, 910, 250, 70, "- 2 " + InterfaceTextGet("Hours"), "White");
			DrawButton(1400, 910, 250, 70, InterfaceTextGet("Random"), "White");
			DrawButton(1700, 910, 250, 70, "+ 2 " + InterfaceTextGet("Hours"), "White");
		}
	}

	function InventoryItemMiscBestFriendTimerPadlockClick() {
		if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogLeaveFocusItem();
		if (!Player.CanInteract()) return;
		const C = CharacterGetCurrent();
	
		if (checkBForAbove(C)) {
			if ((MouseX >= 1100) && (MouseX <= 1164)) {
				if ((MouseY >= 666) && (MouseY <= 730)) { DialogFocusSourceItem.Property.RemoveItem = !(DialogFocusSourceItem.Property.RemoveItem); }
				if ((MouseY >= 746) && (MouseY <= 810)) { DialogFocusSourceItem.Property.ShowTimer = !(DialogFocusSourceItem.Property.ShowTimer); }
				if ((MouseY >= 826) && (MouseY <= 890)) { DialogFocusSourceItem.Property.EnableRandomInput = !(DialogFocusSourceItem.Property.EnableRandomInput); }
				if (CurrentScreen == "ChatRoom") ChatRoomCharacterItemUpdate(CharacterGetCurrent());
			}
		}
	
		if ((MouseY >= 910) && (MouseY <= 975)) {
			if (checkBForAbove(C)) {
				if ((MouseX >= 1100) && (MouseX < 1350)) InventoryItemMiscBestFriendTimerPadlockAdd(BestFriendTimerChooseList[BestFriendTimerChooseIndex] * 3600);
				if ((MouseX >= 1400) && (MouseX < 1650)) {
					if (MouseX <= 1525) BestFriendTimerChooseIndex = (BestFriendTimerChooseList.length + BestFriendTimerChooseIndex - 1) % BestFriendTimerChooseList.length;
					else BestFriendTimerChooseIndex = (BestFriendTimerChooseIndex + 1) % BestFriendTimerChooseList.length;
				}
			}
			else if (DialogFocusSourceItem.Property.EnableRandomInput && !DialogFocusSourceItem.Property.MemberNumberList.includes(Player.MemberNumber)) {
				// for (let I = 0; I < DialogFocusSourceItem.Property.MemberNumberList.length; I++) {
				// 	if (DialogFocusSourceItem.Property.MemberNumberList[I] == Player.MemberNumber) return;
				// }
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
		else {DialogLeaveFocusItem();}
	}
	
	function InventoryItemMiscBestFriendTimerPadlockExit() {
		// DialogFocusItem = null;
		// if (DialogInventory != null) DialogMenuButtonBuild(CharacterGetCurrent());
	}
	// Handle inspect best friend timer lock: END

	// Handle inspect best friend lock: BEGIN

	function InventoryItemMiscBestFriendPadlockLoad() {}

	function InventoryItemMiscBestFriendPadlockDraw() {
		DrawAssetPreview(1387, 225, AssetGet("Female3DCG","ItemMisc",BF_LOCK_NAME));
		DrawText(BF_LOCK_QUOTE, 1500, 600, "white", "gray");
		if ((DialogFocusSourceItem != null) && (DialogFocusSourceItem.Property != null) && (DialogFocusSourceItem.Property.LockMemberNumber != null))
			DrawText(InterfaceTextGet("LockMemberNumber") + " " + DialogFocusSourceItem.Property.LockMemberNumber.toString(), 1500, 700, "white", "gray");
	
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
		if(DialogFocusSourceItem.Property.Name === BF_TIMER_LOCK_NAME) {
			InventoryItemMiscBestFriendTimerPadlockLoad();
		}else if(DialogFocusSourceItem.Property.Name === BF_LOCK_NAME) {
			// next(args);
			InventoryItemMiscBestFriendPadlockLoad();
		}
		else {
			next(args);
		}
	})
	modAPI.hookFunction("InventoryItemMiscHighSecurityPadlockDraw",11,(args,next) => {
		if(DialogFocusSourceItem.Property.Name === BF_TIMER_LOCK_NAME) {
			InventoryItemMiscBestFriendTimerPadlockDraw();
		}else if(DialogFocusSourceItem.Property.Name === BF_LOCK_NAME) {
			// DialogFocusItem = {Asset : AssetGet("Female3DCG","ItemMisc","LoversPadlock")};
			// next(args);
			InventoryItemMiscBestFriendPadlockDraw();
		}
		else {
			next(args);
		}
	})
	modAPI.hookFunction("InventoryItemMiscHighSecurityPadlockClick",11,(args,next) => {
		if(DialogFocusSourceItem.Property.Name === BF_TIMER_LOCK_NAME) {
			InventoryItemMiscBestFriendTimerPadlockClick();
		}else if(DialogFocusSourceItem.Property.Name === BF_LOCK_NAME) {
			// next(args);
			InventoryItemMiscBestFriendPadlockClick();
		}
		else {
			next(args);
		}
	})

	modAPI.hookFunction("InventorySetPermission", 0, ([groupName, assetName, permissionType, ...args], next) => {
		if (assetName === BF_LOCK_NAME || assetName === BF_TIMER_LOCK_NAME) {
			switch (permissionType) {
				case "Default":
					Player.BCT.bctSettings.ItemPerm[assetName] = "Normal";
					break;
				case "Block":
					Player.BCT.bctSettings.ItemPerm[assetName] = "Blocked";
					break;
				case "Limited":
					Player.BCT.bctSettings.ItemPerm[assetName] = "Limited";
					break;
				case "Favorite":
					Player.BCT.bctSettings.ItemPerm[assetName] = "Fav";
					break;
			}
			bctSettingsSave(false);
		}
		return next([groupName, assetName, permissionType, ...args]);
	});

	//Updating item permissions
	function UpdateItemPermissions() {
		for (const itemName in Player.BCT.bctSettings.ItemPerm) {
			switch (Player.BCT.bctSettings.ItemPerm[itemName]) {
				case "Limited":
					InventorySetPermission("ItemMisc", itemName, "Limited");
					break;
				case "Blocked":
					InventorySetPermission("ItemMisc", itemName, "Block");
					break;
				case "Fav":
					InventorySetPermission("ItemMisc", itemName, "Favorite");
					break;
			}
		}
		ServerPlayerBlockItemsSync();
	}

	//Filtering item permissions
	function FilterItemPermissions() {
		for (const itemName in Player.BCT.bctSettings.ItemPerm) {
			delete Player.PermissionItems[`ItemMisc/${itemName}`];
		}
	}

	//Add it again during reloads and ServerPlayerBlockItemsSync()
	UpdateItemPermissions();

	// Convert HighSec Lock to BF lock if the setting is true and your best friend is adding the lock
	
	async function ConvertToBFLockOnUpdateSet(data) {
		if(Player.BCT.bctSettings.bestFriendsEnabled && Player.BCT.bctSettings.hsToBFLockconvert && data.Content === "ActionAddLock" 
		&& data.Dictionary.some((asset) => (asset.Tag === "TargetCharacter" && asset.MemberNumber === Player.MemberNumber))
		&& data.Dictionary.some((asset) => asset.AssetName === "HighSecurityPadlock")
		&& Player.BCT.bctSettings.bestFriendsList.includes(data.Sender)) {
			let reqAsset = data.Dictionary.find((asset) => asset.Tag === "PrevAsset");
			await waitFor(() => InventoryGet(Player,reqAsset.GroupName).Property.LockedBy === "HighSecurityPadlock");
			convertHStoBF(Player,InventoryGet(Player,reqAsset.GroupName),reqAsset.GroupName);
			InventoryGet(Player,reqAsset.GroupName).Property.MemberNumberListKeys = 
			InventoryGet(Player,reqAsset.GroupName).Property.MemberNumberListKeys 
			+ Player.BCT.bctSettings.bestFriendsList.join(",");
			ChatRoomCharacterItemUpdate(Player,reqAsset.GroupName);
		}
	}

	registerSocketListener("ChatRoomMessage",ConvertToBFLockOnUpdateSet);
	// Images
	const IMAGES = {
		AROUSAL_THERMOMETER: "data:image/png;base64,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",
		LOGO: "data:image/png;base64,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",
		BEST_FRIEND_LOCK: " data:image/png;base64,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",
		BEST_FRIEND_TIMER_LOCK: " data:image/png;base64,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",
	}
}
runBCT();
