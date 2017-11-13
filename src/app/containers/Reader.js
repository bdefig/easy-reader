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
            currentDocument,
            textBlocks
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
        currentDocument: state.currentDocument,
        textBlocks: state.textBlocks
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