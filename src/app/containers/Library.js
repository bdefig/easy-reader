import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import {
    UniversalHeader,
    USER_LIBRARY_HEADER,
    LIBRARY_ADD_HEADER
} from '../components/UniversalHeader';
import UserLibrary from '../components/UserLibrary';
import AddToLibrary from '../components/AddToLibrary';
import ModalRoot from './ModalRoot';
import {
    openReaderMenu
} from '../redux/thunks/ModalThunks';
import {
    loadInitialLibraryState,
    fetchNonUserDocuments,
    onSwitchToLibraryUserDocument,
    onRemoveLibraryUserDocument,
    onAddDocumentToLibrary
} from '../redux/thunks/LibraryThunks';

class Library extends Component {
    componentDidMount() {
        // Load documents
        const { loadInitialLibraryState } = this.props;
        loadInitialLibraryState();
    }

    render() {
        const {
            library,
            modal
        } = this.props;
        const {
            showMenu,
            fetchNonUserDocuments,
            switchToUserDocument,
            removeUserDocument,
            switchToNonUserDocument
        } = this.props;
        return (
            <Switch>
                <Route exact path='/library/add' render={
                    () => (
                        <div>
                            <UniversalHeader
                                headerType={LIBRARY_ADD_HEADER}
                                onTitleClick={showMenu}
                            />
                            <AddToLibrary
                                isFetching={library.isFetching}
                                nonUserDocuments={library.nonUserDocuments}
                                userDocuments={library.userDocuments}
                                fetchNonUserDocuments={fetchNonUserDocuments}
                                onSwitchToDocument={switchToNonUserDocument}
                            />
                            <ModalRoot
                                modalType={modal.modalType}
                                modalProps={modal.modalProps}
                            />
                        </div>
                    )}
                />
                <Route exact path='/library' render={
                    () => (
                        <div>
                            <UniversalHeader
                                headerType={USER_LIBRARY_HEADER}
                                onTitleClick={showMenu}
                            />
                            <UserLibrary
                                isFetching={library.isFetching}
                                userDocuments={library.userDocuments}
                                onSwitchToDocument={switchToUserDocument}
                                onRemoveDocument={removeUserDocument}
                            />
                            <ModalRoot
                                modalType={modal.modalType}
                                modalProps={modal.modalProps}
                            />
                        </div>
                    )}
                />
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        // currentDocument: state.currentDocument,
        library: state.library,
        modal: state.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMenu: () => dispatch(openReaderMenu()),
        loadInitialLibraryState: () => dispatch(loadInitialLibraryState()),
        fetchNonUserDocuments: () => dispatch(fetchNonUserDocuments()),
        switchToUserDocument: (libraryUserDocument) => dispatch(onSwitchToLibraryUserDocument(libraryUserDocument)),
        removeUserDocument: (libraryUserDocument) => dispatch(onRemoveLibraryUserDocument(libraryUserDocument)),
        switchToNonUserDocument: (nonLibraryUserDocument) => dispatch(onAddDocumentToLibrary(nonLibraryUserDocument))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Library));