function playYahtzee() {
    let scores = {}
    //  Vi ønsker å trille terninger så lenge det ikke er en verdi i samtlige kategorier
    while (Object.keys(scores).length != 6) {
        const score = rollForNewKind(scores)
        scores[score[0]] = score // Ikke helt intuitiv snarvei; bruker det første elementet i arrayet som kommer tilbake som nøkkel i scores
    }
    // Så vise frem resultatet per kategori
    Object.keys(scores).forEach(kind => console.log([kind], "=", sum(scores[kind])))
    // Og til slutt totalsum
    let total = 0
    Object.values(scores).forEach(kind => {
        total += sum(kind)
    })
    console.log("Total = ", total)
}

function rollForNewKind(scores) {
    // For hver kategori kan vi trille terningen tre ganger.
    let timesThrown = 0
    let diceKept = []
    while (timesThrown < 3) {
        // Vi skal trille fem terninger, minus de vi har tatt var på fra tidligere kast
        let dice = rollDice(5 - diceKept.length)

        // Vi slår sammen terningene vi tok vare på i forrige runde med de vi trillet på nytt for å gjøre en ny beregning
        dice = dice.concat(diceKept)

        // Så sorterer vi terningene og luker bort de kategorier vi har fra før
        const relevantDice = findRelevantDice(scores, dice, diceKept)

        // Vi foretrekker å ta vare på kategorien med høyest poengsum
        //diceKept = keepHighestScoring(relevantDice)

        // Vi foretrekker å ta vare på kategorien med flest terninger
        diceKept = keepMostNumerous(relevantDice)

        timesThrown++
    }

    return diceKept
}

function findRelevantDice(scores, dice, diceKept) {
    return dice.reduce((diceScores, dice) => {
        if (dice in scores) return diceScores
        else if (!(dice in diceScores)) diceScores[dice] = []
        return diceScores[dice].push(dice), diceScores
    }, {})
}

function keepHighestScoring(dice) {
    let highestCategory = []
    Object.keys(dice).forEach(category => {
        if (sum(dice[category]) > sum(highestCategory)) {
            highestCategory = dice[category]
        }
    })
    return highestCategory
}

function keepMostNumerous(dice) {
    let mostNumerousCategory = []
    Object.keys(dice).forEach(category => {
        if (dice[category].length > mostNumerousCategory.length) {
            mostNumerousCategory = dice[category]
        }
    })
    return mostNumerousCategory
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
playYahtzee()

// spiller et antall ganger for å se gjennomsnitt
/*
const results = []
const numberOfGames = 1000
for (let i = 0; i < numberOfGames; i++) {
    results.push(playYahtzee())
}
console.log("Average of", numberOfGames, "runs:", sum(results) / numberOfGames)
*/

exports._test = {
    rollDice,
    playYahtzee,
    rollForNewKind,
    keepHighestScoring,
    keepMostNumerous,
    findRelevantDice
}