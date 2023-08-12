import React, {useState} from 'react';
import {Button, Grid, Segment, Header, Dimmer, Loader} from 'semantic-ui-react';
import "./Board.scss";
// import WinnerModal from './WinnerModal';


const requestOptions = (body) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const api = "http://127.0.0.1:5000/"

const Board = () => {
  const [status, setStatus] = useState({"currentPlayer": "X"});
  const [matchId, setMatchId] = useState();
  const [loading, setLoading] = useState(false);

  const startNewGame = async () => {
    try {
      setLoading(true);
      const response = await (await fetch(`${api}create`, requestOptions())).json();
      setMatchId(response.matchId)
      setStatus({"currentPlayer": "X"})
    } catch (error) {
      console.error('Error creating new game:', error);
    } finally {
      setLoading(false);
    }
  };
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleClick = async (x, y) => {
    const squareNumber = x * 3 + y + 1;

    try {
      setLoading(true);
      const moveResponse = await (await fetch(`${api}move`, requestOptions({
        "matchId": matchId,
        "playerId": status.currentPlayer,
        "square": {"x": x, "y": y}
      }))).json();
      if (moveResponse.error) {
        console.error('Error handling move:', moveResponse.error);
        return
      }
      const newBoard = board.slice();
      newBoard[squareNumber - 1] = status.currentPlayer;
      setBoard(newBoard);
      const statusResponse = await (await fetch(`${api}status?matchId=${matchId}`)).json()
      setStatus(statusResponse)
    } catch (error) {
      console.error('Error handling move:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSquare = (x, y) => {
    const squareNumber = x * 3 + y + 1;
    return (
      <Button key={squareNumber} disabled={!matchId || status.gameOver} size='big' className="square" onClick={() => handleClick(x, y)}>
        {board[squareNumber - 1]}
      </Button>
    );
  };

  const resetBoard = async () => {
    setBoard(Array(9).fill(null));
    startNewGame();
  }

  const showStatus = () => {
    if (!matchId) {
      return "Game not started"
    }
    if (status.gameOver) {
      return status.winner ? `Winner: ${status.winner}` : "Tie"
    }
    return `Current player: ${status.currentPlayer}`
  }

  return (
    <Segment>
      <Grid columns={3} centered>
        {[0, 1, 2].map((row) => (
          <Grid.Row key={row}>
            {[0, 1, 2].map((col) => renderSquare(row, col))}
          </Grid.Row>
        ))}
      </Grid>
      <Header as="h2" textAlign="center">
        {showStatus()}
      </Header>
      {loading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <>
          <Button content={(!matchId) ? "Start New Game" : "Restart Game"} onClick={() => resetBoard()} />
        </>
        // {status && <WinnerModal winner/>}
      )
      }
    </Segment>
  );
}

export default Board;
