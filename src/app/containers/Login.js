import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Redirect
} from 'react-router-dom';
import {
    createUser,
    login
} from '../redux/thunks/LoginThunks';
import './Login.css';
import LoginForm from '../components/LoginForm';
import * as AuthenticationHelpers from '../helpers/AuthenticationHelpers';

class Login extends Component {
    render() {
        const { onSubmitSignup, onSubmitLogin } = this.props;
        const authenticationErrorMessage = this.props.user.authenticationErrorMessage;
        return AuthenticationHelpers.loggedIn() ?
            (<Redirect to="/" />) :
            (
                <div className="Login-container">
                    <LoginForm
                        onSubmitSignup={onSubmitSignup}
                        onSubmitLogin={onSubmitLogin}
                        authenticationErrorMessage={authenticationErrorMessage}
                    />
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentDocument: state.currentDocument,
        textBlocks: state.textBlocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSignup: (name, email, password) => dispatch(createUser(name, email, password)),
        onSubmitLogin: (email, password) => dispatch(login(email, password))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);