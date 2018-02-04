import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    fetchLogin,
    fetchCreateUser
} from './HTTPThunks';
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
        const url = AppConfig.baseURL + 'createUser';
        const msgBody = {
            name: name,
            email: email,
            password: password
        };

        dispatch(requestCreateUser(getState(), msgBody));
        return fetchCreateUser(dispatch, getState, url, msgBody)
        .then(jsonResponse => {
            if (jsonResponse && jsonResponse.success) {
                localStorage.setItem('userID', jsonResponse.userID);
                localStorage.setItem('name', jsonResponse.name);
                localStorage.setItem('accessToken', jsonResponse.accessToken);
                localStorage.setItem('refreshToken', jsonResponse.refreshToken);
                dispatch(createUserSuccess(getState(), jsonResponse.userID, jsonResponse.name));
            } else {
                dispatch(createUserFailure(getState(), ((jsonResponse && jsonResponse.message) ? jsonResponse.message : 'An error occurred when attempting to sign up')));
            }
        })
        .catch(err => {
            console.log(Error(err));
            dispatch(createUserFailure, (getState(), 'An error occurred when attempting to sign up'));
        });
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
        return fetchLogin(dispatch, getState, url, msgBody)
        .then(jsonResponse => {
            if (jsonResponse && jsonResponse.success) {
                localStorage.setItem('userID', jsonResponse.userID);
                localStorage.setItem('name', jsonResponse.name);
                localStorage.setItem('accessToken', jsonResponse.accessToken);
                localStorage.setItem('refreshToken', jsonResponse.refreshToken);
                dispatch(loginSuccess(getState(), jsonResponse.userID, jsonResponse.name));
            } else {
                dispatch(loginFailure(getState(), ((jsonResponse && jsonResponse.message) ? jsonResponse.message : 'An error occurred when attempting to log in')));
            }
        })
        .catch(err => {
            console.log(Error(err));
            dispatch(loginFailure, (getState(), 'An error occurred when attempting to log in'));
        });
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