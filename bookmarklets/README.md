# Bookmarklets
These code snippets are intended to be used as bookmarklets, meaning you have to create a bookmark in your browser and copy the code into the adress bar of the bookmark. Its probably best to have it in the bookmark bar, so you have an easily clickable button to trigger the desired effect. It does also work on mobile, just not with Firefox.

# Configuration
The code is easily configurable through the vars at the top. Just copy the code into any text editor of your choice, edit it like you wish and then paste it into the adress bar of the bookmark. Following are some explanations on how to do that.
## Names
The names in the vars like `mainEar` need to be the names of the items in the code of BC. The names are easily found by typing `InventoryGet(Player, "SLOT").Asset.Name` in the console while wearing the item. SLOT is the slot in which the item is equipped. For example "HairAccessory1" and "HairAccessory2" for where the ears are and "TailStraps" for the tails. Dont forget the "". So an example to get the name of the currently worn tail would be `InventoryGet(Player, "TailStraps").Asset.Name`.
## Colors
The colors are set by just typing the colorcode from ingame. If an item has multiple color options they can be set like this:  
`var mainEarColor = ["#893121", "Default"]`.
