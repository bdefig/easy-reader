import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LibraryAdd.css';
import LibraryBlock from './LibraryBlock';

export default class LibraryAdd extends Component {
    componentDidMount() {
        console.log('LibraryAdd mounted!');
        this.props.fetchNonUserDocuments();
    }

    render() {
        console.log('LibraryAdd is rendering!');
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

LibraryAdd.propTypes = {
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