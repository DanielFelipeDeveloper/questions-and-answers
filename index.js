const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Questions = require('./database/Models/Questions');

connection
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log(err);
  })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Questions.findAll({ raw: true }).then(questions => {
    return res.render('index', { questions })
  })
});

app.get('/to-ask', (req, res) => {
  res.render('to-ask');
});

app.post('/save-question', (req, res) => {
  const { title, description } = req.body
  Questions.create({
    title,
    description
  }).then(() => {
    res.redirect('/')
  });
});

app.listen(8080, () => {
  console.log('Server is running at localhost:8080');
});