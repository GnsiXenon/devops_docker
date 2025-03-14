# heberger le serveur golang sur un container docker 

FROM golang:1.21-alpine

WORKDIR /app

COPY . .

# remove go.mod and go.sum 

RUN rm go.mod go.sum

# install go mod

RUN go mod init main.go

# download all dependencies "github.com/go-sql-driver/mysql " "github.com/lib/pq"

RUN go get -u github.com/go-sql-driver/mysql

RUN go get -u github.com/lib/pq

RUN go mod tidy

RUN go build -o main .

EXPOSE 7000

CMD ["./main"]

# docker build -t geoguessr_api .

# docker run -d -p 7000:7000 geoguessr_api 

# Api lancé sur le port 7000

# docker stop geoguessr_api




