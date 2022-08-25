// ==UserScript==
// @name         Bar Splitter Script Loader
// @namespace    https://www.bondageprojects.com/
// @version      0.1
// @description  Splits the BC arousal bar into an orgasm and an arousal bar
// @author       agicitag
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
    script.src = "https://agicitag.github.io/BondageClubTools/barSplitter.js";
    document.head.appendChild(script);
})();
