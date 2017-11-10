import React, { Component } from 'react';
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
        dispatch(calculateIndexCheckpoints(getState()));
    }

    render() {
        const {
            user,
            settings,
            document,
            blocks,
            currentFirstIndex,
            currentLastIndex
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
                    blocks={blocks}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        settings: state.settings,
        document: state.document,
        blocks: state.blocks,
        currentFirstIndex: state.currentFirstIndex,
        currentLastIndex: state.currentLastIndex
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