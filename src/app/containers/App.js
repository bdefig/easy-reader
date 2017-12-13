import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Reader from './Reader';
import * as AuthenticationHelpers from '../helpers/AuthenticationHelpers';

class App extends Component {
    render() {
        return AuthenticationHelpers.loggedIn() ?
            (<Reader />) :
            (<Redirect to="/login" />);
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