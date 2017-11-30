import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: true,
            displayErrors: false,
            name: '',
            email: '',
            password: ''
        };
        this.submitSignup = this.submitSignup.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    submitSignup(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({
                displayErrors: true
            });
            return;
        } else {
            this.setState({
                displayErrors: false
            });
            alert('Submitting Signup: Name: ' + this.state.name + ', Email: ' +  this.state.email + ', Password: ' + this.state.password);
        }
    }

    submitLogin(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({
                displayErrors: true
            });
            return;
        } else {
            this.setState({
                displayErrors: false
            });
            alert('Submitting Login: Email: ' +  this.state.email + ', Password: ' + this.state.password);
        }
    }

    toggleSignup() {
        this.setState((prevState) => {
            return {
                signup: !prevState.signup 
            };
        });
    }

    render() {
        if (this.state.signup) {
            // Return Signup form
            let formClass = "Login-loginForm" + (this.state.displayErrors ? " Login-displayErrors" : "");
            return (
                <div className="Login-loginFormBox">
                    <form
                        className={formClass}
                        onSubmit={this.submitSignup}
                        noValidate
                    >
                        <div className="Login-loginInput">
                            <input
                                id="name"
                                placeholder="Full Name"
                                type="text"
                                value={this.state.name}
                                onChange={(text) => {
                                    this.setState({ name: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="email"
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={(text) => {
                                    this.setState({ email: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="password"
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <input
                            className="Login-submit"
                            type="submit"
                            value="Sign Up"
                        />
                    </form>
                    <div className="Login-noAccount">
                        Already have an account? <a onClick={this.toggleSignup}>Log in</a>
                    </div>
                </div>
            );
        } else {
            // Return Login form
            let formClass = "Login-loginForm" + (this.state.displayErrors ? " Login-displayErrors" : "");
            return (
                <div className="Login-loginFormBox">
                    <form
                        className={formClass}
                        onSubmit={this.submitLogin}
                        noValidate
                    >
                        <div className="Login-loginInput">
                            <input
                                id="email"
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={(text) => {
                                    this.setState({ email: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="password"
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <input
                            className="Login-submit"
                            type="submit"
                            value="Log In"
                        />
                    </form>
                    <div className="Login-noAccount">
                        Don't have an account? <a onClick={this.toggleSignup}>Sign up</a>
                    </div>
                </div>
            );
        }
    }
}