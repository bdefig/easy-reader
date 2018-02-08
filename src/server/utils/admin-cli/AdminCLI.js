const prompt = require('prompt');
const AdminHelpers = require('./AdminHelpers');
const DocumentUploader = require('./DocumentUploader');

prompt.start();
prompt.get({
    name: 'flow',
    description: 'What would you like to do? (create admin, upload document, exit)',
    pattern: /(^(create admin)$)|(^(upload document)$)|(^(exit)$)/,
    message: 'Please enter \'create admin\' or \'upload document\' (or type \'exit\' to exit)',
    required: true
}, (err, result) => {
    if (result.flow === 'create admin') {
        AdminHelpers.createAdmin();
    } else if (result.flow === 'upload document') {
        DocumentUploader.parseAndUploadDocument()
        .then(result => {
            if (result.success) {
                console.log('Document successfully parsed and uploaded');
            } else {
                console.log('Failure parsing or uploading document');
            }
        })
        .catch(err => console.log(err));
    } else if (result.flow === 'exit') {
        // Exit
    }
});