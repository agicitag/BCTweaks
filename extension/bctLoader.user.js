// ==UserScript==
// @name         BCT Loader
// @namespace    https://www.bondageprojects.com/
// @version      0.4.3
// @description  BC extension adding several little useful tweaks to BC.
// @author       agicitag
// @downloadURL  https://github.com/agicitag/BondageClubTools/raw/main/extension/bctLoader.user.js
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
    script.src = "https://agicitag.github.io/BondageClubTools/extension/bct.js";
    document.head.appendChild(script);
})();
