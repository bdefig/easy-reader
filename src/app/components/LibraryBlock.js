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
export const REMOVE_FROM_BOOKSHELF = 'REMOVE_FROM_BOOKSHELF';
export const ADD_TO_BOOKSHELF = 'ADD_TO_BOOKSHELF' ;
export const ADDED_TO_BOOKSHELF = 'ADDED_TO_BOOKSHELF';

export const LibraryBlock = ({ documentMetadata, leftGlyph, rightGlyph, onClickLeftGlyph, onClickRightGlyph, onClickText }) => {
    const { title, author } = documentMetadata;
    let leftGlyphToRender;
    let rightGlyphToRender;
    switch (leftGlyph) {
        case ADD_TO_BOOKSHELF:
            leftGlyphToRender = <FontAwesomeIcon icon={faPlus} className="LibraryBlock-glyphGreen" />;
            break;
        case ADDED_TO_BOOKSHELF:
            leftGlyphToRender = <FontAwesomeIcon icon={faCheck} className="LibraryBlock-glyphBlue" />;
            break;
        default:
            leftGlyphToRender = null;
            break;
    }
    switch (rightGlyph) {
        case REMOVE_FROM_BOOKSHELF:
            rightGlyphToRender = <FontAwesomeIcon icon={faTimes} className="LibraryBlock-glyphGray" />;
            break;
        default:
            rightGlyphToRender = null;
            break;
    }
    return (
        <div className="LibraryBlock-block">
            <div
                className="LibraryBlock-leftGlyph"
                onClick={() => {
                    if (onClickLeftGlyph) {
                        return onClickLeftGlyph(documentMetadata);
                    } else {
                        return null;
                    }
                }}
            >
                {leftGlyphToRender}
            </div>
            <div
                className="LibraryBlock-text"
                onClick={() => {
                    if (onClickText) {
                        return onClickText(documentMetadata);
                    } else {
                        return null;
                    }
                }}
            >
                <div className="LibraryBlock-title">
                    {title}
                </div>
                <div className="LibraryBlock-author">
                    {author}
                </div>
            </div>
            <div
                className="LibraryBlock-rightGlyph"
                onClick={() => {
                    if (onClickRightGlyph) {
                        return onClickRightGlyph(documentMetadata);
                    } else {
                        return null;
                    }
                }}
            >
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
    onClickLeftGlyph: PropTypes.func,
    onClickRightGlyph: PropTypes.func,
    onClickText: PropTypes.func
}