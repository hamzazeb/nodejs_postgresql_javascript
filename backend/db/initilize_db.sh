#!/bin/bash


# npm install express pg ejs


psql -U postgres -h 127.0.0.1 << EOF   

DROP DATABASE lpp;

CREATE DATABASE lpp WITH OWNER = postgres TABLESPACE = pg_default CONNECTION LIMIT = -1;  

\c lpp

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(15) NOT NULL
);

CREATE TABLE leads (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users,
    lead_id VARCHAR(50),
    phone_number VARCHAR(20),
    timestamp TIMESTAMPTZ NOT NULL
);

EOF
