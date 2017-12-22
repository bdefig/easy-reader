import React from 'react';
import './LibraryHeader.css';

const ReaderHeader = ({ showMenu, debugState }) => (
    <div className="Library-header">
        <h1 className="Library-headerTitle" onClick={showMenu}>Easy Reader</h1>
    </div>
)

export default LibraryHeader;