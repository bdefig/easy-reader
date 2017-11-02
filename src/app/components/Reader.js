import React from 'react';
import './Reader.css';
import ReaderHeader from './ReaderHeader';
import ReaderText from '../containers/ReaderText';
import ReaderState from '../containers/ReaderState';

const Reader = () => (
    <div className="Reader-app">
        <ReaderHeader />
        <ReaderText />
    </div>
)

export default Reader;