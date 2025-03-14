# Étape 1 : Build de l'application
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires au build
COPY go.mod go.sum ./

# Télécharger les dépendances en cache (accélère les builds futurs)
RUN go mod tidy

# Copier le reste des fichiers source
COPY . .

# Compiler l’application en binaire
RUN go build -o main .

# Étape 2 : Image finale minimaliste
FROM alpine:latest

WORKDIR /root/

# Copier uniquement le binaire depuis l'étape de build
COPY --from=builder /app/main .

# Exposer le port 7000
EXPOSE 7000

# Lancer l’application
CMD ["./main"]
