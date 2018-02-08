const ServerAuthenticationHelpers = require('../helpers/ServerAuthenticationHelpers');
const Admin = require('../models/Admin');

exports.createAdmin = function (req, res, next) {
    let adminID = '';

    ServerAuthenticationHelpers.hashPassword(req.body.password)
    .then(hash => {
        return {
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        };
    })
    .then(newAdminInfo => {
        const newAdmin = new Admin(newAdminInfo);
        return newAdmin.save()
    })
    .then(newAdminSaved => {
        adminID = newAdminSaved._id.toString();
        return ServerAuthenticationHelpers.generateAccessToken(adminID, req.app.get('authenticationSecret'));
    })
    .then(accessToken => {
        console.log('User created: ' + req.body.name);
        res.send({
            success: true,
            adminID: adminID,
            name: req.body.name,
            accessToken: accessToken
        });
    })
    .catch(err => {
        if (err.code && err.code === 11000) {
            console.log('Error: Email already exists');
        } else {
            console.log('Error with Create Admin process: ' + err);
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
    let adminID = '';
    let name = '';

    Admin.findOne({
        email: req.body.email
    })
    .then(adminFound => {
        if (adminFound) {
            adminID = adminFound._id;
            name = adminFound.name;
            return ServerAuthenticationHelpers.checkPassword(passwordSubmitted, adminFound.passwordHash);
        } else {
            res.json({
                success: false,
                message: 'Incorrect email or password'
            });
            return Error('Admin not found by email');
        }
    })
    .then(correctPassword => {
        if (correctPassword) {
            return ServerAuthenticationHelpers.generateAccessToken(adminID, req.app.get('authenticationSecret'));
        } else {
            res.json({
                success: false,
                message: 'Incorrect email or password'
            });
            return Error('Incorrect password')
        }
    })
    .then(accessToken => {
        console.log('Login success: ' + adminID);
        res.json({
            success: true,
            adminID: adminID,
            name: name,
            accessToken: accessToken
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