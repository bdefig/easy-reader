import {
    showModal
} from '../actions/ModalActions';

export function openReaderMenu() {
    return (dispatch, getState) => {
        dispatch(showModal(getState, 'READER_MENU', {}));
    }
}

export function debugState() {
    return (dispatch, getState) => {
        console.log(getState());
    }
}