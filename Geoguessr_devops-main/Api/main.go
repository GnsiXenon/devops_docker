package main

import (
	"fmt"
	"log"
	"net/http"

	"main.go/config"
	"main.go/controllers"
)

func main() {

	config.DatabaseInit()
	http.HandleFunc("/score", controllers.Score)  // GET & Post
	http.HandleFunc("/score/", controllers.Score) //Get by Id

	http.HandleFunc("/salle", controllers.Salle) // GET & Post
	http.HandleFunc("/salle/", controllers.Salle)

	http.HandleFunc("/image/", controllers.GetImage) // GET & Post

	http.HandleFunc("/login", controllers.Login) // GET & Post")

	fmt.Println("http://localhost:7000")
	log.Fatal(http.ListenAndServe(":7000", nil))
}
