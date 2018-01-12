import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddToLibrary.css';
import LibraryBlock from './LibraryBlock';

export default class AddToLibrary extends Component {
    componentDidMount() {
        console.log('AddToLibrary mounted!');
        this.props.fetchNonUserDocuments();
    }

    render() {
        console.log('AddToLibrary is rendering!');
        const onSwitchTo = this.props.onSwitchTo;
        let nonUserDocuments = this.props.nonUserDocuments.map(doc => {
            return (
                <LibraryBlock
                    key={doc._id}
                    documentMetadata={doc}
                    onSwitchTo={onSwitchTo}
                />
            );
        });
        return (
            <div className="Library-mainArea">
                <div className="Library-addDocumentArea">
                    {nonUserDocuments}
                </div>
            </div>
        );
    }
}

AddToLibrary.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    userDocuments: PropTypes.arrayOf(
        PropTypes.shape({
            documentID: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            wordCountPerBlock: PropTypes.arrayOf(PropTypes.number)
        })
    ),
    fetchNonUserDocuments: PropTypes.func.isRequired,
    onSwitchTo: PropTypes.func.isRequired
}