import { combineReducers } from 'redux';

import { authentication } from './reducers/AuthenticationReducers';
import { user } from './reducers/UserReducers';
import { currentDocument } from './reducers/CurrentDocumentReducers';
import { textBlocks } from './reducers/TextBlocksReducers';
import { bookshelf } from './reducers/BookshelfReducers';
import { library } from './reducers/LibraryReducers';
import { modal } from './reducers/ModalReducers';

const rootReducer = combineReducers ({
    authentication,
    user,
    currentDocument,
    textBlocks,
    bookshelf,
    library,
    modal
});

export default rootReducer;