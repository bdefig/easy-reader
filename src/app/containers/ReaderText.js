import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrevBlocks, getNextBlocks } from '../actions'
import ReaderTextArea from '../components/ReaderTextArea';

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
        onPrevClick: () => {
            dispatch()
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);