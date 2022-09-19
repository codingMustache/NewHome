const express = require('express');
const axios = require('axios');

const { API_KEY, API_SECRET } = process.env;

/*
  handles api request and db request

  helper function to get api page, if fail then helper to get api auth
  then run helper function to get api page.
*/

const feed = express.Router();
const Post = require('../db/models/Post.js');
const Follower = require('../db/models/Follower.js');
const Pet = require('../db/models/Pet.js');

// GET API page
feed.get('/api', (req, res) => {
  console.log('hi api');
  getPage()
    .then((page) => {
      const pets = JSON.parse(page).animals.map(
        (animalsData) => new Pet({
          _id: animalsData.id,
          species: animalsData.species,
          breed: animalsData.breeds.primary,
          gender: animalsData.gender,
          name: animalsData.name,
          age: animalsData.age,
          tags: animalsData.tags,
          shelterInfo: {
            address: animalsData.contact.address,
            email: animalsData.contact.email,
            phone: animalsData.contact.phone,
          },
          adopted: animalsData.status,
          photo: animalsData.primary_photo_cropped
            ? animalsData.primary_photo_cropped.medium
            : null,
          userId: '',
          link: animalsData.url,
        }),
      );
      pets.forEach((pet) => {
        Pet.find({ _id: pet._id })
          .then((pets1) => {
            if (pets1.length) {

            } else {
              pet.save();
            }
          })
          .catch((err) => console.error(err));
      });
      console.log(pets);
      res.send(pets);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        getApiAuth()
          .then(() => getPage())
          .then((page) => {
            const pets = JSON.parse(page).animals.map(
              (animalsData) => new Pet({
                _id: animalsData.id,
                species: animalsData.species,
                breed: animalsData.breeds.primary,
                gender: animalsData.gender,
                name: animalsData.name,
                age: animalsData.age,
                tags: animalsData.tags,
                shelterInfo: {
                  address: animalsData.contact.address,
                  email: animalsData.contact.email,
                  phone: animalsData.contact.phone,
                },
                adopted: animalsData.status,
                photo: animalsData.primary_photo_cropped
                  ? animalsData.primary_photo_cropped.medium
                  : null,
                userId: '',
                link: animalsData.url,
              }),
            );
            pets.forEach((pet) => {
              Pet.find({ _id: pet._id })
                .then((pets1) => {
                  if (pets1.length) {

                  } else {
                    pet.save();
                  }
                })
                .catch((err) => console.error(err));
            });
            console.log(pets);
            res.send(pets);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(404);
          });
      } else {
        res.sendStatus(err.status);
      }
    });
});

feed.get('/posts/:userId', (req, res) => {
  const { userId } = req.params;
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
          return await Post.find({ _id });
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
});

feed.post('/post/pet', (req, res) => {});

// Handle Search
feed.post('/api/search', (req, res) => {
  const {
    species, breed, gender, age, hairLength,
  } = req.body;

  // getting all options for search
  let searchString = 'https://api.petfinder.com/v2/animals?';
  const queryStrArr = [
    species.length ? `type=${species}` : species,
    breed.length ? `breed=${breed}` : breed,
    gender.length ? `gender=${gender}` : gender,
    age.length ? `age=${age}` : age,
    hairLength.length ? `coat=${hairLength}` : hairLength,
  ];

  searchString = searchString.concat(
    '',
    queryStrArr.filter((str) => str.length !== 0).join('&'),
  );
  search(searchString)
    .then((animals) => {
      res.status(201).send(JSON.stringify(animals));
    })
    .catch((err) => {
      res.sendStatus(err.response.status);
    });
});

// Helper Functions

// Gets basic pet page (no search params)
const getPage = () => new Promise((res, rej) => {
  const config = {
    method: 'get',
    url: 'https://api.petfinder.com/v2/animals',
    headers: {
      Authorization: process.env.API_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      res(JSON.stringify(response.data));
    })
    .catch((err) => rej(err));
});

// Gets auth token
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

// searches the Api with strict params
const search = (searchString) => new Promise((res, rej) => {
  const config = {
    method: 'get',
    url: searchString,
    headers: {
      Authorization: process.env.API_AUTH,
    },
  };

  axios(config)
    .then((response) => res(response.data))
    .catch((err) => rej(err));
});

module.exports = feed;
