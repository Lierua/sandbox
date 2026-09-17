-- STEP 1 - create the database (do this FIRST, it is not part of this file).
-- You cannot create a database from inside a script that connects to it, so
-- run this on its own:
--
--     psql -h 127.0.0.1 -U postgres -c "CREATE DATABASE bookshop"
--
-- If it says the database already exists, that is fine - skip to step 2.
--
-- STEP 2 - create the table inside that database:
--
--     psql -h 127.0.0.1 -U postgres -d bookshop -f schema.sql
--
-- In pgAdmin instead of psql: make sure "bookshop" is the database selected in
-- the tree before you open the Query Tool, or the table lands in the wrong one.

CREATE TABLE IF NOT EXISTS books (
    id     integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title  text NOT NULL,
    author text NOT NULL
);
