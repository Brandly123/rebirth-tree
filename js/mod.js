let modInfo = {
	name: "The Rebirth Tree",
	id: "trtbb123",
	author: "Brandly123 [discord username]",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.3d",
	name: "Fixes",
}

let changelog = ``

let winText = `Congratulations! You have reached the endgame for this mod so far!<br>I should add some new content soon!`

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
// Display extra things at the top of the page
var displayThings = ["Endgame: 5 rebirth points [1e30 points]"]

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if(hasMilestone("p",0) && !hasUpgrade("u",11)) gain = gain.add(1)
  
  if(hasMilestone("p",1)) gain = gain.add(layers.p.milestones[1].effect())
  if(hasMilestone("p",2)) gain = gain.add(layers.p.milestones[2].effect()[0])
  if(hasUpgrade("p",13)) gain = gain.add(100)
  
  if(hasMilestone("p",2)) gain = gain.mul(layers.p.milestones[2].effect()[1])
  if(hasUpgrade("u",22) && hasMilestone("p",3)) gain = gain.mul(2)
  if(hasUpgrade("p",11)) gain = gain.mul(upgradeEffect("p",11))
  if(hasUpgrade("p",12)) gain = gain.mul(upgradeEffect("p",12))
  if(hasUpgrade("p",14)) gain = gain.mul(2)
  if(hasUpgrade("p",15)) gain = gain.mul(upgradeEffect("p",15))
  if(hasMilestone("p",0) && hasUpgrade("u",11)) gain = gain.mul(layers.p.milestones[0].effect())
  if(hasUpgrade("p",21)) gain = gain.mul(upgradeEffect("p",21))
  if(hasMilestone("p",5)) gain = gain.add(layers.p.milestones[5].effect())
  if(hasMilestone("p",7)) gain = gain.mul(layers.p.milestones[7].effect())
  if(hasMilestone("sp",5)) gain = gain.mul(1e10)
  if(hasUpgrade("u",81)) gain = gain.mul(upgradeEffect("u",81))
  
  gain = gain.mul(buyableEffect("et",22))
  //layers.sp.milestones[1].effect()
  if(inChallenge("p",11)) gain = gain.pow(0.25)
  if(inChallenge("p",11) && options.difficulty) gain = gain.sub(1)
  if(inChallenge("p",12)) gain = gain.pow(0.45).div(5)
  if(inChallenge("p",21)) gain = gain.pow(0.25)
  if(inChallenge("sp",11)) gain = gain.pow(0.25).div(25000000)
  if(hasUpgrade("p",24)) gain = gain.pow(1.025)
  if(hasUpgrade("p",25)) gain = gain.pow(1.3)
  if(hasMilestone("sp",2)) gain = gain.pow(layers.sp.milestones[1].effect())
  if(hasMilestone("sp",4)) gain = gain.pow(1.1)
  if(hasMilestone("u",92)) gain = gain.pow(1.05)
  
  if(inChallenge("sp",12)) gain = gain.mul(5)
  
  function calcSoftcap() {
    let softcap = new Decimal(1);
    displayThings = []
    let softPoints = player.points.add(1)
    if(hasUpgrade("u",91)){
      if(softPoints.gte(1e350)){
        softcap = new Decimal(1).div(softPoints.log(10.2).div(300).add(1))
        displayThings = ["softcapped [softcap sacrifice]. ^" + format(softcap) + " points"]
      } else {
        softcap = new Decimal(1).div(softPoints.log(10.1).div(65).add(1))
        displayThings = ["softcapped [softcap sacrifice]. ^" + format(softcap) + " points"]
      }
    } else {
      if(softPoints.gte(1e56) && hasMilestone("sp",3)){
        softcap = new Decimal(1).div(softPoints.log(10.1).div(55).add(1))
        displayThings = ["softcapped beyond 1e56 points! ^" + format(softcap) + " points"]
      } else if(softPoints.gte(1e28) && !hasMilestone("sp",3)){
        softcap = new Decimal(1).div(softPoints.log(10.1).div(27).add(1))
        displayThings = ["softcapped beyond 1e28 points! ^" + format(softcap) + " points"]
      }
    }
    return softcap
  }
  
  gain = gain.pow(calcSoftcap())
  gain = gain.mul(buyableEffect("r",11))
  
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Determines when the game "ends"
function isEndgame() {
	return player.a.points.gte(new Decimal("25"))
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
  if(oldVersion === "1.1b"){
    if(player.a.points.gte(12)) player.a.points = new Decimal(12)
    if(player.r.points.gte(6)) player.r.points = new Decimal(6)
  }
}