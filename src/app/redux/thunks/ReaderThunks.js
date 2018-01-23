import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    requestCurrentDocument,
    receiveCurrentDocument,
    updateCurrentDocument,
    updateIndexCheckpoints
} from '../actions/CurrentDocumentActions';
import {
    requestBlocks,
    receiveBlocks
} from '../actions/TextBlocksActions';
import {
    calculateIndexCheckpoints,
    calculateIndicesFromCheckpoints
} from '../../helpers/ReaderHelpers';
import {
    updateProgressOnBookshelf
} from '../actions/BookshelfActions';

export function loadInitialReaderState() {
    return (dispatch, getState) => {
        if (!getState().currentDocument._id || getState().currentDocument.isRemoving) {
            dispatch(fetchCurrentDocument());
        } else {
            dispatch(fetchBlocks(0));
        }
    }
}

export function fetchCurrentDocument() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;
        const url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        dispatch(requestCurrentDocument(getState()));
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(currentDocumentProgresses => currentDocumentProgresses.json())
        .then(jsonCurrentDocumentProgresses => {
            // Only get the most recent current document
            if (jsonCurrentDocumentProgresses.length > 0) {
                const currentDocument = jsonCurrentDocumentProgresses[0].document;
                const currentIndex = jsonCurrentDocumentProgresses[0].currentBlock;
                let wordCountPerBlock = currentDocument.wordCountPerBlock;
                let minWordCount = 500;
                if (state.user.settings.minWordCount) {
                    minWordCount = state.user.settings.minWordCount;
                }
                const indexCheckpoints = calculateIndexCheckpoints(wordCountPerBlock, minWordCount);
                dispatch(receiveCurrentDocument(getState(), currentDocument, currentIndex, indexCheckpoints));
            } else {
                const currentDocument = {
                    _id: null,
                    title: null,
                    author: null,
                    wordCountPerBlock: []
                };
                dispatch(receiveCurrentDocument(getState(), currentDocument, 0, []));
            }
            return;
        })
        .then(() => {
            dispatch(fetchBlocks(0));
        });
    }
}

export function fetchBlocks(direction) {
    // direction: -1 (previous blocks), 0 (current blocks), 1 (next blocks)
    return (dispatch, getState) => {
        const state = getState();

        // We should check:
            // state.currentDocument.indexCheckpoints (with length)
            // state.currentDocument.currentIndex
            // state.textBlocks.blocks (with length)

        let indicesToGet = [];

        if (!state.currentDocument.indexCheckpoints || state.currentDocument.indexCheckpoints === 0) {
            // No index checkpoints in state; we can't tell which blocks to fetch
            console.log(Error('Error fetching blocks: No index checkpoints in state'));
            return;
        }
        if (typeof(state.currentDocument.currentIndex) === 'undefined') {
            // No current index in state; just get the first set of blocks
            indicesToGet = calculateIndicesFromCheckpoints(state.currentDocument.indexCheckpoints, 0);
        } else {
            if (!state.textBlocks.blocks || state.textBlocks.blocks.length === 0) {
                // There is a current index, but we have no text blocks
                // Treat this as getting current blocks (like for inital loading)
                direction = 0;
            }
            switch (direction) {
                case 0:
                    // Current blocks
                    indicesToGet = calculateIndicesFromCheckpoints(state.currentDocument.indexCheckpoints, state.currentDocument.currentIndex);
                    break;
                case 1:
                    // Next blocks
                    // TODO: Handle last indices
                    indicesToGet = calculateIndicesFromCheckpoints(state.currentDocument.indexCheckpoints, state.textBlocks.blocks[state.textBlocks.blocks.length - 1].index + 1);
                    // if (indicesToGet[1] >= state.currentDocument.indexCheckpoints[state.currentDocument.indexCheckpoints.length - 1]) {
                        // Deal with end of document
                    // }
                    break;
                case -1:
                    // Previous blocks
                    // TODO: Handle first indices
                    indicesToGet = calculateIndicesFromCheckpoints(state.currentDocument.indexCheckpoints, state.textBlocks.blocks[0].index - 1);
                    break;
                default:
                    // This is an error
                    indicesToGet = [0, 0];
            }
        }

        console.log('Get indices: ' + indicesToGet);
        if (indicesToGet[0] === -1 && indicesToGet[1] === -1) {
            // TODO: Handle this error more gracefully
            console.log('Can\'t fetch blocks: calculateIndicesFromCheckpoints failed');
            console.log(getState());
            return;
        } else {
            const url = AppConfig.baseURL + 'document/' + state.currentDocument._id + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];

            dispatch(requestBlocks(getState()));
            return fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(receivedBlocks => receivedBlocks.json())
            .then(jsonBlocks => {
                dispatch(receiveBlocks(getState(), jsonBlocks));
                if (jsonBlocks) {
                    dispatch(updateDocumentProgress(getState(), jsonBlocks[0].documentID, jsonBlocks[0].index));
                }
            });
        }
    }
}

export function updateDocumentProgress(state, documentID, index) {
    return (dispatch, getState) => {
        console.log('Updating document progress');
        console.log(getState());
        const url = AppConfig.baseURL + 'user/' + state.user.userID + '/updateDocumentProgress/document/' + documentID;
        const msgBody = {
            currentBlock: index
        };

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(msgBody)
        })
        .then(newDocProgress => newDocProgress.json())
        .then(jsonNewDocProgress => {
            dispatch(updateCurrentDocument(getState(), index));
            dispatch(updateProgressOnBookshelf(getState(), jsonNewDocProgress));
        })
        .catch(err => console.log(Error('Error updating document progress: ' + err)));
    }
}

export function setNewIndexCheckpoints() {
    return (dispatch, getState) => {
        const state = getState();
        const newIndexCheckpoints = calculateIndexCheckpoints(state.currentDocument.wordCountPerBlock, state.user.settings.minWordCount);
        dispatch(updateIndexCheckpoints(getState(), newIndexCheckpoints));
    }
}