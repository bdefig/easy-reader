import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import ReaderHeader from '../components/ReaderHeader';
import ReaderText from '../components/ReaderText';
import {
    fetchPrevBlocks,
    fetchNextBlocks,
    fetchCurrentDocument,
    calculateIndexCheckpoints
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
        const { onNextClick, fetchCurrentDocument, calculateIndexCheckpoints } = this.props;
        console.log(this.props.currentDocument);
        fetchCurrentDocument()
        .then(calculateIndexCheckpoints)
        .then(onNextClick());
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
        // Can add dispatch if needed
        onPrevClick: () => dispatch(fetchPrevBlocks()),
        onNextClick: () => dispatch(fetchNextBlocks()),
        fetchCurrentDocument: () => dispatch(fetchCurrentDocument()),
        calculateIndexCheckpoints: () => dispatch(calculateIndexCheckpoints())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);