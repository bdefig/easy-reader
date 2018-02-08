const fs = require('fs');

exports.parseText = function(title, author, filename) {
    return new Promise ( (resolve, reject) => {
        // console.log('Parsing text file...')

        let remaining = '';
        let blocks = [];
        let blockCounter = 0;

        // Read input file
        let input = fs.createReadStream(filename);

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
            
            const toReturn = {
                documentMetadata: {
                    title: title,
                    author: author,
                    wordCountPerBlock: docBlockWordCounts
                },
                blocks: blocks
            }

            resolve(toReturn);
            // TODO: Reject if there's something wrong
        })
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