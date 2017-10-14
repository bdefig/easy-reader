# Easy Reader

A light reader built in React that makes reading books as easy as reading articles on Facebook

## API

The following endpoints are available via REST API implemented in Node.js and Express.

### Get document metadata
`v1/document_metadata/:documentID`

### Get single document Block
`v1/document/:documentID/block/:blockIndex`

### Get multiple document blocks
`v1/document/:documentID/first/:firstBlockIndex/last/:lastBlockIndex`