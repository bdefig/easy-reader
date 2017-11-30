import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './Login.css';
import LoginForm from '../components/LoginForm';


export default class Login extends Component {
    render() {
        return (
            <div className="Login-container">
                <LoginForm />
            </div>
        );
    }
}

// export default class Login extends Component {
//     constructor(props) {
//         alert('New Login component!');
//         super(props);
//         this.state = {
//             signUp: true
//         };
//         this.switchToLogin = this.switchToLogin.bind(this);
//         this.switchToSignup = this.switchToSignup.bind(this);
//     }

//     switchToLogin() {
//         this.setState({ signup: false });
//     }

//     switchToSignup() {
//         this.setState({ signup: true });
//     }

//     render() {
//         return (
//             <div className="Login-container">
//                 {this.state.signUp ? 
//                     <SignupForm switchToLogin={this.switchToLogin} /> :
//                     <LoginForm switchToSignup={this.switchToSignup} />
//                 }
//             </div>
//         );
//     }
// }