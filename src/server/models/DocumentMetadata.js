const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentMetadataSchema = Schema({
    title: {type: String, required: true},
    author: {type: String},
    wordCountPerBlock: [{type: Number, required: true}]
});

module.exports = mongoose.model('DocumentMetadata', DocumentMetadataSchema);