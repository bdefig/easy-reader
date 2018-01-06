import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import './Library.css';
import SimpleHeader from '../components/SimpleHeader';
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
            <div className="Library-container">
                <SimpleHeader
                    showMenu={showMenu}
                />
                <Switch>
                    <Route exact path='/library/add' render={
                        () => (
                            <LibraryAdd
                                isFetching={library.isFetching}
                                userDocuments={library.userDocuments}
                                onSwitchTo={switchDocTo}
                            />
                        )}
                    />
                    <Route exact path='/library' render={
                        () => (
                            <LibraryMain
                                isFetching={library.isFetching}
                                userDocuments={library.userDocuments}
                                onSwitchTo={switchDocTo}
                            />
                        )}
                    />
                </Switch>
                <ModalRoot
                    modalType={modal.modalType}
                    modalProps={modal.modalProps}
                />
            </div>
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