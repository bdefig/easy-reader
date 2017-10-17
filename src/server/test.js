const fetch = require('node-fetch');

// const url = 'http://localhost:3000/v1/marcoPolo/helloWorld';
// const url = 'http://localhost:3000/v1/documentMetadata/insert';
const url = 'http://localhost:3000/v1/clearAllDocuments';

const payload = {
    title: 'Some Book',
    author: 'Bryce',
    wordCountPerBlock: [12, 2, 89]
};

// fetch(url, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//             },
//         body: JSON.stringify(payload)
//     })
//     .then(res => {return res.json()})
//     .then(res => console.log('Success: ' + res))
//     .catch(err => console.log(err));

fetch(url, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => {return res.json()})
    .then(res => console.log('Success: ' + JSON.stringify(res)))
    .catch(err => console.log(err));

// fetch(url, {
//     method: 'get',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//         }
//     })
//     // .then(res => console.log('Response: ' + JSON.stringify(res.status) + ' ' + res.statusText))
//     .then(res => {return res.json()})
//     .then(res => console.log(res))
//     .catch(err => console.log(err));