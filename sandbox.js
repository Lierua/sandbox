const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse JSON bodies   ​


app.get('/' , (req, res) => {
  res.send('Hello World!' );
});

app.get('/books', async (req, res) => {
    try {
        const all = await pool.query(
            "SELECT id, title, author FROM books ORDER BY id"
        );

        res.status(200).json(all.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const one = await pool.query(
            "SELECT id, title, author FROM books WHERE id = $1",
            [req.params.id]
        );
        if (one.rowCount === 0) return res.sendStatus(404);

        res.status(200).json(one.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.post('/books', async (req, res) => {
    const { title, author } = req.body;
    
    try {
        const result = await pool.query(
            `INSERT INTO books (title, author)
             VALUES ($1, $2)
             RETURNING id, title, author`,
            [title, author]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.put('/books/:id', async (req, res) => {
    const { title, author } = req.body;
    
    try {
        const upd = await pool.query(
            `UPDATE books SET title = $1, author = $2
             WHERE id = $3
             RETURNING id, title, author`,
            [title, author, req.params.id]
        );
        if (upd.rowCount === 0) return res.sendStatus(404);

        res.status(200).json(upd.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const del = await pool.query(
            "DELETE FROM books WHERE id = $1",
            [req.params.id]
        );
        if (del.rowCount === 0) return res.sendStatus(404);

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}` )
});
