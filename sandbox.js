const express = require('express');
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse JSON bodies   ​


app.get('/' , (req, res) => {
  res.send('Hello World2!' );
});

// function definition examples
function myFunction() {
    console.log("Hello from my function");
}
const myFunction2 = (req, res) => {
    console.log("Hello from my function 2");
}


app.get('/books', async (req, res) => {
    
    try {
        const result = await pool.query("SELECT * FROM books" );
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch(error) {
        res.status(500).send({message: "Error connecting to database"});
    }
})

app.post('/books', async (req, res) => {
    console.log(req.body);


    res.status(201).send({status: 'ok'}); // answers the client
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}` )
});