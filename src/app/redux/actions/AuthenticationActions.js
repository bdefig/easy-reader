import {
    UPDATE_ACCESS_TOKEN,
    UPDATE_REFRESH_TOKEN
} from '../ActionTypes';

export function updateAccessToken(accessToken) {
    return {
        type: UPDATE_ACCESS_TOKEN,
        accessToken: accessToken
    }
}

export function updateRefreshToken(refreshToken) {
    return {
        type: UPDATE_REFRESH_TOKEN,
        refreshToken: refreshToken
    }
}