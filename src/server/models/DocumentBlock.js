const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentBlockSchema = Schema({
    document: {type: Schema.ObjectId, ref: 'DocumentMetadata', required: true},
    index: {type: Number, required: true},
    text: {type: String, required: true},
    textType: {type: String, required: true, enum: ['text', 'header'], default: 'text'},
    wordCount: {type: Number}
});

module.exports = mongoose.model('DocumentBlock', DocumentBlockSchema);