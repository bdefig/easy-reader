import { combineReducers } from 'redux';
import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    REQUEST_USER_DOCUMENTS,
    RECEIVE_USER_DOCUMENTS,
    REQUEST_NON_USER_DOCUMENTS,
    RECEIVE_NON_USER_DOCUMENTS,
    UPDATE_INDEX_CHECKPOINTS,
    SWITCH_TO_LIBRARY_USER_DOCUMENT,
    SHOW_MODAL,
    HIDE_MODAL,
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from './ReduxActions';

function user(state = {}, action) {
    switch (action.type) {
        case REQUEST_CREATE_USER:
            return Object.assign({}, state, {
                isFetching: true,
                authenticationErrorMessage: null
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                userID: action.userID,
                name: action.name,
                token: action.token
            });
        case CREATE_USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                authenticationErrorMessage: action.errorMessage
            });
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                authenticationErrorMessage: null
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                userID: action.userID,
                name: action.name,
                token: action.token
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                authenticationErrorMessage: action.errorMessage
            });
        case LOGOUT:
            return Object.assign({}, state, {
                userID: null,
                name: null,
                token: null
            });
        default:
            return state;
    }
}

function currentDocument(state = {}, action) {
    switch (action.type) {
        case REQUEST_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                isFetching: false,
                _id: action.currentDocument._id,
                title: action.currentDocument.title,
                author: action.currentDocument.author,
                wordCountPerBlock: action.currentDocument.wordCountPerBlock,
                currentIndex: action.currentIndex,
                indexCheckpoints: action.indexCheckpoints
            });
        case UPDATE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            });
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
                indexCheckpoints: action.indexCheckpoints
            });
        case SWITCH_TO_LIBRARY_USER_DOCUMENT:
            return Object.assign({}, state, {
                _id: action.documentMetadata._id,
                title: action.documentMetadata.title,
                author: action.documentMetadata.author,
                wordCountPerBlock: action.documentMetadata.wordCountPerBlock,
                currentIndex: action.currentIndex,
                indexCheckpoints: action.indexCheckpoints
            });
        default:
            return state;
    }
}

function textBlocks(state = {}, action) {
    switch (action.type) {
        case REQUEST_BLOCKS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_BLOCKS:
            return Object.assign({}, state, {
                isFetching: false,
                blocks: action.blocks
            });
        default:
            return state;
    }
}

function library(state = {}, action) {
    switch (action.type) {
        case REQUEST_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                userDocuments: action.userDocuments
            });
        case REQUEST_NON_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_NON_USER_DOCUMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                nonUserDocuments: state.nonUserDocuments.concat(action.nonUserDocuments)
            });
        default:
            return state;
    }
}

function modal(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return Object.assign({}, state, {
                modalType: action.modalType,
                modalProps: action.modalProps
            });
        case HIDE_MODAL:
            return Object.assign({}, state, {
                modalType: null
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    currentDocument,
    textBlocks,
    library,
    modal
})

export default rootReducer;