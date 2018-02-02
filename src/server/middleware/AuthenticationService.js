const jwt = require('jsonwebtoken');
const config = require('../Config');

function authenticationService (req, res, next) {
    let accessToken = '';
    try {
        accessToken = req.get('Authorization').split('Bearer ')[1];
        console.log('Access token: ' + accessToken);
    } catch(err) {
        console.log('Error splitting access token: ' + err);
        res.status(401).send();
        return;
    }
    if (!accessToken) {
        // No access token. Return 401.
        res.status(401).send();
        return;
    } else {
        // https://stackoverflow.com/questions/10090414/express-how-to-pass-app-instance-to-routes-from-a-different-file
        jwt.verify(accessToken, req.app.get('authenticationSecret'), (accessTokenError, decodedAccessToken) => {
            if (accessTokenError) {
                if (accessTokenError.name === 'TokenExpiredError') {
                    // Token is expired. Return 401.
                    res.status(401).send();
                } else {
                    // Could not verify access token
                    res.status(401).send();
                }
            } else {
                // Token decoded. Append to request.
                req.decodedAccessToken = decodedAccessToken;
                next();
            }
        });
    }
}

module.exports = authenticationService;