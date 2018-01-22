import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    requestBookshelfDocuments,
    receiveBookshelfDocuments,
    removeBookshelfDocument
} from '../actions/BookshelfActions';
import {
    switchCurrentDocument,      // Could maybe just use receiveCurrentDocument for this
    removeCurrentDocument,
    didRemoveCurrentDocument
} from '../actions/CurrentDocumentActions';
import {
    clearBlocks
} from '../actions/TextBlocksActions';
import {
    updateDocumentProgress      // TODO: Maybe replace this
} from './ReaderThunks';
import {
    calculateIndexCheckpoints
} from '../../helpers/ReaderHelpers';

export function loadInitialBookshelfState() {
    return (dispatch, getState) => {
        dispatch(fetchBookshelfDocuments());
    }
}

function fetchBookshelfDocuments() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestBookshelfDocuments(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(bookshelfDocuments => bookshelfDocuments.json())
        .then(jsonBookshelfDocuments => {
            dispatch(receiveBookshelfDocuments(getState(), jsonBookshelfDocuments));
            return;
        });
    }
}

export function onSwitchToBookshelfDocument(bookshelfDocument) {
    return (dispatch, getState) => {
        const documentMetadata = bookshelfDocument;
        const minWordCount = getState().user.settings.minWordCount;
        const indexCheckpoints = calculateIndexCheckpoints(documentMetadata.wordCountPerBlock, minWordCount);

        dispatch(switchCurrentDocument(getState(), documentMetadata, bookshelfDocument.currentIndex, indexCheckpoints));
        dispatch(updateDocumentProgress(getState(), documentMetadata._id, bookshelfDocument.currentIndex));

        // TODO: Go to Reader component (route: '/')
    }
}

export function onRemoveBookshelfDocument(bookshelfDocument) {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const documentID = bookshelfDocument._id;   // TODO: Is this the right thing to grab?
        const url = AppConfig.baseURL + 'user/' + userID + '/removeOneDocumentProgress/' + documentID;

        if (state.currentDocument._id === documentID) {
            dispatch(removeCurrentDocument(getState()));
            dispatch(clearBlocks(getState()));
        }

        dispatch(removeBookshelfDocument(getState(), documentID));

        // TODO: Add isRemoving to currentDocument state (and check this when loading initial reader state)
        // May also need to remove text blocks from state
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(jsonRes => {
            if (state.currentDocument._id === documentID) {
                dispatch(didRemoveCurrentDocument(getState()));
                dispatch(clearBlocks(getState()));
            }
            return;
        })
        .catch(err => {
            console.log(err);
            if (state.currentDocument._id === documentID) {
                dispatch(didRemoveCurrentDocument(getState()));
                dispatch(clearBlocks(getState()));
            }
        });
    }
}