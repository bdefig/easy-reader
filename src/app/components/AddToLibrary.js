import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddToLibrary.css';
import {
    LibraryBlock,
    ADD_TO_LIBRARY,
    ADDED_TO_LIBRARY
 } from './LibraryBlock';

export default class AddToLibrary extends Component {
    componentDidMount() {
        console.log('AddToLibrary mounted!');
        this.props.fetchNonUserDocuments();
    }

    render() {
        console.log('AddToLibrary is rendering!');
        const onSwitchTo = this.props.onSwitchTo;
        const userDocuments = this.props.userDocuments;
        let nonUserDocuments = this.props.nonUserDocuments.map(doc => {
            // Set left and right glyphs
            let isUserDoc = false;
            for (let userDoc of this.props.userDocuments) {
                if (doc._id == userDoc.document._id) {
                    isUserDoc = true;
                }
            }
            return (
                <LibraryBlock
                    key={doc._id}
                    documentMetadata={doc}
                    onSwitchTo={onSwitchTo}
                    leftGlyph={isUserDoc ? ADDED_TO_LIBRARY : ADD_TO_LIBRARY}
                    rightGlyph={null}
                />
            );
        });
        return (
            <div className="AddToLibrary-mainArea">
                <div className="AddToLibrary-documentListArea">
                    {nonUserDocuments}
                </div>
            </div>
        );
    }
}

AddToLibrary.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    nonUserDocuments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            wordCountPerBlock: PropTypes.arrayOf(PropTypes.number)
        })
    ),
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
    fetchNonUserDocuments: PropTypes.func.isRequired,
    onSwitchTo: PropTypes.func.isRequired
}