import React from "react";
import { Col, Toast } from "react-bootstrap";

const MsgToast = ({ showAction, show, timeText, headText, message, delay}) => {
    console.log("Toast Action ", show, " MSG ", message)
  return (
    <Col xs={6}>
      <Toast
        onClose={() => showAction(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{headText}</strong>
          <small>{timeText}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </Col>
  );
};

export default MsgToast;
