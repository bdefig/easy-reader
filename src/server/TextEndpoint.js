const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/EasyReader';
const collection = 'Documents';

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
    return new Promise( (resolve, reject) => {
        const lowerBound = range[0];
        const upperBound = range[1];
        let wordCount = 0;
        let blockIndex = firstBlockToGet;
        let wordCountArray = docMetadata['wordCountPerBlock'];
        let blocksToGet = [];

        while (wordCount < lowerBound) {
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

getDocMetadataByTitle('Brothers Test Part I')
    .then(docMetadata => getNextBlocksByWordCountRange(docMetadata, 10, [800, 1000]))
    .then(blocks => {
        let wordCount = 0;
        for (let block of blocks) {
            wordCount += block.wordCount;
        }
        console.log('Words fetched: ' + wordCount);
    })
    .catch(err => console.log(err));