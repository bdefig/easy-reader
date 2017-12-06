import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import * as LoginHelpers from '../helpers/LoginHelpers';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: true,
            displayErrors: false,
            errorMessage: {
                name: '',
                email: '',
                password: ''
            },
            shouldShake: false,
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
        const onSubmitSignup = this.props.onSubmitSignup;
        const validity = LoginHelpers.validateSignupForm(event.target);
        if (!validity.isValid) {
            this.setState({
                displayErrors: true,
                errorMessage: Object.assign(this.state.errorMessage, {
                    name: validity.nameError,
                    email: validity.emailError,
                    password: validity.passwordError
                }),
                shouldShake: true
            });
            return;
        } else {
            this.setState({
                displayErrors: false,
                errorMessage: Object.assign(this.state.errorMessage, {
                    name: '',
                    email: '',
                    password: ''
                })
            });
            alert('Submitting Signup: Name: ' + this.state.name + ', Email: ' +  this.state.email + ', Password: ' + this.state.password);
            onSubmitSignup(this.state.name, this.state.email, this.state.password);
        }
    }

    submitLogin(event) {
        event.preventDefault();
        const onSubmitLogin = this.props.onSubmitLogin;
        const validity = LoginHelpers.validateLoginForm(event.target);
        if (!validity.isValid) {
            this.setState({
                displayErrors: true,
                errorMessage: Object.assign(this.state.errorMessage, {
                    email: validity.emailError,
                    password: validity.passwordError
                }),
                shouldShake: true
            });
            return;
        } else {
            this.setState({
                displayErrors: false,
                errorMessage: Object.assign(this.state.errorMessage, {
                    email: '',
                    password: ''
                })
            });
            alert('Submitting Login: Email: ' +  this.state.email + ', Password: ' + this.state.password);
            onSubmitLogin(this.state.email, this.state.password);
        }
    }

    toggleSignup() {
        this.setState((prevState) => {
            return {
                signup: !prevState.signup 
            };
        });
    }

    componentDidUpdate() {
        if (this.state.shouldShake == true) {
            setTimeout(() => this.setState({shouldShake: false}), 1000);
        }
    }

    render() {
        if (this.state.signup) {
            // Return Signup form
            let formClass = "Login-loginForm" + (this.state.displayErrors ? " Login-displayErrors" : "");
            let submitClass = "Login-submit" + (this.state.shouldShake ? " Login-shake" : "");
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
                                required
                                value={this.state.name}
                                onChange={(text) => {
                                    this.setState({ name: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-errorMessage">
                            {this.state.errorMessage.name}
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="email"
                                placeholder="Email"
                                type="email"
                                required
                                value={this.state.email}
                                onChange={(text) => {
                                    this.setState({ email: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-errorMessage">
                            {this.state.errorMessage.email}
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="password"
                                placeholder="Password"
                                type="password"
                                required
                                minLength="6"
                                value={this.state.password}
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-errorMessage">
                            {this.state.errorMessage.password}
                        </div>
                        <input
                            className={submitClass}
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
            let submitClass = "Login-submit" + (this.state.shouldShake ? " Login-shake" : "");
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
                                required
                                value={this.state.email}
                                onChange={(text) => {
                                    this.setState({ email: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-errorMessage">
                            {this.state.errorMessage.email}
                        </div>
                        <div className="Login-loginInput">
                            <input
                                id="password"
                                placeholder="Password"
                                type="password"
                                required
                                value={this.state.password}
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <div className="Login-errorMessage">
                            {this.state.errorMessage.password}
                        </div>
                        <input
                            className={submitClass}
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