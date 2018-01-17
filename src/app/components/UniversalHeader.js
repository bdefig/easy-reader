import React from 'react';
import {
    Link
} from 'react-router-dom';
import './UniversalHeader.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faChevronRight,
    faSearch
} from '@fortawesome/fontawesome-free-solid';

// Header types
export const READER_HEADER = 'READER_HEADER';
export const USER_LIBRARY_HEADER = 'USER_LIBRARY_HEADER';
export const LIBRARY_ADD_HEADER = 'LIBRARY_ADD_HEADER';

export const UniversalHeader = ({ headerType, title, onLeftButtonClick, onRightButtonClick, onTitleClick }) => {
    switch (headerType) {
        case READER_HEADER:
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton Header-readerNavigation" onClick={onLeftButtonClick}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                        </div>
                        <div className="Header-title" onClick={onTitleClick}>
                            {title}
                        </div>
                        <div className="Header-rightButton Header-readerNavigation" onClick={onRightButtonClick}>
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                        </div>
                    </div>
                </div>
            );
        case USER_LIBRARY_HEADER:
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton" onClick={onLeftButtonClick}>
                            <Link to='/'>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
                        </div>
                        <div className="Header-title" onClick={onTitleClick}>
                            Your Library
                        </div>
                    </div>
                </div>
            );
        case LIBRARY_ADD_HEADER:
            return (
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-leftButton" onClick={onLeftButtonClick}>
                            <Link to='/library'>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
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
                <div className="Header-banner">
                    <div className="Header-contentContainer">
                        <div className="Header-title" onClick={onTitleClick}>
                            Easy Reader
                        </div>
                    </div>
                </div>
            );
    }
}