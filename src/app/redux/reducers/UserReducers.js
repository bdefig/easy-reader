import {
    REQUEST_CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../ActionTypes';

export function user(state = {}, action) {
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