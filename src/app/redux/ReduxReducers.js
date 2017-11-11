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
        break;
        case RECEIVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: false,
                documentID: action.documentID,
                title: action.title,
                author: action.author,
                wordCountPerBlock: action.wordCountPerBlock
            });
        break;
        case UPDATE_CURRENT_DOCUMENT:
        break;
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
                indexCheckpoints: action.indexCheckpoints
            })
        break;
        default:
            return state;
    }
}

function textBlocks(state = {}, action) {
    const indices = [];
    switch (action.type) {
        case REQUEST_PREV_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        break;
        case RECEIVE_PREV_BLOCKS:
            for (let i=0; i<action.blocks.length; i++) {
                indices.push(action.blocks[i].index);
            }
            return Object.assign({}, state, {
                isFetching: false,
                currentIndices: indices,
                blocks: formatBlocksForState(action.blocks)
            });
        break;
        case REQUEST_NEXT_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        break;
        case RECEIVE_NEXT_BLOCKS:
            for (let i=0; i<action.blocks.length; i++) {
                indices.push(action.blocks[i].index);
            }
            return Object.assign({}, state, {
                isFetching: false,
                currentIndices: indices,
                blocks: formatBlocksForState(action.blocks)
            });
        break;
        default:
            return state;
    }
}

function formatBlocksForState(blocks) {
    const blocksForState = [];

    for (let i=0; i<blocks.length; i++) {
        const block = blocks[i];
        const blockToAdd = {
            [block.index]: {
                documentID: block.documentID,
                index: block.index,
                text: block.text,
                textType: block.textType,
                wordCount: block.wordCount
            }
        };
        blocksForState.push(blockToAdd);
    }

    return blocksForState;
}

const rootReducer = combineReducers({
    user,
    currentDocument,
    textBlocks
})

export default rootReducer;