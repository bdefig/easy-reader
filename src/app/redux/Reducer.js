import { combineReducers } from 'redux';

import { user } from './reducers/UserReducers';
import { currentDocument } from './reducers/CurrentDocumentReducers';
import { textBlocks } from './reducers/TextBlocksReducers';
import { library } from './reducers/LibraryReducers';
import { modal } from './reducers/ModalReducers';

const rootReducer = combineReducers ({
    user,
    currentDocument,
    textBlocks,
    library,
    modal
});

export default rootReducer;