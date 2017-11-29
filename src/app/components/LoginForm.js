import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
        return (
            <form className="Login-loginForm">
                <div className="Login-loginInput">
                    <input
                        placeholder="Email"
                        type="email"
                        onChange={(text) => {
                            this.setState({ email: text.target.value })
                        }}
                    />
                </div>
                <div className="Login-loginInput">
                    <input
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
                <div className="Login-noAccount">
                    Don't have an account? <a>Sign up</a>
                </div>
            </form>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    render() {
        return (
            <form className="Login-loginForm">
                <div className="Login-loginInput">
                    <input
                        placeholder="Full Name"
                        type="text"
                        onChange={(text) => {
                            this.setState({ name: text.target.value })
                        }}
                    />
                </div>
                <div className="Login-loginInput">
                    <input
                        placeholder="Email"
                        type="email"
                        onChange={(text) => {
                            this.setState({ email: text.target.value })
                        }}
                    />
                </div>
                <div className="Login-loginInput">
                    <input
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
                <div className="Login-noAccount">
                    Already have an account? <a>Log in</a>
                </div>
            </form>
        );
    }
}

export { LoginForm, SignupForm };

// const LoginInput = ({ placeholder }) => {
//     return (
//         <div className="Login-loginInput">
//             <input placeholder={placeholder} />
//         </div>
//     );
// }

// export default LoginForm;