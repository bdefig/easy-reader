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
            <div className="ReaderMenu-item">
                Jump to Section
            </div>
            <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item">
                Switch Books
            </div>
            <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item">
                Settings
            </div>
            <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item">
                Log Out
            </div>
        </ReactModal>
    )
}

export default ReaderMenu;