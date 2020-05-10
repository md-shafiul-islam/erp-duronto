import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ModalSubmit = ({ addData }) => (
  <Modal trigger={<Button>Show Modal</Button>} closeIcon>
    <Header icon="archive" content="Archive Old Messages" />
    <Modal.Content>
      <p>Image Uploaded Complete.</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={addData}>
        <Icon name="checkmark" /> Save
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalSubmit;
