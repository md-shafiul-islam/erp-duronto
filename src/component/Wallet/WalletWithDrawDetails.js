import React, { useState, useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { EXT_BASE_URL } from "../../actions/types";
import { PropTypes } from "prop-types";
import ApproveAction from "../Account/Recharge/ActionItem/ApproveAction";
import RejectAction from "../Account/Recharge/ActionItem/RejectAction";
import ActionContentModal from "../Modal/ActionContentModal";
import WalletWithDrawApproveForm from "./WithDraw/WalletWithDrawApproveForm";
import WalletWithDrawRejectForm from "./WithDraw/WalletWithDrawRejectForm";
import { connect } from "react-redux";
import { getWalletWithDarwById } from "../../actions/walletWithdrawAction";
import Select from "react-select";
import { getPaymentStatus } from "../../actions/statusActions";

const walletRes = {
  publicId: "eef13b5f-b281-4484-984f-7431d60a2b15",
  genId: "DTWIW20210819CQ10543683",
  withdrawType: {
    id: 1,
    walletWithDraws: null,
    name: "Cheque",
    value: "cheque",
  },
  transctionId: null,
  approveUser: null,
  customer: {
    publicId: "5eb925989228470eb94523bcc147eab820212124249",
    firstName: "Md Shafiul Islam",
    lastName: null,
    phone: null,
    email: "md.shafiul.islam2014bd@gmail.com",
    walletAmount: "209437.0",
  },
  amount: 6200.0,
  chequeName: "Md Shafiul Islam",
  shippingAddress: {
    id: 4,
    roadNo: "",
    village: "MohadebPur",
    district: "MohadebPur",
    policeStation: "MohadebPur",
  },
  receiveOption: {
    id: 1,
    walletWithDraws: null,
    name: "Courier/Post Office",
    value: "post_mail",
  },
  withDrawBankDetails: {
    id: 4,
    customer: null,
    walletWithDarw: null,
    accountName: "MD Najmul Haque",
    bankAccountNumber: "4187449849794984",
    bankName: "AB Bank",
    branchName: null,
    date: null,
  },
  withDrawMobilBanking: null,
  paymentStatus: {
    id: 1,
    name: "Pending",
  },
  approveNote: null,
  status: 0,
  walletStaus: false,
  transStatus: false,
  date: "2021-09-19T09:12:58.000+0000",
  approveDate: null,
  dateGroup: "2021-09-18T18:00:00.000+0000",
};

const WalletWithDrawDetails = (params) => {
  const [actionStatus, setActionStatus] = useState(true);
  const [walletWithdarwId, setWalletWithdarwId] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  

  console.log("WalletWithDrawDetails params.walletWithDarwDetails, ", params.walletWithDarwDetails)
  const {
    genId,
    chequeName,
    customer,
    withdrawType,
    withDrawBankDetails,
    receiveOption,
    shippingAddress,
    amount,
    paymentStatus,
    withDrawMobilBanking,
    date,
  } = params.walletWithDarwDetails;

  useEffect(() => {
    const id = params.match.params && params.match.params.id;
    setWalletWithdarwId(id);
    params.getWalletWithDarwById(id);
    params.getPaymentStatus();
  }, []);

  useEffect(() => {
    if (withDrawBankDetails !== null && withDrawMobilBanking !== undefined) {
      let { accountName, bankAccountNumber, bankName, branchName } =
        withDrawBankDetails;
      setBankAccountNo(bankAccountNumber);
      setBankName(bankName);
      setBranchName(branchName);
      setBankAccountName(accountName);
    } else if (withDrawMobilBanking != null && withDrawMobilBanking !== undefined) {
      const { mobileBankName, mobilBankPhoneNo } = withDrawMobilBanking;
      setBankAccountNo(mobilBankPhoneNo);
      setBankName(mobileBankName);
      setBranchName("--");
      setPaymentOption({label: paymentStatus.name, value:paymentStatus.id})
    }
  }, [amount]);

  return (
    <React.Fragment>
      <div className="content-wrapper recharge-details">
        <Card>
          <Card.Title>Recharge Details</Card.Title>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="customer-inf">
                  <h3>Client Info</h3>
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Transection ID/Code:</span>
                      <span className="text">{genId}</span>{" "}
                      {/** DT_ADW_CA, CQ, MB, IB  */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client ID:</span>
                      <span className="text">{customer && customer.email}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Client Name:</span>
                      <span className="text">
                        {customer && customer.firstName}
                      </span>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="title">Client Phone:</span>
                      <span className="text">{customer && customer.phone}</span>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="title">Wallet Balance:</span>
                      <span className="text">
                        {customer && customer.walletAmount}
                      </span>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="title">Withdarw Amount:</span>
                      <span className="text">{amount}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              <Col md={6}>
                <div className="customer-inf">
                  <h3>Pay To</h3>
                  <ListGroup>
                    <ListGroup.Item>
                      <span className="title">Withdraw Type:</span>
                      <span className="text">
                        {withdrawType && withdrawType.name}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Cheque Name:</span>
                      <span className="text">{chequeName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Acount Name:</span>
                      <span className="text">{bankAccountName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Bank Name:</span>
                      <span className="text">{bankName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Branch Name:</span>
                      <span className="text">{branchName}</span>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="title">Acount No:</span>
                      <span className="text">{bankAccountNo}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="title">Receive Option:</span>
                      <span className="text">
                        {receiveOption && receiveOption.name}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
            <Row>
              {shippingAddress !== null && shippingAddress !== undefined ? (
                <React.Fragment>
                  <Col md={12}>
                    <h3>Shipping Address</h3>
                    <ListGroup>
                      <ListGroup.Item>
                        <span className="title">Village:</span>
                        <span className="text">{shippingAddress.village}</span>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <span className="title">Road No/Name:</span>
                        <span className="text">{shippingAddress.roadNo}</span>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <span className="title">Police Station:</span>
                        <span className="text">
                          {shippingAddress.policeStation}
                        </span>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <span className="title">District:</span>
                        <span className="text">{shippingAddress.district}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </React.Fragment>
              ) : (
                ""
              )}
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
                <Row>
                  <Col md={8}>
                    <Select 
                      placeholder="Please Select One Option"
                      name="actionType"
                      id="actionType"
                      options={params.paymentStatusList&&params.paymentStatusList}
                      defaultValue={paymentOption}
                    />
                  </Col>
                  <Col md={4}><Button>Get Form</Button></Col>
                </Row>

            {actionStatus ? (
              <Row>
                <Col md={{ span: 3, offset: 6 }}>
                  <Button
                    className="btn btn-block btn-danger btn-sm"
                    //onClick={/*getRejectWindow*/}
                  >
                    Reject
                  </Button>
                </Col>
                <Col mmd={3}>
                  <Button
                    className="btn btn-block btn-success btn-sm"
                    //onClick={/*getApproveWindow*/}
                  >
                    Approve
                  </Button>
                </Col>
              </Row>
            ) : (
              ""
            )}

            <Row>
              <Col md={12}>
                <WalletWithDrawApproveForm />
              </Col>
              <Col md={12}>
                <WalletWithDrawRejectForm />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Row>
        <ActionContentModal
          title={"Do you want to approve this Recharge?"}
          //   showModal={approveModal}
          hideAction={(isClose) => {
            // setApproveModal(isClose);
          }}
        >
          <ApproveAction
            // approveAction={approveAction}
            cancelAction={(isClose) => {
              //   setApproveModal(isClose);
            }}
          />
        </ActionContentModal>
      </Row>

      <Row>
        <ActionContentModal
          title={"Do you want to Approve this Recharge?"}
          //   showModal={rejectModal}
          hideAction={(isClose) => {
            // setRejectModal(isClose);
          }}
        >
          <RejectAction
            // action={rejectActionHandler}
            cancelAction={(isClose) => {
              //   setRejectModal(isClose);
            }}
          />
        </ActionContentModal>
      </Row>

      {console.log("Recharge ActionStatus: ", actionStatus)}
    </React.Fragment>
  );
};

WalletWithDrawDetails.prototypes = {
  getApprovePendingWalletWithdraws: PropTypes.func.isRequired,
  walletWithDrawals: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  paymentStatusList:PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    walletWithDarwDetails: state.walletWithdarw.walletWithdraw,
    loadStatus: state.walletWithdarw.walletSingletStatus,
    paymentStatusList: state.status.paymentStatuses
  };
};

export default connect(mapStateToProps, { getWalletWithDarwById, getPaymentStatus})(
  WalletWithDrawDetails
);
