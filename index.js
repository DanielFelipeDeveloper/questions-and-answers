const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Questions = require('./database/Models/Questions');
const Answers = require('./database/Models/Answers');

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
  Questions.findAll({ raw: true, order:[
    ['id','DESC']
  ] }).then(questions => {
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

app.get('/question/:id', (req, res) => {
  const { id } = req.params;

  Questions.findOne({
    where: {
      id
    }
  }).then(question => {
    if (question != undefined) {

      Answers.findAll({
        where: {questionId: question.id},
        order: [
          ['id', 'DESC']
        ]
      }).then(answers => {
        res.render('question', { question, answers });
      })
    } else {
      res.render('index');
    }
  });
})

app.post('/answer', (req, res) => {
  const { body, questionId } = req.body;
  Answers.create({
    body,
    questionId
  }).then(() => {
    res.redirect('/question/'+questionId);
  });
});

app.listen(8080, () => {
  console.log('Server is running at localhost:8080');
});