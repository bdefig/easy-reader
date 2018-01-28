import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import './ArrowModal.css';

ReactModal.setAppElement('#root');

const ReaderMenu = ({ dispatch, isOpen, hideModal, resetStateAndLogout }) => {
    const onLogout = () => {
        dispatch(resetStateAndLogout());
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
                {/* <Link to="/login"> */}
                    Log Out
                {/* </Link> */}
            </div>
        </ReactModal>
    )
}

export default ReaderMenu;