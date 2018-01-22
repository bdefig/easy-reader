import {
    REQUEST_LIBRARY_DOCUMENTS,
    RECEIVE_LIBRARY_DOCUMENTS
} from '../ActionTypes';

export function library(state = {}, action) {
    switch (action.type) {
        case REQUEST_LIBRARY_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_LIBRARY_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                documents: state.documents.concat(action.libraryDocuments)
            });
        default:
            return state;
    }
}