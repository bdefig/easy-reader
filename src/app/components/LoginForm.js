import React, { Component } from 'react';
import './LoginForm.css';

export default class LoginForm extends Component {
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
            <div className="Login-loginForm">
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
                <button
                    className="Login-submit"
                    onClick={() => {console.log(this.state)}}
                >
                    Log In
                </button>
            </div>
        );
    }
}

// const LoginInput = ({ placeholder }) => {
//     return (
//         <div className="Login-loginInput">
//             <input placeholder={placeholder} />
//         </div>
//     );
// }

// export default LoginForm;