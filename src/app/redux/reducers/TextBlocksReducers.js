import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    CLEAR_BLOCKS
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
        case CLEAR_BLOCKS:
            return Object.assign({}, state, {
                blocks: []
            });
        default:
            return state;
    }
}