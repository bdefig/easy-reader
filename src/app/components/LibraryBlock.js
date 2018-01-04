import React from 'react';
import PropTypes from 'prop-types';
import './LibraryBlock.css';

const LibraryBlock = ({ documentMetadata, onSwitchTo }) => {
    const { documentID, title, author, wordCountPerBlock, currentIndex } = documentMetadata;
    return (
        <div
            className="LibraryBlock-block"
            onClick={onSwitchTo(documentID)}
        >
            <div className="LibraryBlock-title">
                {title}
            </div>
            <div className="LibraryBlock-author">
                {author}
            </div>
        </div>
    );
}

LibraryBlock.PropTypes = {
    documentMetadata: PropTypes.shape({
        documentID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        wordCountPerBlock: PropTypes.arrayOf(PropTypes.number),
        currentIndex: PropTypes.number.isRequired
    }),
    onSwitchTo: PropTypes.func.isRequired
}

export default LibraryBlock;