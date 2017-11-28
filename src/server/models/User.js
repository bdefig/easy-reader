const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {type: String},
    email: {type: String},
    passwordHash: {type: String},
    passwordSalt: {type: String}
});

module.exports = mongoose.model('User', UserSchema);