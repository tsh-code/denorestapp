CREATE TABLE users(
    id serial PRIMARY KEY,
    password VARCHAR (60) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL
);
