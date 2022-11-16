// Imports/Dependencies
require('dotenv').config();
require('./db/index.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const express = require('express');
const session = require('express-session');
const aws = require('aws-sdk');
const path = require('path');
const { user, pet, feed } = require('./routes');
const Post = require('./db/models/Post.js');
const User = require('./db/models/User.js');

// Generating application and setting url
const app = express();
const PORT = 8080;
const url = 'localhost';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/feed', feed);
app.use('/user', user);
app.use('/pet', pet);

aws.config.update({
  accessKeyId: process.env.STORJ_API_KEY,
  secretAccessKey: process.env.STORJ_API_SECRET,
});

const authUser = (request, accessToken, refreshToken, profile, done) => done(null, profile);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    authUser,
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/AdoptionMessage', (req, res) => {
  Post.create(req.body.post)
    .then()
    .catch((err) => console.error(err));

  res.sendStatus(200);
});

app.post('/image', (req, res) => {
  const endpoint = new aws.Endpoint(process.env.STORJ_API_URL);
  const s3 = new aws.S3({ endpoint });
  s3.getObject(
    { Bucket: 'new-home-bucket', Key: req.body.post.image },
    (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(data);
      }
    },
  );
});

// Login start
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

// on success redirects to '/' which is our login page in react
// Login Success
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  }),
);

// this is the page that gets called up on browser refresh with the google button for auth
app.get('/login', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

// can use this to check status on every page request as needed
// Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  return null;
};

app.get('/proAuth', checkAuthenticated, (req, res) => res.json(req.user));

app.post('/imageUrl', (req, res) => {
  const { filename, filetype } = req.body;
  const endpoint = new aws.Endpoint(process.env.STORJ_API_URL);
  const s3 = new aws.S3({ endpoint });
  const params = {
    Bucket: 'new-home-bucket',
    Expires: 60,
    Key: filename,
    ContentType: filetype,
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }
  });
});

// path for logged in status
app.get('/isAuthenticated', (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

// logout endpoint
app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.status(200).send('logged out worked');
      }
    });
  } else {
    res.end();
  }
});

// wildcard-catch-all
app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

app.listen(PORT, () => {
  console.log(`server listening @ http://${url}:${PORT}`);
});
