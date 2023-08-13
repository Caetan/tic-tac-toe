import React, {useState} from 'react';
import {Button, Grid, Segment, Header, Dimmer, Loader, Message} from 'semantic-ui-react';
import "./Board.scss";
import WinnerModal from './WinnerModal';


const requestOptions = (body) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const api = "http://0.0.0.0:5000/"

const Board = () => {
  const [status, setStatus] = useState({"currentPlayer": "X"});
  const [matchId, setMatchId] = useState();
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [error, setError] = useState();

  const startNewGame = async () => {
    setError();
    try {
      setLoading(true);
      const response = await (await fetch(`${api}create`, requestOptions())).json();
      if (response.error) {
        console.error("Error creating new game:", response.error);
        setError(`Error creating new game: ${response.error}`);
        return
      }
      setMatchId(response.matchId)
      setStatus({"currentPlayer": "X"})
    } catch (error) {
      console.error("Error creating new game:", error);
      setError(`Error creating new game: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (x, y) => {
    const squareNumber = x * 3 + y + 1;
    setError();

    try {
      setLoading(true);
      const moveResponse = await (await fetch(`${api}move`, requestOptions({
        "matchId": matchId,
        "playerId": status.currentPlayer,
        "square": {"x": x, "y": y}
      }))).json();
      if (moveResponse.error) {
        console.error("Error handling move:", moveResponse.error);
        setError(`Error handling move: ${moveResponse.error}`);
        return
      }
      const newBoard = board.slice();
      newBoard[squareNumber - 1] = status.currentPlayer;
      setBoard(newBoard);
      const statusResponse = await (await fetch(`${api}status?matchId=${matchId}`)).json()
      setStatus(statusResponse)
      if (statusResponse.error) {
        console.error("Error getting the status:", statusResponse.error);
        setError(`Error getting the status: ${statusResponse.error}`);
        return
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const renderSquare = (x, y) => {
    const squareNumber = x * 3 + y + 1;
    return (
      <Button key={squareNumber} disabled={!matchId || status.gameOver} size="big" className="square" onClick={() => handleClick(x, y)}>
        {board[squareNumber - 1]}
      </Button>
    );
  };

  const resetBoard = async () => {
    setBoard(Array(9).fill(null));
    startNewGame();
    setError();
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
        {error && (
          <Message error>{error}</Message>
        )}
      </Header>
      {loading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <>
          <Button primary content={(!matchId) ? "Start New Game" : "Restart Game"} onClick={() => resetBoard()} />
          {status.gameOver && <WinnerModal winner={status.winner} />}
        </>
      )
      }
    </Segment>
  );
}

export default Board;
