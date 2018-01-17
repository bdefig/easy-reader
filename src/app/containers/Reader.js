import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import {
    UniversalHeader,
    READER_HEADER
} from '../components/UniversalHeader';
import ReaderText from '../components/ReaderText';
import ModalRoot from './ModalRoot';
import {
    fetchBlocks,
    loadInitialReaderState
} from '../redux/thunks/ReaderThunks';
import {
    openReaderMenu,
    debugState
} from '../redux/thunks/ModalThunks';

class Reader extends Component {
    componentDidMount() {
        console.log('Reader mounted!');
        const { loadInitialReaderState } = this.props;
        loadInitialReaderState();
    }

    render() {
        const {
            currentDocument,
            textBlocks,
            modal
        } = this.props;
        const {
            onPrevClick,
            onNextClick,
            showMenu,
            // For debugging only--delete later
            // debugState
        } = this.props;
        return (
            <div className="Reader-app">
                <UniversalHeader
                    headerType={READER_HEADER}
                    title={currentDocument.title}
                    onLeftButtonClick={onPrevClick}
                    onRightButtonClick={onNextClick}
                    onTitleClick={showMenu}
                />
                <ReaderText
                    textBlocks={textBlocks}
                />
                <ModalRoot
                    modalType={modal.modalType}
                    modalProps={modal.modalProps}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentDocument: state.currentDocument,
        textBlocks: state.textBlocks,
        modal: state.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Can add dispatch if needed
        onPrevClick: () => dispatch(fetchBlocks(-1)),
        onNextClick: () => dispatch(fetchBlocks(1)),
        loadInitialReaderState: () => dispatch(loadInitialReaderState()),
        showMenu: () => dispatch(openReaderMenu()),
        // For debugging only--delete later
        debugState: () => dispatch(debugState())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);