import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {
    createUser,
    login
} from '../redux/ReduxActions';
import './Login.css';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    render() {
        const { onSubmitSignup, onSubmitLogin } = this.props;
        return (
            <div className="Login-container">
                <LoginForm
                    onSubmitSignup={onSubmitSignup}
                    onSubmitLogin={onSubmitLogin}
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