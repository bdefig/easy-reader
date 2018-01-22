import {
    REQUEST_BOOKSHELF_DOCUMENTS,
    RECEIVE_BOOKSHELF_DOCUMENTS,
    REMOVE_BOOKSHELF_DOCUMENT
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
        default:
            return state;
    }
}