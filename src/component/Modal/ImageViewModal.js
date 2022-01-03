/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { Modal, Image  } from "react-bootstrap";


const ImageViewModal = ({ showModal, location, hideAction  }) => {
  const [show, setShow] = useState(false);

  console.log("ImageViewModal, ", showModal, " locs ", location, " action ", hideAction);
  useEffect(() => {
    setShow(showModal);
  }, []);

  return (
    <React.Fragment>
      <Modal
        show={showModal}
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
          <Image className="modal-image image-container" src={location ? location : `/uimage/not-found.jpg`} thumbnail  />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ImageViewModal;
