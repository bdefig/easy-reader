import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../redux/ReduxActions';
import ReaderMenu from '../components/ReaderMenu';

const MODAL_COMPONENTS = {
    'READER_MENU': ReaderMenu
}

const ModalRoot = ({ modalType, modalProps, hideModal }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal
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
    return {
        // Can add dispatch if needed
        hideModal: () => dispatch(hideModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRoot)