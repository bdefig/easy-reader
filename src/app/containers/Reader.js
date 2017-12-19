import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';
import ReaderHeader from '../components/ReaderHeader';
import ReaderText from '../components/ReaderText';
import ModalRoot from './ModalRoot';
import {
    fetchBlocks,
    loadInitialReaderState,
    openMenu,
    debugState
} from '../redux/ReduxActions';

class Reader extends Component {
    componentDidMount() {
        const { loadInitialReaderState } = this.props;
        loadInitialReaderState();
    }

    render() {
        const {
            textBlocks,
            modal
        } = this.props;
        const {
            onPrevClick,
            onNextClick,
            showMenu,
            // For debugging only--delete later
            debugState
        } = this.props;
        return (
            <div className="Reader-app">
                <ReaderHeader
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    showMenu={showMenu}
                    // For debugging only--delete later
                    debugState={debugState}
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
        showMenu: () => dispatch(openMenu()),
        // For debugging only--delete later
        debugState: () => dispatch(debugState())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);