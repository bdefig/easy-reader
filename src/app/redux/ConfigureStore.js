import {createStore} from 'redux';
import * as CurrentText from './CurrentText';

export const configureStore = () => {
    const store = createStore(CurrentText.reducer);

    return store;
}

export default configureStore;