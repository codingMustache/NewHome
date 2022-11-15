const express = require('express');
const axios = require('axios');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');
const SavedPet = require('../db/models/SavedPet.js');
const Follower = require('../db/models/Follower.js');

const { API_KEY, API_SECRET } = process.env;

pet.post('/savePet', (req, res) => {
  // log body provided by client
  const { pet } = req.body;
  const { userId } = pet;
  pet.userId = 'none';

  // check if pet is in database
  Pet.find({ _id: pet._id })
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
      _id: pet._id,
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
          _id: pet._id,
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
      const pets = savedList.map(async ({ _id }) => {
        try {
          return await Pet.findOne({ _id });
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

pet.post('/followPet', (req, res) => {
  // log body provided by client
  const { pet } = req.body;
  const { userId } = pet;
  pet.userId = 'none';

  // check if pet is in database
  Pet.find({ _id: pet._id })
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
    .then(() => Follower.find({
      userId,
      _id: pet._id,
    }))
    .catch((err) => {
      console.error('error in pet.create\n', err);
      res.sendStatus(500);
    })
    .then((data) => {
      // then check saved pet documents for previous save
      if (!data.length) {
        // create user/pet SavedPet
        return Follower.create({
          userId,
          _id: pet._id,
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

pet.get('/followPet/:userId', (req, res) => {
  const { userId } = req.params;
  // get list by user id
  Follower.find({ userId })
    .then((savedList) => {
      if (!savedList.length) {
        res.sendStatus(404);
      }
      // if no list respond with 404
      return savedList;
    })
    .then((savedList) => {
      const pets = savedList.map(async ({ _id }) => {
        try {
          return await Pet.findOne({ _id });
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
        console.error('my dreams are now niasdfasdghtmares\n', err);
      }
    })
    .catch((err) => {
      console.error(' error on finding savedPets\n', err);
    });
});

pet.get('/adoptpet/:userId', (req, res) => {
  const { userId } = req.params;
  Pet.find({ userId })
    .then((pets) => {
      res.status(200).send(pets);
    })
    .catch(() => res.sendStatus(500));
});

// update pet status to adopted
pet.put('/:_id', (req, res) => {
  // take in userId and _id
  const { pet } = req.body;
  let { _id } = req.params;
  _id = Number(_id);

  // Pet model method to findOneandUpdate
  return Pet.findOneAndUpdate({ _id }, pet, {
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

pet.get('/:_id', (req, res) => {
  // find One pet
  // return it's information
  const { _id } = req.params;
  Pet.findOne(_id)
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

pet.get('/api/:_id', (req, res) => {
  let { _id } = req.params;
  _id = Number(_id);

  return axios
    .get(`https://api.petfinder.com/v2/animals/${_id}`)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.error('error getting pet from api... ofCourse\n', err.response);
      getApiAuth()
        .then(() => axios.get(`https://api.petfinder.com/v2/animals/${_id}`))
        .then((data) => {
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
