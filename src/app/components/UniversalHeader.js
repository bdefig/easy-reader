import React from 'react';
import './UniversalHeader.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight
} from '@fortawesome/fontawesome-free-solid';

// Header types
export const READER_HEADER = 'READER_HEADER';
export const USER_LIBRARY_HEADER = 'USER_LIBRARY_HEADER';
export const LIBRARY_ADD_HEADER = 'LIBRARY_ADD_HEADER';

export const UniversalHeader = ({ headerType, title }) => {
    switch (headerType) {
        case READER_HEADER:
            return (
                // Reader header here
                <div className="Header-container">
                    <div className="Header-leftButton">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="Header-title">
                        {title}
                    </div>
                    <div className="Header-rightButton">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            );
        case USER_LIBRARY_HEADER:
            return (
                // User library header here
            );
        case LIBRARY_ADD_HEADER:
            return (
                // Library add header here
            );
        default:
            return (
                // Default case here
            );
    }
}