const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDocumentProgressSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'UserAccount', required: true},
    document: {type: Schema.ObjectId, ref: 'DocumentMetadata', required: true},
    currentBlock: {type: Number, default: 0},
    lastAccessed: {type: Date, default: Date.now}
});

module.exports = mongoose.model('UserDocumentProgress', UserDocumentProgressSchema);