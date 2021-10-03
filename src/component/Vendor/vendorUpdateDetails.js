import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import VendorTrComponent from "./vendorTrComponent";
import ApproveButton from "../Layout/es-buttons/approveButton";
import RejectButton from "../Layout/es-buttons/rejectButton";
import BackButton from "../Layout/es-buttons/backButton";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

const baseUrl = BASE_URL;

const headers = REQUEST_HEADER;

const countryList = [{ label: `None`, value: 0 }];
class VendorUpdateDetails extends Component {
  constructor(props) {
    super(props);
    this.paramVendorId = props.match.params.id;

    this.isDefine = this.isDefine.bind(this);
    this.isValid = this.isValid.bind(this);
    this.approveAction = this.approveAction.bind(this);
    this.rejectAction = this.rejectAction.bind(this);
    this.backAction = this.backAction.bind(this);
  }

  state = {
    getVendoStatus: true,
    getTempVendorStatus: true,
    redirecStatus: false,
    vendor: {},
    tempVendor: {},
    vendorMsg: "",
    tempVendoeMsg: "",
    bothLoadStatus: true,
    countries: [],
    countryStatus: true,
    approeMSg: "",
    rejectMsg: "",
  };

  componentDidMount() {
    this.getVendorByIdAndTemVendor();
  }

  isValid = (data, dataTemp) => {
    if (data === dataTemp) {
      return true;
    }
    return false;
  };

  isDefine = (data) => {
    if (data !== undefined) {
      return true;
    }
    return false;
  };

  rejectAction = async () => {
    let rejectUrl = `${baseUrl}/vendors/update/reject/${this.paramVendorId}`;

    await Axios.put(rejectUrl, { headers: headers })
      .then((res) => {
        this.setState({
          rejectMsg: "Update Request Rejected Success ",
          redirectStatus: true,
        });

        console.log(this.state.rejectMsg);
      })
      .catch((res) => {
        this.setState({
          rejectMsg:
            "Update Reject Request Failed, Please Chaeck your connection try again or Contact Administrator",
        });
      });
  };

  approveAction = async () => {
    let approvetUrl = `${baseUrl}/vendors/update/approve/${this.paramVendorId}`;

    await Axios.put(approvetUrl, { headers: headers })
      .then((res) => {
        this.setState({
          approeMSg: "Update Request Approve Success ",
          redirectStatus: true,
        });

        console.log(this.state.a);
      })
      .catch((res) => {
        this.setState({
          rejectMsg:
            "Update Approve Request Failed, Please Chaeck your connection try again or Contact Administrator",
        });
      });
  };

  backAction = () => {
    window.history.back(-1);
  };

  getVendorByIdAndTemVendor = async () => {
    let vendorUrl = `${baseUrl}/vendors/vendor/${this.paramVendorId}`;

    Axios.get(vendorUrl, { headers: headers })
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ vendor: res.data });
          this.setState({ getVendoStatus: false });
        }
      })
      .catch((res) => {
        this.setState({
          getVendoStatus: true,
          vendorMsg:
            "Connection Error, Please, check your connection and  try again",
        });

        console.log("Data Loaded Error Vendor:");
      });

    let vendorTempUrl = `${baseUrl}/vendors/vendor/temp/${this.paramVendorId}`;

    await Axios.get(vendorTempUrl, { headers: headers })
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ tempVendor: res.data });
          this.setState({ getTempVendorStatus: false });
        }
      })
      .catch((res) => {
        console.log("Error, ", res);
        this.setState({
          getTempVendorStatus: true,
          tempVendoeMsg:
            "Connection Error, Please, check your connection and  try again",
        });
      });

    this.setState({ bothLoadStatus: false });

    await Axios.get(`${baseUrl}/countries`, { headers: headers })
      .then((res) => {
        res.data &&
          res.data.forEach((item, idx) => {
            countryList.push({ label: item.name, value: item.id });
          });

        this.setState({ countries: countryList, countryStatus: false });
      })
      .catch((res) => {
        console.log("Country Load Error, ", res);
      });
  };

  render() {
    if (
      this.state.getTempVendorStatus ||
      this.state.getVendoStatus ||
      this.state.bothLoadStatus ||
      this.state.countryStatus
    ) {
      return <LoadingData />;
    }

    let { vendor, tempVendor } = this.state;
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Vendor/suplier Update Detail</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                    data-toggle="tooltip"
                    title="Remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-12">
                    {/** Details Row */}
                    <div className="row">
                      <div className="post">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-12">
                                <h4>Vendor Information </h4>
                              </div>

                              <div className="col-md-12">
                                <div className="row">
                                  <table className="table table-bordered table-hover">
                                    <thead>
                                      <tr>
                                        <th>Label</th>
                                        <th>Current Data</th>
                                        <th>Change Request Data</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td colSpan="3">
                                          <h3>Company Info</h3>
                                        </td>
                                      </tr>
                                      <VendorTrComponent
                                        cValue={vendor.companyName}
                                        reqValue={tempVendor.companyName}
                                        labelName={`Company Name`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.ownerName}
                                        reqValue={tempVendor.ownerName}
                                        labelName={`Owner Name`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.comPhoneNo}
                                        reqValue={tempVendor.comPhoneNo}
                                        labelName={`Phone No`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.phoneCode}
                                        reqValue={tempVendor.phoneCode}
                                        labelName={`Dial Code`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.email}
                                        reqValue={tempVendor.email}
                                        labelName={`Email`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.vendorCategory}
                                        reqValue={tempVendor.vendorCategory}
                                        labelName={`Vendor Category`}
                                      />

                                      <VendorTrComponent
                                        cValue={vendor.website}
                                        reqValue={tempVendor.website}
                                        labelName={`Website`}
                                      />
                                      {/** Contact Person Start */}
                                      <tr>
                                        <td colSpan="3">
                                          Contact Persion (s) Information
                                        </td>
                                      </tr>

                                      {this.isDefine(vendor.contactPersons) &&
                                      this.isDefine(tempVendor.contactPersons)
                                        ? vendor.contactPersons.lenght >=
                                          tempVendor.contactPersons.lenght
                                          ? vendor.contactPersons.map(
                                              (item, inx) => {
                                                let tempPerson = null;
                                                tempVendor.contactPersons.forEach(
                                                  (tempItem, tInd) => {
                                                    if (
                                                      tempItem.prevId ===
                                                      item.id
                                                    ) {
                                                      tempItem = tempPerson;
                                                    }
                                                  }
                                                );

                                                if (
                                                  tempPerson[0] !== undefined
                                                ) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.name}
                                                        reqValue={
                                                          tempPerson[0].name
                                                        }
                                                        labelName={`Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.conPhoneCode
                                                        }
                                                        reqValue={
                                                          tempPerson[0]
                                                            .conPhoneCode
                                                        }
                                                        labelName={`Dial Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.phoneNo}
                                                        reqValue={
                                                          tempPerson[0].phoneNo
                                                        }
                                                        labelName={`Phone No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.email}
                                                        reqValue={
                                                          tempPerson[0].email
                                                        }
                                                        labelName={`Enail`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.designation
                                                        }
                                                        reqValue={
                                                          tempPerson[0]
                                                            .designation
                                                        }
                                                        labelName={`Designation`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.name}
                                                        reqValue={` `}
                                                        labelName={`Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.conPhoneCode
                                                        }
                                                        reqValue={` `}
                                                        labelName={`Dial Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.phoneNo}
                                                        reqValue={` `}
                                                        labelName={`Phone No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.email}
                                                        reqValue={` `}
                                                        labelName={`Enail`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.designation
                                                        }
                                                        reqValue={` `}
                                                        labelName={`Designation`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                          : tempVendor.contactPersons.map(
                                              (tmPerson, idx) => {
                                                console.log("Temp idx", idx);
                                                console.log(
                                                  "tempVendor.contactPersons Lenght ",
                                                  tempVendor.contactPersons
                                                    .lenght
                                                );
                                                let vPerson = null;
                                                vendor.contactPersons.forEach(
                                                  (vItem, ind) => {
                                                    if (
                                                      vItem.id ===
                                                      tmPerson.prevId
                                                    ) {
                                                      vPerson = vItem;
                                                    }
                                                  }
                                                );

                                                console.log(
                                                  "Difined Vendor Is ",
                                                  vPerson
                                                );
                                                if (vPerson[0] !== undefined) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={vPerson[0].name}
                                                        reqValue={tmPerson.name}
                                                        labelName={`Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPerson[0]
                                                            .conPhoneCode
                                                        }
                                                        reqValue={
                                                          tmPerson.conPhoneCode
                                                        }
                                                        labelName={`Dial Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPerson[0].phoneNo
                                                        }
                                                        reqValue={
                                                          tmPerson.phoneNo
                                                        }
                                                        labelName={`Phone No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPerson[0].email
                                                        }
                                                        reqValue={
                                                          tmPerson.email
                                                        }
                                                        labelName={`Enail`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPerson[0].designation
                                                        }
                                                        reqValue={
                                                          tmPerson.designation
                                                        }
                                                        labelName={`Designation`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={tmPerson.name}
                                                        labelName={`Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPerson.conPhoneCode
                                                        }
                                                        labelName={`Dial Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPerson.phoneNo
                                                        }
                                                        labelName={`Phone No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPerson.email
                                                        }
                                                        labelName={`Enail`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPerson.designation
                                                        }
                                                        labelName={`Designation`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                        : ""}

                                      {/** Contact Person End */}

                                      {/** Vendor Address Start */}
                                      <tr>
                                        <td colSpan="3">
                                          Vendor Addrss (s) Information
                                        </td>
                                      </tr>

                                      {this.isDefine(vendor.addresses) &&
                                      this.isDefine(tempVendor.addresses)
                                        ? vendor.addresses.lenght >=
                                          tempVendor.addresses.lenght
                                          ? vendor.addresses.map(
                                              (item, inx) => {
                                                console.log("Vendor Address: ");
                                                let tempAddress = null;
                                                tempVendor.addresses.forEach(
                                                  (tempItem, tInd) => {
                                                    if (
                                                      tempItem.prevId ===
                                                      item.id
                                                    ) {
                                                      tempAddress = tempItem;
                                                    }
                                                  }
                                                );

                                                if (
                                                  tempAddress[0] !== undefined
                                                ) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.house}
                                                        reqValue={
                                                          tempAddress[0].house
                                                        }
                                                        labelName={`House`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.village}
                                                        reqValue={
                                                          tempAddress[0].village
                                                        }
                                                        labelName={`Village`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.street}
                                                        reqValue={
                                                          tempAddress[0].street
                                                        }
                                                        labelName={`Street`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.zipCode}
                                                        reqValue={
                                                          tempAddress[0].zipCode
                                                        }
                                                        labelName={`Zip Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.city}
                                                        reqValue={
                                                          tempAddress[0].city
                                                        }
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.countryName
                                                        }
                                                        reqValue={
                                                          tempAddress.countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.house}
                                                        reqValue={``}
                                                        labelName={`House`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.village}
                                                        reqValue={``}
                                                        labelName={`Village`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.street}
                                                        reqValue={``}
                                                        labelName={`Street`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.zipCode}
                                                        reqValue={``}
                                                        labelName={`Zip Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.city}
                                                        reqValue={``}
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.countryName
                                                        }
                                                        reqValue={``}
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                          : tempVendor.addresses.map(
                                              (tmAddress, idx) => {
                                                console.log("Temp idx", idx);
                                                console.log(
                                                  "tempVendor.Address Lenght And Country:",
                                                  tempVendor.addresses.lenght,
                                                  tmAddress.country
                                                );
                                                let lVAddress = null;
                                                vendor.addresses.forEach(
                                                  (vAddress, ind) => {
                                                    console.log(
                                                      " VAddress: TempVAddress",
                                                      vAddress.id,
                                                      tmAddress.prevId
                                                    );
                                                    if (
                                                      vAddress.id ===
                                                      tmAddress.prevId
                                                    ) {
                                                      lVAddress = vAddress;
                                                    }
                                                  }
                                                );

                                                console.log(
                                                  "Difined Vendor Is Address",
                                                  lVAddress
                                                );
                                                if (
                                                  lVAddress[0] !== undefined
                                                ) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress[0].house
                                                        }
                                                        reqValue={
                                                          tmAddress.house
                                                        }
                                                        labelName={`House`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress[0].village
                                                        }
                                                        reqValue={
                                                          tmAddress.village
                                                        }
                                                        labelName={`Village`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress[0].street
                                                        }
                                                        reqValue={
                                                          tmAddress.street
                                                        }
                                                        labelName={`Street`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress[0].zipCode
                                                        }
                                                        reqValue={
                                                          tmAddress.zipCode
                                                        }
                                                        labelName={`Zip Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress[0].city
                                                        }
                                                        reqValue={
                                                          tmAddress.city
                                                        }
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          lVAddress.countryName
                                                        }
                                                        reqValue={
                                                          tmAddress.countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      {console.log(
                                                        "address Def Par 2"
                                                      )}
                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.house
                                                        }
                                                        labelName={`House`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.village
                                                        }
                                                        labelName={`Village`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.street
                                                        }
                                                        labelName={`Street`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.zipCode
                                                        }
                                                        labelName={`Zip Code`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.city
                                                        }
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmAddress.countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                        : ""}
                                      {/** Vendor Address End */}

                                      {/** Payment Info  Start*/}

                                      <tr>
                                        <td colSpan="3">
                                          Vendor Payment (s) Information
                                        </td>
                                      </tr>

                                      {this.isDefine(vendor.paymentInfos) &&
                                      this.isDefine(tempVendor.paymentInfos)
                                        ? vendor.paymentInfos.lenght >=
                                          tempVendor.paymentInfos.lenght
                                          ? vendor.paymentInfos.map(
                                              (item, inx) => {
                                                let tempPayInf = null;
                                                tempVendor.paymentInfos.forEach(
                                                  (tempItem, tInd) => {
                                                    if (
                                                      tempItem.prevId ===
                                                      item.id
                                                    ) {
                                                      tempPayInf = tempItem;
                                                    }
                                                  }
                                                );

                                                if (
                                                  tempPayInf[0] !== undefined
                                                ) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.accountNo}
                                                        reqValue={
                                                          tempPayInf[0]
                                                            .accountNo
                                                        }
                                                        labelName={`Account No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.accountName
                                                        }
                                                        reqValue={
                                                          tempPayInf[0]
                                                            .accountName
                                                        }
                                                        labelName={`Account Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.branchName}
                                                        reqValue={
                                                          tempPayInf[0]
                                                            .branchName
                                                        }
                                                        labelName={`Branch Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.bankName}
                                                        reqValue={
                                                          tempPayInf[0].bankName
                                                        }
                                                        labelName={`Bank Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.city}
                                                        reqValue={
                                                          tempPayInf[0].city
                                                        }
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.countryName
                                                        }
                                                        reqValue={
                                                          tempPayInf[0]
                                                            .countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={item.accountNo}
                                                        reqValue={``}
                                                        labelName={`Account No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.accountName
                                                        }
                                                        reqValue={``}
                                                        labelName={`Account Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.branchName}
                                                        reqValue={``}
                                                        labelName={`Branch Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.bankName}
                                                        reqValue={``}
                                                        labelName={`Bank Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={item.city}
                                                        reqValue={``}
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          item.countryName
                                                        }
                                                        reqValue={``}
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                          : tempVendor.paymentInfos &&
                                            tempVendor.paymentInfos.map(
                                              (tmPayInf, idx) => {
                                                console.log("Temp idx", idx);

                                                let vPayInf = null;
                                                vendor.paymentInfos.forEach(
                                                  (vPay, ind) => {
                                                    if (
                                                      vPay.id ===
                                                      tmPayInf.prevId
                                                    ) {
                                                      vPayInf = vPay;
                                                    }
                                                  }
                                                );

                                                console.log(
                                                  "Difined Vendor Is ",
                                                  vPayInf
                                                );
                                                if (vPayInf[0] !== undefined) {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={
                                                          vPayInf[0].accountNo
                                                        }
                                                        reqValue={
                                                          tmPayInf.accountNo
                                                        }
                                                        labelName={`Account No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPayInf[0].accountName
                                                        }
                                                        reqValue={
                                                          tmPayInf.accountName
                                                        }
                                                        labelName={`Account Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPayInf[0].branchName
                                                        }
                                                        reqValue={
                                                          tmPayInf.branchName
                                                        }
                                                        labelName={`Branch Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPayInf[0].bankName
                                                        }
                                                        reqValue={
                                                          tmPayInf.bankName
                                                        }
                                                        labelName={`Bank Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={vPayInf[0].city}
                                                        reqValue={tmPayInf.city}
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={
                                                          vPayInf[0].countryName
                                                        }
                                                        reqValue={
                                                          tmPayInf.countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment>
                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPayInf.accountNo
                                                        }
                                                        labelName={`Account No`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPayInf.accountName
                                                        }
                                                        labelName={`Account Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPayInf.bankName
                                                        }
                                                        labelName={`Branch Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPayInf.bankName
                                                        }
                                                        labelName={`Bank Name`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={tmPayInf.city}
                                                        labelName={`City`}
                                                      />

                                                      <VendorTrComponent
                                                        cValue={` `}
                                                        reqValue={
                                                          tmPayInf.countryName
                                                        }
                                                        labelName={`Country`}
                                                      />
                                                      <tr>
                                                        <td colSpan="3">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  );
                                                }
                                              }
                                            )
                                        : ""}

                                      {/** Payment Info  End*/}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="offset-md-6 col-md-2">
                                <BackButton actionBack={this.backAction} />
                              </div>

                              <div className="col-md-2">
                                <RejectButton
                                  actionReject={this.rejectAction}
                                />
                              </div>

                              <div className="col-md-2">
                                <ApproveButton
                                  actionApprove={this.approveAction}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/** End Post */}
                    </div>
                    {/** Details Row End */}
                  </div>
                </div>
                {/** card-body .row */}
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default VendorUpdateDetails;
