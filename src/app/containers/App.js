import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Reader from './Reader';

export default class App extends Component {
    isLoggedIn() {
        return false;
    }

    render() {
        if (this.isLoggedIn()) {
            return (
                <Reader />
            );
        } else {
            return (
                <Redirect to='/login' />
            );
        }
    }
}

// const App = () => (
//     <div>
//         <Reader />
//     </div>
// )

// export default App;