import React from 'react';
import PropTypes from 'prop-types';
import './LibraryBlock.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faPlus,
    faCheck
} from '@fortawesome/fontawesome-free-solid';

// Glyph types
export const REMOVE_FROM_LIBRARY = 'REMOVE_FROM_LIBRARY';
export const ADD_TO_LIBRARY = 'ADD_TO_LIBRARY' ;
export const ADDED_TO_LIBRARY = 'ADDED_TO_LIBRARY';

export const LibraryBlock = ({ documentMetadata, onSwitchTo, leftGlyph, rightGlyph }) => {
    const { _id, title, author } = documentMetadata;
    let leftGlyphToRender;
    let rightGlyphToRender;
    switch (leftGlyph) {
        case ADD_TO_LIBRARY:
            leftGlyphToRender = <FontAwesomeIcon icon={faPlus} className="LibraryBlock-glyphGreen" />;
            break;
        case ADDED_TO_LIBRARY:
            leftGlyphToRender = <FontAwesomeIcon icon={faCheck} className="LibraryBlock-glyphBlue" />;
            break;
        default:
            leftGlyphToRender = null;
            break;
    }
    switch (rightGlyph) {
        case REMOVE_FROM_LIBRARY:
            rightGlyphToRender = <FontAwesomeIcon icon={faTimes} className="LibraryBlock-glyphGray" />;
            break;
        default:
            rightGlyphToRender = null;
            break;
    }
    if (leftGlyph == REMOVE_FROM_LIBRARY) {
        leftGlyphToRender = <FontAwesomeIcon icon={faTimes} />;
    }
    return (
        <div
            className="LibraryBlock-block"
            onClick={() => onSwitchTo(documentMetadata)}
        >
            <div className="LibraryBlock-leftGlyph">
                {leftGlyphToRender}
            </div>
            <div className="LibraryBlock-text">
                <div className="LibraryBlock-title">
                    {title}
                </div>
                <div className="LibraryBlock-author">
                    {author}
                </div>
            </div>
            <div className="LibraryBlock-rightGlyph">
                {rightGlyphToRender}
            </div>
        </div>
    );
}

LibraryBlock.PropTypes = {
    documentMetadata: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        wordCountPerBlock: PropTypes.arrayOf(PropTypes.number),
        currentIndex: PropTypes.number.isRequired
    }),
    onSwitchTo: PropTypes.func.isRequired
}