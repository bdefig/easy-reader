import React from 'react';
import './SimpleHeader.css';

const ReaderHeader = ({ showMenu, debugState }) => (
    <div className="SimpleHeader-header">
        <h1 className="SimpleHeader-headerTitle" onClick={showMenu}>Easy Reader</h1>
    </div>
)

export default SimpleHeader;