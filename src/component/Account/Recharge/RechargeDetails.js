import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Row, Image, Col } from "react-bootstrap";
import * as Yup from "yup";
import { isFieldError } from "../../../utils/helper/esFunc";

const RechargeDetails = (params) => {
  const [displayApprove, setDisplayApprove] = useState(false);

  useEffect(() => {
    console.log("Recharge Details Init Props, ", params);
    let spliPath = params.location.pathname.split("/");
    console.log("Recharge Details Init Props, Split path  ", spliPath);

    if (Array.isArray(spliPath)) {
      if (spliPath.includes("approve")) {
        setDisplayApprove(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mouseOverAction = () => {
    console.log("IImage Action !!");
  };

  const validationScema = () => {
    return Yup.object().shape({
      netAmount: Yup.number().required(
        "Required. Please, Input Received amount."
      ),
      chargeAmount: Yup.number().min(
        0,
        0,
        "Optional. Please, Input only number"
      ),
    });
  };
  return (
    <React.Fragment>
      <div className="content-wrapper recharge-details">
        <Card>
          <Card.Title>Recharge Details</Card.Title>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="customer-inf">
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Transection ID/Code:</span>
                      <span className="text">DT_ADW_CA-9184981797</span>{" "}
                      {/** DT_ADW_CA, CQ, MB, IB  */}
                    </ListGroup.Item>
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
                  </ListGroup>
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
            {displayApprove ? (
              <Formik
                initialValues={{
                  netAmount: "",
                  chargeAmount: "",
                }}
                validationSchema={validationScema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));

                    actions.setSubmitting(false);
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <Row className="card-pay-row">
                      <Col md={5}>
                        <label className="form-label" htmlFor="netAmount">
                          Receive Amount.{" "}
                        </label>
                        <Field
                          placeholder="Receive Amount"
                          name={`netAmount`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`netAmount`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "netAmount"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "netAmount"
                            ).msg
                          }
                        </div>
                      </Col>
                      <Col md={5}>
                        <label className="form-label" htmlFor="chargeAmount">
                          Charge.{" "}
                        </label>
                        <Field
                          placeholder="Charge Amount If have"
                          name={`chargeAmount`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`chargeAmount`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "chargeAmount"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "chargeAmount"
                            ).msg
                          }
                        </div>
                      </Col>
                      <Col md={2}>
                        <label className="form-label" htmlFor="action-btn">
                          &nbsp;{" "}
                        </label>
                        <Button className="form-control" type="submit">
                          Approve
                        </Button>{" "}
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RechargeDetails;
