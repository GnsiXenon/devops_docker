package controllers

import (
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"main.go/config"
)

func GetImage(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet { // On vérifie que la méthode utilisée est bien GET
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	id := r.URL.Path[len("/image/"):] // On récupère l'id de l'image dans l'url
	var image string

	err := config.Db().QueryRow("SELECT photo FROM room WHERE id = ?", id).Scan(&image) // On récupère le nom de l'image dans la base de données
	if err != nil {
		http.Error(w, "Impossible de récupérer l'image", http.StatusInternalServerError)
		return
	}

	http.ServeFile(w, r, image) // On sert l'image
}
