import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../redux/actions/ModalActions';
import {
    resetStateAndLogout
} from '../redux/thunks/LoginThunks';
import ReaderMenu from '../components/ReaderMenu';
import LibraryMenu from '../components/LibraryMenu';

const MODAL_COMPONENTS = {
    'READER_MENU': ReaderMenu,
    'LIBRARY_MENU': LibraryMenu
}

const ModalRoot = ({ dispatch, modalType, modalProps, hideModal }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal
        dispatch={dispatch}
        isOpen={!!modalType}
        hideModal={hideModal}
        resetStateAndLogout={resetStateAndLogout}
        {...modalProps}
    />;
}

const mapStateToProps = state => {
    return {
        modal: state.modal
    }
}

const mapDispatchToProps = dispatch => {
    const toReturn = {
        // Can add dispatch if needed
        dispatch: (actionCreator) => dispatch(actionCreator),
        hideModal: () => dispatch(hideModal()),
        resetStateAndLogout: () => dispatch(resetStateAndLogout())
    };
    return toReturn;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRoot)