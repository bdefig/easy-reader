import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './ReduxReducers';

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}

// import * as CurrentText from './CurrentText';

// export const configureStore = () => {
//     const store = createStore(CurrentText.reducer);

//     const actions = {
//         CurrentText: bindActionCreators(
//             CurrentText.actions,
//             store.dispatch)
//     }

//     return {store, actions};
// }

// export default configureStore;