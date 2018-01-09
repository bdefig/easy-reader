import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Reader from './Reader';
import Library from './Library';
import * as AuthenticationHelpers from '../helpers/AuthenticationHelpers';

class App extends Component {
    render() {
        if (AuthenticationHelpers.loggedIn()) {
            return (
                <Switch>
                    <Route path='/library' component={Library} />
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