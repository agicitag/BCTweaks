async function BarSplit(){
	
	await waitFor(() => ServerSocket && ServerIsConnected);
	
	
	// Bondage Club Mod Development Kit (1.0.2)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	var bcModSdk=function(){"use strict";const o="1.0.2";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const a=new Map,i=new Set;function d(o){i.has(o)||(i.add(o),console.warn(o))}function c(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||d(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}function s(o){const e=[],t=new Map,n=new Set;for(const r of u.values()){const a=r.patching.get(o.name);if(a){e.push(...a.hooks);for(const[e,i]of a.patches.entries())t.has(e)&&t.get(e)!==i&&d(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${i}`),t.set(e,i),n.add(r.name)}}return e.sort(((o,e)=>e.priority-o.priority)),{hooks:e,patches:t,patchesSources:n,final:c(o.original,t)}}function l(o,e=!1){let r=a.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const i=o.split(".");for(let t=0;t<i.length-1;t++)if(e=e[i[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${i.slice(0,t+1).join(".")} is not object`);const d=e[i[i.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${o} to be patched not found`);const c=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:o,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l)}),a.set(o,r),e[i[i.length-1]]=function(o){return function(...e){const t=o.precomputed,n=t.hooks,r=t.final;let a=0;const i=d=>{var c,s,l,f;if(a<n.length){const e=n[a];a++;const t=null===(s=(c=w.errorReporterHooks).hookEnter)||void 0===s?void 0:s.call(c,o.name,e.mod),r=e.hook(d,i);return null==t||t(),r}{const n=null===(f=(l=w.errorReporterHooks).hookChainExit)||void 0===f?void 0:f.call(l,o.name,t.patchesSources),a=r.apply(this,e);return null==n||n(),a}};return i(e)}}(r)}return r}function f(){const o=new Set;for(const e of u.values())for(const t of e.patching.keys())o.add(t);for(const e of a.keys())o.add(e);for(const e of o)l(e,!0)}function p(){const o=new Map;for(const[e,t]of a)o.set(e,{name:e,originalHash:t.originalHash,hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const u=new Map;function h(o){u.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),u.delete(o.name),o.loaded=!1}function g(o,t,r){"string"==typeof o&&o||e("Failed to register mod: Expected non-empty name string, got "+typeof o),"string"!=typeof t&&e(`Failed to register mod '${o}': Expected version string, got ${typeof t}`),r=!0===r;const a=u.get(o);a&&(a.allowReplace&&r||e(`Refusing to load mod '${o}': it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),h(a));const i=t=>{"string"==typeof t&&t||e(`Mod '${o}' failed to patch a function: Expected function name string, got ${typeof t}`);let n=c.patching.get(t);return n||(n={hooks:[],patches:new Map},c.patching.set(t,n)),n},d={unload:()=>h(c),hookFunction:(t,n,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);"number"!=typeof n&&e(`Mod '${o}' failed to hook function '${t}': Expected priority number, got ${typeof n}`),"function"!=typeof r&&e(`Mod '${o}' failed to hook function '${t}': Expected hook function, got ${typeof r}`);const d={mod:c.name,priority:n,hook:r};return a.hooks.push(d),f(),()=>{const o=a.hooks.indexOf(d);o>=0&&(a.hooks.splice(o,1),f())}},patchFunction:(t,r)=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);const a=i(t);n(r)||e(`Mod '${o}' failed to patch function '${t}': Expected patches object, got ${typeof r}`);for(const[n,i]of Object.entries(r))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod '${o}' failed to patch function '${t}': Invalid format of patch '${n}'`);f()},removePatches:o=>{c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`);i(o).patches.clear(),f()},callOriginal:(t,n,r)=>(c.loaded||e(`Mod '${c.name}' attempted to call SDK function after being unloaded`),"string"==typeof t&&t||e(`Mod '${o}' failed to call a function: Expected function name string, got ${typeof t}`),Array.isArray(n)||e(`Mod '${o}' failed to call a function: Expected args array, got ${typeof n}`),function(o,e,t=window){return l(o).original.apply(t,e)}(t,n,r)),getOriginalHash:t=>("string"==typeof t&&t||e(`Mod '${o}' failed to get hash: Expected function name string, got ${typeof t}`),l(t).originalHash)},c={name:o,version:t,allowReplace:r,api:d,loaded:!0,patching:new Map};return u.set(o,c),Object.freeze(d)}function m(){const o=[];for(const e of u.values())o.push({name:e.name,version:e.version});return o}let w;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:m,getPatchingInfo:p,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return w=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.0.2' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.0.2' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

	
	const BCT_VERSION = "0.1",
	BCT_MSG = "bctMsg",
	HIDDEN = "Hidden", // Needs to be capital 'H' !
	BCT_MSG_ACTIVITY_AROUSAL_SYNC = "bctMsgActivityArousalSync",
	BCT_MSG_INITILIZATION_SYNC = "bctMsgInitilizationSync"

	const modAPI = bcModSdk.registerMod('BCT', BCT_VERSION, false);

	Player.BCT = {};
	Player.BCT.version = BCT_VERSION;
	Player.BCT.bctSettings = {"splitArousalBar" : true};
	Player.BCT.orgasmBar = {};
	Player.BCT.orgasmBar.arousalProgress = 0;
	Player.BCT.orgasmBar.arousalZoom = false;
	Player.BCT.orgasmBar.ProgressTimer = 0;
	Player.BCT.orgasmBar.vibrationLevel = 0;
	Player.BCT.orgasmBar.changeTime = 0;

	const listeners = [];
	function registerSocketListener(event, listener) {
		if (!listeners.some((l) => l[1] === listener)) {
			listeners.push([event, listener]);
			ServerSocket.on(event, listener);
		}
	}

	async function beepDeprecated() {
		await waitFor(() => !!Player?.AccountName);
		await sleep(5000);
		bctBeepNotify("BCT","Your version of BCT is deprecated and will crash if you meet people with the new Version.\n" +
							"Go to: https://github.com/agicitag/BondageClubTools/tree/gh-pages/extensions/bct.js to view the new version or " +
							"https://agicitag.github.io/BondageClubTools/extensions/loaders/bctLoader.user.js to install it.");
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
						bctSettings: Player.BCT.bctSettings,
						bctArousalProgress: Player.BCT.orgasmBar.arousalProgress,
						bctProgressTimer: Player.BCT.orgasmBar.ProgressTimer,
						target: null,
						replyRequested: requestReply
					},
				},
			],
		};
		
		ServerSend("ChatRoomChat", bctInitilizationMessage);
	}

	registerSocketListener("ChatRoomSync", () => {
		sendBctInitilization(true);
	});


	//send Initilization when pasted when already in a chatroom
	sendBctInitilization(true);
	beepDeprecated();

	async function parseSync(data) {
		await waitFor(() => ServerSocket && ServerIsConnected);
		if (data.Type === HIDDEN && data.Content === BCT_MSG) {
			const sender = Character.find((a) => a.MemberNumber === data.Sender);
			if (!sender) {
				return;
			}
			if(sender.ID != 0){
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
						if(message.replyRequested){
							sendBctInitilization(false);
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
							version: BCT_VERSION,
							bctArousalProgress: C.BCT.orgasmBar.arousalProgress,
							bctProgressTimer: C.BCT.orgasmBar.ProgressTimer,
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
			if ((C.BCT.orgasmBar.arousalProgress == null) || (typeof C.BCT.orgasmBar.arousalProgress !== "number") || isNaN(C.BCT.orgasmBar.arousalProgress)) C.BCT.orgasmBar.arousalProgress = 0;
			if ((Progress == null) || (Progress < 0)) Progress = 0;
			if (Progress > 100) Progress = 100;
			if (C.BCT.orgasmBar.arousalProgress != Progress) {
				C.BCT.orgasmBar.arousalProgress = Progress;
				C.BCT.orgasmBar.arousalProgressTimer = 0;
				ActivityChatRoomBCTArousalSync(C);
			}
		}
	}

	function BCTActivityTimerProgress(C, Progress) {
		if(C.BCT != null){
			// Changes the current arousal progress value
			C.BCT.orgasmBar.arousalProgress = C.BCT.orgasmBar.arousalProgress + Progress;
			// Decrease the vibratorlevel to 0 if not being aroused, while also updating the change time to reset the vibrator animation
			if (Progress < 0) {
				if (C.BCT.orgasmBar.vibrationLevel != 0) {
					C.BCT.orgasmBar.vibrationLevel = 0;
					C.BCT.orgasmBar.changeTime = CommonTime();
				}
			}

			if (C.BCT.orgasmBar.arousalProgress < 0) C.BCT.orgasmBar.arousalProgress = 0;
			if (C.BCT.orgasmBar.arousalProgress > 100) C.BCT.orgasmBar.arousalProgress = 100;

			// Update the recent change time, so that on other player's screens the character's arousal meter will vibrate again when vibes start
			if (C.BCT.orgasmBar.arousalProgress == 0) {
				C.BCT.orgasmBar.changeTime = CommonTime();
			}
		}

	}

	function BCTActivityVibratorLevel(C, Level) {
		if (C.BCT != null) {
			if (C.BCT.orgasmBar != null) {
				if (Level != C.BCT.orgasmBar.vibrationLevel) {
					C.BCT.orgasmBar.vibrationLevel = Level;
					C.BCT.orgasmBar.changeTime = CommonTime();
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
						ActivitySetBCTArousal(C, C.BCT.orgasmBar.arousalProgress);
						if (Player.ArousalSettings.VFX != "VFXInactive" && C.BCT.orgasmBar.arousalProgress > 0 && PreferenceArousalAtLeast(C, "Hybrid")) {
							let Progress = 0;
							if (!(C.BCT.orgasmBar.vibrationLevel == null || typeof C.BCT.orgasmBar.vibrationLevel !== "number" || isNaN(C.ArousalSettings.VibratorLevel))) {
								Progress = C.BCT.orgasmBar.vibrationLevel;
							}

							if (Progress > 0) { // -1 is disabled
								const animationTimeMax = 5000; // 5 seconds
								const animationTimeLeft = Math.min(C.BCT.orgasmBar.changeTime - CommonTime(), 0) + animationTimeMax;

								DrawArousalGlow(
									X + (C.BCT.orgasmBar.arousalZoom ? 50 : 90) * Zoom,
									Y + (C.BCT.orgasmBar.arousalZoom ? 200 : 400) * Zoom,
									C.BCT.orgasmBar.arousalZoom ? Zoom : Zoom * 0.2,
									Progress,
									Player.ArousalSettings.VFX == "VFXAnimated" || (Player.ArousalSettings.VFX == "VFXAnimatedTemp" && C.BCT.orgasmBar.changeTime != null && animationTimeLeft > 0),
									Math.max(0, animationTimeLeft / animationTimeMax),
									C.ArousalSettings.OrgasmTimer != null && typeof C.ArousalSettings.OrgasmTimer === "number" && !isNaN(C.ArousalSettings.OrgasmTimer) && C.ArousalSettings.OrgasmTimer > 0);
							}
						}

						DrawBCTArousalThermometer(
							X + (C.BCT.orgasmBar.arousalZoom ? 50 : 90) * Zoom,
							Y + (C.BCT.orgasmBar.arousalZoom ? 200 : 400) * Zoom,
							C.BCT.orgasmBar.arousalZoom ? Zoom : Zoom * 0.2,
							C.BCT.orgasmBar.arousalProgress,
							PreferenceArousalAtLeast(C, "Automatic"),
							C.ArousalSettings.OrgasmTimer != null && typeof C.ArousalSettings.OrgasmTimer === "number" && !isNaN(C.ArousalSettings.OrgasmTimer) && C.ArousalSettings.OrgasmTimer > 0);

					}
			}
	}



	function DrawBCTArousalThermometer(X, Y, Zoom, Progress, Automatic, Orgasm) {
		//BCT Arousal Meter png
		DrawImageZoomCanvas("data:image/png;base64,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", MainCanvas, 0, 0, 100, 500, X, Y, 100 * Zoom, 500 * Zoom);
		//DrawImageZoomCanvas("Screens/Character/Player/ArousalMeter" + (Orgasm ? "Orgasm" : "") + (Automatic ? "Automatic" : "") + ".png", MainCanvas, 0, 0, 100, 500, X, Y, 100 * Zoom, 500 * Zoom);
		if ((Progress > 0) && !Orgasm) DrawRect(X + (30 * Zoom), Y + (15 * Zoom) + (Math.round((100 - Progress) * 4 * Zoom)), (40 * Zoom), (Math.round(Progress * 4 * Zoom)), "#F430C0");
	}

	modAPI.hookFunction('ActivityOrgasmStart', 2, (args, next) => {
		let C = args[0];
		if(C.BCT != null){
			if (!ActivityOrgasmRuined) {
				C.BCT.orgasmBar.arousalProgress = C.BCT.orgasmBar.arousalProgress * 0.6;
			}
			if ((C.ID == 0) && (CurrentScreen == "ChatRoom")){
				ActivityChatRoomBCTArousalSync(C);
			}
		}
		next(args);
	});

	modAPI.hookFunction('ActivitySetArousalTimer', 2, (args, next) => {
		let C = args[0];
		if(C.BCT != null){
			let Activity = args[1];
			let Zone = args[2];
			let Progress = args[3];
			
			// If there's already a progress timer running, we add it's value but divide it by 2 to lessen the impact, the progress must be between -25 and 25
			if ((C.BCT.orgasmBar.ProgressTimer == null) || (typeof C.BCT.orgasmBar.ProgressTimer !== "number") || isNaN(C.BCT.orgasmBar.ProgressTimer)) C.BCT.orgasmBar.ProgressTimer = 0;
			Progress = Math.round((C.BCT.orgasmBar.ProgressTimer / 2) + Progress);
			if (Progress < -25) Progress = -25;
			if (Progress > 25) Progress = 25;

			// Limit max arousal values
			var Max = ((Activity == null || Activity.MaxProgress == null) || (Activity.MaxProgress > 100)) ? 100 : Activity.MaxProgress;
			//if ((Max > 95) && !PreferenceGetZoneOrgasm(C, Zone)) Max = 95;
			//if ((Max > 67) && (Zone == "ActivityOnOther")) Max = 67;
			if ((Progress > 0) && (C.BCT.orgasmBar.arousalProgress + Progress > Max)) Progress = (Max - C.BCT.orgasmBar.arousalProgress >= 0) ? Max - C.BCT.orgasmBar.arousalProgress : 0;

			// If we must apply a progress timer change, we publish it
			if (C.BCT.orgasmBar.ProgressTimer !== Progress) {
				C.BCT.orgasmBar.ProgressTimer = Progress;
				ActivityChatRoomBCTArousalSync(C);
			}
		}
		
		//only let the orgasm bar progress if its and orgasm zone
		if(PreferenceGetZoneOrgasm(Player, args[2])){
			next(args);
		}
	});

	modAPI.hookFunction('ChatRoomClickCharacter', 2, (args, next) => {
		let C = args[0];
		if(C.BCT != null){
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
						if (MouseIn(CharX + 60 * Zoom, CharY + 400 * Zoom + zoneMovement, 80 * Zoom, 100 * Zoom) && !C.BCT.orgasmBar.arousalZoom) { C.BCT.orgasmBar.arousalZoom = true; return; }
						if (MouseIn(CharX + 50 * Zoom, CharY + 615 * Zoom + zoneMovement, 100 * Zoom, 85 * Zoom) && C.BCT.orgasmBar.arousalZoom) { C.BCT.orgasmBar.arousalZoom = false; return; }

						// If the player can manually control her arousal, we set the progress manual
						if (C.ID === 0 && MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom + zoneMovement, 100 * Zoom, 500 * Zoom) && C.BCT.orgasmBar.arousalZoom) {
							if (PreferenceArousalAtLeast(Player, "Manual") && !PreferenceArousalAtLeast(Player, "Automatic")) {
								var Arousal = Math.round((CharY + 625 * Zoom + zoneMovement - MouseY) / (4 * Zoom));
								ActivitySetBCTArousal(Player, Arousal);
							}
							return;
						}

						// Don't do anything if the thermometer is clicked without access to it
						if (MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom + zoneMovement, 100 * Zoom, 415 * Zoom) && C.BCT.orgasmBar.arousalZoom) return;
					}
				}
			}
		}
		
		//call the rest of the function
		next(args);
	});


	modAPI.hookFunction('DrawArousalMeter', 2, (args, next) => {
		if(!args[0].BCT || !args[0].BCT.orgasmBar.arousalZoom){
			next(args[0], args[1], args[2], args[3]);
		}
		if(!args[0].ArousalZoom && args[0].BCT != null){
			DrawBCTArousalMeter(args[0], args[1], args[2], args[3]);
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
					
					if(Character[C].BCT != null){

						// Depending on the character settings, we progress the arousal meter
						if (PreferenceArousalAtLeast(Character[C], "Hybrid")) {

							// Activity impacts the progress slowly over time, if there's an activity running, vibrations are ignored
							if ((Character[C].BCT.orgasmBar.ProgressTimer != null) && (typeof Character[C].BCT.orgasmBar.ProgressTimer === "number") && !isNaN(Character[C].BCT.orgasmBar.ProgressTimer) && (Character[C].BCT.orgasmBar.ProgressTimer != 0)) {
								if (Character[C].BCT.orgasmBar.ProgressTimer < 0) {
									Character[C].BCT.orgasmBar.ProgressTimer++;
									
									BCTActivityTimerProgress(Character[C], -1);
									BCTActivityVibratorLevel(Character[C], 0);																
								}
								else {
									Character[C].BCT.orgasmBar.ProgressTimer--;
									
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
								if ((Factor == 2)) {BCTActivityVibratorLevel(Character[C], 2); if (Character[C].BCT.orgasmBar.arousalProgress <= 95 && BCTTimerLastArousalProgressCount % 4 == 0) BCTActivityTimerProgress(Character[C], 1);}
								if ((Factor == 1)) {BCTActivityVibratorLevel(Character[C], 1); if (Character[C].BCT.orgasmBar.arousalProgress <= 65 && BCTTimerLastArousalProgressCount % 6 == 0) BCTActivityTimerProgress(Character[C], 1);}
								if ((Factor == 0)) {BCTActivityVibratorLevel(Character[C], 1); if (Character[C].BCT.orgasmBar.arousalProgress <= 35 && BCTTimerLastArousalProgressCount % 8 == 0) BCTActivityTimerProgress(Character[C], 1);}
								if ((Factor == -1)) {BCTActivityVibratorLevel(Character[C], 0);}

							}
						} else {
							BCTActivityVibratorLevel(Character[C], 0);
						}
					}

				}
			}

			// Arousal decays by 1 naturally every 12 seconds, unless there's already a natural progression from an activity
			if ((BCTTimerLastArousalDecay + 12000 < CurrentTime) || (BCTTimerLastArousalDecay - 12000 > CurrentTime)) {
				BCTTimerLastArousalDecay = CurrentTime;
				for (let C = 0; C < Character.length; C++)
					if(Character[C].BCT != null){
						if (PreferenceArousalAtLeast(Character[C], "Hybrid"))
							if ((Character[C].BCT.orgasmBar.arousalProgress != null) && (typeof Character[C].BCT.orgasmBar.arousalProgress === "number") && !isNaN(Character[C].BCT.orgasmBar.arousalProgress) && (Character[C].BCT.orgasmBar.arousalProgress > 0))
								if ((Character[C].BCT.orgasmBar.ProgressTimer == null) || (typeof Character[C].BCT.orgasmBar.ProgressTimer !== "number") || isNaN(Character[C].BCT.orgasmBar.ProgressTimer) || (Character[C].BCT.orgasmBar.ProgressTimer == 0)) {

									// If the character is egged, we find the highest intensity factor
									let Factor = -1;
									for (let A = 0; A < Character[C].Appearance.length; A++) {
										let Item = Character[C].Appearance[A];
										let ZoneFactor = PreferenceGetZoneFactor(Character[C], Item.Asset.ArousalZone) - 2;
										if (InventoryItemHasEffect(Item, "Egged", true) && (Item.Property != null) && (Item.Property.Intensity != null) && (typeof Item.Property.Intensity === "number") && !isNaN(Item.Property.Intensity) && (Item.Property.Intensity >= 0) && (ZoneFactor >= 0) && (Item.Property.Intensity + ZoneFactor > Factor))
											Factor = Item.Property.Intensity + ZoneFactor;
									}

									// No decay if there's a vibrating item running
									if (Factor < 0) BCTActivityTimerProgress(Character[C], -1);

								}
					}
			}

		}
		
		next(args);
	});
}
BarSplit();
