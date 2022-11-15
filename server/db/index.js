const mongoose = require('mongoose');
const models = require('./models/index.js');

const FIELD = './index.js';
// const password = process.env.DB_PASS;
// const username = process.env.DB_USER;
const mongoUri =	'mongodb+srv://jorcar1986:tk4VlHX2nWGLloW3@cluster0.f4lrcof.mongodb.net/newHomeRevisted';
// const mongoUri = 'mongodb://localhost/petsFindr';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.error('err in db', err);
  });

module.exports = FIELD;
