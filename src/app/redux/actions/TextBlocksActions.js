import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    CLEAR_BLOCKS,
    RESET_TEXT_BLOCKS_STATE
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

export function clearBlocks(state) {
    return {
        type: CLEAR_BLOCKS
    }
}

export function resetTextBlocksState() {
    return {
        type: RESET_TEXT_BLOCKS_STATE
    }
}