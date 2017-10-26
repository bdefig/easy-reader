const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDocumentProgressSchema = Schema({
    userID: {type: Schema.ObjectId, ref: 'UserAccount', required: true},
    documentID: {type: Schema.ObjectId, ref: 'DocumentMetadata', required: true},
    currentBlock: {type: Number, default: 0},
    lastAccessed: {type: Date}  // TODO: default: now
});

module.exports = mongoose.model('UserDocumentProgress', UserDocumentProgressSchema);