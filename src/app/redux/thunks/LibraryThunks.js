import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    requestUserDocuments,
    receiveUserDocuments,
    requestNonUserDocuments,
    receiveNonUserDocuments,
    removeLibraryUserDocument
} from '../actions/LibraryActions';
import {
    switchToLibraryUserDocument,    // Could maybe just use receiveCurrentDocument for this
    removeCurrentDocument,
    didRemoveCurrentDocument
} from '../actions/CurrentDocumentActions';
import {
    updateDocumentProgress      // TODO: Maybe replace this
} from './ReaderThunks';
import {
    calculateIndexCheckpoints
} from '../../helpers/ReaderHelpers';

export function loadInitialLibraryState() {
    return (dispatch, getState) => {
        dispatch(fetchUserDocuments());
    }
}

function fetchUserDocuments() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestUserDocuments(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(userDocuments => userDocuments.json())
        .then(jsonUserDocuments => {
            dispatch(receiveUserDocuments(getState(), jsonUserDocuments));
            return;
        });
    }
}

export function fetchNonUserDocuments() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        
        state.library.nonUserDocuments.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });

        let titleGreaterThan = (state.library.nonUserDocuments.length ? state.library.nonUserDocuments[state.library.nonUserDocuments.length - 1].title : '');

        const url = AppConfig.baseURL + 'user/' + userID + '/getMoreDocuments?titleGreaterThan=' + titleGreaterThan;

        console.log('Requesting non user documents');

        dispatch(requestNonUserDocuments(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        // Handle if no docs were received
        .then(docs => {
            if (docs) {
                return docs.json();
            } else {
                dispatch(receiveNonUserDocuments(getState(), []));
                return Error('No non-user documents received');
            }
        })
        .then(jsonDocs => {
            console.log('Received non user documents: ');
            console.log(jsonDocs);
            dispatch(receiveNonUserDocuments(getState(), jsonDocs));
            return;
        });
    }
}

export function onSwitchToLibraryUserDocument(libraryUserDocument) {
    return (dispatch, getState) => {
        const documentMetadata = libraryUserDocument;
        const minWordCount = getState().user.settings.minWordCount;
        const indexCheckpoints = calculateIndexCheckpoints(documentMetadata.wordCountPerBlock, minWordCount);
        
        dispatch(switchToLibraryUserDocument(getState(), documentMetadata, libraryUserDocument.currentIndex, indexCheckpoints));
        dispatch(updateDocumentProgress(getState(), documentMetadata._id, libraryUserDocument.currentIndex));

        // TODO: Go to Reader component (route: '/')
    }
}

export function onRemoveLibraryUserDocument(libraryUserDocument) {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const documentID = libraryUserDocument._id;
        const url = AppConfig.baseURL + 'user/' + userID + '/removeOneDocumentProgress/' + documentID;

        if (state.currentDocument.id === documentID) {
            dispatch(removeCurrentDocument(getState()));
        }
        
        dispatch(removeLibraryUserDocument(getState(), documentID));

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
            if (state.currentDocument.id === documentID) {
                dispatch(didRemoveCurrentDocument(getState()));
            }
            return;
        })
        .catch(err => {
            console.log(err);
            if (state.currentDocument.id === documentID) {
                dispatch(didRemoveCurrentDocument(getState()));
            }
        });
    }
}

export function onAddDocumentToLibrary(libraryNonUserDocument) {
    return (dispatch, getState) => {
        const documentMetadata = libraryNonUserDocument;
        const minWordCount = getState().user.settings.minWordCount;
        const indexCheckpoints = calculateIndexCheckpoints(documentMetadata.wordCountPerBlock, minWordCount);
        
        dispatch(switchToLibraryUserDocument(getState(), documentMetadata, 0, indexCheckpoints));
        dispatch(updateDocumentProgress(getState(), documentMetadata._id, 0));
        
        // TODO: Go to Reader component (route: '/')
    }
}