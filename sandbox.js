const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse JSON bodies   ​


app.get('/' , (req, res) => {
  res.send('Hello World!' );
});

app.post('/books', (req, res) => {
    console.log(req.body);

    res.status(201).send({status: 'ok'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}` )
});