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

export const UniversalHeader = ({ headerType, title, onLeftButtonClick, onRightButtonClick, onTitleClick }) => {
    switch (headerType) {
        case READER_HEADER:
            // Maybe change the chevrons to chevrons in circles
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton" onClick={onLeftButtonClick}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="Header-title" onClick={onTitleClick}>
                            {title}
                        </div>
                        <div className="Header-rightButton" onClick={onRightButtonClick}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </div>
                </div>
            );
        case USER_LIBRARY_HEADER:
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton" onClick={onLeftButtonClick}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="Header-title" onClick={onTitleClick}>
                            Library
                        </div>
                    </div>
                </div>
            );
        case LIBRARY_ADD_HEADER:
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton" onClick={onLeftButtonClick}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="Header-title" onClick={onTitleClick}>
                            Add to Library
                        </div>
                        <div className="Header-rightButton" onClick={onRightButtonClick}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="Header-container">
                    <div className="Header-title" onClick={onTitleClick}>
                        Easy Reader
                    </div>
                </div>
            );
    }
}