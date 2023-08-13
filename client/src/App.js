import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import Board from './components/Board';

function App() {
  return (
    <Container>
      <Header as="h1" textAlign="center">
        Tic-Tac-Toe
      </Header>
      <Board />
    </Container>
  );
}

export default App;
