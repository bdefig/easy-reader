import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Library.css';
import {
    LibraryBlock,
    ADD_TO_BOOKSHELF,
    ADDED_TO_BOOKSHELF
} from './LibraryBlock';

export default class Library extends Component {
    render() {
        let libraryDocuments = this.props.libraryDocuments.map(doc => {
            let isBookshelfDoc = false;
            for (let bookshelfDoc of this.props.bookshelfDocuments) {
                if (doc._id === bookshelfDoc.document._id) {
                    isBookshelfDoc = true;
                }
            }
            return (
                <LibraryBlock
                    key={doc._id}
                    documentMetadata={doc}
                    leftGlyph={isBookshelfDoc ? ADDED_TO_BOOKSHELF : ADD_TO_BOOKSHELF}
                    rightGlyph={null}
                    onClickLeftGlyph={isBookshelfDoc ? null : this.props.onAddDocumentToBookshelf}
                    onClickRightGlyph={null}
                    onClickText={this.props.onAddDocumentToBookshelf}
                />
            );
        });
        return (
            <div className="Library-mainArea">
                <div className="Library-documentListArea">
                    {libraryDocuments}
                </div>
            </div>
        );
    }
}

Library.PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    libraryDocuments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            wordCountPerBlock: PropTypes.arrayOf(PropTypes.number)
        })
    ),
    bookshelfDocuments: PropTypes.arrayOf(
        PropTypes.shape({
            document: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                author: PropTypes.string.isRequired,
                wordCountPerBlock: PropTypes.arrayOf(PropTypes.number)
            }),
            currentBlock: PropTypes.number.isRequired
        })
    ),
    fetchLibraryDocuments: PropTypes.func.isRequired,
    onAddDocumentToBookshelf: PropTypes.func.isRequired
}