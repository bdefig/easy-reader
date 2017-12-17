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
            <hr className="ReaderMenu-dividingLine" />
            <div className="ReaderMenu-item">
                Switch Books
            </div>
            <hr className="ReaderMenu-dividingLine" />
            <div className="ReaderMenu-item">
                Settings
            </div>
            <hr className="ReaderMenu-dividingLine" />
            <div className="ReaderMenu-item">
                Log Out
            </div>
        </ReactModal>
    )
}

export default ReaderMenu;