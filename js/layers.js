addLayer("a", {
    name: "aether", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#dfcfff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Aether", // Name of prestige currency
    baseResource: "Light", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("a", 21)) mult = mult.times(upgradeEffect("a", 21))
        if(getBuyableAmount("a", 12).gt(0)) mult = mult.times(buyableEffect("a", 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        return hasUpgrade("a", 24) ? 1 : 0
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Aether", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                ["prestige-button", "", function (){ return hasUpgrade("a", 24) ? {'display': 'none'} : {}}],
                ["display-text", function() {
                    if(hasUpgrade("a", 24)) return "You are getting " + format(tmp.a.resetGain) + " Aether per second."
                }],
                "blank",
                "upgrades",
            ],
        },
        "Colors": {
            content: [
                "main-display",
                ["prestige-button", "", function (){ return hasUpgrade("a", 24) ? {'display': 'none'} : {}}],
                ["display-text", function() {
                    if(hasUpgrade("a", 24)) return "You are getting " + format(tmp.a.resetGain) + " Aether per second."
                }],
                "blank",
                "buyables",
            ],
            unlocked() {
                return hasUpgrade("a", 14)
            } 
        },
    },
    upgrades: {
        11: {
            title: "Where It Begins",
            description: "Start gaining Light.",
            cost: new Decimal(1),
        },
        12: {
            title: "Aether Purufier",
            description: "<b>Aether</b> increases <b>Light</b> gain.",
            cost: new Decimal(1),
            effect() {
                value = new Decimal(1.5).add(player["a"].points.pow(0.333333))
                if (value.gte(100)) return new Decimal(100).add(value.sub(99).log(10).pow(2).times(5))
                else return value
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {return hasUpgrade("a", 11)},
        },
        13: {
            title: "Reflection",
            description: "<b>Light</b> boosts itself.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(1).add(player.points.add(1).log(10))
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {return hasUpgrade("a", 12)},
        },
        14: {
            title: "Then There Was Color",
            description: "Unlock <bdi style=\"color:#df0f0f\">Red</bdi>, the first <b>Color</b>.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade("a", 13)},
        },
        21: {
            title: "Efficiency",
            description: "<b>Light</b> increases <b>Aether</b> gain.",
            cost: new Decimal(40),
            effect() {
                return new Decimal(1).add(player.points.add(1).log(10).pow(0.5))
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {return hasUpgrade("a", 14)},
        },
        22: {
            title: "Next In Line",
            description: "Unlock <bdi style=\"color:#0fdf0f\">Green</bdi>, the second <b>Color</b>.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("a", 21)},
        },
        23: {
            title: "<bdi style=\"color:#dfdf0f\">Yellow</bdi>",
            description: "<bdi style=\"color:#0fdf0f\">Green</bdi> boosts <bdi style=\"color:#df0f0f\">Red</bdi> base.",
            cost: new Decimal(750),
            effect() {
                return getBuyableAmount("a", 12).pow(0.5).div(10)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {return hasUpgrade("a", 22)},
        },
        24: {
            title: "Lossless Conversion",
            description: "Disable manual Aether reset, but gain 100% of pending Aether per second.",
            cost: new Decimal(10000),
            unlocked() {return hasUpgrade("a", 23)},
        },
        31: {
            title: "The Basic Colors",
            description: "Unlock <bdi style=\"color:#0f0fdf\">Blue</bdi>, the third <b>Color</b>.",
            cost: new Decimal("1e7"),
            unlocked() {return hasUpgrade("a", 24)},
        },
        32: {
            title: "<bdi style=\"color:#0fdfdf\">Turquoise</bdi>",
            description: "<bdi style=\"color:#0f0fdf\">Blue</bdi> boosts <bdi style=\"color:#0fdf0f\">Green</bdi> base.",
            cost: new Decimal("1.5e8"),
            effect() {
                return getBuyableAmount("a", 13).pow(0.5).div(25)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {return hasUpgrade("a", 31)},
        },
        33: {
            title: "<bdi style=\"color:#df0fdf\">Magenta</bdi>",
            description: "<bdi style=\"color:#0f0fdf\">Blue</bdi> boosts <bdi style=\"color:#df0f0f\">Red</bdi> base.",
            cost: new Decimal("1e9"),
            effect() {
                return getBuyableAmount("a", 13).pow(0.8).div(15)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {return hasUpgrade("a", 32)},
        },
        34: {
            title: "Refining Machines",
            description: "Unlock <b>Reflectors</b> and <b>Mixers</b>.",
            unlocked() {return hasUpgrade("a", 33)},
        },
    },
    buyables: {
        11: {
            title: "<bdi style=\"color:#df0f0f\">Red</bdi>",
            base() {
                value = new Decimal(2)
                if(hasUpgrade("a", 23)) value = value.add(upgradeEffect("a", 23))
                if(hasUpgrade("a", 33)) value = value.add(upgradeEffect("a", 33))
                return value
            },
            effect() {
                return this.base().pow(getBuyableAmount("a", 11))
            },
            cost(x) {
                return new Decimal(10).times(new Decimal(2.5).pow(x.pow(1.05)))
            },
            canAfford() {
                return player["a"].points.gte(this.cost())
            },
            buy() {
                player["a"].points = player["a"].points.sub(this.cost())
                addBuyables("a", 11, 1)
            },
            display() {
                return "\n<h3><b>Amount: </b>" + format(getBuyableAmount("a", 11), 0) + "\n\n<b>Base</b>: " + format(this.base()) + "x\n<b>Effect</b>: " + format(this.effect()) + "x to <b>Light</b> gain\n\n<b>Cost</b>: " + format(this.cost(getBuyableAmount("a", 11))) + " <b>Aether</b></h3>"
            },
        },
        12: {
            title: "<bdi style=\"color:#0fdf0f\">Green</bdi>",
            base() {
                value = new Decimal(1.3)
                if(hasUpgrade("a", 32)) value = value.add(upgradeEffect("a", 32))
                return value
            },
            effect() {
                return this.base().pow(getBuyableAmount("a", 12))
            },
            cost(x) {
                return new Decimal(100).times(new Decimal(3).pow(x.pow(1.06)))
            },
            canAfford() {
                return player["a"].points.gte(this.cost())
            },
            buy() {
                player["a"].points = player["a"].points.sub(this.cost())
                addBuyables("a", 12, 1)
            },
            unlocked() {
                return hasUpgrade("a", 22)
            },
            display() {
                return "\n<h3><b>Amount: </b>" + format(getBuyableAmount("a", 12), 0) + "\n\n<b>Base</b>: " + format(this.base()) + "x\n<b>Effect</b>: " + format(this.effect()) + "x to <b>Aether</b> gain\n\n<b>Cost</b>: " + format(this.cost(getBuyableAmount("a", 12))) + " <b>Aether</b></h3>"
            },
        },
        13: {
            title: "<bdi style=\"color:#0f0fdf\">Blue</bdi>",
            base() {
                value = new Decimal(0.03)
                return value
            },
            effect() {
                return this.base().times(getBuyableAmount("a", 13)).add(1).pow(player["a"].upgrades.length)
            },
            cost(x) {
                return new Decimal("1e7").times(new Decimal(5).pow(x.pow(1.07)))
            },
            canAfford() {
                return player["a"].points.gte(this.cost())
            },
            buy() {
                player["a"].points = player["a"].points.sub(this.cost())
                addBuyables("a", 13, 1)
            },
            unlocked() {
                return hasUpgrade("a", 31)
            },
            display() {
                return "\n<h3><b>Amount: </b>" + format(getBuyableAmount("a", 13), 0) + "\n\n<b>Base</b>: " + format(this.base()) + "x\n<b>Effect</b>: " + format(this.base().times(getBuyableAmount("a", 13)).add(1)) + "x to <b>Light</b> gain per <b>Aether</b> upgrade\nTotal: " + format(this.effect()) + "x to <b>Light</b> gain\n\n<b>Cost</b>: " + format(this.cost(getBuyableAmount("a", 13))) + " <b>Aether</b></h3>"
            },
        },
    },
    layerShown(){return true}
})
