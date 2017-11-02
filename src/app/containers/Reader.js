import React, { Component } from 'react';
import { connect } from 'react-redux';

export const Reader = (props) => {
    return (
        // Header here
        // Text blocks here
    );
}

const mapStateToReader = (state) => {
    return {
        user: state.user,
        settings: state.settings,
        document: state.document,
        blocks: state.blocks,
        currentFirstIndex: state.currentFirstIndex,
        currentLastIndex: state.currentLastIndex
    }
}

export default connect(
    mapStateToReader
)(Reader);