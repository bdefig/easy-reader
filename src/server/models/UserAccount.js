const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccountSchema = Schema({
    username: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    passwordHash: {type: String},
    passwordSalt: {type: String}
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);