// ==UserScript==
// @name         Tail wag script loader
// @namespace    https://www.bondageprojects.com/
// @version      0.1
// @description  Allows tail wagging using emotes
// @author       Haruhi
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var script = document.createElement("script");
    script.src = "https://agicitag.github.io/BondageClubTools/tail_wag_emote.js";
    document.head.appendChild(script);
})();
