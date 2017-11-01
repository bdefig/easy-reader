import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Root from './app/Root';
import App from './app/App';

// Create Redux store
import configureStore from './app/redux/ConfigureStore';
const {store, actions} = configureStore();

ReactDOM.render(
    <Root store={store} actions={actions} />,
    document.getElementById('root')
);
registerServiceWorker();