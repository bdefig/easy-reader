import {createStore, bindActionCreators} from 'redux';
import * as CurrentText from './CurrentText';

export const configureStore = () => {
    const store = createStore(CurrentText.reducer);

    const actions = {
        CurrentText: bindActionCreators(
            CurrentText.actions,
            store.dispatch)
    }

    return {store, actions};
}

export default configureStore;