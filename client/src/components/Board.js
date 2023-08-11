import React, {useState} from 'react';
import {Button, Grid, Segment, Header} from 'semantic-ui-react';
import "./Board.scss";
import WinnerModal from './WinnerModal';


const requestOptions = (body) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

function calculateWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    // Check if anyone is in a winner line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = async (index) => {
    console.log(await fetch(`http://127.0.0.1:5000/status`));
    console.log(await fetch("http://127.0.0.1:5000/move", requestOptions({"message": "This is a MOVE body"})));
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <Button key={index} size='big' className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </Button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetBoard = async () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    console.log(await fetch("http://127.0.0.1:5000/create", requestOptions({"message": "This is a MOVE body"})));
  }

  return (
    <Segment>
      <Grid columns={3} centered>
        {[0, 1, 2].map((row) => (
          <Grid.Row key={row}>{[0, 1, 2].map((col) => renderSquare(row * 3 + col))}</Grid.Row>
        ))}
      </Grid>
      <Header as="h2" textAlign="center">
        {status}
      </Header>
      {status && (
        <Button content="Reset" onClick={() => resetBoard()} />
      )}
      {/* {status && <WinnerModal winner/>} */}
    </Segment>
  );
}

export default Board;
