import React from "react";
import { Button, Col, Row, Card} from "react-bootstrap";

const BankApprove = (params) => {
  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12" style={{ margin: "10px auto" }}>
            <Card className="bank-details-content card-primary">
              <Card.Title>
                <span className="bank-title">Bank Account Approve Page</span>
              </Card.Title>

              <Card.Body>
                <Row className="card-pay-row">
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="bankingType">
                      Banking Category/Type
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="accountName">
                      Account Name.{" "}
                    </label>
                    <span className="bank-inf">Account Name</span>
                  </Col>
                </Row>
                <Row className="card-pay-row">
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="bankName">
                      Bank Name.{" "}
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="branchName">
                      Branch Name.{" "}
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="accountNumber">
                      Account Number.{" "}
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>

                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="country">
                      Country
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="accountNumber">
                      Add User.{" "}
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>

                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="country">
                      Approve User
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="accountNumber">
                      Balance
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>

                  <Col md={6} className="bank-inf-area">
                    <label className="form-label" htmlFor="country">
                      Active Status
                    </label>
                    <span className="bank-inf">Banking Category/Type</span>
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={{ span: 4, offset: 8 }} className="bank-inf-area">
                    <label className="form-label" htmlFor="country">
                      <Button>Active Status</Button>
                    </label>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BankApprove;
