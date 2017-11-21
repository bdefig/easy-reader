import 'whatwg-fetch';
import AppConfig from '../AppConfig';

// Types -----------------------------------------------------------------

export const REQUEST_BLOCKS = 'REQUEST_BLOCKS';
export const RECEIVE_BLOCKS = 'RECEIVE_BLOCKS';
export const REQUEST_PREV_BLOCKS = 'REQUEST_PREV_BLOCKS';   // Get rid of and replace with generic request/receive
export const RECEIVE_PREV_BLOCKS = 'RECEIVE_PREV_BLOCKS';   // Get rid of and replace with generic request/receive
export const REQUEST_NEXT_BLOCKS = 'REQUEST_NEXT_BLOCKS';   // Get rid of and replace with generic request/receive
export const RECEIVE_NEXT_BLOCKS = 'RECEIVE_NEXT_BLOCKS';   // Get rid of and replace with generic request/receive
export const REQUEST_CURRENT_DOCUMENT = 'REQUEST_CURRENT_DOCUMENT';
export const RECEIVE_CURRENT_DOCUMENT = 'RECEIVE_CURRENT_DOCUMENT';
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
export const UPDATE_INDEX_CHECKPOINTS = 'UPDATE_INDEX_CHECKPOINTS';

// Action creators (and actions) -----------------------------------------

function requestBlocks(state) {
    return {
        type: REQUEST_BLOCKS
    }
}

function receiveBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_BLOCKS,
        blocks: receivedBlocks
    }
}

// Get rid of and replace with generic request/receive
function requestPrevBlocks(state) {
    return {
        type: REQUEST_PREV_BLOCKS
    }
}

// Get rid of and replace with generic request/receive
function receivePrevBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_PREV_BLOCKS,
        blocks: receivedBlocks
    }
}

// Get rid of and replace with generic request/receive
function requestNextBlocks(state) {
    return {
        type: REQUEST_NEXT_BLOCKS
    }
}

// Get rid of and replace with generic request/receive
function receiveNextBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_NEXT_BLOCKS,
        blocks: receivedBlocks
    }
}

function requestCurrentDocument(state) { 
    return {
        type: REQUEST_CURRENT_DOCUMENT
    }
}


function receiveCurrentDocument(state, currentDocument, indexCheckpoints) {
    return {
        type: RECEIVE_CURRENT_DOCUMENT,
        currentDocument: currentDocument,
        indexCheckpoints: indexCheckpoints
    }
}

function updateCurrentDocument(state) {
    return {
        type: UPDATE_CURRENT_DOCUMENT
    }
}

function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

// Thunks (call action creators) -----------------------------------------

export function fetchBlocks(direction) {
    // Direction: -1 (previous blocks), 0 (current blocks), 1 (next blocks)
}

export function fetchCurrentDocument() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestCurrentDocument(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(currentDocuments => currentDocuments.json())
        .then(jsonCurrentDocuments => {
            // Only get the most recent current document
            const currentDocument = jsonCurrentDocuments[0];
            let wordCountPerBlock = currentDocument.document.wordCountPerBlock;
            let minWordCount = 500;
            if (state.user.settings.minWordCount) {
                minWordCount = state.user.settings.minWordCount;
            }
            const indexCheckpoints = calculateIndexCheckpoints(wordCountPerBlock, minWordCount);
            dispatch(receiveCurrentDocument(getState(), currentDocument, indexCheckpoints));
            return;
        })
        .then(() => {
            dispatch(fetchNextBlocks());
        });
    }
}

export function loadInitialReaderState() {
    return (dispatch, getState) => {
        dispatch(fetchCurrentDocument());
    }
}

export function updateDocumentProgress(state, index) {
    return (dispatch, getState) => {
        const url = AppConfig.baseURL + 'user/' + state.user.userID + '/updateDocumentProgress/document/' + state.currentDocument.documentID;
        const msgBody = {
            currentBlock: index
        };

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(msgBody)
        })
        .then(reply => dispatch(updateCurrentDocument(getState())))
        .catch(err => console.log(Error('Error updating document progress')));
    }
}

export function debugState() {
    return (dispatch, getState) => {
        console.log(getState());
    }
}

// Helper Functions ------------------------------------------------------

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

// Old--Delete when replaced ---------------------------------------------

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
            .then(jsonBlocks => {
                dispatch(receivePrevBlocks(getState(), jsonBlocks));
                if (jsonBlocks) {
                    dispatch(updateDocumentProgress(getState(), jsonBlocks[0].index));
                }
            });
        }
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

            dispatch(requestNextBlocks(getState()));
            return fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(receivedBlocks => receivedBlocks.json())
            .then(jsonBlocks => {
                dispatch(receiveNextBlocks(getState(), jsonBlocks));
                if (jsonBlocks) {
                    dispatch(updateDocumentProgress(getState(), jsonBlocks[0].index));
                }
            });
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