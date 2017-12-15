import { combineReducers } from 'redux';
import {
    REQUEST_BLOCKS,
    RECEIVE_BLOCKS,
    REQUEST_CURRENT_DOCUMENT,
    RECEIVE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT,
    UPDATE_INDEX_CHECKPOINTS,
    SHOW_MODAL,
    HIDE_MODAL,
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
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
                documentID: action.currentDocument.document._id,
                title: action.currentDocument.document.title,
                author: action.currentDocument.document.author,
                wordCountPerBlock: action.currentDocument.document.wordCountPerBlock,
                currentIndex: action.currentDocument.currentBlock,
                indexCheckpoints: action.indexCheckpoints
            });
        case UPDATE_CURRENT_DOCUMENT:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            })
            return state;
        case UPDATE_INDEX_CHECKPOINTS:
            return Object.assign({}, state, {
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
    modal
})

export default rootReducer;