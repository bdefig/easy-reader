import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import { httpFetch } from './HTTPThunks';
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

export function fetchBookshelfDocuments() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestBookshelfDocuments(getState()));

        return httpFetch(dispatch, getState, 'get', url)
        .then(jsonDocumentProgresses => {
            dispatch(receiveBookshelfDocuments(getState(), jsonDocumentProgresses));
        })
        .catch(err => console.log(err));
    }
}

export function onSwitchToBookshelfDocument(bookshelfDocument, history) {
    return (dispatch, getState) => {
        const documentMetadata = bookshelfDocument;
        const minWordCount = getState().user.settings.minWordCount;
        const indexCheckpoints = calculateIndexCheckpoints(documentMetadata.wordCountPerBlock, minWordCount);

        let currentIndex = 0;
        for (let docProgress of getState().bookshelf.documentProgresses) {
            if (docProgress.document._id === documentMetadata._id) {
                currentIndex = docProgress.currentBlock;
            }
        }

        dispatch(switchCurrentDocument(getState(), documentMetadata, currentIndex, indexCheckpoints));
        dispatch(updateDocumentProgress(getState(), documentMetadata._id, currentIndex));
        dispatch(clearBlocks(getState()));

        history.push('/');
    }
}

export function onRemoveBookshelfDocument(bookshelfDocument) {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const documentID = bookshelfDocument._id;
        const url = AppConfig.baseURL + 'user/' + userID + '/removeOneDocumentProgress/' + documentID;

        if (state.currentDocument._id === documentID) {
            dispatch(removeCurrentDocument(getState()));
            dispatch(clearBlocks(getState()));
        }

        dispatch(removeBookshelfDocument(getState(), documentID));

        return httpFetch(dispatch, getState, 'get', url)
        .then(jsonResponse => {
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