const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/EasyReader';

function getBlockByIndex(docID, blockIndex) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url)
            .then(db => {
                return new Promise ( (resolve, reject) => {
                    db.collection('DocumentBlocks').findOne({documentID: docID, index: blockIndex})
                        .then(doc => {
                            resolve([doc, db]);
                        })
                        .catch(err => reject(Error('Error getting block by index')));
                });
            })
            .then(docAndDB => {
                docAndDB[1].close()
                    .then(resolve(docAndDB[0]))
                    .catch(reject(Error('Error closing the database connection')));
            })
            .catch(err => console.log(err));
    });
}

function getManyBlocksByIndex(docID, blockIndexArray) {
    return new Promise( (resolve, reject) => {
        if (blockIndexArray.length === 0) {
            reject(Error('Block index array is empty'));
        }
        MongoClient.connect(url)
            .then(db => {
                return new Promise ( (resolve, reject) => {
                    db.collection('DocumentBlocks').find({documentID: docID, index:{$in:blockIndexArray}})
                        .toArray()
                        .then(docs => {
                            resolve([docs, db]);
                        })
                        .catch(err => reject(Error('Error getting many blocks by index')));
                });
            })
            .then(docAndDB => {
                docAndDB[1].close()
                    .then(resolve(docAndDB[0]))
                    .catch(reject(Error('Error closing the database connection')));
            })
            .catch(err => console.log(err));
    });
}

function getNextBlocksByWordCountRange(docMetadata, firstBlockToGet, range) {
    // firstBlockToGet should be the first block to be displayed in the new view
    // In other words, firstBlockToGet should be one block after the last block of the current view

    return new Promise( (resolve, reject) => {
        const lowerBound = range[0];
        const upperBound = range[1];
        let wordCount = 0;
        let blockIndex = firstBlockToGet;
        let wordCountArray = docMetadata['wordCountPerBlock'];
        let blocksToGet = [];

        while (wordCount < lowerBound && blockIndex < (wordCountArray.length - 1)) {
            blocksToGet.push(blockIndex);
            wordCount += wordCountArray[blockIndex];
            blockIndex += 1;
        }

        if (blocksToGet.length > 0) {
            getManyBlocksByIndex(docMetadata['documentID'], blocksToGet)
                .then(docs => {
                    if (docs.length > 0) {
                        resolve(docs);
                    } else {
                        reject(Error('No blocks fetched from DB in getNextBlocksByWordCountRange'));
                    }
                })
                .catch(err => console.log(err));
        } else {
            reject(Error('getNextBlocksByWordCountRange not asking for any documents'));
        }

    });
}

function getPrevBlocksByWordCountRange(docMetadata, lastBlockToGet, range) {
    // lastBlockToGet should be the last block to be displayed in the new view
    // In other words, lastBlockToGet should be one block before the first block of the current view

    return new Promise( (resolve, reject) => {
        const lowerBound = range[0];
        const upperBound = range[1];
        let wordCount = 0;
        let blockIndex = lastBlockToGet;
        let wordCountArray = docMetadata['wordCountPerBlock'];
        let blocksToGet = [];

        while (wordCount < lowerBound && blockIndex > 0) {
            blocksToGet.push(blockIndex);
            wordCount += wordCountArray[blockIndex];
            blockIndex -= 1;
        }

        if (blocksToGet.length > 0) {
            getManyBlocksByIndex(docMetadata['documentID'], blocksToGet)
                .then(docs => {
                    if (docs.length > 0) {
                        resolve(docs);
                    } else {
                        reject(Error('No blocks fetched from DB in getPrevBlocksByWordCountRange'));
                    }
                })
                .catch(err => console.log(err));
        } else {
            reject(Error('getPrevBlocksByWordCountRange not asking for any documents'));
        }

    });
}

function getDocMetadataByTitle(docTitle) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url)
            .then(db => {
                return new Promise ( (resolve, reject) => {
                    db.collection('DocumentMetadata').findOne({title: docTitle})
                        .then(doc => {
                            resolve([doc, db]);
                        })
                        .catch(err => reject(Error('Error getting document metadata by title')));
                });
            })
            .then(docAndDB => {
                docAndDB[1].close()
                    .then(resolve(docAndDB[0]))
                    .catch(reject(Error('Error closing the database connection')));
            })
            .catch(err => console.log(err));
    });
}

// export default TextEndpoint;

getDocMetadataByTitle('Brothers Test Part I')
    .then(docMetadata => getPrevBlocksByWordCountRange(docMetadata, 9, [800, 1000]))
    .then(blocks => {
        let wordCount = 0;
        let blockIndices = [];
        for (let block of blocks) {
            blockIndices.push(block.index);
            wordCount += block.wordCount;
        }
        console.log('Blocks fetched:' + blockIndices);
        console.log('Words fetched: ' + wordCount);
    })
    .catch(err => console.log(err));