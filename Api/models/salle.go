package models

import (
	"fmt"
	"log"

	"main.go/config"
)

// Book is a representation of a book

type Salle struct {
	Id            int     `json:"id"`
	Name          string  `json:"name"`
	Cordinnates_x float64 `json:"cordinnates_x"`
	Cordinnates_y float64 `json:"cordinnates_y"`
	Floor         int     `json:"floor"`
	Disponibility bool    `json:"disponibility"`
	Photo         string  `json:"photo"`
}

type Salles []Salle

func GetAllSalle() Salles {

	var salles Salles

	rows, err := config.Db().Query("SELECT id, name, coordinates_x, coordinates_y, floor, disponibility, photo FROM room")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var salle Salle
		if err := rows.Scan(&salle.Id, &salle.Name, &salle.Cordinnates_x, &salle.Cordinnates_y, &salle.Floor, &salle.Disponibility, &salle.Photo); err != nil {
			log.Fatal(err)
		}

		salles = append(salles, salle)
	}
	return salles
}

func GetSalle(id int) Salle {

	var salle Salle

	rows, err := config.Db().Query("SELECT id, name, coordinates_x, coordinates_y, floor, disponibility, photo FROM room WHERE id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&salle.Id, &salle.Name, &salle.Cordinnates_x, &salle.Cordinnates_y, &salle.Floor, &salle.Disponibility, &salle.Photo); err != nil {
			log.Fatal(err)
		}
	}
	return salle
}

func AddSalle(salle Salle) {
	//ceci est un commentaire
	stmt, err := config.Db().Prepare("INSERT INTO room(name, coordinates_x, coordinates_y, floor, disponibility,photo) VALUES(?,?,?,?,?,?)")
	if err != nil {
		fmt.Println("1")
		log.Fatal(err)
	}
	defer stmt.Close()

	salle.Photo = "uploads/b.png"

	_, err = stmt.Exec(salle.Name, salle.Cordinnates_x, salle.Cordinnates_y, salle.Floor, salle.Disponibility, salle.Photo)
	if err != nil {
		fmt.Println("2")
		log.Fatal(err)
	}
}

func DeleteSalle(id int) {
	stmt, err := config.Db().Prepare("DELETE FROM room WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		log.Fatal(err)
	}
}

func UpdateSalle(salle Salle) {
	stmt, err := config.Db().Prepare("UPDATE room SET name = ?, coordinates_x = ?, coordinates_y = ?, floor = ?, disponibility = ? WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(salle.Name, salle.Cordinnates_x, salle.Cordinnates_y, salle.Floor, salle.Disponibility, salle.Id)
	if err != nil {
		log.Fatal(err)
	}
}

func GetLastIdSalle() int {
	var id int

	rows, err := config.Db().Query("SELECT MAX(id) FROM room")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&id); err != nil {
			log.Fatal(err)
		}
	}
	return id
}
