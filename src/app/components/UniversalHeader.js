import React from 'react';
import './UniversalHeader.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faSearch
} from '@fortawesome/fontawesome-free-solid';

// Header types
export const READER_HEADER = 'READER_HEADER';
export const USER_LIBRARY_HEADER = 'USER_LIBRARY_HEADER';
export const LIBRARY_ADD_HEADER = 'LIBRARY_ADD_HEADER';

// TODO: Open menu when title is clicked

export const UniversalHeader = ({ headerType, title }) => {
    switch (headerType) {
        case READER_HEADER:
            // Maybe change the chevrons to chevrons in circles
            return (
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
                <div className="Header-container">
                    <div className="Header-leftButton">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="Header-title">
                        Library
                    </div>
                </div>
            );
        case LIBRARY_ADD_HEADER:
            return (
                <div className="Header-container">
                    <div className="Header-leftButton">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="Header-title">
                        Add to Library
                    </div>
                    <div className="Header-rightButton">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            );
        default:
            return (
                <div className="Header-container">
                    <div className="Header-title">
                        Easy Reader
                    </div>
                </div>
            );
    }
}