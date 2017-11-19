import 'whatwg-fetch';
import AppConfig from '../AppConfig';

export const REQUEST_PREV_BLOCKS = 'REQUEST_PREV_BLOCKS';
function requestPrevBlocks(state) {
    return {
        type: REQUEST_PREV_BLOCKS
    }
}

export const RECEIVE_PREV_BLOCKS = 'RECEIVE_PREV_BLOCKS';
function receivePrevBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_PREV_BLOCKS,
        blocks: receivedBlocks
    }
}

export function fetchPrevBlocks() {
    return (dispatch, getState) => {
        const currentState = getState();
        if (currentState.textBlocks.blocks.length > 0 && currentState.textBlocks.blocks[0].index > 0) {
            let indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, 0);
            if (currentState.textBlocks.blocks.length !== 0) {
                indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.textBlocks.blocks[0].index - 1);
                console.log('Get indices: ' + indicesToGet);
            }

            if (indicesToGet[0] === -1 && indicesToGet[1] === -1) {
                // Error: Do something else
            }

            const url = AppConfig.baseURL + 'document/' + currentState.currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];

            dispatch(requestPrevBlocks(getState()));
            return fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(blocks => blocks.json())
            .then(jsonBlocks => dispatch(receivePrevBlocks(getState(), jsonBlocks)));
        }
    }
}

export const REQUEST_NEXT_BLOCKS = 'REQUEST_NEXT_BLOCKS';
function requestNextBlocks(state) {
    return {
        type: REQUEST_NEXT_BLOCKS
    }
}

export const RECEIVE_NEXT_BLOCKS = 'RECEIVE_NEXT_BLOCKS';
function receiveNextBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_NEXT_BLOCKS,
        blocks: receivedBlocks
    }
}

export function fetchNextBlocks() {
    return (dispatch, getState) => {
        const currentState = getState();
        // TODO: Only execute if we're not on the last block
        let indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, 0);
        if (currentState.currentDocument.currentIndex) {
            indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.currentDocument.currentIndex);
        }
        if (currentState.textBlocks.blocks.length !== 0) {
            indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.textBlocks.blocks[currentState.textBlocks.blocks.length - 1].index + 1);
        }
        console.log('Get indices: ' + indicesToGet);
        if (indicesToGet[0] === -1 && indicesToGet[1] === -1) {
            // TODO: Handle this error more gracefully
            console.log('Can\'t fetch blocks: getIndicesFromCheckpoints failed');
            console.log(getState());
        } else {
            const url = AppConfig.baseURL + 'document/' + currentState.currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];
            // console.log('Request url: ' + url);

            dispatch(requestNextBlocks(getState()));
            return fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(receivedBlocks => receivedBlocks.json())
            .then(jsonBlocks => dispatch(receiveNextBlocks(getState(), jsonBlocks)));
        }
    }
}

export const REQUEST_CURRENT_DOCUMENT = 'REQUEST_CURRENT_DOCUMENT';
function requestCurrentDocument(state) { 
    return {
        type: REQUEST_CURRENT_DOCUMENT
    }
}

export const RECEIVE_CURRENT_DOCUMENT = 'RECEIVE_CURRENT_DOCUMENT';
function receiveCurrentDocument(state, currentDocument) {
    return (dispatch) => {
        // Calculate index checkpoints
        const indexCheckpoints = calculateIndexCheckpoints(currentDocument.document.wordCountPerBlock, state.user.settings.minWordCount);
        // dispatch(fetchCurrentBlocks(state, currentDocument, indexCheckpoints));
        return {
            type: RECEIVE_CURRENT_DOCUMENT,
            currentDocument: currentDocument,
            indexCheckpoints: indexCheckpoints
        }
    }
}

function fetchCurrentBlocks(state, currentDocument, indexCheckpoints) {
    return (dispatch, currentDocument, indexCheckpoints) => {
        const indicesToGet = getIndicesFromCheckpoints(indexCheckpoints, currentDocument.currentIndex);
        const url = AppConfig.baseURL + 'document/' + currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];

        dispatch(requestNextBlocks(state));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(receivedBlocks => receivedBlocks.json())
        .then(jsonBlocks => dispatch(receiveNextBlocks(state, jsonBlocks)));
    }
}

export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
function updateCurrentDocument(state) {
    return {
        type: UPDATE_CURRENT_DOCUMENT
    }
}

export function fetchCurrentDocument() {
    return (dispatch, getState) => {
        const currentState = getState();
        const userID = currentState.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestCurrentDocument(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(currentDocument => currentDocument.json())
        // Only send the most recent current document
        .then(jsonCurrentDocument => dispatch(receiveCurrentDocument(getState(), jsonCurrentDocument[0])));
    }
}

export const UPDATE_INDEX_CHECKPOINTS = 'CALCULATE_INDEX_CHECKPOINTS';
export function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

function calculateIndexCheckpoints (wordCountPerBlock, minWordCountPerBlock) {
    let indexCounter = 0;
    let indexCheckpoints = [0];
    let wordCountCounter = 0;

    while (indexCounter < wordCountPerBlock.length) {
        if (wordCountCounter > minWordCountPerBlock) {
            indexCheckpoints.push(indexCounter);
            wordCountCounter = 0;
        }
        wordCountCounter += wordCountPerBlock[indexCounter];
        indexCounter += 1;
    }
    indexCheckpoints.push(wordCountPerBlock.length - 1)

    return indexCheckpoints;
}

function getIndicesFromCheckpoints (indexCheckpoints, oneIndex) {
    for (let i = 0; i < (indexCheckpoints.length - 1); i++) {
        if (oneIndex >= indexCheckpoints[i] && oneIndex < indexCheckpoints[i+1]) {
            return [indexCheckpoints[i], indexCheckpoints[i+1] - 1];
        }
    }
    return [-1, -1];    // Not found
}

export function loadInitialReaderState() {
    return (dispatch, getState) => {
        return dispatch(fetchCurrentDocument())
        // TODO: Display blocks
        // .then(dispatch(fetchNextBlocks()))
        // .catch(err => {
        //     console.log('Error loading initial reader state: ' + err);
        // });
    }
}

// export function loadInitialReaderState() {
//     return (dispatch, getState) => {
//         const currentState = getState();
//         const userID = currentState.user.userID;
//         const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

//         dispatch(requestCurrentDocument(getState()));
//         return fetch(url, {
//             method: 'get',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             }
//         })
//         .then(currentDocument => currentDocument.json())
//         // Only send the most recent current document
//         .then(jsonCurrentDocument => dispatch(receiveCurrentDocument(getState(), jsonCurrentDocument[0])))
//         // .then(dispatch(fetchNextBlocks()))
//         .catch(err => {
//             console.log('Error loading initial reader state: ' + err);
//         });
//     }
// }

export function debugState() {
    return (dispatch, getState) => {
        console.log(getState());
    }
}
