const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    name: {type: String},
    email: {type: String, unique: true, sparse: true},
    passwordHash: {type: String}
});

module.exports = mongoose.model('Admin', AdminSchema);