import 'whatwg-fetch';
// import * as Environment from 'Environment.js';

const baseURL = 'http://localhost:3001/v1/';

export function getNextTextBlocks(documentMetadata, firstIndexToGet, minWordCount) {
    return new Promise ( (resolve, reject) => {
        if (!documentMetadata.wordCountPerBlock || documentMetadata.wordCountPerBlock.length - 1 < firstIndexToGet) {
            // Error: Out of range
            reject(Error('getNextTextBlocks error: firstIndexToGet is out of range'));
        }

        let wordCount = documentMetadata.wordCountPerBlock[firstIndexToGet];
        let blockIndex = firstIndexToGet;

        while (wordCount < minWordCount && blockIndex < (documentMetadata.wordCountPerBlock.length - 1)) {
            blockIndex += 1;
            wordCount += documentMetadata.wordCountPerBlock[blockIndex];
        }

        let url = baseURL + 'document/' + documentMetadata._id + '/first/' + firstIndexToGet + '/last/' + blockIndex;
        
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(blocks => {
            console.log(JSON.stringify(blocks));
            return blocks.json();
        })
        .then(blocks => {
            resolve(blocks);
        })
        .catch(err => reject(Error('getNextTextBlocks error fetching blocks from database')));
    });
}

export function getPrevTextBlocks(documentMetadata, firstIndexToGet, minWordCount) {
    return new Promise ( (resolve, reject) => {
        if (!documentMetadata.wordCountPerBlock || firstIndexToGet < 0) {
            // Error: Out of range
            reject(Error('getNextTextBlocks error: firstIndexToGet is out of range'));
        }

        let wordCount = documentMetadata.wordCountPerBlock[firstIndexToGet];
        let blockIndex = firstIndexToGet;

        while (wordCount < minWordCount && blockIndex > 0) {
            blockIndex -= 1;
            wordCount += documentMetadata.wordCountPerBlock[blockIndex];
        }

        let url = baseURL + 'document/' + documentMetadata._id + '/first/' + blockIndex + '/last/' + firstIndexToGet;
        
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(blocks => {
            console.log(JSON.stringify(blocks));
            return blocks.json();
        })
        .then(blocks => {
            resolve(blocks);
        })
        .catch(err => reject(Error('getNextTextBlocks error fetching blocks from database')));
    });
}

export function getBlocksByIndices (documentMetadata, lowerIndex, higherIndex) {
    return new Promise ( (resolve, reject) => {
    
        if (!documentMetadata.wordCountPerBlock ||lowerIndex < 0 || higherIndex > documentMetadata.wordCountPerBlock.length - 1) {
            reject(Error('getBlocksByIndices error: index out of range'));
        }

        let url = baseURL + 'document/' + documentMetadata._id + '/first/' + lowerIndex + '/last/' + higherIndex;
        
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(blocks => {
            console.log(JSON.stringify(blocks));
            return blocks.json();
        })
        .then(blocks => {
            resolve(blocks);
        })
        .catch(err => reject(Error('getBlocksByIndices error fetching blocks from database')));
    });
}

export function getIndexCheckpoints (documentMetadata, minWordCountPerBlock) {
    let indexCounter = 0;
    let indexCheckpoints = [0];
    let wordCountCounter = 0;

    while (indexCounter < documentMetadata.wordCountPerBlock.length) {
        if (wordCountCounter > minWordCountPerBlock) {
            indexCheckpoints.push(indexCounter);
            wordCountCounter = 0;
        }
        wordCountCounter += documentMetadata.wordCountPerBlock[indexCounter];
        indexCounter += 1;
    }
    indexCheckpoints.push(documentMetadata.wordCountPerBlock.length - 1)

    return indexCheckpoints;
}

export function getIndicesFromCheckpoints (indexCheckpoints, oneIndex) {
    for (let i = 0; i < (indexCheckpoints.length - 1); i++) {
        if (oneIndex >= indexCheckpoints[i] && oneIndex < indexCheckpoints[i+1]) {
            return [indexCheckpoints[i], indexCheckpoints[i+1] - 1];
        }
    }
    return [-1, -1];    // Not found
}