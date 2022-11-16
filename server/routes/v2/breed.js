const express = require('express');
const axios = require('axios');

const breeds = express.Router();

const apiKey = process.env.DOG_API;

breeds.get('/', (req, res) => {
  axios.get('https://api.thedogapi.com/v1/breeds');
  res.sendStatus(666);
});
module.exports = breeds;
