import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import Banner from './Banner';

var colsMaxs = [5, 11, 17, 23, 29, 35];

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circles: Array(36).fill(null),
            rIsNext: true,
            moves: 0
        };
    }

    render() {
        const winner = calculateWinner(this.state.circles);
        const movesTot = this.state.moves;
        const current = this.state.circles;
        let status = this.setGameStatus(winner, status, movesTot);

        return (
            <div className="connect-4">
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <br></br>
                <div className="game">
                    <div className="game-board">
                        <Board
                            circles={current}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                </div>
                <div className="restart-div">
                    <br></br>
                    <button className="restart" onClick={() => this.restart()}>Restart</button>
                    <br></br>
                </div>
            </div>
        );
    }

    setGameStatus(winner, status, movesTot) {
        if (winner) {
            status = "Winner: " + (!this.state.rIsNext ? 'Red' : 'Yellow');
        }
        else {
            if (movesTot === 36) {
                status = 'It\'s a Tie';
            }
            else
                status = 'Next player: ' + (this.state.rIsNext ? 'Red' : 'Yellow');
        }
        return status;
    }

    restart() {
        colsMaxs = [5, 11, 17, 23, 29, 35];
        this.setState({
            circles: Array(36).fill(null),
            rIsNext: true,
            moves: 0
        });
    }
    handleClick(i) {
        const circles = this.state.circles.slice();
        if (calculateWinner(circles) || circles[i]) {
            return;
        }

        var nextPlayer = this.state.rIsNext ? "Red" : "Yellow";

        var columnIndex = Math.abs(i / 6);
        circles[colsMaxs[columnIndex]] = nextPlayer;
        colsMaxs[columnIndex] -= 1;

        this.setState({
            circles: circles,
            rIsNext: !this.state.rIsNext,
            moves: this.state.moves + 1
        });
    }
}

class Board extends React.Component {
    render() {
        return (
            <div>
                {this.renderLine(0)}
                {this.renderLine(1)}
                {this.renderLine(2)}
                {this.renderLine(3)}
                {this.renderLine(4)}
                {this.renderLine(5)}
            </div>
        );
    }

    renderLine(p) {
        return (
            <div className="board-row">
                {this.renderSquare(p)}
                {this.renderSquare(p + 6)}
                {this.renderSquare(p + 12)}
                {this.renderSquare(p + 18)}
                {this.renderSquare(p + 24)}
                {this.renderSquare(p + 30)}
            </div>
        );
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.circles[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
}

function Square(props) {
    return (
        <button className={`circle ${props.value}`} onClick={props.onClick} />
    );
}

function calculateWinner(circles) {
    for (let z = 0; z < 36; z++) {
        if (((isConsecutiveFour(circles, z, 1) && (isInTheRightQuarter(z, 0) || isInTheRightQuarter(z, 18)))
            || isConsecutiveFour(circles, z, 6)
            || (isConsecutiveFour(circles, z, 7) && isInTheRightQuarter(z, 0))
            || (isConsecutiveFour(circles, z, 5) && isInTheRightQuarter(z, 3))
        ) && circles[z] != null) {
            return true;
        }
    }
    return false;
}

function isConsecutiveFour(circles, index, step) {
    /*
    the step define the interval between the dots: 
    1 for vertical, 5 for positive diagonal, 7 for negative diagonal, and 6 for vertical lines.
    */
    return circles[index] === circles[index + 1 * step]
        && circles[index + 2 * step] === circles[index + 3 * step]
        && circles[index] === circles[index + 3 * step];
}

function isInTheRightQuarter(index, startPosition) {
    return (index === startPosition || index === startPosition + 1 || index === startPosition + 2
        || index === startPosition + 6 || index === startPosition + 7 || index === startPosition + 8
        || index === startPosition + 12 || index === startPosition + 13 || index === startPosition + 14);
}

export default Game;