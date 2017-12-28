import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Library.css';
import SimpleHeader from '../components/SimpleHeader';
import LibraryMain from '../components/LibraryMain';
import ModalRoot from './ModalRoot';
import {

} from '../redux/ReduxActions';

class Library extends Component {
    componentDidMount() {
        // Load documents
        const { loadInitialLibraryState } = this.props;
        loadInitialLibraryState();
    }

    render() {
        const {
            userDocuments,
            modal
        } = this.props;
        const {
            showMenu,
            onMoreClick
        } = this.props;
        return (
            <div className="Library-container">
                <SimpleHeader
                    showMenu={showMenu}
                />
                <LibraryMain
                    userDocuments={userDocuments}
                />
                <button
                    className="Library-moreButton"
                    onClick={onMoreClick}
                >
                    + More
                </button>
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
        userDocuments: state.userDocuments,
        otherDocuments: state.otherDocuments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMenu: () => dispatch(openMenu()),
        loadInitialLibraryState: () => dispatch(loadInitialLibraryState()),
        onMoreClick: () => dispatch(addLibraryItems())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);