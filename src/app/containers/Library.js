import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import './Library.css';
import {
    UniversalHeader,
    USER_LIBRARY_HEADER,
    LIBRARY_ADD_HEADER
} from '../components/UniversalHeader';
import LibraryMain from '../components/LibraryMain';
import LibraryAdd from '../components/LibraryAdd';
import ModalRoot from './ModalRoot';
import {
    openMenu,
    loadInitialLibraryState,
    switchCurrentDocument
} from '../redux/ReduxActions';

class Library extends Component {
    componentDidMount() {
        // Load documents
        const { loadInitialLibraryState } = this.props;
        loadInitialLibraryState();
    }

    render() {
        // const { match } = this.props;
        const {
            library,
            modal
        } = this.props;
        const {
            showMenu,
            switchDocTo
        } = this.props;
        return (
            <Switch>
                <Route exact path='/library/add' render={
                    () => (
                        <div className="Library-container">
                            <UniversalHeader
                                headerType={LIBRARY_ADD_HEADER}
                                onTitleClick={showMenu}
                            />
                            <LibraryAdd
                                isFetching={library.isFetching}
                                userDocuments={library.userDocuments}
                                onSwitchTo={switchDocTo}
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
                        <div className="Library-container">
                            <UniversalHeader
                                headerType={USER_LIBRARY_HEADER}
                                onTitleClick={showMenu}
                            />
                            <LibraryMain
                                isFetching={library.isFetching}
                                userDocuments={library.userDocuments}
                                onSwitchTo={switchDocTo}
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
        currentDocument: state.currentDocument,
        library: state.library,
        userDocuments: state.userDocuments,
        otherDocuments: state.otherDocuments,
        modal: state.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMenu: () => dispatch(openMenu()),
        loadInitialLibraryState: () => dispatch(loadInitialLibraryState()),
        switchDocTo: (documentID) => dispatch(switchCurrentDocument(documentID))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Library));