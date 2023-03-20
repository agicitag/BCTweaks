# BCTweaks
This repo is a collection of tweaks that might be useful for Bondage Club. Currently there are 2 main components. The bookmarklets serving as small scripts that you can use as buttons for BC and the BCTweaks extension.  
More infos on the bookmarklets are available in [`Bookmarklets`](bookmarklets).  

## Extension
The extension adds a few new features and tweaks to BC. For example splitting the arousal bar into two separate arousal and orgasm bars or wagging a tail when you write that in chat. The extension can be found under [`extension/bct.js`](extension/bct.js) and can easily be installed using Tampermonkey upon following this [link](https://github.com/agicitag/BCTweaks/raw/main/extension/bctLoader.user.js).  
It can also be loaded as a bookmark by pasting the following into the address bar of a bookmark:  
`javascript:(()=>{fetch('https://agicitag.github.io/BCTweaks/extension/bctLoader.user.js').then(r=>r.text()).then(r=>eval(r));})();`

### Beta
Theres also a beta version of BCTweaks available, giving you access to new features faster. The catch is that the beta versions may still contain gamebreaking bugs, so be aware of that if you want to use it. Bug reports are greatly appreciated.  
You can install the beta also with Tampermonkey upon following this [link](https://github.com/agicitag/BCTweaks/raw/main/extension/bctBetaLoader.user.js) or load it with the bookmark:  
`javascript:(()=>{fetch('https://agicitag.github.io/BCTweaks/extension/bctBetaLoader.user.js').then(r=>r.text()).then(r=>eval(r));})();`

## Mobile
To use BCT on mobile, simply create a bookmark and paste the same address for either the normal version or the beta version as described above. It doesn't work on Firefox.