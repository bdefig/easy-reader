import { combineReducers } from 'redux';
import {
    REQUEST_PREV_BLOCKS,
    RECEIVE_PREV_BLOCKS,
    REQUEST_NEXT_BLOCKS,
    RECEIVE_NEXT_BLOCKS,
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
            // console.log(action.currentDocument);
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
        case REQUEST_PREV_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PREV_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false,
                blocks: action.blocks
            });
        case REQUEST_NEXT_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_NEXT_BLOCKS:
            // console.log('RECEIVE_NEXT_BLOCKS reducer');
            // console.log(action);
            return Object.assign({}, state, {
                isFetching: false,
                blocks: action.blocks
            });
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