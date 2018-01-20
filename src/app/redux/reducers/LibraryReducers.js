import {
    REQUEST_USER_DOCUMENTS,
    RECEIVE_USER_DOCUMENTS,
    REQUEST_NON_USER_DOCUMENTS,
    RECEIVE_NON_USER_DOCUMENTS,
    REMOVE_LIBRARY_USER_DOCUMENT
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
        case REMOVE_LIBRARY_USER_DOCUMENT:
            let oldLibraryUserDocuments = state.userDocuments;
            let newLibraryUserDocuments = [];

            for (let doc of oldLibraryUserDocuments) {
                if (doc.document._id !== action.documentID) {
                    newLibraryUserDocuments.push(doc);
                }
            }

            return Object.assign({}, state, {
                userDocuments: newLibraryUserDocuments
            });
        default:
            return state;
    }
}