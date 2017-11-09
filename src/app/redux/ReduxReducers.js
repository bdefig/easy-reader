import { combineReducers } from 'redux';
import {
    REQUEST_PREV_BLOCKS,
    RECEIVE_PREV_BLOCKS,
    REQUEST_NEXT_BLOCKS,
    RECEIVE_NEXT_BLOCKS,
    REQUEST_USER_PROGRESS,
    RECEIVE_USER_PROGRESS,
    UPDATE_USER_PROGRESS ,
    UPDATE_INDEX_CHECKPOINTS
} from './ReduxActions';

function textBlocks(
        state = {
            isFetching: false,
            items: []
        },
        action
    ) {
    switch (action.type) {
        case REQUEST_PREV_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PREV_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.blocks
            });
        case REQUEST_NEXT_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_NEXT_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.blocks
            });
        default:
            return state;
    }
}

function userProgress(state = {}, action) {
    switch (action.type) {
        case REQUEST_USER_PROGRESS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USER_PROGRESS:
            return Object.assign({}, state, {
                isFetching: false,
                [currentDocument.documentID]: action.documentID,
                // TODO: Do something about current block
            });
        case UPDATE_USER_PROGRESS:
        default:
            return state;
    }
}

function indexCheckpoints(state = {}, action) {
    switch (action.type) {
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
                indexCheckpoints: action.indexCheckpoints
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    textBlocks,
    userProgress,
    indexCheckpoints
})

export default rootReducer;