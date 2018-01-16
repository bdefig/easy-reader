import {
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    UPDATE_INDEX_CHECKPOINTS,
    SWITCH_TO_LIBRARY_USER_DOCUMENT
} from '../ActionTypes';

export function requestCurrentDocument(state) { 
    return {
        type: REQUEST_CURRENT_DOCUMENT
    }
}

export function receiveCurrentDocument(state, currentDocument, currentIndex, indexCheckpoints) {
    return {
        type: RECEIVE_CURRENT_DOCUMENT,
        currentDocument: currentDocument,
        currentIndex: currentIndex,
        indexCheckpoints: indexCheckpoints
    }
}

export function updateCurrentDocument(state, index) {
    return {
        type: UPDATE_CURRENT_DOCUMENT,
        currentIndex: index
    }
}

export function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

export function switchToLibraryUserDocument(state, documentMetadata, currentIndex, indexCheckpoints) {
    return {
        type: SWITCH_TO_LIBRARY_USER_DOCUMENT,
        documentMetadata: documentMetadata,
        currentIndex: currentIndex,
        indexCheckpoints: indexCheckpoints
    }
}