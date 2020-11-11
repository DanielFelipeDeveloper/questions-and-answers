const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/to-ask', (req, res) => {
  res.render('to-ask');
});

app.post('/save-question', (req, res) => {
  res.send('Formulário recebido');
});

app.listen(8080, () => {
  console.log('Server is running at localhost:8080');
});