import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserLibrary.css';
import {
    LibraryBlock,
    REMOVE_FROM_LIBRARY
 } from './LibraryBlock';

export default class UserLibrary extends Component {
    render() {
        const onSwitchToDocument = this.props.onSwitchToDocument;
        const onRemoveDocument = this.props.onRemoveDocument;
        let userDocuments = this.props.userDocuments.map(userDoc => {
            return (
                <LibraryBlock
                    key={userDoc._id}
                    documentMetadata={userDoc.document}
                    leftGlyph={null}
                    rightGlyph={REMOVE_FROM_LIBRARY}
                    onClickLeftGlyph={null}
                    onClickRightGlyph={onRemoveDocument}
                    onClickText={onSwitchToDocument}
                />
            );
        });
        return (
            <div className="UserLibrary-mainArea">
                <div className="UserLibrary-documentListArea">
                    {userDocuments}
                </div>
                <button className="UserLibrary-moreButton">
                    <Link to='/library/add'>
                        + More
                    </Link>
                </button>
            </div>
        );
    }
}

UserLibrary.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    userDocuments: PropTypes.arrayOf(
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
    onSwitchToDocument: PropTypes.func.isRequired,
    onRemoveDocument: PropTypes.func.isRequired
}