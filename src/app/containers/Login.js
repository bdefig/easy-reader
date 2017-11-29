import React, { Component } from 'react';
import './Login.css';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
    render() {
        return(
            <div className="Login-container">
                <LoginForm />
            </div>
        );
    }
}