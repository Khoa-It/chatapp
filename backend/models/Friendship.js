const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {type: String, require: true, unique: true},
    sender_id: {type: Number},
    status: {type: String},
})

const Friendships = mongoose.model('Friendship', schema);
module.exports = {Friendships};