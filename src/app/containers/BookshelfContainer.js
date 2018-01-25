import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {
    UniversalHeader,
    BOOKSHELF_HEADER
} from '../components/UniversalHeader';
import Bookshelf from '../components/Bookshelf';
import ModalRoot from './ModalRoot';
import {
    openReaderMenu
} from '../redux/thunks/ModalThunks';
import {
    loadInitialBookshelfState,
    onSwitchToBookshelfDocument,
    onRemoveBookshelfDocument
} from '../redux/thunks/BookshelfThunks';

class BookshelfContainer extends Component {
    componentDidMount() {
        this.props.loadInitialBookshelfState();
    }

    render() {
        return (
            <div>
                <UniversalHeader
                    headerType={BOOKSHELF_HEADER}
                    onTitleClick={this.props.showMenu}
                />
                <Bookshelf
                    isFetching={this.props.bookshelf.isFetching}
                    documentProgresses={this.props.bookshelf.documentProgresses}
                    onSwitchToBookshelfDocument={this.props.onSwitchToBookshelfDocument}
                    onRemoveBookshelfDocument={this.props.onRemoveBookshelfDocument}
                />
                <ModalRoot
                    modalType={this.props.modal.modalType}
                    modalProps={this.props.modal.modalProps}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bookshelf: state.bookshelf,
        modal: state.modal
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showMenu: () => dispatch(openReaderMenu()),
        loadInitialBookshelfState: () => dispatch(loadInitialBookshelfState()),
        onSwitchToBookshelfDocument: (bookshelfDocument) => dispatch(onSwitchToBookshelfDocument(bookshelfDocument, ownProps.history)),
        onRemoveBookshelfDocument: (bookshelfDocument) => dispatch(onRemoveBookshelfDocument(bookshelfDocument))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookshelfContainer);