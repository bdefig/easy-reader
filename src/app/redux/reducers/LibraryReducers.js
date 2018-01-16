import {
    REQUEST_USER_DOCUMENTS,
    RECEIVE_USER_DOCUMENTS,
    REQUEST_NON_USER_DOCUMENTS,
    RECEIVE_NON_USER_DOCUMENTS
} from '../ActionTypes';

export function library(state = {}, action) {
    switch (action.type) {
        case REQUEST_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                userDocuments: action.userDocuments
            });
        case REQUEST_NON_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_NON_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                nonUserDocuments: state.nonUserDocuments.concat(action.nonUserDocuments)
            });
        default:
            return state;
    }
}