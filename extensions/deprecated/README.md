# Extensions

These code snippets are meant to be used as Tampermonkey Extensions or console scripts. They can be used along side the bookmarklets. I'm Haruhi #78366 ingame.

# Configuration

- For Tampermonkey users, just open filename.user.js and click on Raw button in the top-right. You will be prompted for installation. Or you could click the link presented below.
- To use the script straight in the console:
Copy the required file from the scripts folder, make changes as you wish and then paste it into the browser console.

# Usage
- ## Tailwag Using Emotes
    Quick install [link](https://github.com/agicitag/BondageClubTools/raw/main/extensions/tailwag_emote_loader.user.js)

    The tail wagging works by switching between 2 different types of tail straps (red fox tails by default). To trigger it you must use emotes (* or /me) and have "wags" and "tail" in the sentence. (eg: *closes her eyes and gently wags her tail). Only order between them matters i.e "wags" should come before "tail". 
    ### For extension users

    Currently the only way to change the tail type while using the extension is to use **chat commands**. And it has to be done each time the game is reloaded. 
    
    - **/tailchange current1** : To save your current tail as the primary tail.
    
    Switch your tail to the one you want the secondary tail to be.
    - **/tailchange current2** : To save the secondary tail.

    ### For script users 
    Change the var `tailDefault` based on the item names in BC code. You can get the tail type by running `InventoryGet(Player,"TailStraps").Asset.Name` and tail color `InventoryGet(Player,"TailStraps").Color` .