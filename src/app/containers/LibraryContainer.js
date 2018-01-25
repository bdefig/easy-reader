import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {
    UniversalHeader,
    LIBRARY_HEADER
} from '../components/UniversalHeader';
import Library from '../components/Library';
import ModalRoot from './ModalRoot';
import {
    openReaderMenu
} from '../redux/thunks/ModalThunks';
import {
    fetchLibraryDocuments,
    onAddDocumentToBookshelf
} from '../redux/thunks/LibraryThunks';
import {
    loadInitialBookshelfState
} from '../redux/thunks/BookshelfThunks';

class LibraryContainer extends Component {
    componentDidMount() {
        if (this.props.library.documents.length === 0) {
            this.props.fetchLibraryDocuments();
        }
        if (this.props.bookshelf.documentProgresses.length === 0) {
            this.props.loadInitialBookshelfState();
        }
    }

    render() {
        return (
            <div>
                <UniversalHeader
                    headerType={LIBRARY_HEADER}
                    onTitleClick={this.props.showMenu}
                />
                <Library
                    isFetching={this.props.library.isFetching}
                    libraryDocuments={this.props.library.documents}
                    bookshelfDocuments={this.props.bookshelf.documentProgresses}
                    fetchLibraryDocuments={this.props.fetchLibraryDocuments}
                    onAddDocumentToBookshelf={this.props.onAddDocumentToBookshelf}
                />
                <ModalRoot
                    modalType={this.props.modal.modalType}
                    modalProps={this.props.modal.modalProps}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bookshelf: state.bookshelf,
        library: state.library,
        modal: state.modal
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showMenu: () => dispatch(openReaderMenu()),
        fetchLibraryDocuments: () => dispatch(fetchLibraryDocuments()),
        loadInitialBookshelfState: () => dispatch(loadInitialBookshelfState()),
        onAddDocumentToBookshelf: (libraryDocument) => dispatch(onAddDocumentToBookshelf(libraryDocument, ownProps.history))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LibraryContainer);