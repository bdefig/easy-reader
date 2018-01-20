import {
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    REMOVE_CURRENT_DOCUMENT,
    DID_REMOVE_CURRENT_DOCUMENT,
    UPDATE_INDEX_CHECKPOINTS,
    SWITCH_TO_LIBRARY_USER_DOCUMENT
} from '../ActionTypes';

export function currentDocument(state = {}, action) {
    switch (action.type) {
        case REQUEST_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: false,
                _id: action.currentDocument._id,
                title: action.currentDocument.title,
                author: action.currentDocument.author,
                wordCountPerBlock: action.currentDocument.wordCountPerBlock,
                currentIndex: action.currentIndex,
                indexCheckpoints: action.indexCheckpoints
            });
        case UPDATE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            });
        case REMOVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: false,
                isRemoving: true,
                _id: null,
                title: null,
                author: null,
                wordCountPerBlock: [],
                currentIndex: null,
                indexCheckpoints: []
            });
        case DID_REMOVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isRemoving: false
            })
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
                indexCheckpoints: action.indexCheckpoints
            });
        case SWITCH_TO_LIBRARY_USER_DOCUMENT:
            return Object.assign({}, state, {
                _id: action.documentMetadata._id,
                title: action.documentMetadata.title,
                author: action.documentMetadata.author,
                wordCountPerBlock: action.documentMetadata.wordCountPerBlock,
                currentIndex: action.currentIndex,
                indexCheckpoints: action.indexCheckpoints
            });
        default:
            return state;
    }
}