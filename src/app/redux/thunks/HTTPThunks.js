import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import {
    updateAccessToken,
    updateRefreshToken
} from '../actions/AuthenticationActions';
import { resetStateAndLogout } from './LoginThunks';

export function httpFetch(dispatch, getState, method, url, msgBody) {
    // Method: 'get', 'post', or 'put'
    return new Promise ((resolve, reject) => {
        const fetchMessage = {}
        const fetchHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getState().authentication.accessToken
        };
        if (['get', 'post', 'put'].indexOf(method) < 0) {
            // Invalid method
            reject('Invalid http method');
            // Maybe do some other checks like url validation, etc.
        } else {
            fetchMessage.method = method;
            fetchMessage.headers = fetchHeaders;
            if (method === 'post' || method === 'put') {
                fetchMessage.body = JSON.stringify(msgBody);
            }
            resolve(fetchMessage);
        }
    })
    .then(messageToSend => fetch(url, messageToSend))
    .then(response => {
        if (response.status === 401) {
            const refreshToken = getState().authentication.refreshToken;
            if (refreshToken) {
                // Use refresh token to get new access token
                return requestNewAccessToken(dispatch, getState, refreshToken, getState().user.userID)
                // Use new access token to retry request
                .then(newAccessToken => {
                    return fetch(url, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    })
                    .then(response => {
                        return response.json();
                    })
                    .catch(err => {
                        return Error('Error retrying request with new access token: ' + err);
                    })
                })
                .catch(err => console.log(err));
            } else {
                dispatch(resetStateAndLogout());
                return Error('No refresh token. Logging out.');
            }
        } else if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(responseBody => {
        return responseBody;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}

export function fetchGet(dispatch, getState, url) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getState().authentication.accessToken
        }
    })
    .then(response => {
        if (response.status === 401) {
            const refreshToken = getState().authentication.refreshToken;
            if (refreshToken) {
                // Use refresh token to get new access token
                requestNewAccessToken(dispatch, getState, refreshToken, getState().user.userID)
                // Use new access token to retry request
                .then(newAccessToken => {
                    fetch(url, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    })
                })
                .then(response => {
                    return response.json();
                })
                .catch(err => {
                    return Error('Error retrying request with new access token: ' + err);
                })
            } else {
                dispatch(resetStateAndLogout());
            }
        } else if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.accessToken) {     // May be unnecessary becaue we changed the way we're getting responses
            dispatch(updateAccessToken(jsonResponse.accessToken));
            delete jsonResponse.accessToken;
            return jsonResponse;
        } else {
            return jsonResponse;
        }
    })
    .then(responseBody => {
        return responseBody;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}

export function fetchPost(dispatch, getState, url, msgBody) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getState().authentication.accessToken
        },
        body: JSON.stringify(msgBody)
    })
    .then(response => {
        if (response.status === 401) {
            const refreshToken = getState().authentication.refreshToken;
            if (refreshToken) {
                // Use refresh token to get new access token
                requestNewAccessToken(dispatch, getState, refreshToken, getState().user.userID)
                // Use new access token to retry request
                .then(newAccessToken => {
                    fetch(url, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + newAccessToken
                        },
                        body: JSON.stringify(msgBody)
                    })
                })
                .then(response => {
                    return response.json();
                })
                .catch(err => {
                    return Error('Error retrying request with new access token: ' + err);
                })
            } else {
                dispatch(resetStateAndLogout());
            }
        } else if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.accessToken) {
            dispatch(updateAccessToken(jsonResponse.accessToken));
            delete jsonResponse.accessToken;
            return jsonResponse;
        } else {
            return jsonResponse;
        }
    })
    .then(responseBody => {
        return responseBody;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}

export function fetchPut(dispatch, getState, url, msgBody) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getState().authentication.accessToken
        },
        body: JSON.stringify(msgBody)
    })
    .then(response => {
        if (response.status === 401) {
            const refreshToken = getState().authentication.refreshToken;
            if (refreshToken) {
                // Use refresh token to get new access token
                requestNewAccessToken(dispatch, getState, refreshToken, getState().user.userID)
                // Use new access token to retry request
                .then(newAccessToken => {
                    fetch(url, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + newAccessToken
                        },
                        body: JSON.stringify(msgBody)
                    })
                })
                .then(response => {
                    return response.json();
                })
                .catch(err => {
                    return Error('Error retrying request with new access token: ' + err);
                })
            } else {
                dispatch(resetStateAndLogout());
            }
        } else if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.accessToken) {
            dispatch(updateAccessToken(jsonResponse.accessToken));
            delete jsonResponse.accessToken;
            return jsonResponse;
        } else {
            return jsonResponse;
        }
    })
    .then(responseBody => {
        return responseBody;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}

export function requestNewAccessToken(dispatch, getState, refreshToken, userID) {
    const refreshURL = AppConfig.baseURL + 'requestNewAccessToken';
    return fetch(refreshURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
            userID: userID
        })
    })
    .then(response => {
        if (response) {
            if (response.status === 401) {
                // Couldn't get new access token; refresh token likely expired
                dispatch(resetStateAndLogout());
                return Error('No valid refresh token. Logging out.');
            } else {
                // Got a response
                return response.json();
            }
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.success) {
            const accessToken = jsonResponse.accessToken;
            dispatch(updateAccessToken(accessToken));
            return jsonResponse.accessToken;
        } else {
            return Error('Response failure');
        }
    })
    .catch(err => {
        return Error('Error on request to ' + refreshURL + ': ' + err);
    });
}

export function fetchLogin(dispatch, getState, url, msgBody) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(msgBody)
    })
    .then(response => {
        if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.success) {
            const accessToken = jsonResponse.accessToken;
            const refreshToken = jsonResponse.refreshToken;
            dispatch(updateAccessToken(accessToken));
            dispatch(updateRefreshToken(refreshToken));
        }
        return jsonResponse;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}

export function fetchCreateUser(dispatch, getState, url, msgBody) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(msgBody)
    })
    .then(response => {
        if (response) {
            return response.json();
        } else {
            return Error('No response');
        }
    })
    .then(jsonResponse => {
        if (jsonResponse.success) {
            const accessToken = jsonResponse.accessToken;
            const refreshToken = jsonResponse.refreshToken;
            dispatch(updateAccessToken(accessToken));
            dispatch(updateRefreshToken(refreshToken));
        }
        return jsonResponse;
    })
    .catch(err => {
        return Error('Error on request to ' + url + ': ' + err);
    });
}