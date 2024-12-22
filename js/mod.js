let modInfo = {
	name: "The ??? Tree",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade("p",12) == true){
		gain = Decimal.mul(gain,player.points.add(1).tetrate(new Decimal(0.1).add(getTetratoEffect(player.p.tetrato))))
	}
	if (hasUpgrade("p",13) == true){
		gain = Decimal.mul(gain,player.points.add(1).tetrate(new Decimal(0.1).add(getTetratoEffect(player.p.tetrato))))
	}
	if (hasUpgrade("p",11) == true){
		gain = Decimal.pow(10,gain)
	}
	if (gain.gte(1e9)){
		gain = gain.log(10).mul(1e9)
	}
	if (hasUpgrade("p",21) == true){
		gain = Decimal.mul(gain,player.p.points)
	}
	if (gain.gte(1e100)){
		gain = gain.log(10).pow(50)
	}
	if (gain.gte("e1000")){
		gain = gain.log(10).pow(500)
	}
	if (hasUpgrade("p",25) == true){
		gain = gain.times(player.p.tetrato)
	}
	if (hasUpgrade("p",33) == true){
		gain = gain.times(player.p.tetrato.pow(-0.5))
	}
	return gain
}

function getTetratoGain(){
	gain = new Decimal(1)
	if (hasUpgrade("p",23) == true){
		gain = gain.times(player.points.add(1).log(10))
	}
	if (hasUpgrade("p",24) == true){
		gain = gain.times(player.points.add(1).log(10).pow(3))
	}
	if (hasUpgrade("p",31) == true){
		gain = gain.pow(player.points.add(1).log(10).add(1).log(10))
	}
	gain = gain.pow(new Decimal(player.p.buyables['11']*0.1+1))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page

function getTetratoEffect(t){
	let effect = t.add(1).slog(2).pow(2).times(0.01)
	if (hasUpgrade("p",33) == true){
		effect = effect.times(5)
	}
	if (hasUpgrade("p",34) == true){
		effect = effect.times(player.p.buyables['11'].slog(10).div(5).add(1))
	}
	return effect
}
var displayThings = [
	function(){if (hasUpgrade("p",22) == true){
		return format(player.p.tetrato) + " tetrato -> +" + format(getTetratoEffect(player.p.tetrato)) + " tetration"
	}}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1F10"))
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