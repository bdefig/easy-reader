const fetch = require('node-fetch');

const url = 'http://localhost:3000/v1/documentMetadata';

const payload = {
    title: 'Some Book',
    author: 'Bryce',
    wordCountPerBlock: [12, 2, 89]
};

fetch(url, {
        method: 'post',
        body: payload
    })
    .then(res => console.log('Success: ' + res))
    .catch(err => console.log(err));