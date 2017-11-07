import React from'react';
import { Provider } from 'react-redux';
import configureStore from './redux/ConfigureStore';
import App from './App';

const preloadedState = {
    // TODO: Add state
}

const store = configureStore(preloadedState);

export const Root = ({store, actions}) => {
    return (
        <Provider store={store}>
            <App actions={actions} />
        </Provider>
    );
}

export default Root;