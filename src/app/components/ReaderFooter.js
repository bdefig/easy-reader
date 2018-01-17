import React from 'react';
import './ReaderFooter.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faChevronCircleRight
} from '@fortawesome/fontawesome-free-solid';

export const ReaderFooter = ({onNextButtonClick}) => {
    return (
        <div className="Footer-banner">
            <div className="Footer-nextButton" onClick={onNextButtonClick}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
            </div>
        </div>
    );
}