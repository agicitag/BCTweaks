# BondageClubTools
This repo is a collection of tools that might be useful for Bondage Club. Currently there are 2 main components. The bookmarklets serving as small scripts that you can use as buttons for BC and the BCT extension.  
More infos on the bookmarklets are available in [`Bookmarklets`](bookmarklets).  

The extension adds a few new features and tweaks to BC. For example splitting the arousal bar into two separate arousal and orgasm bars or wagging a tail when you write that in chat. The extension can be found under [`extension/bct.js`](extension/bct.js) and can easily be installed using Tampermonkey upon following this [link](https://github.com/agicitag/BondageClubTools/raw/main/extension/bctLoader.user.js).  
It can also be loaded as a bookmark by pasting the following into the address bar of a bookmark:  
`javascript:(()=>{fetch('https://agicitag.github.io/BondageClubTools/extension/bctLoader.user.js').then(r=>r.text()).then(r=>eval(r));})();`
