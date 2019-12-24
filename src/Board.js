import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.5
	};

	constructor(props) {
		super(props);

		this.state = {
			hasWon: false,
			board: this.createBoard()
		};

		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	createBoard() {
		let board = [];
		let rowCount = this.props.nrows;

		while (rowCount > 0) {
			let newArr = [];
			for (let i = 0; i < this.props.ncols; i++) {
				let rndFloat = parseFloat(Math.random().toFixed(1));
				if (rndFloat <= this.props.chanceLightStartsOn) {
					newArr.push(true);
				} else {
					newArr.push(false);
				}
			}
			board.push(newArr);
			rowCount -= 1;
		}

		return board;
	}

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split("-").map(Number);

		function flipCell(y, x) {
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		flipCell(y, x);
		flipCell(y - 1, x);
		flipCell(y + 1, x);
		flipCell(y, x - 1);
		flipCell(y, x + 1);

		let hasWon = false;

		if (
			board.every(arr => {
				arr.every(cell => cell === false);
			})
		) {
			hasWon = true;
		}

		this.setState({ board: board, hasWon: hasWon });
	}

	render() {
		return (
			<div>
				{this.state.hasWon ? (
					<h1>You win!</h1>
				) : (
					<div>
						<h1>Lights Out</h1>
						<table className="board">
							<tbody>
								{this.state.board.map((row, index1) => {
									return (
										<tr key={index1}>
											{row.map((cell, index2) => {
												return (
													<Cell
														isLit={cell}
														flipCellsAroundMe={this.flipCellsAround}
														coords={`${index1}-${index2}`}
														key={`${index1}-${index2}`}
													/>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}

export default Board;
