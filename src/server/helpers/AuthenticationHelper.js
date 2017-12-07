const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = function (password) {
    // Returns a promise with the result being the hash
    return bcrypt.hash(password, saltRounds);
}

exports.checkPassword = function (passwordToCheck, actualHash) {
    // Returns a promise with the result being true (success) or false (failure)
    return bcrypt.compare(passwordToCheck, actualHash);
}