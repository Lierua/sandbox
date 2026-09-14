-- Run once:  psql -h localhost -U postgres -d bookshop -f schema.sql

CREATE TABLE IF NOT EXISTS books (
    id     integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title  text NOT NULL,
    author text NOT NULL
);
