const express = require('express');
const passport = require('passport');
const User = require('../db/models/User.js');

const user = express.Router();

user.get('/findUser:id', (req, res) => {
  // console.log('test', req.params.id);
  User.find({ email: req.params.id })
    .then((data) => res.status(200).send(data))
    .catch((error) => res.sendStatus(500));
});

user.post('/', (req, res) => {
  const saveUser = async () => {
    try {
      // find the user in our database
      let user = await User.findOne({ googleID: req.body.googleID });

      if (user) {
        // If user present in our database.
        res.status(200).send(user);
      } else {
        // if user is not preset in our database save user data to database.
        user = await User.create(req.body);
        res.sendStatus(201);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };
  saveUser();
});
// user.use(passport.initialize());
// user.use(passport.session());

// user.get(
//   "/signup/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// user.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/",
//     successRedirect: "/profile",
//     failureFlash: true,
//     successFlash: "Successfully logged in!",
//   })
// );

module.exports = user;
