const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDocumentsSchema = Schema({
    userID: {type: Schema.ObjectId, ref: 'UserAccount', required: true},
    userDocuments: [{
        documentID: {type: Schema.ObjectId, ref: 'DocumentMetadata', required: true},
        currentBlock: {type: Number, default: 0}
    }]
});

module.exports = mongoose.model('UserDocuments', UserDocumentsSchema);