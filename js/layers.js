addLayer("r", {
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal(0),
    }},
    color: "#8300FF",
    tooltip(){
      return "<h3>Rebirth</h3><br>Rebirths: " + format(player.r.points)
    },
    resource: "rebirths", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom",
    getNextAt(){
      let costs = [5,100,25000,2500000,1e23,9.99e95,"eeeee9","1e1100","eeeee9"]
      if(hasAchievement("a",51)) costs[6] = "1e265";
      return new Decimal(costs[player[this.layer].points])
    },
    getResetGain(){
      return new Decimal(1)
    },
    canReset(){
      return player.points.gte(this.getNextAt())
    },
    prestigeButtonText(){
      return "+1 Rebirth<br>cost: " + format(this.getNextAt()) + " points"
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    displayRow: "side",
    hotkeys: [
        {key: "r", description: "R: Rebirth", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
      11: {
        cost(x) {
          return new Decimal(new Decimal(5).pow(x)).pow(x).mul(10)
        },
        effect(x) {
          return x.pow(new Decimal(1.5).add(x.div(10))).div(5).plus(1)
        },
        display() { return "<h3>Permament Rebirth to Point Gain</h3><br>Cost: " + format(this.cost()) + " points<br>Effect: x" + format(this.effect()) + " point gain"},
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return player.r.points.gte(5)}
      },
    },
    layerShown(){return true}
})
addLayer("a", {
  name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
    unlocked: true,
		points: new Decimal(0),
  }},
  color: "#ffee00",
  tooltip(){
    return "<h3>Achievements</h3><br> Achievements: " + format(player.a.points)
  },
  resource: "achievement points", // Name of prestige currency
  achievementPopups: true,
  achievements: {
    11: {
      name: "Rebirth One",
      done() {return player.r.points.gte(1)},
      tooltip: "Get a rebirth",
      onComplete() {player.a.points = player.a.points.plus(1)}
    },
    12: {
      name: "Rebirth Two",
      done() {return player.r.points.gte(2)},
      tooltip: "Get a second rebirth",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
    13: {
      name: "Not a challenge anymore",
      done() {return hasChallenge("p",12)},
      tooltip: "Beat the second challenges",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
    14: {
      name: "Rebirth Three",
      done() {return player.r.points.gte(3)},
      tooltip: "Get a third rebirth",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
    15: {
      name: "Rebirth Four",
      done() {return player.r.points.gte(4)},
      tooltip: "Get a fourth rebirth",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
    16: {
      name: "What's this.?",
      done() {return player.u.used.gte(1)},
      tooltip: "Use an upgrade point",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
    21: {
      name: "Many upgrades",
      done() {return player.u.points.gte(3)},
      tooltip: "Have 3 upgrade points",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(1)}
    },
    22: {
      name: "Too many upgrades",
      done() {return player.u.points.gte(5)},
      tooltip: "Have 5 upgrade points",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(2)}
    },
    23: {
      name: "Way too many upgrades",
      done() {return player.u.points.gte(9)},
      tooltip: "Have 9 upgrade points",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(3)}
    },
    24: {
      name: "Rebirth Five",
      done() {return player.r.points.gte(5)},
      tooltip: "Get a FIFTH rebirth",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(4)}
    },
    25: {
      name: "Milestoned",
      done() {return player.m.points.gte(2)},
      tooltip: "Get a second milestone point",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(5)}
    },
    26: {
      name: "Triple Milestone",
      done() {return player.m.points.gte(3)},
      tooltip: "Get a third milestone point",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(6)}
    },
    31: {
      name: "Many Milestone",
      done() {return player.m.points.gte(5)},
      tooltip: "Get a fifth milestone point",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(7)}
    },
    32: {
      name: "Many milestone",
      done() {return hasMilestone("sp",5)},
      tooltip: "Get six SP milestones",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(8)}
    },
    33: {
      name: "How many left?",
      done() {return player.m.points.gte(6)},
      tooltip: "Get a 6th rebirth point",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(9)}
    },
    34: {
      name: "Energy!",
      done() {return player.et.points.gte(1)},
      tooltip: "Get an energy token",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(10)}
    },
    35: {
      name: "Even More Energy!",
      done() {return player.et.points.gte(3)},
      tooltip: "Get three energy tokens",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(11)}
    },
    36: {
      name: "I need more names!",
      done() {return player.et.points.gte(5)},
      tooltip: "Get five energy tokens",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(12)}
    },
    41: {
      name: "Hated that layer anyway",
      done() {return hasChallenge("cp",11)},
      tooltip: "Beat C01: Unupgraded I",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(13)}
    },
    42: {
      name: "More like antiboosted",
      done() {return hasChallenge("cp",12)},
      tooltip: "Beat C02: Antimilestoned",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(14)}
    },
    43: {
      name: "Not again..",
      done() {return hasChallenge("cp",21)},
      tooltip: "Beat C03: Unupgraded II",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(15)}
    },
    44: {
      name: "EVEN MORE CONTENT?",
      done() {return player.r.points.gte(7)},
      tooltip: "Get Rebirth 7",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(16)}
    },
    45: {
      name: "New Challenge! .. wait what?",
      done() {return hasChallenge("cp",22)},
      tooltip: "Beat C04: Unsuperior",
      onComplete() {player.a.points = player.a.points.plus(1)},
      unlocked() {return player.a.points.gte(16)}
    },
    51: {
      name: "Energy",
      done() {return player.et.points.gte(10)},
      tooltip: "Get 10 energy tokens<br>[reward] Unlock a new rebirth.",
      onComplete() {player.a.points = player.a.points.plus(1)},
    },
  },
  layerShown(){return true},
  row: "side"
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal(0),
      hasUpgrade31: new Decimal(0),
      hasUpgrade32: new Decimal(0),
      hasUpgrade33: new Decimal(0),
      hasUpgrade34: new Decimal(0),
      hasUpgrade35: new Decimal(0),
    }},
    tooltip(){
      return "<h3>Prestige</h3><br>Prestige points: " + format(player.p.points)
    },
    color: "#4BDC13",
    requires(){
      return hasMilestone("p",3) ? new Decimal(5) : new Decimal(10)
    },
    passiveGeneration(){
      if(hasMilestone("m",7)) return 2.50
    },
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      return inChallenge("sp",11) ? 0.35 : 0.75
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasMilestone("p",6)) mult = mult.mul(layers.p.milestones[6].effect())
        if(hasUpgrade("p",22)) mult = mult.mul(10)
        mult = mult.mul(buyableEffect("et",12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      if(hasUpgrade("u",82)) return new Decimal(0.8555)
      if(hasUpgrade("p",23)) return new Decimal(1.025)
      return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
      0: {
        requirementDescription: "1 prestige point",
        effect(){
          if(hasMilestone("sp",0)) return new Decimal(3).mul(layers.sp.milestones[0].effect())
          return new Decimal(3)
        },
        effectDescription(){
          return hasUpgrade("u",11) ? "x" + format(this.effect())+ " point gain" : "+1 point gain"
        },
        done() { return player.p.points.gte(1) && !hasUpgrade("cp",12)}
      },
      1: {
        requirementDescription: "3 prestige points",
        effect(){
          let effect = player.p.points.pow(0.4);
          if(hasUpgrade("u",12)) effect = player.p.points.pow(0.55)
            
          if(effect.gte(new Decimal("1e100"))) effect = effect.div(1e85).log(1.15).mul("1e100")
          if(hasMilestone("p",8)) effect = effect.mul(1e6)
          return effect.add(2)
        },
        effectDescription(){
          return "Increase points gain on prestige points. Currently: +" + format(this.effect()) + " point gain"
        },
        done() { return player.p.points.gte(3) && !inChallenge("cp",12)}
      },
      2: {
        requirementDescription(){
          return hasUpgrade("u",21) ? "5 prestige points" : "10 prestige points"
        },
        effect(){
          if(hasUpgrade("u",21))
            return [player.r.points.sub(0.75).pow(5),player.r.points.sub(2.35).pow(1.25)]
          return [player.r.points.sub(0.75).pow(5),1]
        },
        effectDescription(){
          let thing = "Increase points gain on rebirth points. Currently: +" + format(this.effect()[0]) + " point gain"
          if(hasUpgrade("u",21)) thing += "<br> Milestone 3 plus also adds an x" + this.effect()[1] + " point gain"
          return thing
        },
        done() { return player.p.points.gte(hasUpgrade("u",21) ? 5 : 10) && player.r.points.gte(2) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(2)}
      },
      3: { 
        requirementDescription: "20 prestige points",
        effectDescription(){
          if(hasUpgrade("u",22)) return "Double prestige point and point gain"
          return "Double prestige point gain"
        },
        done() { return player.p.points.gte(20) && player.r.points.gte(2) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(2)}
      },
      4: {
        requirementDescription: "50 prestige points",
        effectDescription: "Unlock another challenge",
        done() { return player.p.points.gte(50) && player.r.points.gte(2)},
        unlocked() {return player.r.points.gte(2)}
      },
      5: {
        requirementDescription: "1,000 prestige points",
        effect(){
          if(hasUpgrade("u",31)) return player.points.pow(0.15).add(1)
          return player.points.pow(0.03).add(1)
        },
        effectDescription(){
          return "Point gain slightly self-synergises. Currently: x" + format(this.effect()) + " point gain"
        },
        done() { return player.p.points.gte(1000) && player.r.points.gte(3) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(3)}
      },
      6: {
        requirementDescription: "2,000 prestige points",
        effect(){
          if(hasUpgrade("u",32)) return player.p.points.pow(0.225).add(1)
          return player.p.points.pow(0.1).add(1)
        },
        effectDescription(){
          return "Prestige points multiply point gain. Currently: x" + format(this.effect()) + " point gain"
        },
        done() { return player.p.points.gte(2000) && player.r.points.gte(3) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(3)}
      },
      7: {
        requirementDescription: "1e9 prestige points",
        effect(){
          if(player.u.points.lte(0)) return new Decimal(1)
          if(hasUpgrade("u",72)) return player.u.points.add(1).pow(2.5).add(1)
          return player.u.points.pow(1.75).add(1)
        },
        effectDescription(){
          return "Upgrades points multiply point gain. Currently: x" + format(this.effect()) + " point gain"
        },
        done() { return player.p.points.gte(1e9) && player.r.points.gte(4) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(4)}
      },
      8: {
        requirementDescription: "1e18 prestige points",
        effectDescription: "Boost milestone 2",
        done() { return player.p.points.gte(1e18) && player.r.points.gte(4) && !inChallenge("cp",12)},
        unlocked() {return player.r.points.gte(4)}
      },
    },
    challenges: {
      11: {
          name(){
            return hasUpgrade("u",41) ? "Upgraded+" : "Upgraded"
          },
          challengeDescription(){
             return "Raise point gain to ^0.25 & unlock an upgrade"
          },
          rewardDescription(){
            return hasUpgrade("u",41) ? "Unlock 3 upgrades" : "Unlock 2 upgrades"
          },
          goalDescription(){
            return hasUpgrade("u",41) ? "Get 750 points" : "Get 20 points"
          },
          canComplete: function() {return player.points.gte(hasUpgrade("u",41) ? 750 : 20)},
          onExit(){
            if(!hasChallenge("p",11)) player.p.upgrades.pop(11)
            if(player.points.gte(player.sp.ac12)) player.sp.ac12 = player.points
          },
          unlocked(){return player.r.points.gte(2)}
      },
      12: {
          name(){
            return hasUpgrade("u",42) ? "Upgraded II+..." : "Upgraded II..."
          },
          challengeDescription: "Raise point gain to ^0.45 and divide gain by 5 & unlock three upgrades",
          rewardDescription(){
            return hasUpgrade("u",42) ? "Permamently unlock 3 upgrades" : "Permamently unlock an upgrade"
          },
          goalDescription: "All upgrades bought",
          canComplete: function() {return player.p.upgrades.length >= 5},
          onExit(){
            player.p.upgrades.slice(0, 2)
            if(!hasChallenge("p",15)) player.p.upgrades.slice(0, 2).push(15)
          },
          unlocked(){return hasMilestone("p",4)}
      },
      21: {
          name: "Upgraded for the third time..",
          challengeDescription: "Raise point gain to ^0.25",
          rewardDescription: "Unlock two upgrades",
          goalDescription: "15,000 Points",
          canComplete: function() {return player.points.gte(15000)},
          unlocked(){return hasMilestone("p",4) && hasUpgrade("u",71)}
      },
    },
    upgrades: {
      11: {
        title(){
          return hasUpgrade("u",51) ? "Upgrade 11+" : "Upgrade 11"
        },
        description(){
          return hasUpgrade("u",51) ? "x145 point point gain" : "x1.45 point gain"
        },
        effect(){
          return hasUpgrade("u",51) ? new Decimal(145):  new Decimal(1.45)
        },
        cost(){
          return hasUpgrade("u",51) ? new Decimal(100000) : new Decimal(10)
        },
        unlocked(){
          return inChallenge("p",11) || hasChallenge("p",11)
        }
      },
      12: {
        title(){
          return hasUpgrade("u",52) ? "Upgrade 12+" : "Upgrade 12"
        },
        description(){
          return hasUpgrade("u",52) ? "x1.5" : "x1.25 point gain"
        },
        effect(){
          return hasUpgrade("u",51) ? new Decimal(1.5):  new Decimal(1.25)
        },
        cost(){
          return hasUpgrade("u",51) ? new Decimal(5) : new Decimal(25)
        },
        unlocked(){
          return hasChallenge("p",11) || hasUpgrade("u",52)
        }
      },
      13: {
        title: "Upgrade 13",
        description: "+100 point gain",
        cost: new Decimal(10),
        currencyInternalName: "points",
        currencyLocation() { return player },
        currencyDisplayName: "points",
        unlocked(){
          return inChallenge("p",12) || hasUpgrade("u",42) && hasChallenge("p",12)
        }
      },
      14: {
        title: "Upgrade 14",
        description: "x2 point gain",
        cost: new Decimal(50),
        currencyInternalName: "points",
        currencyLocation() { return player },
        currencyDisplayName: "points",
        unlocked(){
          return inChallenge("p",12) || hasUpgrade("u",42) && hasChallenge("p",12)
        }
      },
      15: {
        title(){
          return hasUpgrade("u",61) ? "Upgrade 15+" : "Upgrade 15"
        },
        description(){
          return hasUpgrade("u",61) ? "x10 point gain" : "x6 point gain"
        },
        effect(){
          return hasUpgrade("u",61) ? new Decimal(10):  new Decimal(6)
        },
        cost(){
          if(inChallenge("p",12) && hasUpgrade("u",42)) return new Decimal(450)
          if(inChallenge("p",12)) return new Decimal(100)
          return new Decimal(500)
        },
        currencyInternalName: "points",
        currencyLocation() { return player },
        currencyDisplayName: "points",
        unlocked(){
          return inChallenge("p",12) || hasChallenge("p",12) || hasUpgrade("u",61)
        }
      },
      21: {
        title(){
          return hasUpgrade("u",62) ? "Upgrade 21+" : "Upgrade 21"
        },
        cost: new Decimal(10000),
        effect(){
          let gain = player.points
          if(hasUpgrade("u",62)) gain = gain.mul(player.p.points.pow(0.15).add(1))
          return gain.pow(0.25).add(1)
        },
        description(){
          if(hasUpgrade("u",62)) return "point gain and prestige point gain boost point gain<br>Currently: x" + format(this.effect()) + " point gain"
          return "point gain self-synergises with itself<br>Currently: x" + format(this.effect()) + " point gain"
        },
        unlocked(){
          return hasMilestone("p",6)
        }
      },
      22: {
        title: "Upgrade 22",
        cost: new Decimal(500000),
        description: "10x prestige point gain",
        unlocked(){
          return hasUpgrade("u",41) && hasChallenge("p",11)
        },
      },
      23: {
        title: "Upgrade 23",
        cost: new Decimal(1e16),
        description: "^1.025 prestige point gain",
        unlocked(){
          return hasChallenge("p",21)
        },
      },
      24: {
        title: "Upgrade 24",
        cost: new Decimal(1e19),
        description: "^1.025 point gain",
        unlocked(){
          return hasChallenge("p",21)
        },
      },
      25: {
        title: "Upgrade 25",
        cost: new Decimal(1e70),
        description: "^1.3 point gain",
        unlocked(){
          return hasMilestone("m",6)
        },
      },
    }, 
    doReset(resettingLayer) {
      if (layers[resettingLayer].row <= this.row) return;
      let keptMilestone = [], resistedMilestone = [
        [1,2,"m", 0],
        [1,4,"m", 1],
        [1,0,"m", 2],
        [1,1,"m", 2],
        [1,3,"m", 2],
        [1,5,"m", 2],
        [1,6,"m", 2],
        [1,7,"m", 2],
      ], keptUpgrade = [], resistedUpgrade = [
        [1,11,"et", 5],
        [1,12,"et", 5],
        [1,13,"et", 5],
        [1,14,"et", 5],
        [1,15,"et", 5],
        [1,21,"et", 5],
        [1,22,"et", 5],
        [1,23,"et", 5],
        [1,24,"et", 5],
        [1,25,"et", 5],
      ], keptChallenge = [], resistedChallenge = [
        [1,12,"m", 1, 1],
        [1,11,"m", 3, 1],
        [1,21,"et", 4, 1],
      ]
    
      for(let i = 0; i < resistedMilestone.length; i++)
        if (layers[resettingLayer].row == resistedMilestone[i][0] && hasMilestone(resistedMilestone[i][2],resistedMilestone[i][3]))
          keptMilestone.push(resistedMilestone[i][1]);
    
      for(let i = 0; i < resistedUpgrade.length; i++)
        if (layers[resettingLayer].row == resistedUpgrade[i][0] && hasMilestone(resistedUpgrade[i][2],resistedUpgrade[i][3]) && hasUpgrade(this.layer,resistedUpgrade[i][1]))
          keptUpgrade.push(resistedUpgrade[i][1]);
      
      for(let i = 0; i < resistedChallenge.length; i++)
        if (layers[resettingLayer].row == resistedChallenge[i][0] && hasMilestone(resistedChallenge[i][2],resistedChallenge[i][3]) && hasChallenge(this.layer,resistedChallenge[i][1]))
          keptChallenge.push(resistedChallenge[i][1]);
    
      layerDataReset(this.layer);
      if(!inChallenge("cp",12)) for(let i = 0; i < keptMilestone.length; i++) player[this.layer].milestones.push(keptMilestone[i]);
      for(let i = 0; i < keptUpgrade.length; i++) player[this.layer].upgrades.push(keptUpgrade[i]);
      for(let i = 0; i < keptChallenge.length; i++) player[this.layer].challenges[keptChallenge[i]] = resistedChallenge[i][4];
    },
    layerShown(){return player.r.points.gte(1)}
})
addLayer("u", {
    name: "upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal(0),
		  used: new Decimal(0),
    }},
    tooltip(){
      return "<h3>Upgrade</h3><br>Upgrades points: " + format(player.u.points)
    },
    color: "#ffee00",
    resource: "upgrade points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "custom",
    getNextAt(){
      let costs = [100000,500000,4500000,25000000,350000000,5000000000,5e11,1e15,1e28,1e35,6.9e69,1e125,1e255,"1e500","1e1850", "1e4000", 1e99999999999999999999]
      if(hasChallenge("cp",31)) return new Decimal(costs[player[this.layer].points-4])
      if(hasMilestone("m",4)) return new Decimal(costs[player[this.layer].points-2])
      return new Decimal(costs[player[this.layer].points])
    },
    getResetGain(){
      return new Decimal(1)
    },
    canReset(){
      return player.p.points.gte(this.getNextAt()) && !inChallenge("cp",11)
    },
    prestigeButtonText(){
      if(inChallenge("cp",11)) return `You are unable to get Upgrade points [cp0${(player.cp.activeChallenge-6)/5}]`
       return "+1 Upgrade points<br>cost: " + format(this.getNextAt()) + " prestige points"
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "u", description: "U: Reset for upgrades points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
      ["display-text",
        function() {
          return "You have <h2>" + format(player.u.points) + "</h2> total upgrade points<br>" +
          "You currently have <h2>" + format(player.u.points.sub(player.u.used)) + "</h2> upgrade points <br>"
        },],
      "prestige-button",
      "blank",
      "clickables",
      ["upgrades",[1,2,3,4,5,6]],
      "blank",
      "blank",
      ["upgrades",[7]],
      "blank",
      ["display-text",
        function() {
          return "Sacrifices [All of these will do a U reset]"
        },],
      ["upgrades",[8,9]]
    ],
    clickables: {
      11: {
        display() {return "Respec upgrades"},
        tooltip: "This will also force an upgrade reset",
        onClick() {
          doReset("u",true)
          player.u.upgrades = []
          player.u.used = new Decimal(0)
        },
        canClick() {return true}
      }
    },
    upgrades: {
      11: {
        fullDisplay(){
          return "<h2>Milestone 1 Plus</h2><br>Milestone 1 triples point gain<br>Costs 1 upgrade point"
        },
        tooltip: "Milestone 1 will no longer give +1 point and instead x3 point gain",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      12: {
        fullDisplay(){
          return "<h2>Milestone 2 Plus</h2><br>Milestone 2 formula is better<br>Costs 1 upgrade point"
        },
        tooltip: "<em>pp^0.4</em> => <em>pp^0.55</em>",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      21: {
        fullDisplay(){
          return "<h2>Milestone 3 Plus</h2><br>Milestone 3 also slightly multiplies point gain; the requirement is divided by 2<br>Costs 1 upgrade point"
        },
        tooltip: "Excactly what the description says",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      22: {
        fullDisplay(){
          return "<h2>Milestone 4 Plus</h2><br>Milestone 4 affects point gain<br>Costs 1 upgrade point"
        },
        tooltip: "If you have <em>30 prestige point milestone</em>, double point gain",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      31: {
        fullDisplay(){
          return "<h2>Milestone 6 Plus</h2><br>Milestone 6 formula is better<br>Costs 1 upgrade point"
        },
        tooltip: "<em>p^0.1+1</em> => <em>p^0.225+1</em>",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      32: {
        fullDisplay(){
          return "<h2>Milestone 8 Plus</h2><br>Milestone 8 formula is better<br>Costs 1 upgrade point"
        },
        tooltip: "<em>u^1.75+1</em> => <em>u^2.5+1</em>",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      41: {
        fullDisplay(){
          return "<h2>Challenge 1 Plus</h2><br>Challenge 1 is much harder but it gives an extra reward<br>Costs 1 upgrade point"
        },
        tooltip: "Requirement is increased to 750 points and it unlocks another upgrade",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      42: {
        fullDisplay(){
          return "<h2>Challenge 2 Plus</h2><br>You also unlock the other two upgrades from Challenge 2<br>Costs 1 upgrade point"
        },
        tooltip: "Excactly what the description says",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      51: {
        fullDisplay(){
          return "<h2>Upgrade 11 Plus</h2><br>Upgrade 11 costs 10,000x more but it is 100x stronger<br>Costs 2 upgrade point"
        },
        tooltip: "Excactly what the description says",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.plus(1))},
        pay(){player.u.used = player.u.used.add(2)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      52: {
        fullDisplay(){
          return "<h2>Upgrade 12 Plus</h2><br>Upgrade 12 can be obtained without beating the challenge, it is cheaper, and is stronger<br>Costs 1 upgrade point"
        },
        tooltip: "Effect is 1.25x => 1.5x and price is 25 => 5",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      61: {
        fullDisplay(){
          return "<h2>Upgrade 15 Plus</h2><br>Upgrade 15 can be obtained without beating the challenge, and it is stronger<br>Costs 1 upgrade point"
        },
        tooltip: "Effect is 4.5x => 10x",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      62: {
        fullDisplay(){
          return "<h2>Upgrade 21 Plus</h2><br>Prestige point also boosts upgrade 21<br>Costs 1 upgrade point"
        },
        tooltip: "Excactly what the description says",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used)},
        pay(){player.u.used = player.u.used.add(1)},
        currencyLayer: "u",
        currencyInternalName: "unused",
      },
      71: {
        fullDisplay(){
          return "<h2>Milestone 5 plus</h2><br>Milestone 5 also unlocks another challenge<br>Costs 2 upgrade point"
        },
        tooltip: "The challenge unlocks two more upgrades; it should be reletively easy at your current stage",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.add(1))},
        pay(){player.u.used = player.u.used.add(2)},
        currencyLayer: "u",
        currencyInternalName: "unused",
        unlocked() { return hasMilestone("m",4) }
      },
      72: {
        fullDisplay(){
          return "<h2>Milestone 8 plus</h2><br>Milestone 8 formula is improved<br>Costs 2 upgrade point"
        },
        tooltip: "Effect is <em>u^1.75</em> to <em>u^2.5</em>",
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.add(1))},
        pay(){player.u.used = player.u.used.add(2)},
        currencyLayer: "u",
        currencyInternalName: "unused",
        unlocked() { return hasMilestone("m",4) }
      },
      81: {
        fullDisplay(){
          return "<h2>Sacrifice [upgrade]</h2><br>x1e9 point multiplier; every leftover upgrade point will boost by x1,000<br>Sacrifices 5 upgrade points"
        },
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.add(4))},
        pay(){
          doReset("u",true)
          player.u.used = player.u.used.add(5)
        },
        effect(){
          return new Decimal(1e9).mul(new Decimal(1000).pow(player.u.points.sub(player.u.used)))
        },
        currencyLayer: "u",
        currencyInternalName: "unused",
        unlocked() { return hasMilestone("sp",6)}
      },
      82: {
        fullDisplay(){
          return "<h2>Sacrifice [Prestige]</h2><br>^0.85 prestige point gain<br>Sacrifices -6 upgrade points"
        },
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.sub(5))},
        pay(){
          doReset("u",true)
          player.u.used = player.u.used.sub(new Decimal(6))
        },
        effect(){
          return new Decimal(1000000).mul(new Decimal(1000).pow(player.u.points.sub(player.u.used)))
        },
        currencyLayer: "u",
        currencyInternalName: "unused",
        unlocked() { return hasMilestone("sp",6)}
      },
      91: {
        fullDisplay(){
          return "<h2>Sacrifice [Softcap]</h2><br>The softcap is pushed to 1e350 points but add a weak softcap starting at 1 point<br>Sacrifices 8 upgrade points"
        },
        style:{"width":"280px","borderRadius":"25px"},
        canAfford(){return player.u.points.gt(player.u.used.add(7))},
        pay(){
          doReset("u",true)
          player.u.used = player.u.used.add(new Decimal(8))
        },
        effect(){
          return new Decimal(1000000).mul(new Decimal(1000).pow(player.u.points.sub(player.u.used)))
        },
        currencyLayer: "u",
        currencyInternalName: "unused",
        unlocked() { return hasMilestone("sp",6)}
      },
    },
    layerShown(){return player.r.points.gte(4)}
})
addLayer("m", {
    name: "milestones", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal(0),
    }},
    tooltip(){
      return "<h3>Milestones</h3><br>Milestone points: " + format(player.m.points)
    },
    color: "#9333FF",
    resource: "milestone points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "custom",
    getNextAt(){
      const costs = [1e4,1e7,1e10,1e13,1e20,5e24,6.9e69,1e999999999999999999]
      if (hasChallenge("cp",11)){
        costs[7] = "1e300";
        costs.push("1e6969")
        costs.push("eeeeeeeeeeeeeeeeeeeeeee9999999999999999999999999")
      }
      return new Decimal(costs[player[this.layer].points])
    },
    getResetGain(){
      return new Decimal(1)
    },
    canReset(){
      return player.p.points.gte(this.getNextAt())
    },
    prestigeButtonText(){
      return "+1 Milestone point<br>cost: " + format(this.getNextAt()) + " prestige points"
    },
    doReset(resettingLayer) {
      if (layers[resettingLayer].row <= this.row) return;
      let keptMilestone = [], resistedMilestone = [
        [2,5,"et", 0],
      ], keptUpgrade = [], resistedUpgrade = [
      ], keptChallenge = [], resistedChallenge = [
      ]
    
      for(let i = 0; i < resistedMilestone.length; i++)
        if (layers[resettingLayer].row == resistedMilestone[i][0] && hasMilestone(resistedMilestone[i][2],resistedMilestone[i][3]))
          keptMilestone.push(resistedMilestone[i][1]);
    
      for(let i = 0; i < resistedUpgrade.length; i++)
        if (layers[resettingLayer].row == resistedUpgrade[i][0] && hasMilestone(resistedUpgrade[i][2],resistedUpgrade[i][3]))
          keptUpgrade.push(resistedUpgrade[i][1]);
      
      for(let i = 0; i < resistedChallenge.length; i++)
        if (layers[resettingLayer].row == resistedChallenge[i][0] && hasMilestone(resistedChallenge[i][2],resistedChallenge[i][3]))
          keptChallenge.push(resistedChallenge[i][1]);
    
      layerDataReset(this.layer);
      for(let i = 0; i < keptMilestone.length; i++) player[this.layer].milestones.push(keptMilestone[i]);
      for(let i = 0; i < keptUpgrade.length; i++) player[this.layer].upgrades.push(keptUpgrade[i]);
      for(let i = 0; i < keptChallenge.length; i++) player[this.layer].challenges[keptChallenge[i]] = resistedChallenge[i][4];
      if(hasMilestone("et",1)) player.m.points = new Decimal(1);
      if(hasMilestone("et",2)) player.m.points = new Decimal(3);
      if(hasMilestone("et",3)) player.m.points = new Decimal(6);
      if(hasMilestone("et",6)) player.m.points = new Decimal(8);
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["p"],
    hotkeys: [
        {key: "m", description: "M: Reset for milestone points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
      0: {
        requirementDescription: "Milestone 1 [1e4]",
        effectDescription: "Keep the 10 prestige point milestone on reset",
        tooltip: "[<em>Increase points gain on rebirth points</em> milestone]",
        done() { return player.m.points.gte(1) }
      },
      1: {
        requirementDescription: "Milestone 2 [1e7]",
        effectDescription: "Keep challenge 2 on reset and it's milestone",
        tooltip: "[Keep <em>Upgraded II...</em> and <em>150 prestige point milestone</em> regardless of having <em>Challenge 12 Plus</em> or not]",
        done() { return player.m.points.gte(2) }
      },
      2: {
        requirementDescription: "Milestone 3 [1e10]",
        effectDescription: "Keep the first 8 milestones",
        tooltip: "[Milestones <em>1 prestige point milestone</em> to <em>1e9 prestige point milestone</em> are kept]",
        done() { return player.m.points.gte(3) }
      },
      3: {
        requirementDescription: "Milestone 4 [1e13]",
        effectDescription: "Keep the first challenge",
        tooltip: "[Keep <em>Upgraded Challenges</em> regardless of having <em>Challenge 11 Plus</em> or not]",
        done() { return player.m.points.gte(4) }
      },
      4: {
        requirementDescription: "Milestone 5 [1e20]",
        effectDescription: "Unlock 2 more U upgrades; the price is decreased",
        tooltip: "[Scaling is decreased by 2]",
        done() { return player.m.points.gte(5) }
      },
      5: {
        requirementDescription: "Milestone 6 [5e24]",
        effectDescription: "Unlock a new layer",
        tooltip: "[Unlock <em>Super Prestige</em> layer]",
        done() { return player.m.points.gte(6) }
      },
      6: {
        requirementDescription: "Milestone 7 [6.9e69]",
        effectDescription: "Unlock an upgrade",
        tooltip: "Unlock an upgrade",
        done() { return player.m.points.gte(7) }
      },
      7: {
        requirementDescription: "Milestone 8 [1e300]",
        effectDescription: "Passively generate prestige points",
        tooltip: "250% of PP gain every second",
        done() { return player.m.points.gte(8)},
        unlocked() {return hasChallenge("cp",11)}
      },
    },
    layerShown(){return player.r.points.gte(5)}
})
addLayer("sp", {
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal(0),
		  achieves: new Decimal(0),
		  ac12: new Decimal(1),
    }},
    tooltip(){
      return "<h3>Super Prestige [SP]</h3><br>Super prestige points: " + format(player.sp.points)
    },
    color: "#00ffc8",
    requires: new Decimal(1e30),
    resource: "super prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.45, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult.mul(buyableEffect("et",21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
    },
    branches: ["p"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "shift + P: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
      0: {
        requirementDescription: "1 super prestige point",
        effectDescription(){
          return "Boost the first milestone based on super prestige points<br>[THIS ONLY WORKS IF YOU HAVE MILESTONE 1 PLUS]"
        },
        effect() {
          if(inChallenge("cp",22)) return player.sp.points.pow(0.45).pow(buyableEffect("et",31))
          if(hasMilestone("sp",13)) return player.sp.points.add(100).pow(0.95).add(2).pow(buyableEffect("et",31))
          return player.sp.points.pow(0.75).add(2).pow(buyableEffect("et",31))
        },
        tooltip(){
          return "Currently: x" + format(this.effect())
        },
        done() {return player.sp.points.gte(1)},
      },
      1: {
        requirementDescription: "5 super prestige point",
        effectDescription(){
          return "Boost points based on rebirths"
        },
        effect() {
          return player.r.points.pow(0.1).sub(0.1)
        },
        tooltip(){
          return "Currently: ^" + format(this.effect())
        },
        done() {return player.sp.points.gte(5)},
      },
      2: {
        requirementDescription: "12 super prestige point",
        effectDescription(){
          return "Improve <em>1 super prestige points</em> milestone"
        },
        effect() {
          if(hasAchievement("sp",13)) return player.sp.points.add(100).pow(0.95).add(2)
          return player.sp.points.pow(0.75).add(2)
        },
        tooltip(){
          return "Currently: x" + format(this.effect())
        },
        done() {return player.sp.points.gte(12)},
      },
      3: {
        requirementDescription: "200 super prestige point",
        effectDescription(){
          return "The point softcap is twice as far as normal"
        },
        tooltip(){
          return "Excactly what it says."
        },
        done() {return player.sp.points.gte(200)},
      },
      4: {
        requirementDescription: "25,000 super prestige point",
        effectDescription(){
          return "Boost point gain"
        },
        tooltip(){
          return "^1.1 point gain"
        },
        done() {return player.sp.points.gte(25000)},
      },
      5: {
        requirementDescription: "1e14 super prestige point",
        effectDescription(){
          return "Boost point gain further"
        },
        tooltip(){
          return "x1e10 point gain."
        },
        done() {return player.sp.points.gte(1e14)},
      },
      6: {
        requirementDescription: "1e55 super prestige point",
        effectDescription(){
          return "Unlock Sacrifices"
        },
        tooltip(){
          return "[U layer]"
        },
        done() {return player.sp.points.gte(1e55) && hasChallenge("cp",12)},
        unlocked(){return hasChallenge("cp",12)}
      },
    },
    layerShown(){return hasMilestone("m",5)}
})
addLayer("et", {
    symbol: "ET", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
		  shards: new Decimal(0),
		  achieves: new Decimal(0),
		  ac12: new Decimal(1),
    }},
    tooltip(){
      return "<h3>Energy Tokens [ET]</h3><br>Energy Tokens: " + format(player.et.points) + "<br>Energy: " + format(player.et.shards)
    },
    color: "yellow",
    requires: new Decimal(1e100),
    resource: "energy tokens", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.15, // Prestige currency exponent
    base: 5e13,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
    },
    branches: ["u","m"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "E", description: "E: Reset for energy tokens", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    gain(){
      var gain = new Decimal(11).pow(player.et.points).sub(1).mul(buyableEffect("et",22))
      if(hasChallenge("cp",12)) gain = gain.mul(new Decimal(10).pow(player.cp.points.add(2)))
      
      gain = gain.pow(buyableEffect("et",32))
      return gain
    },
    update(diff){
      player.et.shards = player.et.shards.add(this.gain().mul(diff))
    },
    milestones: {
      0: {
        requirementDescription: "Energy Milestone 1 [1ET]",
        effectDescription: "Keep the SP layer",
        done() { return player.et.points.gte(1) },
      },
      1: {
        requirementDescription: "Energy Milestone 2 [1,000E]",
        effectDescription: "Start with 1 M point on 3rd layer resets",
        done() { return player.et.shards.gte(1000) },
      },
      2: {
        requirementDescription: "Energy Milestone 3 [25,000E]",
        effectDescription: "Start with 3 M point on 3rd layer resets",
        done() { return player.et.shards.gte(25000) },
      },
      3: {
        requirementDescription: "Energy Milestone 4 [500,000E]",
        effectDescription: "Start with 6 M point on 3rd layer resets",
        done() { return player.et.shards.gte(500000) },
      },
      4: {
        requirementDescription: "Energy Milestone 5 [1e15E]",
        effectDescription: "Second layer doesn't reset challenge 'Upgraded for the third time'",
        done() { return player.et.shards.gte(1e15)},
      },
      5: {
        requirementDescription: "Energy Milestone 6 [1e30E]",
        effectDescription: "Second layer doesn't reset the first 10 P upgrades",
        done() { return player.et.shards.gte(1e30)},
      },
      6: {
        requirementDescription: "Energy Milestone 7 [1e40E]",
        effectDescription: "Keep up to 8 M milestones on row 3 resets",
        done() { return player.et.shards.gte(1e40)},
      },
    },
    tabFormat: [
      ["display-text",
        function() {
          return "<h2>" + format(player.et.points) + "</h2> energy tokens<br>" +
          "<h2>" + format(player.et.shards) + "</h2> energy [+" + format(layers.et.gain()) + "/s]"
        },],
      "prestige-button",
      "blank",
      "milestones",
      "buyables",
    ],
    buyables: {
      11: {
        cost(x) {
          return new Decimal(new Decimal(1.6).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(12.5).add(1)
        },
        display() { return "<h3>Point Booster</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: x" + format(this.effect()) + " point gain"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return player.r.points.gte(6)}
      },
      12: {
        cost(x) {
          return new Decimal(new Decimal(1.85).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(8.15).add(1)
        },
        display() { return "<h3>Prestige Booster</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: x" + format(this.effect()) + " prestige gain"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return player.r.points.gte(6)}
      },
      21: {
        cost(x) {
          return new Decimal(new Decimal(2).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(4.15).add(1)
        },
        display() { return "<h3>Super Booster</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: x" + format(this.effect()) + " super prestige gain"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return player.r.points.gte(6)}
      },
      22: {
        cost(x) {
          return new Decimal(new Decimal(1.5).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(1.45).div(10).plus(1)
        },
        display() { return "<h3>Energy Booster</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: x" + format(this.effect()) + " energy gain"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return player.r.points.gte(6)}
      },
      31: {
        cost(x) {
          return new Decimal(new Decimal(10).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(0.65).div(10).plus(1)
        },
        display() { return "<h3>Milestone Booster</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: ^" + format(this.effect()) + " effect"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasChallenge("cp",22)}
      },
      32: {
        cost(x) {
          return new Decimal(new Decimal(35).pow(x)).pow(x)
        },
        effect(x) {
          return x.pow(0.65).div(25).plus(1)
        },
        display() { return "<h3>Energy Booster 2</h3><br>Cost: " + format(this.cost()) + " energy<br>Effect: ^" + format(this.effect()) + " gain"},
        canAfford() { return player.et.shards.gte(this.cost()) },
        buy() {
            player.et.shards = player.et.shards.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasChallenge("cp",22)}
      },
    },
    layerShown(){return player.r.points.gte(6)}
})
addLayer("cp", {
    symbol: "CP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
    }},
    tooltip(){
      return "<h3>Challenge Points [CP]</h3><br>Challenge Points: " + format(player.cp.points)
    },
    color: "red",
    requires: new Decimal(1e165),
    resource: "challenge points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "custom",
    getNextAt(){
      const costs = [1e165,1e244,1e280,"1e350","1e420","1e6969696969969696969696996969696969696969"]
      return new Decimal(costs[player[this.layer].points])
    },
    getResetGain(){
      return new Decimal(1)
    },
    canReset(){
      return player.p.points.gte(this.getNextAt())
    },
    prestigeButtonText(){
      return "+1 Challenge Point<br>cost: " + format(this.getNextAt()) + " prestige points"
    },
    branches: ["sp"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "C: Reset for challenge points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    challenges: {
      11: {
          name: "cp01 [Unupgraded I]",
          challengeDescription: "U points can't be obtained but start with 2 U and 200 SP points",
          rewardDescription: "Unlock new M milestones",
          goalDescription: "Get 1e25 super prestige points",
          canComplete() {return player.sp.points.gte(1e25)},
          onEnter(){
            player.u.points = new Decimal(2)
            player.sp.points = new Decimal(200)
          },
          unlocked(){return player.cp.points.gte(1)}
      },
      12: {
          name: "cp02 [Antimilestoned]",
          challengeDescription: "The first 9 P milestones are unobtainable except the 1st and 4th one; start with 1 SP.<br>Also boosts point gain by *5, ignoring exponents",
          rewardDescription: "Unlock a SP milestone",
          goalDescription: "1e13 prestige points",
          canComplete() {return player.p.points.gte(1e13)},
          onEnter(){
            player.sp.points = new Decimal(1)
          },
          unlocked(){return player.cp.points.gte(1)}
      },
      21: {
          name: "cp03 [Unupgraded II]",
          challengeDescription: "U points can't be obtained and start with -1 U and 200 SP points",
          rewardDescription: "Energy gain is boosted by CP points",
          goalDescription: "Get 5e11 super prestige points",
          canComplete() {return player.sp.points.gte(5e11)},
          onEnter(){
            player.u.points = new Decimal(-1)
            player.sp.points = new Decimal(200)
          },
          countsAs: [11],
          unlocked(){return player.cp.points.gte(2)}
      },
      22: {
          name: "cp04 [Unsuperior]",
          challengeDescription: "1 SP milestone is worse",
          rewardDescription: "Unlock 2 new ET buyable",
          goalDescription: "Get 1e75 super prestige points",
          canComplete() {return player.sp.points.gte(1e75)},
          unlocked(){return player.cp.points.gte(3)}
      },
      31: {
          name: "cp05 [Finale]",
          challengeDescription: "Combines every challenge [start with nothing but 100 SP points]",
          rewardDescription: "U point cost is decreased",
          onEnter(){
            player.sp.points = new Decimal(100)
          },
          countsAs: [11,12,22],
          goalDescription: "Get 1e11 prestige points",
          canComplete() {return player.p.points.gte(1e11)},
          unlocked(){return player.cp.points.gte(4)}
      },
    },
    layerShown(){return player.et.points.gte(1) || player.r.points.gte(7)}
})