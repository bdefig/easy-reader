import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import {
    logout
} from '../redux/actions/UserActions';
import './ArrowModal.css';

ReactModal.setAppElement('#root');

const ReaderMenu = ({ dispatch, isOpen, hideModal }) => {
    const onLogout = () => {
        dispatch(hideModal);
        dispatch(logout);
    };
    return (
        <ReactModal
            className="ArrowModal-arrowBox"
            overlayClassName="ArrowModal-overlay"
            isOpen={isOpen}
            onRequestClose={hideModal}
        >
            {/* <div className="ArrowModal-item">
                Jump to Section
            </div>
            <div className="ArrowModal-dividingLine"></div> */}
            <div className="ArrowModal-item">
                <Link to='/bookshelf' onClick={hideModal}>
                    Bookshelf
                </Link>
            </div>
            <div className="ArrowModal-dividingLine"></div>
            {/* <div className="ArrowModal-item">
                Settings
            </div>
            <div className="ArrowModal-dividingLine"></div> */}
            <div className="ArrowModal-item" onClick={onLogout}>
                <Link to="/login">
                    Log Out
                </Link>
            </div>
        </ReactModal>
    )
}

export default ReaderMenu;