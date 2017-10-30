import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Root from './app/Root';
import App from './app/App';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
