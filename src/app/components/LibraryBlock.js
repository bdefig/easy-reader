import React from 'react';
import PropTypes from 'prop-types';
import './LibraryBlock.css';

const LibraryBlock = ({ documentMetadata }) => {
    
}

LibraryBlock.PropTypes = {
    documentMetadata: PropTypes.shape({
        documentID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        wordCountPerBlock: PropTypes.arrayOf(PropTypes.number),
        currentIndex: PropTypes.number.isRequired
    })
}