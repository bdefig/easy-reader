import {
    UPDATE_ACCESS_TOKEN,
    UPDATE_REFRESH_TOKEN
} from '../ActionTypes';

export function authentication(state = {}, action) {
    switch (action.type) {
        case UPDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.accessToken
            });
        case UPDATE_REFRESH_TOKEN:
            return Object.assign({}, state, {
                refreshToken: action.refreshToken
            });
        default:
            return state;
    }
}