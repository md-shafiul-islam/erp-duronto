import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import VendorInfLabelValue from "./vendorInfLabelValue";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";
import { Link } from "react-router-dom";

class DetailsVendor extends Component {
  constructor(props) {
    super(props);
    this.paramVendorId = props.match.params.id;
  }

  state = {
    vendor: {},
    vendorStatus: true,
  };

  componentDidMount() {
    this.getVendorById();
  }

  getVendorById = async () => {
    console.log("ID: ", this.paramVendorId);

    let vendorUrl = `${BASE_URL}/vendors/vendor/details/${this.paramVendorId}`;
    Axios.get(vendorUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data && this.setState({ vendor: res.data, vendorStatus: false });
        console.log("Vendor Details, ", res.data);
      })
      .catch((res) => {
        console.log("Load Vendor Details Error ", res);
      });
  };

  render() {
    if (this.state.vendorStatus) {
      return <LoadingData />;
    }

    let { vendor } = this.state;

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">User Detail</h3>
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
                  <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                    <div className="row">
                      <div className="col-12">
                        <h4>Vendor/Supplier Detail</h4>
                        <div className="post">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row mp-as">
                                <hr />
                                <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <h2>Company Info</h2>
                                    </div>
                                  </div>
                                  <VendorInfLabelValue
                                    lebal={`ID`}
                                    value={vendor.vGenId}
                                  />

                                  <VendorInfLabelValue
                                    lebal={`Company Name`}
                                    value={vendor.companyName}
                                  />

                                  <VendorInfLabelValue
                                    lebal={`Owner Name`}
                                    value={vendor.ownerName}
                                  />

                                  <VendorInfLabelValue
                                    lebal={`Phone No`}
                                    value={`${vendor.phoneCode}-${vendor.comPhoneNo}`}
                                  />

                                  <VendorInfLabelValue
                                    lebal={`Email`}
                                    value={vendor.email}
                                  />

                                  <VendorInfLabelValue
                                    lebal={`Website`}
                                    value={vendor.website}
                                  />
                                </div>
                              </div>
                              <hr />
                              <div className="row mp-as">
                                <div className="col-md-12">
                                  <h3>contact Person (s) Infornation</h3>
                                </div>
                              </div>

                              <div className="row mp-as">
                                {vendor.contactPersons &&
                                  vendor.contactPersons.map((person, inx) => {
                                    return (
                                      <div
                                        className="col-md-6"
                                        key={`person-${inx}`}
                                      >
                                        <VendorInfLabelValue
                                          lebal={`Name`}
                                          value={person.name}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Phone No`}
                                          value={`${person.conPhoneCode}-${person.phoneNo}`}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Email`}
                                          value={person.email}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Designation`}
                                          value={person.designation}
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                              <hr />
                              <div className="row mp-as">
                                <div className="col-md-12">
                                  <h3>Address::</h3>
                                </div>
                              </div>

                              <div className="row mp-as">
                                {vendor.addresses &&
                                  vendor.addresses.map((add, ind) => {
                                    return (
                                      <div
                                        className="col-md-6"
                                        key={`address-${ind}`}
                                      >
                                        <VendorInfLabelValue
                                          lebal={`House`}
                                          value={add.house}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Village`}
                                          value={add.village}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Street`}
                                          value={add.street}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Zip Code`}
                                          value={add.zipCode}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`City`}
                                          value={add.city}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Country`}
                                          value={
                                            add.country !== undefined
                                              ? add.country && add.country.name
                                              : "None"
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                              </div>

                              <div className="row mp-as">
                                <div className="col-md-8">
                                  <h3>Payment Infos::</h3>
                                </div>
                              </div>
                              <div className="row mp-as">
                                {vendor.paymentInfos &&
                                  vendor.paymentInfos.map((payment, pInd) => {
                                    return (
                                      <div
                                        className="col-md-6"
                                        key={`payment-${pInd}`}
                                      >
                                        <VendorInfLabelValue
                                          lebal={`Account No`}
                                          value={payment.accountNo}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Account Name`}
                                          value={payment.accountName}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Branch Name`}
                                          value={payment.branchName}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Bank Name`}
                                          value={payment.bankName}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`City`}
                                          value={payment.city}
                                        />

                                        <VendorInfLabelValue
                                          lebal={`Country`}
                                          value={
                                            payment.country !== undefined
                                              ? payment.country &&
                                                payment.country.name
                                              : "None"
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="row">
                                <div className="offset-md-5 col-md-4">
                                  <Link
                                    to={`/vendors`}
                                    className="btn btn-block btn-outline-primary btn-sm"
                                  >
                                    Bank to Vendors{" "}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailsVendor;
