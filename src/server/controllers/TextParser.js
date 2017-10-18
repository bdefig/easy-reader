// const fs = require('fs');
// // const MongoClient = require('mongodb').MongoClient;
// const uuidv4 = require('uuid/v4');
// const mongoURL = 'mongodb://localhost:27017/EasyReader';
// const mongoose = require('mongoose');

// mongoose.connect(mongoURL, {useMongoClient: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// --------------------------------------------------

const fs = require('fs');
const fetch = require('node-fetch');
let urlPath = 'http://localhost:3000';

// Test data--delete later
const docFileName = '../../assets/texts/brothers-part-i.txt';
const docTitle = 'Brothers Test Part I';
const docAuthor = 'Fyodor Dostoyevsky';

function parseAndInsertDocument (fileName, title, author) {
    // insertDocumentMetadata(title, author)
    //     .then(docMetadata => {
    //         parseTextFile(fileName, docMetadata);
    //     })
    //     .then(blocksAndWordCounts => {
    //         insertBlocksAndUpdateWordCounts(blocksAndWordCounts);
    //     })
    //     .catch(err => console.log(err));

    const documentMetadata = {};
    documentMetadata['title'] = title;
    documentMetadata['author'] = author;

    parseTextFile(fileName)
        .then(parseResults => {
            documentMetadata['wordCountPerBlock'] = parseResults.wordCountPerBlock;
            insertDocument(documentMetadata, parseResults.blocks);
        })
        .then(documentInsertedResult => {
            console.log('Document inserted');
        })
        .catch(err => console.log(err));
}

function insertDocument(docMetadata, docBlocks) {
    return new Promise ( (resolve, reject) => {
        const docMetadataAndBlocks = {};
        docMetadataAndBlocks['metadata'] = docMetadata;
        docMetadataAndBlocks['blocks'] = docBlocks;
        const url = urlPath + '/v1/document/insert';

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(docMetadataAndBlocks)
        })
        .then(docSaved => docSaved.json())
        .then(docMeta => {
            console.log('Document saved to DB:');
            console.log(docMeta);
            resolve(docMeta);
        })
        .catch(err => console.log('Error fetching while inserting document:\n' + err));
        // TODO: Reject if something bad happens
    });
}

function insertDocumentMetadata (documentTitle, documentAuthor) {
    return new Promise ( (resolve, reject) => {
        
        const thisDocumentMetadata = {};
        thisDocumentMetadata['title'] = documentTitle;
        thisDocumentMetadata['author'] = documentAuthor;
        thisDocumentMetadata['wordCountPerBlock'] = [];

        const url = urlPath + '/v1/documentMetadata/insert';

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(thisDocumentMetadata)
            })
            .then(docMetaSaved => {return docMetaSaved.json()})
            .then(docMeta => {
                console.log('Document metadata saved to DB:');
                console.log(docMeta);
                resolve(docMeta);
                // TODO: Reject if metadata not saved
            })
            .catch(err => console.log(err));
    });
}

function parseTextFile(fileName) {
    return new Promise ( (resolve, reject) => {
        // TODO: If docMetadata doesn't have _id, then reject

        // console.log('Parsing text file...')

        let remaining = '';
        let blocks = [];
        let blockCounter = 0;

        // Read input file
        let input = fs.createReadStream(fileName);

        input.on('data', function(data) {
            remaining += data;
            let index = remaining.indexOf('\n');
            let last = 0;
            while (index > -1) {
                let line = remaining.substring(last, index);
                last = index + 1;
                if (line.length > 0) {
                    blocks.push(parseBlock(line, blockCounter));
                    blockCounter += 1;
                }
                index = remaining.indexOf('\n', last);
            }
            remaining = remaining.substring(last);
        });

        input.on('end', function() {
            if (remaining.length > 0) {
                blocks.push(parseBlock(remaining, blockCounter));
                blockCounter += 1;
            }

            let docBlockWordCounts = buildDocBlockWordCounts(blocks);

            const toReturn = {};
            toReturn['wordCountPerBlock'] = docBlockWordCounts;
            toReturn['blocks'] = blocks;

            resolve(toReturn);
            // TODO: Reject if there's something wrong
        })
    });
}

function insertBlocksAndUpdateWordCounts (blocksAndWordCounts) {
    const blocks = blocksAndWordCounts.blocks;
    const wordCountPerBlock = blocksAndWordCounts.wordCountPerBlock;

    // TODO: Insert blocks into DB at urlPath + '/v1/document/:documentID/insert'

    // TODO: Update document metadata with wordCountPerBlock
    // TODO: Make a new route to update document metadata
    // TODO: Make a new controller to update document metadata

    // TODO: EVEN BETTER:
        // Refactor so that metadata and blocks are inserted at the same time
        // I can get the _id of the document before the insertion
        // I'd need to do all this in the controller because it has access to the model
        // I need a new endpoint to insert the whole document (metadata and blocks)
        // See https://stackoverflow.com/questions/7479333/mongoose-with-mongodb-how-to-return-just-saved-object
}

function parseBlock (text, index) {
    // Note that these blocks won't have a documentID
    // This will be added in the controller before .save()
    const block = {};
    
    block['index'] = index;
    block['text'] = text;
    block['textType'] = getTextType(text);
    block['wordCount'] = getWordCount(text);

    return block;
}

function getWordCount(chunk) {
    let remaining = chunk.trim();
    let wordCount = (chunk.length > 0 && chunk != ' ') ? 1 : 0;
    let index = remaining.indexOf(' ');

    while (index != -1) {
        wordCount += 1;
        remaining = remaining.substring(index + 1);
        index = remaining.indexOf(' ');
    }

    return wordCount;
}

function getTextType(chunk) {
    if (chunk.length > 100) {
        // Text is too long to be a heading
        return 'text';
    }

    // RegEx to match Chapter, Book, Part, etc.
    let re = /^(Chapter|Book|Part)/i;
    if (re.test(chunk)) {
        return 'heading';
    } else {
        return 'text';
    }
}

function buildDocBlockWordCounts(blocks) {
    let wordCountArray = [];

    for (let block of blocks) {
        wordCountArray.push(block.wordCount);
    }

    return wordCountArray;
}

parseAndInsertDocument(docFileName, docTitle, docAuthor);