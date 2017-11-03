const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Get rid of firstName and lastName; add userID (separate from the MongoDB _id field) and email

const UserAccountSchema = Schema({
    username: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    passwordHash: {type: String},
    passwordSalt: {type: String}
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);