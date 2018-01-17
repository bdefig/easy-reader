const fs = require('fs');
const fetch = require('node-fetch');
let urlPath = 'http://localhost:8080';

// Test data--delete later
const docFileName = '../../assets/texts/TheBrothersKaramazov.txt';
const docTitle = 'The Brothers Karamazov';
const docAuthor = 'Fyodor Dostoyevsky';

function parseAndInsertDocument (fileName, title, author) {
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

function parseTextFile(fileName) {
    return new Promise ( (resolve, reject) => {
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

function insertDocument(docMetadata, docBlocks) {
    return new Promise ( (resolve, reject) => {
        const docMetadataAndBlocks = {};
        docMetadataAndBlocks['metadata'] = docMetadata;
        docMetadataAndBlocks['blocks'] = docBlocks;
        const url = urlPath + '/v0/document/insert';

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

        const url = urlPath + '/v0/documentMetadata/insert';

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