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
        }
        console.log('Submitting Signup');
        console.log('Name: ' + this.state.name + ', Email: ' +  this.state.email + ', Password: ' + this.state.password);
    }

    submitLogin(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({
                displayErrors: true
            });
            return;
        }
        console.log('Submitting Login');
        console.log('Email: ' +  this.state.email + ', Password: ' + this.state.password);
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
            return (
                <div className="Login-loginFormBox">
                    <form
                        className="Login-loginForm"
                        onSubmit={this.submitSignup}
                    >
                        <div className="Login-loginInput">
                            <input
                                id="name"
                                placeholder="Full Name"
                                type="text"
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
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <input
                            className="Login-submit"
                            type="submit"
                            value="Sign Up"
                            onClick={() => {console.log(this.state)}}
                        />
                    </form>
                    <div className="Login-noAccount">
                        Already have an account? <a onClick={this.toggleSignup}>Log in</a>
                    </div>
                </div>
            );
        } else {
            // Return Login form
            return (
                <div className="Login-loginFormBox">
                    <form
                        className="Login-loginForm"
                        onSubmit={this.submitLogin}
                    >
                        <div className="Login-loginInput">
                            <input
                                id="email"
                                placeholder="Email"
                                type="email"
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
                                onChange={(text) => {
                                    this.setState({ password: text.target.value })
                                }}
                            />
                        </div>
                        <input
                            className="Login-submit"
                            type="submit"
                            value="Log In"
                            onClick={() => {console.log(this.state)}}
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

// class LoginForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: ''
//         };
//         this.switchToSignup = this.switchToSignup.bind(this);
//     }

//     switchToSignup() {
//         alert('Switching to signup');
//         this.props.switchToSignup();
//     }

//     render() {
//         return (
//             <form className="Login-loginForm">
//                 <div className="Login-loginInput">
//                     <input
//                         placeholder="Email"
//                         type="email"
//                         onChange={(text) => {
//                             this.setState({ email: text.target.value })
//                         }}
//                     />
//                 </div>
//                 <div className="Login-loginInput">
//                     <input
//                         placeholder="Password"
//                         type="password"
//                         onChange={(text) => {
//                             this.setState({ password: text.target.value })
//                         }}
//                     />
//                 </div>
//                 <input
//                     className="Login-submit"
//                     type="submit"
//                     value="Log In"
//                     onClick={() => {console.log(this.state)}}
//                 />
//                 <div className="Login-noAccount">
//                     Don't have an account? <button onClick={this.switchToSignup}>Sign up</button>
//                 </div>
//             </form>
//         );
//     }
// }

// class SignupForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             email: '',
//             password: ''
//         };
//         this.switchToLogin = this.switchToLogin.bind(this);
//     }

//     switchToLogin() {
//         alert('Switching to login');
//         this.props.switchToLogin();
//     }

//     render() {
//         return (
//             <form className="Login-loginForm">
//                 <div className="Login-loginInput">
//                     <input
//                         placeholder="Full Name"
//                         type="text"
//                         onChange={(text) => {
//                             this.setState({ name: text.target.value })
//                         }}
//                     />
//                 </div>
//                 <div className="Login-loginInput">
//                     <input
//                         placeholder="Email"
//                         type="email"
//                         onChange={(text) => {
//                             this.setState({ email: text.target.value })
//                         }}
//                     />
//                 </div>
//                 <div className="Login-loginInput">
//                     <input
//                         placeholder="Password"
//                         type="password"
//                         onChange={(text) => {
//                             this.setState({ password: text.target.value })
//                         }}
//                     />
//                 </div>
//                 <input
//                     className="Login-submit"
//                     type="submit"
//                     value="Sign Up"
//                     onClick={() => {console.log(this.state)}}
//                 />
//                 <div className="Login-noAccount">
//                     Already have an account? <button onClick={this.switchToLogin}>Log in</button>
//                 </div>
//             </form>
//         );
//     }
// }

// export { LoginForm, SignupForm };