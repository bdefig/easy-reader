import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserLibrary.css';
import LibraryBlock from './LibraryBlock';

export default class UserLibrary extends Component {
    render() {
        const onSwitchTo = this.props.onSwitchTo;
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
                <button className="Library-moreButton">
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
            documentID: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            wordCountPerBlock: PropTypes.arrayOf(PropTypes.number),
            currentIndex: PropTypes.number.isRequired
        })
    ),
    onSwitchTo: PropTypes.func.isRequired
}