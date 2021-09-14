import React from "react";
import { ListGroup } from "react-bootstrap";

export default function RechargeCustomerInf() {
  return (
    <React.Fragment>
      <ListGroup>
        <ListGroup.Item>
          <span className="title">Client ID:</span>
          <span className="text">GU4848</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="title">Client Name:</span>
          <span className="text">Md. Shafiul Islam</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="title">Client Email:</span>
          <span className="text">shafiul2014bd@gmail.com</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="title">Client Phone:</span>
          <span className="text">01725686029</span>
        </ListGroup.Item>
        <ListGroup.Item className="reject-note">
          <div className="title">Reject Note.</div>
          <div className="text">
            The height CSS property specifies the height of an element. By
            default, the property defines the height of the
          </div>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
}
