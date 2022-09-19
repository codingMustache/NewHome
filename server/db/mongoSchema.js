const { Schema } = require('mongoose');

// change to true once auth is done
const userSchema = new Schema({
  email: String,
  googleID: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
  image: String,
  imageType: String,
  source: { type: String, required: [false, 'source not specified'] },
  lastVisited: { type: Date, default: new Date() },
});

const petSchema = new Schema({
  _id: Number,
  species: String,
  breed: String,
  gender: String,
  name: String,
  age: String,
  tags: Schema.Types.Mixed,
  shelterInfo: Schema.Types.Mixed,
  adopted: String,
  photo: String,
  userId: String,
  description: String,
  link: String,
});

const postSchema = new Schema({
  title: String,
  message: String,
  image: String,
  imageType: String,
  _id: Number,
  date: { type: Date, default: Date.now },
});

const followersSchema = new Schema({
  userId: String,
  _id: Number,
});

const savedPetSchema = new Schema({
  userId: String,
  _id: Number,
});

module.exports = {
  userSchema,
  petSchema,
  postSchema,
  followersSchema,
  savedPetSchema,
};
