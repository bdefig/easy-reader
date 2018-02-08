const prompt = require('prompt');
const fetch = require('node-fetch');
const DocumentParser = require('./DocumentParser');
let baseURL = 'http://localhost:8081';

exports.parseAndUploadDocument = function () {
    let accessToken = '';
    return login()
    .then(receivedToken => {
        accessToken = receivedToken;
        return promptForDocumentDetails()
    })
    .then(documentDetails => {
        if (documentDetails.title && documentDetails.author && documentDetails.filename) {
            return DocumentParser.parseText(documentDetails.title, documentDetails.author, documentDetails.filename);
        } else {
            return new Error('Missing document details');
        }
    })
    .then(parsed => {
        if (parsed.documentMetadata && parsed.blocks) {
            return uploadDocument(accessToken, parsed.documentMetadata, parsed.blocks);
        } else {
            return new Error('Parsed document missing metadata or blocks');
        }
    })
    .catch(err => console.log(err));
}

function login() {
    return new Promise ((resolve, reject) => {
        prompt.start();
        prompt.get([
            {
                name: 'email'
            }, {
                name: 'password',
                hidden: true,
                replace: '*'
            }
        ], (err, result) => {
            if (err) {
                console.log('Prompt error');
                reject(err);
            } else {
                return fetchLogin(result.email, result.password)
                .then(jsonResponse => {
                    if (jsonResponse && jsonResponse.success && jsonResponse.success === true && jsonResponse.accessToken) {
                        resolve(jsonResponse.accessToken);
                    } else {
                        reject(Error('Error receiving access token'));
                    }
                })
                .catch(err => console.log(err));
            }
        });
    });
}

function fetchLogin(email, password) {
    let url = baseURL + '/v0/admin/login';

    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(jsonResponse => {
        if (jsonResponse.success && jsonResponse.success === true) {
            return jsonResponse;
        } else {
            return new Error('Login failure');
        }
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}

function promptForDocumentDetails() {
    return new Promise ((resolve, reject) => {
        let title = '';
        let author = '';
        let filename = '';

        prompt.start();
        prompt.get([
            {
                name: 'title'
            }, {
                name: 'author'
            }, {
                name: 'filename'
            }
        ], (err, result) => {
            if (err)  {
                console.log('Prompt error');
                reject(err);
            } else {
                title = result.title;
                author = result.author;
                filename = '../../../assets/texts/' + result.filename;
                
                resolve({
                    title: title,
                    author: author,
                    filename: filename
                });
            }
        });
    })
}

function uploadDocument(accessToken, documentMetadata, blocks) {
    const url = baseURL + '/v0/admin/document/insert';

    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            documentMetadata: documentMetadata,
            blocks: blocks
        })
    })
    .then(result => result.json())
    .then(jsonResult => {
        if (jsonResult.success) {
            return {success: true};
        } else if (jsonResult.message) {
            return new Error(jsonResult.message);
        } else {
            return new Error('Error uploading document');
        }
    })
    .catch(err => {
        return err;
    })
}