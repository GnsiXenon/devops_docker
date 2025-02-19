package models

import (
	"log"

	"main.go/config"
)

// Book is a representation of a book

type Score struct {
	Id    int    `json:"id"`
	Score int    `json:"score"`
	Name  string `json:"name"`
}

type Scores []Score

func GetAllScore() Scores {

	var scores Scores

	rows, err := config.Db().Query("SELECT * FROM scoreboard")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var score Score
		if err := rows.Scan(&score.Id, &score.Name, &score.Score); err != nil {
			log.Fatal(err)
		}
		scores = append(scores, score)
	}

	return scores
}

func GetScore(id int) Score {

	var score Score

	rows, err := config.Db().Query("SELECT * FROM scoreboard WHERE id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&score.Id, &score.Name, &score.Score); err != nil {
			log.Fatal(err)
		}
	}

	return score
}

func AddScore(score Score) {

	stmt, err := config.Db().Prepare("INSERT INTO scoreboard (name, score) VALUES (?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(score.Name, score.Score)
	if err != nil {
		log.Fatal(err)
	}

}

func DeleteScore(id int) {

	stmt, err := config.Db().Prepare("DELETE FROM scoreboard WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		log.Fatal(err)
	}

}

func UpdateScore(score Score) {

	stmt, err := config.Db().Prepare("UPDATE scoreboard SET score = ? WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(score.Name, score.Score, score.Id)
	if err != nil {
		log.Fatal(err)
	}

}
