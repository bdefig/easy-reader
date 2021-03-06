import 'whatwg-fetch';
import AppConfig from '../../AppConfig';
import { httpFetch } from './HTTPThunks';
import {
    requestLibraryDocuments,
    receiveLibraryDocuments
} from '../actions/LibraryActions';
import {
    switchCurrentDocument
} from '../actions/CurrentDocumentActions';
import {
    clearBlocks
} from '../actions/TextBlocksActions';
import {
    updateDocumentProgress      // TODO: Maybe replace this
} from './ReaderThunks';
import {
    calculateIndexCheckpoints
} from '../../helpers/ReaderHelpers';

export function fetchLibraryDocuments() {
    return (dispatch, getState) => {
        const state = getState();
        const userID = state.user.userID;

        state.library.documents.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });

        let titleGreaterThan = (state.library.documents.length ? state.library.documents[state.library.documents.length - 1].title : '');

        const url = AppConfig.baseURL + 'user/' + userID + '/getMoreDocuments?titleGreaterThan=' + titleGreaterThan;

        dispatch(requestLibraryDocuments(getState()));

        return httpFetch(dispatch, getState, 'get', url)
        .then(jsonDocs => {
            if (jsonDocs) {
                dispatch(receiveLibraryDocuments(getState(), jsonDocs));
            } else {
                // No docs were received
                dispatch(receiveLibraryDocuments(getState(), []));
                return Error('No library documents received');
            }
        })
        .catch(err => console.log(err));
    }
}

export function onAddDocumentToBookshelf(libraryDocument, history) {
    return (dispatch, getState) => {
        const documentMetadata = libraryDocument;
        const minWordCount = getState().user.settings.minWordCount;
        const indexCheckpoints = calculateIndexCheckpoints(documentMetadata.wordCountPerBlock, minWordCount);

        dispatch(switchCurrentDocument(getState(), documentMetadata, 0, indexCheckpoints));
        dispatch(updateDocumentProgress(getState(), documentMetadata._id, 0));
        dispatch(clearBlocks(getState()));

        history.push('/');
    }
}