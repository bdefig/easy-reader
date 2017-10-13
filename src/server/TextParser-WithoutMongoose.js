const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uuidv4 = require('uuid/v4');
const url = 'mongodb://localhost:27017/EasyReader';
const collection = 'Documents';

// Dummy data
const fileName = '../assets/texts/brothers-part-i.txt';
const documentTitle = 'Brothers Test Part I';
const documentAuthor = 'Fyodor Dostoyevsky';

function parseTextFile(fileName) {
    console.log('Parsing text file...');

    let remaining = '';
    let blocks = [];
    let blockCounter = 0;

    // Create a new document in the database
    const docUUID = uuidv4();
    const title = documentTitle;
    const author = documentAuthor;
    const docObject = {};

    docObject['documentID'] = docUUID;
    docObject['title'] = title;
    docObject['author'] = author;
    
    // insertDocIntoDB(docObject, url, 'DocumentMetadata');
    
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
                blocks.push(parseBlock(line, docUUID, blockCounter));
                blockCounter += 1;
            }
            index = remaining.indexOf('\n', last);
        }
        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            blocks.push(parseBlock(remaining, docUUID, blockCounter));
            blockCounter += 1;
        }
        let docBlockWordCounts = buildDocBlockWordCounts(blocks, docUUID);
        docObject['wordCountPerBlock'] = docBlockWordCounts;
        // insertDocBlockWordCountsIntoDB(docBlockWordCounts, url, 'DocBlockWordCounts');
        insertDocIntoDB(docObject, url , 'DocumentMetadata');
        insertBlocksIntoDB(blocks, url, 'DocumentBlocks');
    });
}

function insertDocIntoDB(docToInsert, dbURL, dbCollection) {
    console.log('Inserting doc into db...');
    
    MongoClient.connect(dbURL)
        .then( db => {
            return new Promise( (resolve, reject) => {
                if (db.collection(dbCollection).insertOne(docToInsert)) {
                    resolve(db);
                } else {
                    reject(Error('Error inserting document'));
                }
            });
        })
        .then(db => db.close())
        .catch(err => console.log(err));
}

function insertBlocksIntoDB(arrayOfBlocks, dbURL, dbCollection) {
    console.log('Inserting blocks into db...');
    
    MongoClient.connect(dbURL)
        .then( db => {
            return new Promise( (resolve, reject) => {
                let bulk = db.collection(dbCollection).initializeUnorderedBulkOp();
                for (let block of arrayOfBlocks) {
                    bulk.insert(block);
                }
                bulk.execute()
                    .then(resolve(db))
                    .catch(err => reject(Error(err)));
            });
        })
        .then(db => db.close())
        .catch(err => console.log(err));
}

function buildDocBlockWordCounts(blocks, docID) {
    let wordCountArray = [];

    for (let block of blocks) {
        wordCountArray.push(block.wordCount);
    }

    return wordCountArray;
}

function insertDocBlockWordCountsIntoDB(docBlockWordCounts, dbURL, dbCollection) {
    console.log('Inserting block word counts into db...');

    MongoClient.connect(dbURL)
    .then( db => {
        return new Promise( (resolve, reject) => {
            if (db.collection(dbCollection).insertOne(docBlockWordCounts)) {
                resolve(db);
            } else {
                reject(Error('Error inserting document'));
            }
        });
    })
    .then(db => db.close())
    .catch(err => console.log(err));
}

function parseBlock (text, docID, index) {
    const block = {};

    block['documentID'] = docID;
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

parseTextFile(fileName);