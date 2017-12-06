const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Figure out if we want an additional userID (cuid, auto-incrementing int, etc.)
// https://docs.mongodb.com/v2.8/tutorial/create-an-auto-incrementing-field/
// https://stackoverflow.com/questions/28357965/mongoose-auto-increment

const UserSchema = Schema({
    name: {type: String},
    email: {type: String, unique: true},
    passwordHash: {type: String}
});

module.exports = mongoose.model('User', UserSchema);