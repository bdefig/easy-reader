import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import ReaderHeader from '../components/ReaderHeader';
import ReaderText from '../components/ReaderText';
import {
    fetchPrevBlocks,
    fetchNextBlocks,
    loadInitialReaderState,
    debugState
} from '../redux/ReduxActions';

class Reader extends Component {
    componentDidMount() {
        const { loadInitialReaderState } = this.props;
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
        loadInitialReaderState: () => dispatch(loadInitialReaderState()),
        // For debugging only--delete later
        debugState: () => dispatch(debugState())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);