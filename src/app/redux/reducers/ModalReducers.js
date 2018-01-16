import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../ActionTypes';

export function modal(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return Object.assign({}, state, {
                modalType: action.modalType,
                modalProps: action.modalProps
            });
        case HIDE_MODAL:
            return Object.assign({}, state, {
                modalType: null
            });
        default:
            return state;
    }
}