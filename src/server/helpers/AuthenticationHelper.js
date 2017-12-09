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

exports.generateToken = function (userID) {
    const payload = {};
    const token = jwt.sign(payload, config.secret, {
        subject: userID.toString(),
        expiresIn: '1y'
    });
    return token;
}