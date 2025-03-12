package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func DatabaseInit() {
	var err error

	fmt.Println("Connecting to database...")

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	// Vérifier la connexion
	err = db.Ping()
	if err != nil {
		log.Fatal("Erreur de connexion à la base de données:", err)
	}

	fmt.Println("Connected to database!")
}

func GetLengthRoom() int {
	var length int
	err := db.QueryRow("SELECT COUNT(*) FROM room").Scan(&length)
	if err != nil {
		log.Printf("Erreur lors du comptage des salles: %v", err)
		return 0
	}
	return length
}

func GetLengthlogin() int {
	var length int
	err := db.QueryRow("SELECT COUNT(*) FROM login").Scan(&length)
	if err != nil {
		log.Printf("Erreur lors du comptage des logins: %v", err)
		return 0
	}
	return length
}

func GetLengthScoreboard() int {
	var length int
	err := db.QueryRow("SELECT COUNT(*) FROM scoreboard").Scan(&length)
	if err != nil {
		log.Printf("Erreur lors du comptage des scores: %v", err)
		return 0
	}
	return length
}

// Getter for db var
func Db() *sql.DB {
	return db
}
