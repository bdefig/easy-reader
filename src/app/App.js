import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as TextEngine from './TextEngine.js';
// import renderHTML from 'react-render-html';
// Or could use html-to-react

class App extends Component {
    constructor(props) {
        super(props);
        this.goPrev = this.goPrev.bind(this);
        this.goNext = this.goNext.bind(this);
        this.state = {
            currentPage: 1,
        };
    }
    goPrev() {
        // console.log('Was: ' + this.state.currentPage);
        // console.log('Now: ' + (this.state.currentPage - 1));
        this.setState({
            currentPage: this.state.currentPage - 1,
        });
    }
    goNext() {
        // console.log('Was: ' + this.state.currentPage);
        // console.log('Now: ' + (this.state.currentPage + 1));
        this.setState({
            currentPage: this.state.currentPage + 1,
        });
    }
    render() {
        return (
            <div className="Reader-app">
                <ReaderHeader
                    onPrevClick={this.goPrev}
                    onNextClick={this.goNext}
                />
                <ReaderText
                    currentTextNumber={this.state.currentPage}
                />
                <ReaderControls/>
            </div>
        );
    }
}

class ReaderHeader extends Component {
    constructor(props) {
        super(props);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }
    handlePrevClick() {
        this.props.onPrevClick();
    }
    handleNextClick() {
        this.props.onNextClick();
    }
    render() {
        return (
            <div className="Reader-header">
                <div className="Reader-buttonWrapper">
                    <button
                        className="Reader-pageButton"
                        onClick={this.handlePrevClick}
                    >
                    &lt;
                    </button>
                </div>
                <div style={{width: 15+'px'}}></div>
                <h1>Easy Reader</h1>
                <div style={{width: 15+'px'}}></div>
                <div className="Reader-buttonWrapper">
                    <button
                        className="Reader-pageButton"
                        onClick={this.handleNextClick}    
                    >
                    &gt;
                    </button>
                </div>
            </div>
        );
    }
}

class ReaderText extends Component {
    constructor(props) {
        super(props);
        this.getText = this.getText.bind(this);
    }
    getText() {
        // TODO: Get some text from TextEngine
        // return TextEngine.getTextNumber(this.props.currentTextNumber);
    }
    render() {
        let viewText = this.getText();
        // return (
        //     <div className="Reader-text">
        //         {renderHTML(viewText)}
        //     </div>
        // );
        return (
            <div className="Reader-text">
                {viewText}
            </div>
        )
    }
}

class ReaderControls extends Component {
    render() {
        return (
            <div className = "Reader-controls">
            </div>
        );
    }
}

export default App;