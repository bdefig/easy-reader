import {
    REQUEST_BOOKSHELF_DOCUMENTS,
    RECEIVE_BOOKSHELF_DOCUMENTS,
    REMOVE_BOOKSHELF_DOCUMENT,
    UPDATE_PROGRESS_ON_BOOKSHELF
} from '../ActionTypes';

export function bookshelf(state = {}, action) {
    switch (action.type) {
        case REQUEST_BOOKSHELF_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_BOOKSHELF_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                documentProgresses: action.documentProgresses
            });
        case REMOVE_BOOKSHELF_DOCUMENT:
            let oldBookshelfDocuments = state.documentProgresses;
            let newBookshelfDocuments = [];

            for (let doc of oldBookshelfDocuments) {
                if (doc.document._id !== action.documentID) {
                    newBookshelfDocuments.push(doc);
                }
            }

            return Object.assign({}, state, {
                documentProgresses: newBookshelfDocuments
            });
        case UPDATE_PROGRESS_ON_BOOKSHELF:
            let oldBookshelfDocumentProgresses = state.documentProgresses;
            let newBookshelfDocumentProgresses = [];
            let updatedDocumentProgress = false;
            
            for (let doc of oldBookshelfDocumentProgresses) {
                if (doc.document._id === action.newDocumentProgress.document._id) {
                    newBookshelfDocumentProgresses.push(action.newDocumentProgress);
                    updatedDocumentProgress = true;
                } else {
                    newBookshelfDocumentProgresses.push(doc);
                }
            }
            if (updatedDocumentProgress === false) {
                newBookshelfDocumentProgresses.push(action.newDocumentProgress);
            }

            return Object.assign({}, state, {
                documentProgresses: newBookshelfDocumentProgresses
            });
        default:
            return state;
    }
}