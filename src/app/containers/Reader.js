import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import ReaderHeader from '../components/ReaderHeader';
import ReaderText from '../components/ReaderText';
import {
    fetchPrevBlocks,
    fetchNextBlocks,
    fetchCurrentDocument,
    loadInitialReaderState,
    debugState
} from '../redux/ReduxActions';

class Reader extends Component {
    constructor(props) {
        super(props);
        // Get user progress, including document metadata
        // TODO: Fetch current document
        
        
        // TODO: What happens if there is no most recent document?
        // calculateIndexCheckpoints();
    }

    componentDidMount() {
        const { onNextClick, fetchCurrentDocument, calculateIndexCheckpoints, loadInitialReaderState } = this.props;
        // console.log(this.props.currentDocument);
        // fetchCurrentDocument()
        // .then(calculateIndexCheckpoints)
        // .then(onNextClick());
        loadInitialReaderState();
    }

    render() {
        const {
            user,
            currentDocument,
            textBlocks
        } = this.props;
        const {
            onPrevClick,
            onNextClick,
            loadInitialReaderState,
            // For debugging only--delete later
            debugState
        } = this.props;
        return (
            <div className="Reader-app">
                <ReaderHeader
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    // For debugging only--delete later
                    debugState={debugState}
                />
                <ReaderText
                    textBlocks={textBlocks}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentDocument: state.currentDocument,
        textBlocks: state.textBlocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Can add dispatch if needed
        onPrevClick: () => dispatch(fetchPrevBlocks()),
        onNextClick: () => dispatch(fetchNextBlocks()),
        fetchCurrentDocument: () => dispatch(fetchCurrentDocument()),
        loadInitialReaderState: () => dispatch(loadInitialReaderState()),
        // For debugging only--delete later
        debugState: () => dispatch(debugState())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);