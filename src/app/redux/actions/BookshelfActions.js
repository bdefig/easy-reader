import {
    REQUEST_BOOKSHELF_DOCUMENTS,
    RECEIVE_BOOKSHELF_DOCUMENTS,
    REMOVE_BOOKSHELF_DOCUMENT
} from '../ActionTypes';

export function requestBookshelfDocuments(state) {
    return {
        type: REQUEST_BOOKSHELF_DOCUMENTS
    }
}

export function receiveBookshelfDocuments(state, bookshelfDocuments) {
    return {
        type: RECEIVE_BOOKSHELF_DOCUMENTS,
        bookshelfDocuments: bookshelfDocuments
    }
}

export function removeBookshelfDocument(state, documentID) {
    return {
        type: REMOVE_BOOKSHELF_DOCUMENT,
        documentID: documentID
    }
}