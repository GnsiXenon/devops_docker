package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"main.go/models"
)

func Score(w http.ResponseWriter, r *http.Request) { // GET a Score by id
	enableCors(&w) // On autorise les requêtes cross-origin
	switch r.Method {
	case "GET": // Method GET
		if r.URL.Path == "/score" { // Si l'url est /score
			scores := models.GetAllScore()
			json.NewEncoder(w).Encode(scores) // On encode les scores en json
			return
		}

		idStr := r.URL.Path[len("/score/"):] // On récupère l'id du score dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid ID", http.StatusBadRequest)
			return
		}

		score := models.GetScore(id)   // On récupère le score dans la base de données avec l'id
		if score == (models.Score{}) { // Si le score n'existe pas
			// afficher un message d'erreur 404 en json
			RespondWithError(w, http.StatusNotFound, "404", "Score not found")
			return
		}
		json.NewEncoder(w).Encode(score) // On encode le score en json
	case "POST": // Method POST
		var score models.Score
		score.Name = r.FormValue("name")
		scoreInt, err := strconv.Atoi(r.FormValue("score"))
		if err != nil {
			http.Error(w, "Invalid score", http.StatusBadRequest)
			return
		}
		score.Score = scoreInt

		models.AddScore(score) // On ajoute le score dans la base de données

	case "DELETE": // Method DELETE
		idStr := r.URL.Path[len("/score/"):] // On récupère l'id du score dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid ID", http.StatusBadRequest)
			return
		}

		models.DeleteScore(id)                     // On supprime le score dans la base de données
		json.NewEncoder(w).Encode("Score deleted") // On encode le message en json
	case "PUT": // Method PUT
		idStr := r.URL.Path[len("/score/"):] // On récupère l'id du score dans l'url
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid ID", http.StatusBadRequest)
			return
		}
		var score models.Score
		score.Name = r.FormValue("name")
		scoreInt, err := strconv.Atoi(r.FormValue("score"))
		if err != nil {
			http.Error(w, "Invalid score", http.StatusBadRequest)
			return
		}
		score.Id = id
		score.Score = scoreInt

		models.UpdateScore(score)
		json.NewEncoder(w).Encode("Score updated")
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
