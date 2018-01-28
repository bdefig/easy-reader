import {
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    REMOVE_CURRENT_DOCUMENT,
    DID_REMOVE_CURRENT_DOCUMENT,
    UPDATE_INDEX_CHECKPOINTS,
    SWITCH_CURRENT_DOCUMENT,
    RESET_CURRENT_DOCUMENT_STATE
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

export function removeCurrentDocument(state) {
    return {
        type: REMOVE_CURRENT_DOCUMENT
    }
}

export function didRemoveCurrentDocument(state) {
    return {
        type: DID_REMOVE_CURRENT_DOCUMENT
    }
}

export function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

export function switchCurrentDocument(state, documentMetadata, currentIndex, indexCheckpoints) {
    return {
        type: SWITCH_CURRENT_DOCUMENT,
        documentMetadata: documentMetadata,
        currentIndex: currentIndex,
        indexCheckpoints: indexCheckpoints
    }
}

export function resetCurrentDocumentState() {
    return {
        type: RESET_CURRENT_DOCUMENT_STATE
    }
}