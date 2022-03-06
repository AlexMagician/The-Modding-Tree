let modInfo = {
	name: "The Tree of Light",
	id: "com.AlexMagician.TreeOfLight",
	author: "AlexMagician",
	pointsName: "Light",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Aether",
}

let changelog = `<h1>Changelog</h1><br>
	<h2><bdi style=\"color:#df0f0f\">You're playing PRE-RELEASE version. Things are not balanced, and you might HARD RESET quite often.</bdi><br>v0.1</h2><br>
	Implemented the Aether layer.<br>Endgame at 12 Aether upgrades.`

let winText = `Welp, that's it for now. You've gathered enough Light to ascend.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("a", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.1)
	if(hasUpgrade("a", 12)) gain = gain.times(upgradeEffect("a", 12))
	if(hasUpgrade("a", 13)) gain = gain.times(upgradeEffect("a", 13))
	if(getBuyableAmount("a", 11).gt(0)) gain = gain.times(buyableEffect("a", 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("a", 34)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}