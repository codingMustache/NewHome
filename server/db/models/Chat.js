const mongoose = require('mongoose');
const { chatSchema } = require('../mongoSchema.js');

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
