package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"main.go/models"
)

type ScoreRequest struct {
	PlayerName string `json:"player_name"`
	Score      int    `json:"score"`
}

func Score(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case "GET":
		if r.URL.Path == "/score" {
			scores := models.GetAllScore()
			json.NewEncoder(w).Encode(scores)
			return
		}

		idStr := r.URL.Path[len("/score/"):]
		id, err := strconv.Atoi(idStr)
		if err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "ID invalide")
			return
		}

		score := models.GetScore(id)
		if score == (models.Score{}) {
			RespondWithError(w, http.StatusNotFound, "404", "Score introuvable")
			return
		}
		json.NewEncoder(w).Encode(score)

	case "POST":
		var scoreReq ScoreRequest
		if err := json.NewDecoder(r.Body).Decode(&scoreReq); err != nil {
			RespondWithError(w, http.StatusBadRequest, "400", "Format JSON invalide")
			return
		}

		score := models.Score{
			Name:  scoreReq.PlayerName,
			Score: scoreReq.Score,
		}

		if err := models.AddScore(score); err != nil {
			RespondWithError(w, http.StatusInternalServerError, "500", "Erreur lors de l'ajout du score")
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Score ajouté avec succès",
		})

	case "OPTIONS":
		w.WriteHeader(http.StatusOK)

	default:
		RespondWithError(w, http.StatusMethodNotAllowed, "405", "Méthode non autorisée")
	}
}
