const mongoose = require('mongoose')
const mongooseSequence = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    avt: {type: String},
});

schema.plugin(mongooseSequence, {inc_field: 'id'});

const Users = mongoose.model('User', schema);

module.exports = {Users};