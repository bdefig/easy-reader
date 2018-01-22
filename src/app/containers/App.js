import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Reader from './Reader';
import LibraryContainer from './LibraryContainer';
import BookshelfContainer from './BookshelfContainer';
import * as AuthenticationHelpers from '../helpers/AuthenticationHelpers';

class App extends Component {
    render() {
        if (AuthenticationHelpers.loggedIn()) {
            return (
                <Switch>
                    <Route exact path='/bookshelf' component={BookshelfContainer} />
                    <Route exact path='/library' component={LibraryContainer} />
                    <Route exact path='/' component={Reader} />
                </Switch>
            )
        } else {
            return (
                <Redirect to='/login' />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps
)(App);