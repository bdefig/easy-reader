import {
    REQUEST_LIBRARY_DOCUMENTS,
    RECEIVE_LIBRARY_DOCUMENTS
} from '../ActionTypes';

export function requestLibraryDocuments(state) {
    return {
        type: REQUEST_LIBRARY_DOCUMENTS
    }
}

export function receiveLibraryDocuments(state, libraryDocuments) {
    return {
        type: RECEIVE_LIBRARY_DOCUMENTS,
        libraryDocuments: libraryDocuments
    }
}