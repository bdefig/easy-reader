import 'whatwg-fetch';
import AppConfig from '../AppConfig';

// Types -----------------------------------------------------------------

export const REQUEST_BLOCKS = 'REQUEST_BLOCKS';
export const RECEIVE_BLOCKS = 'RECEIVE_BLOCKS';
export const REQUEST_CURRENT_DOCUMENT = 'REQUEST_CURRENT_DOCUMENT';
export const RECEIVE_CURRENT_DOCUMENT = 'RECEIVE_CURRENT_DOCUMENT';
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
export const UPDATE_INDEX_CHECKPOINTS = 'UPDATE_INDEX_CHECKPOINTS';
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators (and actions) -----------------------------------------

function requestBlocks(state) {
    return {
        type: REQUEST_BLOCKS
    }
}

function receiveBlocks(state, receivedBlocks) {
    return {
        type: RECEIVE_BLOCKS,
        blocks: receivedBlocks
    }
}

function requestCurrentDocument(state) { 
    return {
        type: REQUEST_CURRENT_DOCUMENT
    }
}


function receiveCurrentDocument(state, currentDocument, indexCheckpoints) {
    return {
        type: RECEIVE_CURRENT_DOCUMENT,
        currentDocument: currentDocument,
        indexCheckpoints: indexCheckpoints
    }
}

function updateCurrentDocument(state, index) {
    return {
        type: UPDATE_CURRENT_DOCUMENT,
        currentIndex: index
    }
}

function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

function requestCreateUser(state, userToCreate) {
    return {
        type: REQUEST_CREATE_USER,
        userToCreate: userToCreate     // name, email, password
    }
}

function createUserSuccess(state, createdUser) {
    return {
        type: CREATE_USER_SUCCESS,
        createdUser: createdUser
    }
}

function createUserFailure(state, error) {
    return {
        type: CREATE_USER_FAILURE,
        error: error
    }
}

function requestLogin(state, loginInfo) {
    return {
        type: REQUEST_LOGIN,
        loginInfo: loginInfo
    }
}

function loginSuccess(state, userInfo) {
    return {
        type: LOGIN_SUCCESS,
        userInfo: userInfo
    }
}

function loginFailure(state, error) {
    return {
        type: LOGIN_FAILURE,
        error: error
    }
}

// Thunks (call action creators) -----------------------------------------

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
        if (typeof(state.currentDocument.currentIndex) == 'undefined') {
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
            const url = AppConfig.baseURL + 'document/' + state.currentDocument.documentID + '/first/' + indicesToGet[0] + '/last/' + indicesToGet[1];

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
                    dispatch(updateDocumentProgress(getState(), jsonBlocks[0].index));
                }
            });
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
        .then(currentDocuments => currentDocuments.json())
        .then(jsonCurrentDocuments => {
            // Only get the most recent current document
            const currentDocument = jsonCurrentDocuments[0];
            let wordCountPerBlock = currentDocument.document.wordCountPerBlock;
            let minWordCount = 500;
            if (state.user.settings.minWordCount) {
                minWordCount = state.user.settings.minWordCount;
            }
            const indexCheckpoints = calculateIndexCheckpoints(wordCountPerBlock, minWordCount);
            dispatch(receiveCurrentDocument(getState(), currentDocument, indexCheckpoints));
            return;
        })
        .then(() => {
            dispatch(fetchBlocks(0));
        });
    }
}

export function loadInitialReaderState() {
    return (dispatch, getState) => {
        dispatch(fetchCurrentDocument());
    }
}

export function updateDocumentProgress(state, index) {
    return (dispatch, getState) => {
        const url = AppConfig.baseURL + 'user/' + state.user.userID + '/updateDocumentProgress/document/' + state.currentDocument.documentID;
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
        .then(reply => dispatch(updateCurrentDocument(getState(), index)))
        .catch(err => console.log(Error('Error updating document progress')));
    }
}

export function createUser(name, email, password) {
    return (dispatch, getState) => {
        const url = AppConfig.baseURL + 'createUser';
        const msgBody = {
            name: name,
            email: email,
            password: password
        };

        dispatch(requestCreateUser(msgBody));
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(msgBody)
        })
        .then(reply => reply.json())
        .then(jsonReply => {
            if (jsonReply.success) {
                dispatch(createUserSuccess(getState(), jsonReply.user));
            } else {
                dispatch(createUserFailure(getState(), jsonReply.error));
            }
        })
        .catch(err => console.log(Error(err)));
    }
}

export function debugState() {
    return (dispatch, getState) => {
        console.log(getState());
    }
}

// Helper Functions ------------------------------------------------------

function calculateIndexCheckpoints (wordCountPerBlock, minWordCountPerBlock) {
    let indexCounter = 0;
    let indexCheckpoints = [0];
    let wordCountCounter = 0;

    while (indexCounter < wordCountPerBlock.length) {
        if (wordCountCounter > minWordCountPerBlock) {
            indexCheckpoints.push(indexCounter);
            wordCountCounter = 0;
        }
        wordCountCounter += wordCountPerBlock[indexCounter];
        indexCounter += 1;
    }
    indexCheckpoints.push(wordCountPerBlock.length - 1)

    return indexCheckpoints;
}

function calculateIndicesFromCheckpoints (indexCheckpoints, oneIndex) {
    for (let i = 0; i < (indexCheckpoints.length - 1); i++) {
        if (oneIndex >= indexCheckpoints[i] && oneIndex < indexCheckpoints[i+1]) {
            return [indexCheckpoints[i], indexCheckpoints[i+1] - 1];
        }
    }
    return [-1, -1];    // Not found
}