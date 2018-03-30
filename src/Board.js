import React, { Component } from 'react';
import Line from './Line';

class Board extends Component {
    render() {
        return (
            this.props.circles.reduce((acc, val, idx) => {
                const righe = 6;
                const pos = idx % righe;
                acc[pos] = (acc[pos] || []).concat(idx);
                return acc;
            }, []).map((indexes) =>
                <div className="board-row">
                    <Line onClick={this.props.onClick} circles={this.props.circles} indexes={indexes} />
                </div>)
        );
    }
}

export default Board;