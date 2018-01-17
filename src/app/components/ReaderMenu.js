import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import {
    logout
} from '../redux/actions/UserActions';
// import {
//     debugState
// } from '../redux/thunks/ModalThunks';
import './ReaderMenu.css';

ReactModal.setAppElement('#root');

const ReaderMenu = ({ dispatch, isOpen, hideModal }) => {
    const onLogout = () => {
        dispatch(hideModal);
        dispatch(logout);
    };
    // const onDebug = () => {
    //     dispatch(debugState);
    // };
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
                <Link to='/library' onClick={hideModal}>
                    Library
                </Link>
            </div>
            <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item">
                Settings
            </div>
            <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item" onClick={onLogout}>
                <Link to="/login">
                    Log Out
                </Link>
            </div>
            {/* <div className="ReaderMenu-dividingLine"></div>
            <div className="ReaderMenu-item">
                <button onClick={onDebug}>
                    Get State
                </button>
            </div> */}
        </ReactModal>
    )
}

export default ReaderMenu;