import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Root from './app/containers/Root';

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
registerServiceWorker();