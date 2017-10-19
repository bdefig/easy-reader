import 'whatwg-fetch';
// import * as Environment from 'Environment.js';

class TextEngine {

    getNextTextBlocks(documentMetadata, firstIndexToGet, minWordCount) {
        
        const baseURL = 'http://localhost:3000/v1/';

        return new Promise ( (resolve, reject) => {
            if (!documentMetadata.wordCountPerBlock || documentMetadata.wordCountPerBlock.length - 1 < firstIndexToGet) {
                // Error: Out of range
                reject(Error('getNextTextBlocks error: firstIndexToGet is out of range'));
            }

            let wordCount = documentMetadata.wordCountPerBlock[firstIndexToGet];
            let blockIndex = firstIndexToGet;

            while (wordCount < minWordCount && blockIndex < (documentMetadata.wordCountPerBlock.length - 1)) {
                blockIndex += 1;
                wordCount += documentMetadata.wordCountPerBlock[blockIndex];
            }

            let url = baseURL + 'document/' + documentMetadata._id + '/first/' + firstIndexToGet + '/last/' + blockIndex;
            
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(blocks => blocks.json())
            .then(blocks => {
                resolve(blocks);
            })
            .catch(err => reject(Error('getNextTextBlocks error fetching blocks from database')));
        });
    }

}

export default TextEngine;

// --------------------------------------------------

// Dummy functions for initial testing; delete soon

// function dummyGetText() {
//     return "Lorem ipsum";
// }

// function dummyGetLongText() {
//     return ("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin dictum auctor. Sed sodales felis sit amet elit consequat, nec mollis velit sagittis. Integer sit amet diam purus. Aenean nulla enim, consequat vel ligula sit amet, consectetur tempor enim. Quisque sed elit sed sem volutpat luctus eget eu neque. Fusce consequat, eros eu tempus pretium, metus quam molestie enim, sed rhoncus turpis lectus in diam. Nunc ut bibendum quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis non urna nulla. Donec pretium sem ac aliquam tristique. Vestibulum vitae est odio.</p><p>Nunc et lorem sit amet ex lacinia scelerisque. Sed sed enim dapibus, tristique turpis a, condimentum elit. Cras quis elit at magna imperdiet imperdiet in ut odio. Suspendisse cursus nunc ut aliquam ultricies. Praesent vulputate tempus elit. Sed faucibus tellus nec dui interdum, at tincidunt nisl vulputate. Praesent quis libero arcu. Quisque vel nibh non nulla porttitor euismod. Sed vitae justo fringilla eros porta pulvinar id et turpis. Morbi vehicula, tortor id ornare facilisis, diam elit iaculis enim, id volutpat ipsum orci ut risus. Praesent id laoreet turpis, eget condimentum nulla.</p><p>Pellentesque id sapien nisi. Curabitur aliquet nisl sit amet massa consequat, non convallis elit ullamcorper. Sed justo felis, venenatis vel velit ut, facilisis hendrerit est. Curabitur vel lacinia mauris. Morbi sapien sapien, vestibulum eget tellus eget, iaculis interdum quam. Aliquam risus lorem, pellentesque non felis id, faucibus dictum magna. Mauris pulvinar turpis id felis porta finibus. Sed viverra vel mi in dictum. Quisque tincidunt justo a augue ultricies porttitor. Quisque a sapien mollis, dictum ex ac, volutpat lectus. Quisque venenatis nibh urna, vitae imperdiet nunc dapibus ut. Donec lacinia nulla ac ex pharetra, et consectetur mi gravida. Fusce accumsan risus sed felis tristique lacinia. Etiam nisi leo, sagittis a sodales eu, aliquet quis odio.</p><p>Praesent euismod purus sapien, id volutpat orci hendrerit eu. Nam ante nisl, hendrerit eu ligula ut, tempor dignissim felis. Vestibulum leo metus, elementum lacinia mollis quis, condimentum quis nulla. Aliquam nisi augue, ullamcorper sed blandit vulputate, pharetra eget turpis. Nam convallis justo non efficitur fringilla. Nam eu tempus mi, vitae dignissim dui. Duis sit amet blandit nisl. Aliquam molestie libero et varius suscipit. Curabitur semper posuere neque, ac tristique quam fringilla et.</p><p>Sed sed gravida nunc. Fusce scelerisque eget orci in egestas. Praesent vitae rutrum tellus, vitae fringilla metus. Morbi pharetra lectus purus, a faucibus magna pellentesque quis. Sed rutrum metus vel justo molestie sollicitudin. Aliquam tincidunt ligula quis dapibus congue. Etiam non hendrerit urna, id interdum lacus. Nunc bibendum neque in ex sagittis fringilla. Aenean lobortis enim et eleifend mattis. Morbi dictum, orci eu vestibulum dapibus, nibh odio convallis elit, in fringilla mauris tortor ac magna. Vestibulum eu nunc id odio convallis convallis at id ligula. Sed finibus imperdiet lacus in elementum. Curabitur quis nisl sit amet sapien commodo molestie quis et dolor.</p>");
// }

// function dummyGetTextNumber(num) {
//     var returnText;
//     returnText = 'This is text number ' + num;
//     return returnText;
// }

// export default TextEngine;