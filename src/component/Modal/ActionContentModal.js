import React, { useState, useEffect } from "react";
import { Modal} from "react-bootstrap";

const ActionContentModal = (params) => {
  const [show, setShow] = useState(false);
  let { showModal, hideAction } = params;

  useEffect(() => {
    setShow(showModal);
   
  }, [showModal]);

 const onCloseAction = () => {
    setShow(false);
    hideAction(false);
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          onCloseAction();
          hideAction(false);
        }}
        aria-labelledby="action-content"
      >
        <Modal.Header closeButton>
          <Modal.Title className="action-title">{params.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{params.children}</Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ActionContentModal;
