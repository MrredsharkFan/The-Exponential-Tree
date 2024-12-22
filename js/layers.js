addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        tetrato: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(10), 
    resource: "prestige points", 
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    upgrades: {
        11:{
            title: "another mod, another chance",
            description: "well, its the 2nd attempt of me making a tree, you wouldn't even know where's the first attempt",
            cost: new Decimal("1"),
            unlocked() { return player[this.layer].unlocked },
        },
        12:{
            title: "real exponent",
            description: "well, the last upgrade's effect is 10^x point gain. insane right? this one is self-synergy ON THE BASE lol",
            cost: new Decimal("10"),
            unlocked() { return player[this.layer].unlocked },
        },
        13:{
            title: "easy gaming?",
            description: "uhm, tetration vs exponent aint working... apply the previous upgrades' effect again.",
            cost: new Decimal("20"),
        },
        21:{
            title: "NOT easy gaming!",
            description: "prestige points boosts points before softcap. (*x)",
            cost: new Decimal("1.5e6"),
            unlocked() {return player[this.layer].points.gte(1e6)}
        },
        22:{
            title: "Dynamicality",
            description: "Gain 1 Tetrato/s, and make it have an effect.",
            cost: new Decimal("5e14"),
            unlocked() {return player[this.layer].points.gte(1e10)}
        },
        23:{
            title: "Another softcap already?",
            cost: new Decimal("5e50"),
            effect(){return player.points.log(10)},
            effectDisplay(){return format(player.points.log(10))},
            description: "tetrato syneriges with points.",
            unlocked() {return true}
        },
        24:{
            title: "Again, the same",
            cost: new Decimal("1e52"),
            effect(){return player.points.log(10).pow(3)},
            effectDisplay(){return format(player.points.log(10).pow(3))},
            description: "tetrato syneriges with points. this time ^3 effect.",
            unlocked() {return true}
        },
        25:{
            title: "maybe we add some flavor...",
            cost: new Decimal("5e52"),
            description: "tetrato boosts points, after ALL softcaps. (1:1 ratio)",
            unlocked() {return true}
        },
        31:{
            title: "not useful ig",
            description: "pow previous upgrade effect by log(log(points))",
            cost: new Decimal("1e58"),
            unlocked() {return player.points.gte(1e100)}
        },
        32:{
            title: "excuse me, buyables? I aint have coding skill for that...",
            description: "unlock ONE buyable for no reason",
            cost: new Decimal("1e64"),
            unlocked() {return player.points.gte(1e120)}
        },
        33:{
            title: "overtake not = undertake",
            description: "nerf u23 (^0.5) but buff u21 (*5)",
            cost: new Decimal("1e90"),
            unlocked() {return player.points.gte(1e180)}
        },
        34:{
            title: "may have overdone it a lil",
            description: "buff u21 by the buyable",
            cost: new Decimal("1e2230"),
            unlocked() {return player.points.gte("1e2000")}
        }
    },
    buyables:{
        11:{
            title: "A01",
            unlocked() {return hasUpgrade("p",32)},
            cost(x) {let u = new Decimal(x);
                return u.pow(x).times(1e63)
            },
            canAfford(){return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            display() { //copied code, how fun is this
                let data = tmp[this.layer].buyables[this.id]
                return "what the skidibi? (+^0.1 tetrato gain) \n\
                Cost: " + format(data.cost) + " Prestige Points\n\
                Amount: " + player[this.layer].buyables[this.id]
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        }
    },
    row: 0, 
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
