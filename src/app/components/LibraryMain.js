import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LibraryMain.css';

export default class LibraryMain extends Component {
    render() {
        let onSwitchTo = this.props.onSwitchTo;
        let userDocuments = this.props.userDocuments.map(userDoc => {
            return (
                <LibraryBlock
                    key={userDoc.documentID}
                    documentMetadata={userDoc}
                    onSwitchTo={onSwitchTo}
                />
            );
        });
        return (
            <div className="Library-userDocumentArea">
                <div>
                    {userDocuments}
                </div>
                <button
                    className="Library-moreButton"
                    onClick={onMoreClick}
                >
                    + More
                </button>
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
    }),
    onSwitchTo: PropTypes.func.isRequired,
    onMoreClick: PropTypes.func.isRequired
}