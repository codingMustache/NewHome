const express = require('express');
const axios = require('axios');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');
const SavedPet = require('../db/models/SavedPet.js');

const { API_KEY, API_SECRET } = process.env;

pet.post('/savePet', (req, res) => {
  // log body provided by client
  const { pet } = req.body;
  const { userId } = pet;
  pet.userId = 'none';

  // check if pet is in database
  Pet.find({ petId: pet.petId })
    .then((data) => {
      // save pet to db Pet collection
      if (!data.length) {
        return Pet.create(pet);
      }
      // *if found move on without saving
    })
    .catch((err) => {
      console.error('error on Pet.find\n', err);
      res.sendStatus(500);
    })
    .then(() => SavedPet.find({
      userId,
      petId: pet.petId,
    }))
    .catch((err) => {
      console.error('error in pet.create\n', err);
      res.sendStatus(500);
    })
    .then((data) => {
      // then check saved pet documents for previous save
      if (!data.length) {
        // create user/pet SavedPet
        return SavedPet.create({
          userId,
          petId: pet.petId,
        });
      }
      // if found move on/handle sending back error res
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('error on SavedPet.find\n', err);
      res.sendStatus(500);
    })
    .then(() => {
      // everybody rest
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('error on create savedpet\n', err);
      res.sendStatus(500);
    });
});

// get user savedPet list from database
pet.get('/savePet/:userId', (req, res) => {
  const { userId } = req.params;
  // get list by user id
  SavedPet.find({ userId })
    .then((savedList) => {
      if (!savedList.length) {
        res.sendStatus(404);
      }
      // if no list respond with 404
      return savedList;
    })
    .then((savedList) => {
      const pets = savedList.map(async ({ petId }) => {
        try {
          return await Pet.findOne({ petId });
        } catch (err) {
          console.error('error 1 here\n', err);
        }
      });

      return pets;
    })
    .then(async (pets) => {
      try {
        const results = await Promise.resolve(Promise.all(pets));

        res.status(200).send(results);
      } catch (err) {
        console.error('my dreams are now nightmares\n', err);
      }
    })
    .catch((err) => {
      console.error(' error on finding savedPets\n', err);
    });

  // query the database for each pet id, store in array
  // return array of animal objects back
});

// update pet status to adopted
pet.put('/:petId', (req, res) => {
  // take in userId and petId
  const { pet } = req.body;
  let { petId } = req.params;
  petId = Number(petId);

  // Pet model method to findOneandUpdate
  return Pet.findOneAndUpdate({ petId }, pet, {
    returnDocument: 'after',
  })
    .then((data) => {
      // if not found, send 404
      // send data back to page
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('error updating pet\n\n', err);
      res.sendStatus(500);
    });
});

pet.get('/:petId', (req, res) => {
  // find One pet
  // return it's information
  const { petId } = req.params;
  Pet.findOne(petId)
    .then((data) => {
      if (data) {
        res.status(201).send(data);
      }
      res.sendStatus(401);
    })
    .catch((err) => {
      console.error('error finding pet in get/pet\n\n'.err);
      res.sendStatus(500);
    });
});

pet.get('/api/:petId', (req, res) => {
  let { petId } = req.params;
  petId = Number(petId);

  return axios
    .get(`https://api.petfinder.com/v2/animals/${petId}`)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
      // res.sendStatus(401);
    })
    .catch((err) => {
      console.error('error getting pet from api... ofCourse\n', err.response);
      // res.sendStatus(500);
      getApiAuth()
        .then(() => axios.get(`https://api.petfinder.com/v2/animals/${petId}`))
        .then((data) => {
          console.log('data', data);
          if (!data) {
            res.sendStatus(401);
          }
          res.status(200).send(data);
        })
        .catch((err) => {
          console.error('error\n\n\n\n', err);
          res.sendStatus(500);
        });
    });
});

pet.delete('/savePet', (req, res) => SavedPet.findOneAndDelete(req.body)
  .then((data) => {
    if (!data) {
      res.sendStatus(401);
    }
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  }));

const getApiAuth = () => new Promise((res, rej) => {
  const data = JSON.stringify({
    grant_type: 'client_credentials',
    client_id: API_KEY,
    client_secret: API_SECRET,
  });

  const config = {
    method: 'post',
    url: 'https://api.petfinder.com/v2/oauth2/token',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(config)
    .then((response) => {
      process.env.API_AUTH = `Bearer ${response.data.access_token}`;
      return res();
    })
    .catch((err) => rej(err));
});

module.exports = pet;
