import React, {useState} from 'react';
import {Modal, Button} from 'semantic-ui-react';

const WinnerModal = ({winner}) => {
  const [open, setOpen] = useState(true)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{winner ? `Player ${winner} won!` : "Tie"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          You can close this modal and restart the game to play again.
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WinnerModal;
