const fetch = require('node-fetch');
let urlPath = 'http://localhost:8080';

function createUser (name, email, password) {
    return new Promise ( (resolve, reject) => {
        const url = urlPath + '/v0/createUser';

        const newUser = {
            name: name,
            email: firstName,
            password: password
        };

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(userSaved => userSaved.json())
        .then(userSaved => {
            console.log('User saved to DB: ' + userSaved.name);
        })
        .catch(err => console.log('Error while creating new user'));
        // TODO: Reject if user was not saved
    })
}

function updateUserDocumentProgress(userID, documentID, blockIndex) {
    return new Promise ( (resolve, reject) => {
        const url = urlPath + '/v0/user/' + userID + '/updateDocumentProgress/document/' + documentID;

        const requestBody = {
            currentBlock: blockIndex
        };

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(documentProgressUpdated => {
            console.log('Document progress updated');
        })
        .catch(err => console.log('Error while updating document progress'));
        // TODO: Reject if there was a problem
    })
}

createUser('bryce1', 'Bryce', 'DeFigueiredo');