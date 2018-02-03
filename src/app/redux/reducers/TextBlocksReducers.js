import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    DID_NOT_RECEIVE_BLOCKS,
    CLEAR_BLOCKS,
    RESET_TEXT_BLOCKS_STATE
} from '../ActionTypes';

export function textBlocks(state = {}, action) {
    switch (action.type) {
        case REQUEST_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false,
                blocks: action.blocks
            });
        case DID_NOT_RECEIVE_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case CLEAR_BLOCKS:
            return Object.assign({}, state, {
                blocks: []
            });
        case RESET_TEXT_BLOCKS_STATE:
            return Object.assign({}, state, {
                isFetching: false,
                blocks: []
            });
        default:
            return state;
    }
}