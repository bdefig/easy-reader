import React from 'react';
import './ReaderHeader.css';

const ReaderHeader = ({ onPrevClick, onNextClick }) => (
    <div className="Reader-header">
        <div className="Reader-headerButtonWrapper">
            <button
                className="Reader-headerPageButton"
                onClick={onPrevClick}
            >
            &lt;
            </button>
        </div>
        <h1>Easy Reader</h1>
        <div className="Reader-headerButtonWrapper">
            <button
                className="Reader-headerPageButton"
                onClick={onNextClick}
            >
            &gt;
            </button>
        </div>
    </div>
)

export default ReaderHeader;