package main

import (
	"math/rand"
	"time"
	"fmt"
)

func main() {
	var total float32
	games := 1000
	for i := 0; i < games ; i++ {
		total += float32(playGame())
	}
	fmt.Println("Average of", games, "games is", total/float32(games))

}

func (g *game) calculateTotalScore(total *int) {
	for _, r := range g.Scores {
		*total += r.amount * r.kind
	}
}

type score struct {
	kind   int
	amount int
}
type game struct {
	Scores []score
}

func playGame() int {
	var game game
	var sum int
	for i := 0; i < 6; i++ {
		game.Scores = append(game.Scores, game.playRound())
	}
	game.calculateTotalScore(&sum)
	return sum
}

func (g *game) playRound() score {
	var diceKept []int
	var mostCommonKind score

	for i := 0; i < 3; i++ {
		dice := append(rollDice(5-len(diceKept)), diceKept...)
		relevantDice := findAndSortRelevantDice(dice, g.Scores)
		findMostCommon(relevantDice, &mostCommonKind)
		diceKept = diceKept[:0]
		for j := 0; j < mostCommonKind.amount; j++ {
			diceKept = append(diceKept, mostCommonKind.kind)
		}
	}
	return mostCommonKind
}
func findMostCommon(relevantDice map[int]int, score *score) {
	for k, v := range relevantDice {
		if v > score.amount {
			score.kind, score.amount = k, v
		}
	}
}

func findAndSortRelevantDice(dice []int, scores []score) map[int]int {
	relevantDice := make(map[int]int)
	for _, die := range dice {
		if categoryNotTaken(die, scores) {
			relevantDice[die]++
		}
	}
	return relevantDice
}
func categoryNotTaken(i int, scores []score) bool {
	for k := range scores {
		if i == scores[k].kind {
			return false
		}
	}
	return true
}

func rollDice(amount int) []int {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	dice := make([]int, amount)
	for i := 0; i < amount; i++ {
		dice[i] = r.Intn(6) + 1
	}
	return dice
}