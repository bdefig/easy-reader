const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.hashPassword = function (password) {
    return bcrypt.hash(password, saltRounds);
}