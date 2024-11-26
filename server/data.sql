CREATE DATABASE todoapp;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

INSERT INTO todos(id, user_email,title,progress,date) VALUES('1','sara_mdz@gmail.com','Login form',40,'22/11/2024 18:46');