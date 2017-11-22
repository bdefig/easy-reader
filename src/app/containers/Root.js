import React, { Component } from'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/ConfigureStore';
import App from './App';

const preloadedState = {
    user: {
        isFetching: false,
        userID: '59f3be1f0a510c84f9acd76a',
        username: 'bryce1',
        sessionToken: null,
        settings: {
            minWordCount: 500
        },
    },
    // currentDocument: {
    //     isFetching: false,
    //     documentID: '59e6a95d2c748251c2615c78',
    //     title: 'Brothers Test Part I',
    //     author: 'Fyodor Dostoyevsky',
    //     wordCountPerBlock: [ 2, 7, 5, 215, 451, 348, 315, 9, 110, 473, 244, 470, 9, 190, 167, 379, 11, 218, 48, 976, 235, 69, 39, 96, 40, 118, 6, 702, 556, 271, 27, 93, 245, 320, 299, 169, 72, 37, 499, 15, 189, 13, 3, 291, 380, 379, 158, 156, 316, 196, 278, 262, 55, 111, 74, 336, 330, 15, 260, 34, 5, 7, 210, 232, 76, 47, 27, 43, 19, 27, 33, 42, 44, 17, 6, 18, 28, 9, 30, 34, 23, 7, 39, 15, 14, 14, 13, 8, 21, 23, 111, 22, 12, 21, 63, 98, 53, 20, 24, 53, 42, 36, 25, 50, 21, 23, 5, 135, 228, 193, 175, 19, 16, 43, 15, 388, 8, 7, 272, 29, 127, 16, 254, 60, 16, 55, 36, 45, 101, 176, 14, 13, 56, 4, 201, 8, 260, 7, 27, 51, 13, 75, 30, 106, 16, 28, 116, 134, 7, 74, 185, 47, 99, 391, 34, 34, 51, 48, 91, 13, 79, 5, 262, 185, 16, 209, 39, 149, 2, 9, 2, 139, 134, 89, 108, 17, 38, 5, 29, 18, 66, 13, 21, 6, 22, 5, 5, 6, 9, 6, 9, 229, 29, 18, 4, 13, 66, 6, 43, 22, 5, 23, 9, 7, 52, 52, 12, 81, 15, 131, 37, 21, 33, 23, 37, 39, 79, 12, 32, 29, 49, 13, 29, 116, 24, 65, 36, 77, 83, 13, 3, 7, 5, 116, 4, 20, 191, 14, 1, 71, 92, 26, 154, 18, 197, 16, 118, 47, 292, 4, 10, 25, 154, 27, 147, 45, 29, 8, 8, 124, 27, 68, 51, 8, 24, 104, 61, 22, 30, 10, 26, 159, 14, 11, 111, 172, 28, 375, 149, 89, 47, 8, 250, 37, 91, 11, 982, 12, 14, 10, 39, 83, 80, 279, 20, 40, 8, 242, 114, 42, 17, 12, 45, 88, 31, 38, 77, 238, 37, 5, 3, 20, 22, 14, 10, 5, 27, 17, 86, 26, 79, 111, 83, 34, 84, 356, 38, 3, 24, 5, 90, 295, 126, 122, 41, 65, 11, 48, 81, 5, 21, 54, 67, 16, 35, 11, 105, 15, 62, 46, 31, 46, 61, 73, 12, 66, 11, 79, 36, 11, 7, 47, 16, 8, 50, 23, 9, 78, 24, 6, 59, 2, 124, 12, 54, 90, 168, 9, 62, 2, 16, 5, 4, 3, 14, 7, 70, 2, 10, 121, 8, 6, 41, 13, 6, 24, 26, 26, 97, 14, 103, 15, 143, 7, 174, 25, 549, 14, 19, 10, 21, 29, 6, 35, 171, 17, 22, 65, 10, 12, 53, 19, 229, 20, 9, 37, 53, 10, 20, 10, 88, 4, 75, 159, 24, 5, 143, 52, 312, 147, 144, 29, 17, 23, 27, 217, 74, 146, 55, 15, 21, 31, 42, 9, 82, 7, 18, 10, 104, 13, 7, 353, 239, 5, 66, 208, 7, 14, 152, 70, 14, 34, 111, 14, 30, 139, 102, 33, 8, 17, 11, 9, 33, 13, 8, 16, 9, 4, 6, 21, 22, 4, 6, 359, 10, 22, 14, 592, 127, 264, 229, 8, 6, 4, 23, 290, 306, 3, 690, 484, 243, 89, 69, 72, 9, 264, 280, 128, 121, 177, 35, 35, 45, 11, 32, 10, 65, 16, 10, 85, 159, 14, 14, 63, 10, 266, 14, 81, 13, 27, 13, 23, 16, 157, 15, 65, 38, 59, 13, 74, 11, 78, 77, 75, 8, 74, 37, 191, 165, 46, 3, 306, 9, 497, 32, 8, 62, 9, 9, 3, 3, 136, 3, 1, 5, 510, 229, 104, 138, 22, 8, 4, 10, 87, 13, 84, 419, 92, 29, 33, 13, 349, 47, 99, 272, 46, 9, 8, 28, 12, 8, 15, 162, 132, 111, 325, 18, 36, 282, 39, 76, 12, 22, 1, 23, 1, 19, 4, 20, 5, 3, 28, 387, 23, 8, 338, 19, 41, 3, 32, 38, 30, 1, 5, 26, 54, 2, 9, 6, 16, 1, 113, 7, 252, 2, 71, 6, 15, 9, 81, 5, 39, 33, 32, 2, 32, 11, 72, 14, 12, 2, 12, 4, 7, 5, 62, 18, 16, 7, 3, 203, 93, 69, 5, 17, 34, 74, 7, 60, 10, 47, 40, 223, 13, 29, 305, 17, 7, 4, 2, 9, 22, 20, 48, 8, 5, 45, 10, 253, 27, 94, 348, 4, 165, 52, 19, 74, 27, 22, 15, 26, 18, 17, 67, 13, 4, 106, 29, 27, 10, 15, 9, 15, 12, 7, 20, 12, 55, 16, 247, 59, 112, 31, 5, 6, 281, 36, 17, 23, 14, 21, 7, 119, 342, 5, 31, 61, 25, 29, 2, 25, 6, 22, 19, 7, 72, 4, 149, 6, 235, 5, 70, 6, 6, 17, 75, 25, 7, 2, 60, 5, 5, 2, 15, 5, 3, 3, 14, 2, 4, 2, 3, 7, 57, 8, 6, 8, 6, 5, 29, 11, 6, 19, 23, 16, 19, 1, 36, 2, 37, 7, 47, 1, 139, 4, 107, 6, 28, 9, 19, 9, 22, 29, 52, 13, 19, 12, 72, 8, 609, 119, 43, 59, 57, 36, 21, 4, 111, 11, 60, 24, 16, 66, 7, 13, 16, 15, 31, 11, 9, 11, 46, 113, 6, 21, 8, 35, 11, 57, 53, 28, 6, 20, 21, 81, 31, 8, 13, 13, 28, 4, 27, 2, 29, 45, 6, 11, 11, 43, 30, 13, 23, 14, 10, 4, 11, 38, 60, 13, 41, 10, 35, 13, 14, 3, 7, 4, 50, 1, 28, 2, 28, 6, 12, 45, 24, 22, 19, 33, 13, 35, 24, 32, 5, 58, 21, 45, 33, 4, 282, 144, 65, 172, 18, 177, 9, 23, 17, 229, 21, 9, 158, 21, 9, 1, 17, 22, 4, 116, 10, 24, 66, 218, 12, 19, 48, 54, 9, 112, 22, 645, 101, 23, 56, 10, 20, 196, 19, 55, 43, 20, 16, 22, 41, 34, 24, 16, 99, 10, 34, 3, 49, 90, 20, 52, 12, 31, 35, 13, 18, 16, 20, 7, 22, 4, 19, 19, 24, 17, 17, 21, 18, 11, 37, 14, 20, 44, 18, 14, 10, 5, 48, 14, 35, 21, 19, 15, 5, 75, 5, 11, 63, 51, 14, 2, 211, 14, 2, 4, 4, 8, 154, 135, 6, 244, 47, 20, 34, 87, 7, 70, 23, 13, 254, 12, 37, 1, 40, 38, 261, 134, 169, 127, 198, 184, 62, 135, 42, 12, 6, 113 ],
    //     currentIndex: 0,
    //     indexCheckpoints: []
    // },
    currentDocument: {
        isFetching: false,
        documentID: '',
        title: '',
        author: '',
        wordCountPerBlock: [],
        currentIndex: 0,
        indexCheckpoints: []
    },
    textBlocks: {
        isFetching: false,
        blocks: []
    }
};

const store = configureStore(preloadedState);

export default class Root extends Component {
    render() {
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

// const Root = (store) => {
//     return (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// }
// 
// export default Root;