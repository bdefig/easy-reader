import { combineReducers } from 'redux';
import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    // REQUEST_PREV_BLOCKS,    // Get rid of and replace with generic request/receive
    // RECEIVE_PREV_BLOCKS,    // Get rid of and replace with generic request/receive
    // REQUEST_NEXT_BLOCKS,    // Get rid of and replace with generic request/receive
    // RECEIVE_NEXT_BLOCKS,    // Get rid of and replace with generic request/receive
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    UPDATE_INDEX_CHECKPOINTS
} from './ReduxActions';

function user(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function currentDocument(state = {}, action) {
    switch (action.type) {
        case REQUEST_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: false,
                documentID: action.currentDocument.document._id,
                title: action.currentDocument.document.title,
                author: action.currentDocument.document.author,
                wordCountPerBlock: action.currentDocument.document.wordCountPerBlock,
                currentIndex: action.currentDocument.currentBlock,
                indexCheckpoints: action.indexCheckpoints
            });
        case UPDATE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            })
            return state;
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
                indexCheckpoints: action.indexCheckpoints
            });
        default:
            return state;
    }
}

function textBlocks(state = {}, action) {
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
        // case REQUEST_PREV_BLOCKS:   // Get rid of and replace with generic request/receive
        //     return Object.assign({}, state, {
        //         isFetching: true
        //     });
        // case RECEIVE_PREV_BLOCKS:   // Get rid of and replace with generic request/receive
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         blocks: action.blocks
        //     });
        // case REQUEST_NEXT_BLOCKS:   // Get rid of and replace with generic request/receive
        //     return Object.assign({}, state, {
        //         isFetching: true
        //     });
        // case RECEIVE_NEXT_BLOCKS:   // Get rid of and replace with generic request/receive
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         blocks: action.blocks
        //     });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    currentDocument,
    textBlocks
})

export default rootReducer;