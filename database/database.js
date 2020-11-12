const { Sequelize } = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'danieldeveloper', '2801', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;