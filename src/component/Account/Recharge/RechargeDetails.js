/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Form, Formik } from "formik";
import ImageViewModal from "../../Modal/ImageViewModal";
import { Button, Card, ListGroup, Row, Image, Col } from "react-bootstrap";
import * as Yup from "yup";
import {
  esDateFormat,
  helperIsEmpty,
  isFieldError,
} from "../../../utils/helper/esFunc";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getRechargeApproveAction,
  getRechargeUsingId,
  getRejectRecharge,
} from "../../../actions/rechargeAction";
import LoaderSpiner from "../../../utils/helper/LoaderSpiner";
import UtilPlaceholder from "../../../utils/UtilPlaceholder";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidateTextArea from "../../Fields/CstValidateTextArea";
import { getRestrictedImage } from "../../../utils/helper/esGetImageAction";
import { toast } from "react-toastify";

const RechargeDetails = (params) => {
  console.log("RechargeDetails, ", params);
  const [displayApprove, setDisplayApprove] = useState(false);
  const [imageLocation, setImageLocation] = useState(undefined);
  const [displayReject, setDisplayReject] = useState(false);
  const [displayImageModal, setDisplayImageModal] = useState(false);
  
  const [submitingStatus, setSubmitingStatus] = useState(false);
  const [rejectSubmitingStatus, setRejectSubmitingStatus] = useState(false);

  const toastId = useRef(null);

  useEffect(() => {
    if (params.match) {
      if (params.match.params) {
        if (params.match.params.id) {
          params.getRechargeUsingId(params.match.params.id);
        }
      }
    }

    console.log("Recharge Details Init Props, ", params);
    let spliPath = params.location.pathname.split("/");
    console.log("Recharge Details Init Props, Split path  ", spliPath);

    if (Array.isArray(spliPath)) {
      if (spliPath.includes("approve")) {
        setDisplayApprove(true);
      }

      if (spliPath.includes("reject")) {
        setDisplayReject(true);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Current Approve Status ", params.rechargeApprove);
    let message = "";
    if (submitingStatus) {
      if (!helperIsEmpty(params.rechargeApprove)) {
        if (params.rechargeApprove.status) {
          message = params.rechargeApprove.message;
          notifyUpdateAction(message, toast.TYPE.SUCCESS);
        }

        if (params.rechargeApprove.errorStatus) {
          message = `Error ${params.rechargeApprove.message}`;
          notifyUpdateAction(message, toast.TYPE.ERROR);
        }
      }
      setSubmitingStatus(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.rechargeApprove]);
  console.log("Recharge Details Params ", params);
  useEffect(() => {
    if (rejectSubmitingStatus) {
      console.log("Curent Reject Response, ", params.rechargeReject);
      if (!helperIsEmpty(params.rechargeReject)) {
        let message = "";
        if (params.rechargeReject.status) {
          message = params.rechargeReject.message;
          notifyUpdateAction(message, toast.TYPE.SUCCESS);
        }

        if (
          params.rechargeReject.errorStatus ||
          !params.rechargeReject.status
        ) {
          message = `Error ${params.rechargeReject.message}`;
          notifyUpdateAction(message, toast.TYPE.ERROR);
        }
      }
      setRejectSubmitingStatus(false);
    }
  }, [params.rechargeReject]);

  const mouseOverAction = async () => {
    console.log("Image Action !!");
    const { recharge } = params;
    console.log("Image Action !! recharge, ", recharge);
    setImageLocation(undefined);
    const imageResponse = await getRestrictedImage(recharge.attachUrl);

    if (imageResponse.status) {
      setImageLocation(imageResponse.image);
    }
    setDisplayImageModal(true);
  };


  const validationScema = () => {
    return Yup.object().shape({
      charge: Yup.number().required("Required. Please, Input Received amount."),
    });
  };

  const rechargeApproveAction = (values) => {
    const { recharge } = params;
    console.log("Approve Recharge Action, ", recharge, " Values, ", values);

    if (!helperIsEmpty(recharge)) {
      const approveRecharge = {
        rechargeId: recharge.publicId,
        charge: values.charge,
      };
      console.log("Recharge Action, ", approveRecharge);
      notifyAction("Recharge Approve in progress...");
      setSubmitingStatus(true);
      params.getRechargeApproveAction(approveRecharge);
    }
  };

  const rechargeRejectAction = (values) => {
    console.log("Reject Recharge Action, ", values);
    const { recharge } = params;
    const rejRecharg = {
      rechargeId: recharge.publicId,
      rejectNote: values.rejectNote,
    };

    setRejectSubmitingStatus(true);
    notifyAction("Recharge Reject start processing...");

    params.getRejectRecharge(rejRecharg);
    //Reject Action
  };

  const notifyAction = (msg) => {
    toastId.current = toast(msg, {
      position: "bottom-right",
      autoClose: false,
    });
  };

  const notifyUpdateAction = (msg, tType) => {
    toast.update(toastId.current, {
      render: msg,
      type: tType,
      autoClose: 5000,
    });
  };

  /**Render Below */

  if (params.rechargeLoadStatus) {
    return <LoaderSpiner status={params.rechargeLoadStatus} />;
  }

  if (helperIsEmpty(params.recharge)) {
    return <UtilPlaceholder />;
  } else {
    const { recharge } = params;
    return (
      <React.Fragment>
        <div className="content-wrapper recharge-details">
        <ImageViewModal
          showModal={displayImageModal}
          location={imageLocation}
          hideAction={(isClose)=>{
            setDisplayImageModal(isClose);
            setImageLocation(undefined);
          }}
        />
          <Card>
            <Card.Title>Recharge Details</Card.Title>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="customer-inf">
                    <ListGroup>
                      <ListGroup.Item>
                        <span className="title">Transection ID/Code:</span>
                        <span className="text">{recharge.genId}</span>{" "}
                        {/** DT_ADW_CA, CQ, MB, IB  */}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="title">Client ID:</span>
                        <span className="text">
                          {recharge.customer && recharge.customer.clientId}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="title">Client Name:</span>
                        <span className="text">
                          {recharge.customer && recharge.customer.fullName}
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
                          {recharge.customer && recharge.customer.phoneCode}
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
                          {recharge.bankAccount &&
                            recharge.bankAccount.bankName}
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
                          {recharge.bankAccount && recharge.bankAccount.country}
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
                            recharge.bankAccount.bankAccountType}
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
                        <td>1.</td>
                        <td>{esDateFormat(recharge.date)}</td>
                        <td>{esDateFormat(recharge.transectionDate)}</td>
                        <td>{recharge.transType}</td>
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
                              src={recharge.attachUrl}
                              thumbnail
                              onMouseOver={() => {
                                mouseOverAction(recharge.attachUrl);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              {displayApprove && (
                <Formik
                  initialValues={{
                    charge: "",
                  }}
                  validationSchema={validationScema}
                  onSubmit={(values, actions) => {
                    rechargeApproveAction(values);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Row className="card-pay-row">
                        <Col md={5}>
                          <CstValidateField
                            placeholder="Charge Amount"
                            label="Charge Amount."
                            name="charge"
                            {...props}
                          />
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
              )}
              {displayReject && (
                <Formik
                  initialValues={{
                    rejectNote: "",
                  }}
                  onSubmit={(values, action) => {
                    rechargeRejectAction(values);
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <Row className="card-pay-row">
                          <Col md={5}>
                            <CstValidateTextArea
                              id="rejectNote"
                              placeholder="Recharge Reject Note..."
                              name="rejectNote"
                              {...props}
                            />
                          </Col>

                          <Col md={2}>
                            <label className="form-label" htmlFor="action-btn">
                              &nbsp;{" "}
                            </label>
                            <Button className="form-control" type="submit">
                              Reject
                            </Button>{" "}
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  }
};

RechargeDetails.prototype = {
  getRechargeUsingId: PropTypes.func.isRequired,
  recharge: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharge: state.recharge.recharge,
    rechargeLoadStatus: state.recharge.rechargeLoadStatus,
    rechargeApprove: state.recharge.rechargeApprove,
    rechargeReject: state.recharge.rechargeReject,
  };
};

export default connect(mapStateToProps, {
  getRechargeUsingId,
  getRechargeApproveAction,
  getRejectRecharge,
})(RechargeDetails);
