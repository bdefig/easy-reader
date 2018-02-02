const ServerAuthenticationHelpers = require('../helpers/ServerAuthenticationHelpers');
const User = require('../models/User');

exports.createUser = function (req, res, next) {
    let userID = '';

    ServerAuthenticationHelpers.hashPassword(req.body.password)
    .then(hash => {
        return {
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        };
    })
    .then(newUserInfo => {
        console.log(JSON.stringify(newUserInfo));
        const newUser = new User(newUserInfo);
        return newUser.save()
    })
    .then(newUserSaved => {
        userID = newUserSaved._id.toString();
        return Promise.all([
            ServerAuthenticationHelpers.generateRefreshToken(userID, req.app.get('authenticationSecret')),
            ServerAuthenticationHelpers.generateAccessToken(userID, req.app.get('authenticationSecret'))
        ]);
    })
    .then(tokens => {
        console.log('User created: ' + req.body.name);
        res.send({
            success: true,
            userID: userID,
            name: req.body.name,
            refreshToken: tokens[0],
            accessToken: tokens[1]
        });
    })
    .catch(err => {
        if (err.code && err.code === 11000) {
            console.log('Error: Email already exists');
        } else {
            console.log('Error with Create User process: ' + err);
        }
        res.send({
            success: false,
            message: 'Email is already registered'
        });
    });
}

exports.login = function (req, res, next) {
    const passwordSubmitted = req.body.password;
    let loginSuccess = false;
    let userID = '';
    let name = '';
    console.log('User to try to authenticate: ' + JSON.stringify(req.body));

    User.findOne({
        email: req.body.email
    })
    .then(userFound => {
        console.log('Looked for: ' + req.body.email);
        console.log(userFound);
        if (userFound) {
            console.log('User found by email');
            userID = userFound._id;     // This might not work
            name = userFound.name;
            console.log('Checking password: ' + req.body.password);
            return ServerAuthenticationHelpers.checkPassword(passwordSubmitted, userFound.passwordHash);
        } else {
            res.json({
                success: false,
                message: 'Incorrect email or password'
            });
            return Error('User not found by email');
        }
    })
    .then(correctPassword => {
        if (correctPassword) {
            console.log('Creating tokens with userID: ' + userID);
            return Promise.all([
                ServerAuthenticationHelpers.generateRefreshToken(userID, req.app.get('authenticationSecret')),
                ServerAuthenticationHelpers.generateAccessToken(userID, req.app.get('authenticationSecret'))
            ])
        } else {
            res.json({
                success: false,
                message: 'Incorrect email or password'
            });
            return Error('Incorrect password')
        }
    })
    .then(tokens => {
        console.log('Login success: ' + userID);
        res.json({
            success: true,
            userID: userID,
            name: name,
            refreshToken: tokens[0],
            accessToken: tokens[1]
        });
    })
    .catch(err => {
        console.log('Login error: ' + err);
        res.json({
            success: false,
            message: 'Incorrect email or password'
        });
    })
}

exports.requestNewAccessToken = function(req, res, next) {
    const appSecret = req.app.get('authenticationSecret');
    let refreshToken = '';
    let userID = '';
    if (req.body.refreshToken && req.body.userID) {
        refreshToken = req.body.refreshToken;
        userID = req.body.userID;
    } else {
        res.status(401).send();
        return;
    }
    ServerAuthenticationHelpers.verifyRefreshToken(refreshToken, appSecret)
    .then(verifiedToken => {
        if (verifiedToken.verified === true) {
            // Generate and send new access token
            ServerAuthenticationHelpers.generateAccessToken(req.body.userID, appSecret)
            .then(newAccesToken => {
                req.json({
                    success: true,
                    accessToken: newAccesToken
                });
            })
            .catch(err => {
                console.log('Here');
                return err;
            });
        } else {
            res.status(401).send();
        }
    })
    .catch(err => {
        console.log('Error requesting new access token: ' + err);
        res.status(401).send();
    });
}