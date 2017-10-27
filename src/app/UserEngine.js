import 'whatwg-fetch';
import AppConfig from './AppConfig.js';

export function getUserDocumentProgressByUserID(userID) {
    return new Promise ( (resolve, reject) => {
        let url = AppConfig.baseURL + 'user/' + userID + '/getDocumentProgress';

        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(documentProgress => {
            return documentProgress.json();
        })
        .then(documentProgress => {
            resolve(documentProgress);
        })
        .catch(err => reject(Error('Errot fetching user document progress by user ID')));
    });
}

export function updateUserDocumentProgress(userID, documentID, currentBlock) {
    return new Promise ( (resolve, reject) => {
        let url = AppConfig.baseURL + 'user/' + userID + '/updateDocumentProgress/document/' + documentID;
        const msgBody = {
            currentBlock: currentBlock
        };

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(msgBody)
        })
        .then(progressUpdated => {
            console.log('Document progress updated:');
            console.log(progressUpdated.json());
        })
        .catch(err => reject(Error('Error updating document progress')));
    });
}