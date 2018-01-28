import {
    REQUEST_LIBRARY_DOCUMENTS,
    RECEIVE_LIBRARY_DOCUMENTS,
    RESET_LIBRARY_STATE
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
        case RESET_LIBRARY_STATE:
            return Object.assign({}, state, {
                isFetching: false,
                documents: []
            });
        default:
            return state;
    }
}