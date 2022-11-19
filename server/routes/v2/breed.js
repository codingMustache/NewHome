const express = require('express');
const axios = require('axios');

const breeds = express.Router();

const apiKey = process.env.DOG_API;

breeds.get('/', (req, res) => {
  axios
    .get('https://api.thedogapi.com/v1/breeds', { 'x-api-key': apiKey })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => console.error('ERROR - breeds Req', err));
});
module.exports = breeds;
