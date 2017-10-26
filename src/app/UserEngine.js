import 'whatwg-fetch';
import AppConfig from './AppConfig.js';

export function getUserDocumentProgressByUserID(userID) {
    return new Promise ( (resolve, reject) => {
        let url = AppConfig.baseURL + 'user/getDocumentProgress/' + userID;

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
            // Fetch document metadata
            // Actually, I should just be able to populate each documentProgress with the metadata in my query in UserController.js
        })
    })
}