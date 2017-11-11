import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import ReaderHeader from '../components/ReaderHeader';
import ReaderText from '../components/ReaderText';
import {
    fetchPrevBlocks,
    fetchNextBlocks,
    calculateIndexCheckpoints
} from '../redux/ReduxActions';

class Reader extends Component {
    componentDidMount() {
        // Get user progress, including document metadata
        dispatch(calculateIndexCheckpoints(dispatch, getState()));
    }

    render() {
        const {
            user,
            settings,
            currentDocument,
            textBlocks,
            indexCheckpoints,
            currentTextBlocks
        } = this.props;
        const {
            onPrevClick,
            onNextClick
        } = this.props;
        return (
            <div className="Reader-app">
                <ReaderHeader
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
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
        settings: state.settings,
        currentDocument: state.currentDocument,
        textBlocks: state.textBlocks,
        indexCheckpoints: state.indexCheckpoints,
        currentTextBlocks: state.currentTextBlocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPrevClick: () => dispatch(fetchPrevBlocks()),
        onNextClick: () => dispatch(fetchNextBlocks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);