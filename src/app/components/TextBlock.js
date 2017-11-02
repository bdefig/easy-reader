import React from 'react';
import PropTypes from 'prop-types';
import './TextBlock.css';

const TextBlock = ({ text, textType }) => {
    if (textType === 'heading') {
        return ( <h3 className="Reader-textBlock">{this.props.text}</h3> );
    } else {
        return ( <p className="Reader-textBlock">{this.props.text}</p> );
    }
}

TextBlock.propTypes = {
    text: PropTypes.string.isRequired,
    textType: PropTypes.string.isRequired
}

export default TextBlock;