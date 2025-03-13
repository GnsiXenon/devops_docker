CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scoreboard (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Score INT NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE room (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Coordinates_x DOUBLE NOT NULL,
    Coordinates_y DOUBLE NOT NULL,
    Floor INT NOT NULL,
    Disponibility BOOLEAN NOT NULL,
    Photo TEXT
);

CREATE TABLE login (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

-- Insertion de données dans scoreboard
INSERT INTO scoreboard (Score, Name) VALUES (100, 'Alice'), (200, 'Bob'), (150, 'Charlie');

-- Insertion de données dans room
INSERT INTO room (Name, Coordinates_x, Coordinates_y, Floor, Disponibility, Photo)
VALUES ('Salle A', 45.76, 4.84, 1, TRUE, 'salle_a.jpg'),
       ('Salle B', 45.77, 4.85, 2, FALSE, 'salle_b.jpg'),
       ('Salle C', 45.78, 4.86, 3, TRUE, 'salle_c.jpg');

-- Insertion de données dans login
INSERT INTO login (Username, Password) VALUES ('user1', 'pass123'), ('user2', 'secure456'), ('user3', 'mypassword');