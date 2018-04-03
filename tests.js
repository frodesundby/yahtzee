const assert = require('chai').assert
const app = require('./yahtzee.js')
const testData = require('./testData')

describe('throwDice(amount)', () => {
    it('should return 5 dice when requested', () => {
        assert.lengthOf(app._test.rollDice(5), 5)
    })
    it('should return an array of equal length as request', () => {
        assert.lengthOf(app._test.rollDice(2), 2)
    })
})

describe('rollForNewKind(scores)', () => {
    it('should return an array of dice kept', () => {
        assert.typeOf(app._test.rollForNewKind({}), "Array")
    })
})

describe('findRelevantDice(scores, dice, diceKept)', () => {
    it('should return an object with the dice kind as key', () => {
        assert.deepEqual(Object.keys(app._test.findRelevantDice({}, [5, 2, 5, 1, 5], [])), ['1', '2', '5'])
    })
    it('should filter out categories already completed', () => {
        assert.deepEqual(Object.keys(app._test.findRelevantDice({'2': [2, 2]}, [5, 2, 5, 1, 5], [])), ['1', '5'])
    })
})

describe('keepHighestScoring(diceKept)', () => {
    it('should return an array with the highest scoring category', () => {
        assert.deepEqual(app._test.keepHighestScoring({'2': [2, 2], '5': [5, 5, 5]}), [5, 5, 5])
    })
})

describe('keepMostNumerous(diceKept)', () => {
    it('should return an array with the most numerous category', () => {
        assert.deepEqual(app._test.keepMostNumerous({'2': [2, 2, 2], '5': [5, 5]}), [2, 2, 2])
    })
})
