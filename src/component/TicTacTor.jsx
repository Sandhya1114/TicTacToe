import React, { useState } from "react";


export default function TicTactoe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);
        setIsXTurn(!isXTurn);

        const winnerCombination = checkWinner(newBoard);
        if (winnerCombination) {
            setWinner(newBoard[winnerCombination[0]]);
        }
    };

    const checkWinner = (currentBoard) => {
        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let combo of combinations) {
            const [a, b, c] = combo;
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[b] === currentBoard[c]
            ) {
                return combo;
            }
        }
        return null;
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    return (
        <>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            {winner && <div>{winner} is the winner of this game</div>}
        </>
    );
}
