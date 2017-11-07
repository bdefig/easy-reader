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

export const REQUEST_USER_PROGRESS
function requestUserProgress(state) { 
    return {
        type: REQUEST_USER_PROGRESS
    }
}

export const RECEIVE_USER_PROGRESS
function receiveUserProgress(state, userProgress) {
    return {
        type: RECEIVE_USER_PROGRESS,
        userProgress: userProgress
    }
}

export const UPDATE_USER_PROGRESS
function updateUserProgress(state) {
    return {
        type: UPDATE_USER_PROGRESS
    }
}

export function fetchPrevBlocks() {
    return (dispatch, getState) => {
        const currentState = getState();
        const indicesToGet = getIndicesFromCheckpoints(currentState.indexCheckpoints, currentState.currentTextBlocks.items(currentState.currentTextBlocks.items[0]))

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

export function fetchNextBlocks() {
    return (dispatch, getState) => {
        const currentState = getState();
        const indicesToGet = getIndicesFromCheckpoints(currentState.indexCheckpoints, currentState.currentTextBlocks.items[currentState.currentTextBlocks.items.length])

        const url = AppConfig.baseURL + 'document/' + currentState.currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];

        dispatch(requestNextBlocks(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(blocks => blocks.json())
        .then(jsonBlocks => dispatch(receiveNextBlocks(getState(), jsonBlocks)));
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