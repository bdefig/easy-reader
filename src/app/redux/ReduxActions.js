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

        // TODO: Deal with empty state
        let indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, 0);
        if (currentState.textBlocks.blocks.length != 0) {
            indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.textBlocks.blocks[0].index - 1);
            console.log('Get indices: ' + indicesToGet);
        }

        if (indicesToGet[0] === -1 && indicesToGet[1] === -1) {
            // Error: Do something else
        }

        // const indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.textBlocks.blocks[0].index)

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
        // console.log(currentState.textBlocks);
        // TODO: Deal with empty state
        let indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, 0);
        if (currentState.textBlocks.blocks.length != 0) {
            indicesToGet = getIndicesFromCheckpoints(currentState.currentDocument.indexCheckpoints, currentState.textBlocks.blocks[currentState.textBlocks.blocks.length - 1].index + 1);
            console.log('Get indices: ' + indicesToGet);
        }

        if (indicesToGet[0] === -1 && indicesToGet[1] === -1) {
            // Error: Do something else
        }

        const url = AppConfig.baseURL + 'document/' + currentState.currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];
        console.log('Request url: ' + url);

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

export const REQUEST_CURRENT_DOCUMENT = 'REQUEST_CURRENT_DOCUMENT';
function requestCurrentDocument(state) { 
    return {
        type: REQUEST_CURRENT_DOCUMENT
    }
}

export const RECEIVE_CURRENT_DOCUMENT = 'RECEIVE_CURRENT_DOCUMENT';
function receiveCurrentDocument(state, currentDocument) {
    return {
        type: RECEIVE_CURRENT_DOCUMENT,
        currentDocument: currentDocument
    }
}

export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
function updateCurrentDocument(state) {
    return {
        type: UPDATE_CURRENT_DOCUMENT
    }
}

export const UPDATE_INDEX_CHECKPOINTS = 'CALCULATE_INDEX_CHECKPOINTS';
export function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

export function calculateIndexCheckpoints () {
    return (dispatch, getState) => {
        const state = getState();
        const documentMetadata = state.currentDocument;
        const minWordCountPerBlock = state.user.settings.minWordCount;
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

        return dispatch(updateIndexCheckpoints(state, indexCheckpoints));
    }
}

function getIndicesFromCheckpoints (indexCheckpoints, oneIndex) {
    for (let i = 0; i < (indexCheckpoints.length - 1); i++) {
        if (oneIndex >= indexCheckpoints[i] && oneIndex < indexCheckpoints[i+1]) {
            return [indexCheckpoints[i], indexCheckpoints[i+1] - 1];
        }
    }
    return [-1, -1];    // Not found
}