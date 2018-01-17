import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrevBlocks, getNextBlocks } from '../actions'
import ReaderTextArea from '../components/ReaderTextArea';

class Reader extends Component {
    constructor(props) {
        super(props);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    componentDidMount() {
        // Do things like calculate the index checkpoints
    }

    render() {
        return (
            <ReaderTextArea />
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