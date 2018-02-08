const prompt = require('prompt');
const fetch = require('node-fetch');
let baseURL = 'http://localhost:8081';

exports.createAdmin = function () {
    prompt.start();
    prompt.get([
        {
            name: 'name'
        }, {
            name: 'email'
        }, {
            name: 'password',
            hidden: true,
            replace: '*'
        }
    ], (err, result) => {
        if (err) {
            console.log('Prompt error');
        } else {
            fetchCreateAdmin(result.name, result.email, result.password);
        }
    });
}

function fetchCreateAdmin(name, email, password) {
    const url = baseURL + '/v0/admin/createAdmin';
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(jsonResponse => {
        if (jsonResponse.success) {
            console.log('New admin successfully created');
            return;
        } else {
            return new Error('Failure to create new admin');
        }
    })
    .catch(err => {
        console.log(err);
    });
}
