import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Bookshelf.css';
import {
    LibraryBlock,
    REMOVE_FROM_BOOKSHELF
} from './LibraryBlock';

export default class Bookshelf extends Component {
    render() {
        if (this.props.documentProgresses && this.props.documentProgresses.length) {
            let bookshelfDocuments = this.props.documentProgresses.map(doc => {
                return (
                    <LibraryBlock
                        key={doc._id}
                        documentMetadata={doc.document}
                        leftGlyph={null}
                        rightGlyph={REMOVE_FROM_BOOKSHELF}
                        onClickLeftGlyph={null}
                        onClickRightGlyph={this.props.onRemoveBookshelfDocument}
                        onClickText={this.props.onSwitchToBookshelfDocument}
                    />
                );
            });
            return (
                <div className="Bookshelf-mainArea">
                    <div className="Bookshelf-documentListArea">
                        {bookshelfDocuments}
                    </div>
                    <button className="Bookshelf-moreButton">
                        <Link to='/library'>
                            + More
                        </Link>
                    </button>
                </div>
            );
        } else {
            return (
                <div className="Bookshelf-mainArea">
                    <button className="Bookshelf-moreButton">
                        <Link to='/library'>
                            + More
                        </Link>
                    </button>
                </div>
            );
        }
    }
}

Bookshelf.PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    documentProgresses: PropTypes.arrayOf(
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
    onSwitchToBookshelfDocument: PropTypes.func.isRequired,
    onRemoveBookshelfDocument: PropTypes.func.isRequired
}