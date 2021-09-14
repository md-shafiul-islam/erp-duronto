import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { Field, Form, Formik } from "formik";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Row, Image, Col } from "react-bootstrap";
import * as Yup from "yup";
import {
  getApproveAction,
  getRechargeDetails,
  getRechargeRejectAction,
  getRejectRecharges,
} from "../../../actions/rechargeAction";
import { helperIsEmpty, isFieldError } from "../../../utils/helper/esFunc";
import {
  BASE_URL,
  EXT_BASE_URL,
  SET_RECHARGE_PENDINGG_APPROVE,
  SET_REJECT_RECHARGES_STATUS,
} from "../../../actions/types";
import MsgToast from "../../Layout/EsItem/MsgToast";
import ActionLink from "../../../utils/ActionLink";
import ActionContentModal from "../../Modal/ActionContentModal";
import ApproveAction from "./ActionItem/ApproveAction";
import RejectAction from "./ActionItem/RejectAction";

const RechargeDetails = (params) => {
  const dispatch = useDispatch();
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rechargeId, setRechargeId] = useState(null);
  const [actionStatus, setActionStatus] = useState(false);

  let { recharge } = params;
  console.log("RechargeDetails, ", params);

  useEffect(() => {
    if (!helperIsEmpty(recharge)) {
      if (recharge.approveStatus > 0 || recharge.rejected) {
        setActionStatus(false);
        return;
      } else {
        setActionStatus(true);
      }
    } else {
      setActionStatus(true);
    }
  }, [recharge && recharge.approveStatus]);

  useEffect(() => {
    let spliPath = params.location.pathname.split("/");

    const id = params.match.params && params.match.params.id;
    setRechargeId(id);
    params.getRechargeDetails(id);
    setRejectModal(params.rejectStatus);
    setApproveModal(params.rechargeApproveState);
  }, []);

  useEffect(() => {
    params.getRechargeDetails(rechargeId);
    if (params.rejectStatus) {
      setRejectModal(false);
    }
  }, [params.rejectStatus]);

  useEffect(() => {
    params.getRechargeDetails(rechargeId);
    if (params.approveStatus) {
      setApproveModal(false);
    }
  }, [params.approveStatus]);

  useEffect(() => {
    dispatch({
      type: SET_RECHARGE_PENDINGG_APPROVE,
      payload: false,
    });
  }, [approveModal]);

  useEffect(() => {
    dispatch({
      type: SET_REJECT_RECHARGES_STATUS,
      payload: false,
    });
  }, [rejectModal]);

  const mouseOverAction = () => {
    console.log("IImage Action !!");
  };

  const toastToggleAction = (type) => {
    if (type !== undefined) {
      dispatch({
        type: SET_RECHARGE_PENDINGG_APPROVE,
        payload: type,
      });
    }
  };

  const getRejectWindow = () => {
    setRejectModal(true);
  };

  const getApproveWindow = () => {
    setApproveModal(true);
  };

  const approveAction = (values) => {
    values.publicId = rechargeId;
    console.log("Approve Action :) ", values);
    params.getApproveAction(values);
  };

  const rejectActionHandler = (values) => {
    values.publicId = rechargeId;
    console.log("Reject Action :) ", values);
    params.getRechargeRejectAction(values);
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
            {actionStatus ? (
              <Row>
                <Col md={{ span: 3, offset: 6 }}>
                  <Button
                    className="btn btn-block btn-danger btn-sm"
                    onClick={getRejectWindow}
                  >
                    Reject
                  </Button>
                </Col>
                <Col mmd={3}>
                  <Button
                    className="btn btn-block btn-success btn-sm"
                    onClick={getApproveWindow}
                  >
                    Approve
                  </Button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
      <Row>
        <ActionContentModal
          title={"Do you want to approve this Recharge?"}
          showModal={approveModal}
          hideAction={(isClose) => {
            setApproveModal(isClose);
          }}
        >
          <ApproveAction
            approveAction={approveAction}
            cancelAction={(isClose) => {
              setApproveModal(isClose);
            }}
          />
        </ActionContentModal>
      </Row>

      <Row>
        <ActionContentModal
          title={"Do you want to Approve this Recharge?"}
          showModal={rejectModal}
          hideAction={(isClose) => {
            setRejectModal(isClose);
          }}
        >
          <RejectAction
            action={rejectActionHandler}
            cancelAction={(isClose) => {
              setRejectModal(isClose);
            }}
          />
        </ActionContentModal>
      </Row>

      {console.log("Recharge ActionStatus: ", actionStatus)}
    </React.Fragment>
  );
};

RechargeDetails.prototypes = {
  getApproveAction: PropTypes.func.isRequired,
  recharge: PropTypes.object.isRequired,
  approveStatus: PropTypes.object.isRequired,
  rejectStatus: PropTypes.object.isRequired,
  getRejectRecharges: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharge: state.recharge.recharge,
    approveStatus: state.recharge.rechargeApproveState,
    rejectStatus: state.recharge.rejectStatus,
  };
};

export default connect(mapStateToProps, {
  getApproveAction,
  getRechargeDetails,
  getRejectRecharges,
  getRechargeRejectAction,
})(RechargeDetails);
