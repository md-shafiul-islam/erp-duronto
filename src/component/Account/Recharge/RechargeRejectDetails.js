import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Row, Image, Col } from "react-bootstrap";
import RechargeCustomerInf from "./ActionItem/RechargeCustomerInf";

const RechargeRejectDetails = (params) => {
  const mouseOverAction = () => {
    console.log("IImage Action !!");
  };
  return (
    <React.Fragment>
      <div className="content-wrapper recharge-details">
        <Card>
          <Card.Title>Reject Recharge Details</Card.Title>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="customer-inf">
                  <RechargeCustomerInf />
                </div>
              </Col>
              <Col md={6}>
                <div className="customer-inf">
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Acount Name:</span>
                      <span className="text">Duronto Trip</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Bank Name:</span>
                      <span className="text">Bank Aisa</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Branch Name:</span>
                      <span className="text">Bogura</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Country:</span>
                      <span className="text">Bangladesh</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Acount No:</span>
                      <span className="text">8418418445</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Acount Type:</span>
                      <span className="text">Genarel Banking</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row className="opening-balance-area">
              <Col md={12}>
                <ListGroup.Item>
                  <span className="title">Opening Balance:</span>
                  <span className="text">4848448484</span>
                </ListGroup.Item>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: 10 }}>#</th>
                      <th>Date</th>
                      <th>Trans. Date</th>
                      <th>Transection Type</th>

                      <th>Transection ID</th>
                      <th>Reffernce Note</th>
                      <th>Amount</th>
                      <th style={{ width: 40 }}>Attach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>30-08-2021</td>
                      <td>29-08-2021</td>
                      <td>Genarel Banking</td>
                      <td>4A84D84V4Z9X4</td>
                      <td>
                        <p className="lead">
                          The height CSS property specifies the height of an
                          element. By default, the property defines the height
                          of the
                        </p>
                      </td>
                      <td>
                        <span className="badge bg-danger">35,000</span>
                      </td>
                      <td>
                        <div className="recharge-image-area">
                          <Image
                            src="/dist/img/photo1.png"
                            thumbnail
                            onMouseOver={() => {
                              mouseOverAction("/uimage/slip.jpg");
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RechargeRejectDetails;
