# hogwart

A small Express + PostgreSQL API used in class. It serves a `books` table with
GET / POST / PUT / DELETE endpoints.

## Setup

Do all four steps. Cloning the repo is not enough on its own - two of the
things the app needs are deliberately **not** in the clone.

### 1. Install the dependencies

```bash
npm install
```

Do this even though a `node_modules` folder may already exist after cloning.
Skipping it is the most common reason for `Cannot find module 'pg'` or
`Cannot find module 'dotenv'`.

### 2. Create the database and the table

```bash
psql -h 127.0.0.1 -U postgres -c "CREATE DATABASE bookshop"
psql -h 127.0.0.1 -U postgres -d bookshop -f schema.sql
```

Nothing creates the `bookshop` database for you. See `schema.sql` for the
pgAdmin equivalent.

### 3. Create your `.env`

`.env` is gitignored, so **it is never part of the clone**. You have to make
your own:

```bash
cp .env.example .env
```

Then open `.env` and put in your own Postgres password. Windows users: make
sure the file is called exactly `.env` and not `.env.txt` - File Explorer hides
the real extension by default.

### 4. Run it

```bash
npm start
```

Then open <http://localhost:3000/books>.

## When it does not work

Read the actual error in the terminal - it tells you which of the four steps
you missed.

| Error                                           | What it means                                                    |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| `Cannot find module 'pg'` or `'dotenv'`         | Step 1 - run `npm install`                                       |
| `database "bookshop" does not exist` (`3D000`)  | Step 2 - create the database                                     |
| `relation "books" does not exist` (`42P01`)     | Step 2 - run `schema.sql`                                        |
| `password authentication failed` (`28P01`)      | Step 3 - wrong password in `.env`                                |
| `role "<your own username>" does not exist`     | Step 3 - **your `.env` is not being read**                       |
| `database "<your own username>" does not exist` | Step 3 - same as above                                           |
| `SASL: client password must be a string`        | Step 3 - `PGPASSWORD` is empty or missing                        |
| `ECONNREFUSED`                                  | Postgres is not running, or is on a different port than `PGPORT` |

**If the error names your own computer username**, your `.env` is missing or is
not being found. `dotenv` fails silently, and the app then falls back to
connecting as your operating-system user. Two things to check:

- The file is in the project root and is named exactly `.env`.
- You started the app from the project folder. `dotenv` looks for `.env` in the
  directory you ran `npm start` **from**, not next to the source files.

To see what the app actually thinks it is connecting to:

```bash
node -e "require('dotenv').config();console.log({host:process.env.PGHOST,port:process.env.PGPORT,db:process.env.PGDATABASE,user:process.env.PGUSER,hasPassword:!!process.env.PGPASSWORD})"
```

Any `undefined` in that output means `.env` is not being read.
