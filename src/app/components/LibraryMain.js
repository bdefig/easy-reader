import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LibraryMain.css';

export default class LibraryMain extends Component {
    render() {
        let userDocuments = this.props.userDocuments.map(userDoc => {
            return (
                <LibraryBlock
                    key={userDoc.documentID}
                    documentID={userDoc.documentID}
                    title={userDoc.title}
                    author={userDoc.author}
                    wordCountPerBlock={userDoc.wordCountPerBlock}
                    currentIndex={userDoc.currentIndex}
                    documentMetadata={userDoc}
                />
            );
        });
        return (
            <div className="Library-userDocumentArea">
                {userDocuments}
            </div>
        )
    }
}

LibraryMain.propTypes = {
    userDocuments: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        userDocuments: PropTypes.arrayOf(
            PropTypes.shape({
                documentID: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                author: PropTypes.string.isRequired,
                wordCountPerBlock: PropTypes.arrayOf(PropTypes.number),
                currentIndex: PropTypes.number.isRequired
            })
        )
    })
}