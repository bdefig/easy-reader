import React, { Component } from'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import configureStore from '../redux/ConfigureStore';
import Login from './Login';
import App from './App';

const preloadedState = {
    user: {
        isFetching: false,
        userID: localStorage.userID ? localStorage.userID : null,
        name: localStorage.name ? localStorage.name : null,
        token: localStorage.token ? localStorage.token : null,
        authenticationErrorMessage: null,
        settings: {
            minWordCount: 500
        },
    },
    currentDocument: {
        isFetching: false,
        isRemoving: false,
        _id: '',
        title: '',
        author: '',
        wordCountPerBlock: [],
        currentIndex: 0,
        indexCheckpoints: []
    },
    textBlocks: {
        isFetching: false,
        blocks: []
    },
    bookshelf: {
        isFetching: false,
        documentProgresses: []
    },
    library: {
        isFetching: false,
        documents: []
    },
    modal: {
        modalType: null,
        modalProps: {}
    }
};

const store = configureStore(preloadedState);

export default class Root extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/' component={App} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}