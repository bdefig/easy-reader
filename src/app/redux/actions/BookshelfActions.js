import {
    REQUEST_BOOKSHELF_DOCUMENTS,
    RECEIVE_BOOKSHELF_DOCUMENTS,
    REMOVE_BOOKSHELF_DOCUMENT,
    UPDATE_PROGRESS_ON_BOOKSHELF
} from '../ActionTypes';

export function requestBookshelfDocuments(state) {
    return {
        type: REQUEST_BOOKSHELF_DOCUMENTS
    }
}

export function receiveBookshelfDocuments(state, documentProgresses) {
    return {
        type: RECEIVE_BOOKSHELF_DOCUMENTS,
        documentProgresses: documentProgresses
    }
}

export function removeBookshelfDocument(state, documentID) {
    return {
        type: REMOVE_BOOKSHELF_DOCUMENT,
        documentID: documentID
    }
}

export function updateProgressOnBookshelf(state, newDocumentProgress) {
    return {
        type: UPDATE_PROGRESS_ON_BOOKSHELF,
        newDocumentProgress: newDocumentProgress
    }
}