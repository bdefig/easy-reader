import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../redux/ReduxActions';
import ReaderMenu from '../components/ReaderMenu';

const MODAL_COMPONENTS = {
    'READER_MENU': ReaderMenu
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
        hideModal: () => dispatch(hideModal())
    };
    return toReturn;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRoot)