import 'whatwg-fetch';
import AppConfig from '../AppConfig';

// Types -----------------------------------------------------------------

// Document actions
export const REQUEST_BLOCKS = 'REQUEST_BLOCKS';
export const RECEIVE_BLOCKS = 'RECEIVE_BLOCKS';
export const REQUEST_CURRENT_DOCUMENT = 'REQUEST_CURRENT_DOCUMENT';
export const RECEIVE_CURRENT_DOCUMENT = 'RECEIVE_CURRENT_DOCUMENT';
export const UPDATE_CURRENT_DOCUMENT = 'UPDATE_CURRENT_DOCUMENT';
export const REQUEST_USER_DOCUMENTS = 'REQUEST_USER_DOCUMENTS';
export const RECEIVE_USER_DOCUMENTS = 'RECEIVE_USER_DOCUMENTS';
export const REQUEST_NON_USER_DOCUMENTS = 'REQUEST_NON_USER_DOCUMENTS';
export const RECEIVE_NON_USER_DOCUMENTS = 'RECEIVE_NON_USER_DOCUMENTS';
export const UPDATE_INDEX_CHECKPOINTS = 'UPDATE_INDEX_CHECKPOINTS';
export const SWITCH_TO_LIBRARY_USER_DOCUMENT = 'SWITCH_TO_LIBRARY_USER_DOCUMENT';

// Modal actions
export const SHOW_MODAL = 'HIDE_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

// Login actions
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

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


function receiveCurrentDocument(state, currentDocument, currentIndex, indexCheckpoints) {
    return {
        type: RECEIVE_CURRENT_DOCUMENT,
        currentDocument: currentDocument,
        currentIndex: currentIndex,
        indexCheckpoints: indexCheckpoints
    }
}

function updateCurrentDocument(state, index) {
    return {
        type: UPDATE_CURRENT_DOCUMENT,
        currentIndex: index
    }
}

function requestUserDocuments(state) {
    return {
        type: REQUEST_USER_DOCUMENTS
    }
}

function receiveUserDocuments(state, userDocuments) {
    return {
        type: RECEIVE_USER_DOCUMENTS,
        userDocuments: userDocuments
    }
}

function requestNonUserDocuments(state) {
    return {
        type: REQUEST_NON_USER_DOCUMENTS
    }
}

function receiveNonUserDocuments(state, nonUserDocuments) {
    return {
        type: RECEIVE_NON_USER_DOCUMENTS,
        nonUserDocuments: nonUserDocuments
    }
}

function updateIndexCheckpoints(state, indexCheckpoints) {
    return {
        type: UPDATE_INDEX_CHECKPOINTS,
        indexCheckpoints: indexCheckpoints
    }
}

function switchToLibraryUserDocument(state, documentMetadata, currentIndex, indexCheckpoints) {
    return {
        type: SWITCH_TO_LIBRARY_USER_DOCUMENT,
        documentMetadata: documentMetadata,
        currentIndex: currentIndex,
        indexCheckpoints: indexCheckpoints
    }
}

function showModal(state, modalType, modalProps) {
    return {
        type: SHOW_MODAL,
        modalType: modalType,
        modalProps: modalProps
    }
}

export function hideModal(state) {
    return {
        type: HIDE_MODAL
    }
}

function requestCreateUser(state, userToCreate) {
    return {
        type: REQUEST_CREATE_USER,
        userToCreate: userToCreate     // name, email, password
    }
}

function createUserSuccess(state, userID, name, token) {
    return {
        type: CREATE_USER_SUCCESS,
        userID: userID,
        name: name,
        token: token
    }
}

function createUserFailure(state, errorMessage) {
    return {
        type: CREATE_USER_FAILURE,
        errorMessage: errorMessage
    }
}

function requestLogin(state, loginInfo) {
    return {
        type: REQUEST_LOGIN,
        loginInfo: loginInfo
    }
}

function loginSuccess(state, userID, name, token) {
    localStorage.setItem('hasLoggedIn', true);
    return {
        type: LOGIN_SUCCESS,
        userID: userID,
        name: name,
        token: token
    }
}

function loginFailure(state, errorMessage) {
    return {
        type: LOGIN_FAILURE,
        errorMessage: errorMessage
    }
}

export function logout(state) {
    localStorage.clear();
    localStorage.setItem('hasLoggedIn', true);
    return {
        type: LOGOUT
    }
}

// Export action creators (no async) -------------------------------------

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
                    dispatch(updateDocumentProgress(getState(), jsonBlocks[0]._id, jsonBlocks[0].index));
                }
            });
        }
    }
}

function fetchCurrentDocument() {
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

export function loadInitialReaderState() {
    return (dispatch, getState) => {
        dispatch(fetchCurrentDocument());
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

export function loadInitialLibraryState() {
    return (dispatch, getState) => {
        dispatch(fetchUserDocuments());
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
        .then(reply => dispatch(updateCurrentDocument(getState(), index)))
        .catch(err => console.log(Error('Error updating document progress')));
    }
}

export function setNewIndexCheckpoints() {
    return (dispatch, getState) => {
        const state = getState();
        const newIndexCheckpoints = calculateIndexCheckpoints(state.currentDocument.wordCountPerBlock, state.user.settings.minWordCount);
        dispatch(updateIndexCheckpoints(getState(), newIndexCheckpoints));
    }
}

export function createUser(name, email, password) {
    return (dispatch, getState) => {
        // console.log('Dispatching createUser');

        const url = AppConfig.baseURL + 'createUser';
        const msgBody = {
            name: name,
            email: email,
            password: password
        };

        dispatch(requestCreateUser(getState(), msgBody));
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
                console.log('Success creating user');
                console.log('userID: ' + jsonReply.userID);
                console.log('token: ' + jsonReply.token);
                localStorage.setItem('userID', jsonReply.userID);
                localStorage.setItem('name', jsonReply.name);
                localStorage.setItem('token', jsonReply.token);
                dispatch(createUserSuccess(getState(), jsonReply.userID, jsonReply.name, jsonReply.token));
            } else {
                console.log('Error creating user');
                dispatch(createUserFailure(getState(), jsonReply.message));
            }
        })
        .catch(err => console.log(Error(err)));
    }
}

export function login(email, password) {
    return (dispatch, getState) => {
        const url = AppConfig.baseURL + 'login';
        const msgBody = {
            email: email,
            password: password
        };

        dispatch(requestLogin(getState(), msgBody));
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
                console.log('Login success');
                console.log('userID: ' + jsonReply.userID);
                console.log('token: ' + jsonReply.token);
                localStorage.setItem('userID', jsonReply.userID);
                localStorage.setItem('name', jsonReply.name);
                localStorage.setItem('token', jsonReply.token);
                dispatch(loginSuccess(getState(), jsonReply.userID, jsonReply.name, jsonReply.token));
            } else {
                console.log('LoginError');
                dispatch(loginFailure(getState(), jsonReply.message));
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

// Call modal action creators --------------------------------------------

export function openMenu() {
    return (dispatch, getState) => {
        dispatch(showModal(getState, 'READER_MENU', {}));
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