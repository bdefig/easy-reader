import {
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    RESET_USER_STATE
} from '../ActionTypes';

export function requestCreateUser(state, userToCreate) {
    return {
        type: REQUEST_CREATE_USER,
        userToCreate: userToCreate     // name, email, password
    }
}

export function createUserSuccess(state, userID, name, token) {
    return {
        type: CREATE_USER_SUCCESS,
        userID: userID,
        name: name,
        token: token
    }
}

export function createUserFailure(state, errorMessage) {
    return {
        type: CREATE_USER_FAILURE,
        errorMessage: errorMessage
    }
}

export function requestLogin(state, loginInfo) {
    return {
        type: REQUEST_LOGIN,
        loginInfo: loginInfo
    }
}

export function loginSuccess(state, userID, name, token) {
    localStorage.setItem('hasLoggedIn', true);
    return {
        type: LOGIN_SUCCESS,
        userID: userID,
        name: name,
        token: token
    }
}

export function loginFailure(state, errorMessage) {
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

export function resetUserState() {
    return {
        type: RESET_USER_STATE
    }
}