import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../ActionTypes';

export function showModal(state, modalType, modalProps) {
    return {
        type: SHOW_MODAL,
        modalType: modalType,
        modalProps: modalProps
    }
}

export function hideModal(state) {
    return {
        type: HIDE_MODAL
    }
}