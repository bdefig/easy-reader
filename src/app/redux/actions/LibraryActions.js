import {
    REQUEST_USER_DOCUMENTS,
    RECEIVE_USER_DOCUMENTS,
    REQUEST_NON_USER_DOCUMENTS,
    RECEIVE_NON_USER_DOCUMENTS,
    REMOVE_LIBRARY_USER_DOCUMENT
} from '../ActionTypes';

export function requestUserDocuments(state) {
    return {
        type: REQUEST_USER_DOCUMENTS
    }
}

export function receiveUserDocuments(state, userDocuments) {
    return {
        type: RECEIVE_USER_DOCUMENTS,
        userDocuments: userDocuments
    }
}

export function requestNonUserDocuments(state) {
    return {
        type: REQUEST_NON_USER_DOCUMENTS
    }
}

export function receiveNonUserDocuments(state, nonUserDocuments) {
    return {
        type: RECEIVE_NON_USER_DOCUMENTS,
        nonUserDocuments: nonUserDocuments
    }
}

export function removeLibraryUserDocument(state, documentID) {
    return {
        type: REMOVE_LIBRARY_USER_DOCUMENT,
        documentID: documentID
    }
}