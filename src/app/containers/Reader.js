import React from 'react';
import './Reader.css';
import ReaderHeader from './ReaderHeader';
import ReaderText from '../containers/ReaderText';
import ReaderState from '../containers/ReaderState';

class Reader extends Component {
    constructor(props) {
        super(props);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    componentDidMount() {
        // Do things like calculate the index checkpoints
    }

    render() {
        const {
            user,
            settings,
            document,
            blocks,
            currentFirstIndex,
            currentLastIndex
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
                    blocks={blocks}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        settings: state.settings,
        document: state.document,
        blocks: state.blocks,
        currentFirstIndex: state.currentFirstIndex,
        currentLastIndex: state.currentLastIndex
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPrevClick: () => dispatch(fetchPrevBlocks()),
        onNextClick: () => dispatch(fetchNextBlocks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reader);

// const Reader = () => (
//     <div className="Reader-app">
//         <ReaderHeader />
//         <ReaderText />
//     </div>
// )

// export default Reader;