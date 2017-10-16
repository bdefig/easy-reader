# Easy Reader

A light reader built in React that makes reading books as easy as reading articles on Facebook

## API

The following endpoints are available via REST API implemented in Node.js and Express.

### Get all document metadata
`v1/documentMetadata`

### Get document metadata by ID
`v1/documentMetadata/:documentID`

### Insert document metadata
`v1/documentMetadata/insert`

### Get single document block
`v1/document/:documentID/block/:blockIndex`

### Get multiple document blocks
`v1/document/:documentID/first/:firstBlockIndex/last/:lastBlockIndex`

### Insert document blocks
`v1/document/:documentID/insert`

### Delete document by ID
`v1/document/:documentID/delete`

### Clear all documents metadata and document blocks
`v1/clearAllDocuments`