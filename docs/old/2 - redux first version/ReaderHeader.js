import React from 'react';
import './ReaderHeader.css';

const ReaderHeader = ({ onPrevClick, onNextClick, showMenu, debugState }) => (
    <div className="Reader-header">
        <div className="Reader-headerButtonWrapper">
            <button
                className="Reader-headerPageButton"
                onClick={onPrevClick}
            >
            &lt;
            </button>
        </div>
        <h1 className="Reader-headerTitle" onClick={showMenu}>Easy Reader</h1>
        <div className="Reader-headerButtonWrapper">
            <button
                className="Reader-headerPageButton"
                onClick={onNextClick}
            >
            &gt;
            </button>
        </div>
        {/* <button onClick={debugState}>
                Debug State
            </button> */}
    </div>
)

export default ReaderHeader;