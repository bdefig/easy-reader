import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextBlock from './TextBlock';
import './ReaderText.css';

export default class ReaderText extends Component {
    componentDidUpdate() {
        window.scroll(0, 0);
    }

    render() {
        let textBlocks = this.props.textBlocks.blocks.map(b => {
            return (
                <TextBlock
                    key={b.index}
                    text={b.text}
                    textType={b.textType}
                />
            );
        });
        if (textBlocks.length) {
            return (
                <div className="Reader-textArea">
                    {textBlocks}
                </div>
            );
        } else {
            // TODO: Add zero state
            return (
                <div className="Reader-textArea">
                </div>
            );
        }
    }
}

ReaderText.propTypes = {
    textBlocks: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        blocks: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                textType: PropTypes.string.isRequired
            })
        )
    })
}