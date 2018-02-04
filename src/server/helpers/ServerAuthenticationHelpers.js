const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../Config');

exports.hashPassword = function (password) {
    // Returns a promise with the result being the hash
    return bcrypt.hash(password, saltRounds);
}

exports.checkPassword = function (passwordToCheck, actualHash) {
    // Returns a promise with the result being true (success) or false (failure)
    return bcrypt.compare(passwordToCheck, actualHash);
}

// // TODO: Remove this
// exports.generateToken = function (userID) {
//     // TODO: Should probably do this asynchronously
//     const payload = {};
//     const token = jwt.sign(payload, config.secret, {
//         subject: userID.toString(),
//         expiresIn: '1y'
//     });
//     return token;
// }

exports.generateRefreshToken = function (userID, appSecret) {
    const payload = {};
    const options = {
        subject: userID.toString(),
        expiresIn: '20m'
    };
    return new Promise((resolve, reject) => {jwt.sign(payload, appSecret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

exports.verifyRefreshToken = function (refreshToken, appSecret) {
    console.log('Verifying refresh token: ' + refreshToken);
    return new Promise((resolve, reject) => {jwt.verify(refreshToken, appSecret, (refreshTokenError, decodedRefreshToken) => {
            if (refreshTokenError) {
                if (refreshTokenError.name === 'TokenExpiredError') {
                    // Token is expired
                    console.log('Refresh token is expired');
                    reject({
                        verified: false,
                        reason: 'Expired token'
                    });
                } else {
                    // Could not verify refresh token
                    console.log('Could not verify refresh token: ' + refreshTokenError);
                    reject({
                        verified: false,
                        reason: 'Could not verify token'
                    });
                }
            } else {
                // Token decoded
                resolve({
                    verified: true,
                    decodedRefreshToken: decodedRefreshToken
                });
            }
        })
    })
}

exports.generateAccessToken = function (userID, appSecret) {
    const payload = {};
    const options = {
        subject: userID.toString(),
        expiresIn: '15s'
    };
    return new Promise ((resolve, reject) => {jwt.sign(payload, appSecret, options, (err, token) => {
            if (err) {
                console.log('Error in generateAccessToken');
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}