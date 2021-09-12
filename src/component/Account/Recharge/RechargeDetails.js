import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { Field, Form, Formik } from "formik";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Row, Image, Col } from "react-bootstrap";
import * as Yup from "yup";
import {
  getApproveAction,
  getRecchargeDetails,
} from "../../../actions/rechargeAction";
import { isFieldError } from "../../../utils/helper/esFunc";
import {
  BASE_URL,
  EXT_BASE_URL,
  SET_RECHARGE_PENDINGG_APPROVE,
} from "../../../actions/types";
import MsgToast from "../../Layout/EsItem/MsgToast";

const RechargeDetails = (params) => {
  const dispatch = useDispatch();

  const [displayApprove, setDisplayApprove] = useState(false);
  console.log("Recharge Details Init Props, ", params);

  let { recharge } = params;

  useEffect(() => {
    let spliPath = params.location.pathname.split("/");
    console.log("Recharge Details Init Props, Split path  ", spliPath);

    const id = params.match.params && params.match.params.id;

    params.getRecchargeDetails(id);

    if (Array.isArray(spliPath)) {
      if (spliPath.includes("approve")) {
        setDisplayApprove(true);
      }
    }
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

  const toastToggleAction = (type) => {
    if (type !== undefined) {
      dispatch({
        type: SET_RECHARGE_PENDINGG_APPROVE,
        payload: type,
      });
    }
  };
  return (
    <React.Fragment>
      <div className="content-wrapper recharge-details">
        <Row>
          <MsgToast
            headText="Recharge"
            message="Recharge Approved"
            show={params.approveStatus}
            showAction={toastToggleAction}
          />
        </Row>
        <Card>
          <Card.Title>Recharge Details</Card.Title>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="customer-inf">
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Transection ID/Code:</span>
                      <span className="text">
                        {recharge.customer && recharge.customer.genId}
                      </span>{" "}
                      {/** DT_ADW_CA, CQ, MB, IB  */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client ID:</span>
                      <span className="text">
                        {recharge.customer && recharge.customer.genId}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client Name:</span>
                      <span className="text">
                        {recharge.customer && recharge.customer.firstName}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client Email:</span>
                      <span className="text">
                        {recharge.customer && recharge.customer.email}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client Phone:</span>
                      <span className="text">
                        {recharge.customer && recharge.customer.phone}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              <Col md={6}>
                <div className="customer-inf">
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Acount Name:</span>
                      <span className="text">
                        {recharge.bankAccount &&
                          recharge.bankAccount.accountName}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Bank Name:</span>
                      <span className="text">
                        {recharge.bankAccount && recharge.bankAccount.bankName}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Branch Name:</span>
                      <span className="text">
                        {recharge.bankAccount &&
                          recharge.bankAccount.branchName}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Country:</span>
                      <span className="text">
                        {recharge.bankAccount &&
                          recharge.bankAccount.country &&
                          recharge.bankAccount.country.name}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Acount No:</span>
                      <span className="text">
                        {recharge.bankAccount &&
                          recharge.bankAccount.accountNumber}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Acount Type:</span>
                      <span className="text">
                        {recharge.bankAccount &&
                          recharge.bankAccount.bankAccountType &&
                          recharge.bankAccount.bankAccountType.name}
                      </span>
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
                  <span className="text">
                    {recharge.customer && recharge.customer.walletAmount}
                  </span>
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
                      <td>{recharge.genId}</td>
                      <td>{recharge.date}</td>
                      <td>{recharge.transectionDate}</td>
                      <td>
                        {recharge &&
                          recharge.paymentStatus &&
                          recharge.paymentStatus.name}
                      </td>
                      <td>{recharge.transectionId}</td>
                      <td>
                        <p className="lead">{recharge.refferenceNote}</p>
                      </td>
                      <td>
                        <span className="badge bg-danger">
                          {recharge.amount}
                        </span>
                      </td>
                      <td>
                        <div className="recharge-image-area">
                          <Image
                            src={`${EXT_BASE_URL}${recharge.attachUrl}`}
                            thumbnail
                            onMouseOver={() => {
                              mouseOverAction(
                                `${EXT_BASE_URL}${recharge.attachUrl}`
                              );
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
                onSubmit={(values) => {
                  values.publicId = recharge.publicId;
                  values.status = 1;
                  values.rejectStatus = 0;

                  params.getApproveAction(values);
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

RechargeDetails.prototypes = {
  getApproveAction: PropTypes.func.isRequired,
  recharge: PropTypes.object.isRequired,
  approveStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharge: state.recharge.recharge,
    approveStatus: state.recharge.rechargeApproveState,
  };
};

export default connect(mapStateToProps, {
  getApproveAction,
  getRecchargeDetails,
})(RechargeDetails);
