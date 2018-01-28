import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    requestCreateUser,
    createUserSuccess,
    createUserFailure,
    requestLogin,
    loginSuccess,
    loginFailure,
    logout,
    resetUserState
} from '../actions/UserActions';
import { resetBookshelfState } from '../actions/BookshelfActions';
import { resetCurrentDocumentState } from '../actions/CurrentDocumentActions';
import { resetLibraryState } from '../actions/LibraryActions';
import { resetTextBlocksState } from '../actions/TextBlocksActions';
import { hideModal } from '../actions/ModalActions';

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

export function resetStateAndLogout() {
    return (dispatch) => {
        dispatch(resetBookshelfState());
        dispatch(resetCurrentDocumentState());
        dispatch(resetLibraryState());
        dispatch(resetTextBlocksState());
        dispatch(resetUserState());
        dispatch(logout());
        dispatch(hideModal());
    }
}