const results = []
const numberOfGames = 100000
for (let i = 0; i < numberOfGames; i++) {
    results.push(playYahtzee())
}
console.log("Average of", numberOfGames, "runs:", sum(results) / numberOfGames)

function playYahtzee() {
    let score = 0
    const categories = []
    for (let i = 0; i < 6; i++) {
        let diceKept = []
        for (let x = 0; x < 3; x++) {
            let diceScores = rollDice(5 - diceKept.length).concat(diceKept)
                .filter(d => categories.indexOf(d) == -1)
                .reduce((diceScores, die) => {
                    if (!(die in diceScores)) diceScores[die] = []
                    return diceScores[die].push(die), diceScores
                }, {})
            Object.keys(diceScores).forEach(category => {
                if (diceScores[category].length > diceKept.length) {
                    diceKept = diceScores[category]
                }
            })
        }
        categories.push(diceKept[0])
        score += sum(diceKept)
    }
    return score
}

function sum(dice) {
    return dice.length > 0 ? dice.reduce((a, b) => a + b) : 0
}

function rollDice(amount) {
    const dice = []
    for (i = 0; i < amount; i++) {
        die = Math.floor(Math.random() * 6) + 1
        dice.push(die)
    }
    return dice
}