CREATE TABLE IF NOT EXISTS room (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    coordinate_x DOUBLE NOT NULL,
    coordinate_y DOUBLE NOT NULL,
    floor INTEGER NOT NULL,
    disponibility BOOLEAN NOT NULL
);
```