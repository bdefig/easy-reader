import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS
} from '../ActionTypes';

export function requestBlocks(state) {
    return {
        type: REQUEST_BLOCKS
    }
}

export function receiveBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_BLOCKS,
        blocks: receivedBlocks
    }
}