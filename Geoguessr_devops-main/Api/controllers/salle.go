package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"main.go/config"
	"main.go/models"
)

const uploadDirectory = "./uploads/"
const maxUploadSize = 10 * 1024 * 1024 // 10 MB


func Salle(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	enableCors(&w) // On autorise les requêtes cross-origin
	switch r.Method {
	case "GET": // Method GET
		if r.URL.Path == "/salle" { // Si l'url est /salle
			salles := models.GetAllSalle()
			json.NewEncoder(w).Encode(salles) // On encode les salles en json
			return
		}

		idStr := r.URL.Path[len("/salle/"):] // On récupère l'id de la salle dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "Invalid ID")
			return
		}

		salle := models.GetSalle(id) // On récupère la salle dans la base de données
		if salle == (models.Salle{}) {
			RespondWithError(w, http.StatusNotFound, "404", "Salle not found")
			return
		}
		json.NewEncoder(w).Encode(salle)
	case "POST":
		var salle models.Salle
		err := json.NewDecoder(r.Body).Decode(&salle)

		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "Invalid JSON payload")
			return
		}


		//insert the new room in the database
		_, err = config.Db().Exec("INSERT INTO room (id, name, coordinate_x, coordinate_y, floor, disponibility, photo) VALUES (?, ?, ?, ?, ?, ?, ?)", salle.Id, salle.Name, salle.Cordinnates_x, salle.Cordinnates_y, salle.Floor, salle.Disponibility, salle.Photo)

		if err != nil {
			http.Error(w, "Unable to insert the room", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated) // On renvoie le code 201

	case "PUT": // Method PUT
		idStr := r.URL.Path[len("/salle/"):] // On récupère l'id de la salle dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "Invalid ID")
			return
		}

		var salle models.Salle
		json.NewDecoder(r.Body).Decode(&salle) // On décode la salle en json
		salle.Id = id
		models.UpdateSalle(salle)        // On met à jour la salle dans la base de données
		json.NewEncoder(w).Encode(salle) // On encode la salle en json
	case "DELETE": // Method DELETE
		idStr := r.URL.Path[len("/salle/"):] // On récupère l'id de la salle dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "Invalid ID")
			return
		}

		models.DeleteSalle(id)              // On supprime la salle de la base de données
		w.WriteHeader(http.StatusNoContent) // On renvoie le code 204
	case "OPTIONS":
		w.WriteHeader(http.StatusOK) // On renvoie le code 200

	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed) // On renvoie le code 405
	}
}

func RespondWithJSON(w http.ResponseWriter, status int, payload interface{}) { // On renvoie le payload en json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func RespondWithError(w http.ResponseWriter, status int, errorType, message string) { // On renvoie une erreur en json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	errorResponse := map[string]string{
		"message": message,
		"error":   errorType,
	}
	json.NewEncoder(w).Encode(errorResponse)
}

func enableCors(w *http.ResponseWriter) { // On autorise les requêtes cross-origin
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Content-Type", "application/json")

}
