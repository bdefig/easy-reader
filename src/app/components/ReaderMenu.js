import React from 'react';
import ReactModal from 'react-modal';
import { hideModal } from '../redux/ReduxActions';
import './ReaderMenu.css';

ReactModal.setAppElement('#root');

const ReaderMenu = ({ dispatch, isOpen, hideModal }) => {

    return (
        <ReactModal
            className="ReaderMenu-arrowBox"
            overlayClassName="ReaderMenu-overlay"
            isOpen={isOpen}
            onRequestClose={hideModal}
        >
            <h1>Some content here</h1>
        </ReactModal>
    )
}

export default ReaderMenu;