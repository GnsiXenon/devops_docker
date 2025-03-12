package controllers

import (
	"encoding/json"
	"net/http"

	"main.go/config"
)

func TestDB(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	// Test de la connexion à la base de données
	db := config.Db()
	err := db.Ping()
	if err != nil {
		response := map[string]string{"status": "error", "message": "Erreur de connexion à la base de données"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Test de la table scores
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM scores").Scan(&count)
	if err != nil {
		response := map[string]string{"status": "error", "message": "Erreur lors de la requête à la table scores"}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := map[string]interface{}{
		"status":       "success",
		"message":      "Connexion à la base de données réussie",
		"scores_count": count,
	}
	json.NewEncoder(w).Encode(response)
}
