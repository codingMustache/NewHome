const mongoose = require('mongoose');
const models = require('./models/index.js');

const FIELD = './index.js';
const password = process.env.DB_PASS;
const username = process.env.DB_USER;
const cluster = process.env.DB_CLUSTER;
const name = process.env.DB_NAME;

const mongoUri = `mongodb+srv://${username}:${password}@${cluster}.f4lrcof.mongodb.net/${name}`;

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
