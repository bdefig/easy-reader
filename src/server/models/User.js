const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    userID: {type: Number, required: true},
    name: {type: String},
    email: {type: String, unique: true},
    passwordHash: {type: String}
});

module.exports = mongoose.model('User', UserSchema);