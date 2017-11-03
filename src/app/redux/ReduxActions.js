import 'whatwg-fetch';

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

export const RECEIVE_USER_PROGRESS

export const UPDATE_USER_PROGRESS