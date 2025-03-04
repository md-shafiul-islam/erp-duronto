import React, { useState } from "react";
import { Modal, Image  } from "react-bootstrap";

const ImageViewModal = ({ showModal, location, hideAction }) => {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          hideAction(false);
        }}
        // dialogClassName="modal-100w"
        aria-labelledby="image-view-modal"
        fullscreen="lg-down"
        className="image-modal-container"
      >
        <Modal.Body className="modal-image-area">
          <Image className="modal-image" src={location} thumbnail />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ImageViewModal;
