import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextBlock from './TextBlock';
import './ReaderText.css';

class ReaderText extends Component {
    componentDidUpdate() {
        window.scroll(0, 0);
    }
    render() {
        let textBlocks = this.props.blocks.map(b => {
            return <TextBlock
                key={b.index}
                text={b.text}
                textType={b.textType}
            />;
        });
        return (
            <div className="Reader-text">
                {textBlocks}
            </div>
        );
    }
}

ReaderText.propTypes = {
    textBlocks: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            textType: PropTypes.string.isRequired
        })
    )
}

export default ReaderText;