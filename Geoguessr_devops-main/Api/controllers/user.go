package controllers

import (
	"encoding/json"
	"net/http"

	"main.go/models"
)

func Login(w http.ResponseWriter, r *http.Request) {
	enableCors(&w) // On autorise les requêtes cross-origin

	switch r.Method {
	case "POST": // Method POST
		var login models.Admin
		json.NewDecoder(r.Body).Decode(&login) // On décode le json en objet Admin

		if models.CheckConnection(login.Username, login.Password) { // On vérifie si le login et le mot de passe sont corrects
			RespondWithJSON(w, http.StatusOK, "ok")
		} else {
			RespondWithJSON(w, http.StatusNotFound, "error")
		}

	}
}
