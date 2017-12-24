import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Library.css';
import SimpleHeader from '../components/SimpleHeader';
import LibraryMain from '../components/LibraryMain';
import ModalRoot from './ModalRoot';
import {

} from '../redux/ReduxActions';

class Library extends Component {
    render() {
        return (
            <div className="Library-container">
                <SimpleHeader
                    showMenu={showMenu}
                />
                <LibraryMain />
                <ModalRoot
                    modalType={modal.modalType}
                    modalProps={modal.modalProps}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Library);