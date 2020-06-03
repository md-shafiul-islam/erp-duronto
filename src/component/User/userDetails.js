import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { BASE_URL, REQUEST_HEADER, EXT_BASE_URL } from "../../actions/types";
import { Link } from "react-router-dom";
import DataNotFound from "../Layout/dataNotFound";

class UserDetails extends Component {
  state = {
    user: {},
    userLoadStatus: true,
    userId: "",
  };

  constructor(props) {
    super(props);

    this.userId = props.match.params.id;
    console.log("User Details ID: ", this.userId);
    this.setState({ userId: props.match.params.id });
  }

  state = {
    user: {},
    userLoadStatus: true,
    userId: "",
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    let uId = "";
    if (this.userId) {
      uId = this.userId;
    } else {
      uId = this.state.userId;
    }

    console.log("User Details Befor Header: ", REQUEST_HEADER);
    console.log("User Details URL Befor Send ", uId);

    await Axios.get(`${BASE_URL}/users/user/${uId}`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        this.setState({ user: res.data });
        this.setState({ userLoadStatus: false });
        console.log("Received user :", res.data);
        console.log("Received user State:", this.state.user);
      })
      .catch((res) => {
        console.log("User Details Load: ", res);
      });
  };

  render() {
    let { user } = this.state;

    if (this.state.userLoadStatus && user) {
      return <DataNotFound />;
    }

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
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
                        <h4>User Detail</h4>
                        <div className="post">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-10">
                                  <h4>Personal Info</h4>
                                </div>
                                <div className="col-md-2">
                                  <Link
                                    to={`/user/set-pass/id=${user.publicId}`}
                                    className="btn btn-block btn-outline-primary btn-sm"
                                  >
                                    Change Password{" "}
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">User ID:</div>
                            <div className="col-md-6">
                              <b>
                                {user.genId !== undefined ? user.genId : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Name:</div>
                            <div className="col-md-6">
                              <b>
                                {user.name !== undefined ? user.name : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Father Name:</div>
                            <div className="col-md-6">
                              <b>
                                {user !== undefined
                                  ? user.fatherName
                                  : "Not Set"}
                              </b>
                            </div>
                            <div className="col-md-6">Mother Name:</div>
                            <div className="col-md-6">
                              <b>
                                {user.motherName !== undefined
                                  ? user.motherName
                                  : ""}
                              </b>
                            </div>
                            <div className="col-md-6">Husband Name:</div>
                            <div className="col-md-6">
                              <b>
                                {user.husbandName !== undefined
                                  ? user.husbandName
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Personal Email:</div>
                            <div className="col-md-6">
                              <b>
                                {user.personalEmail !== undefined
                                  ? user.personalEmail
                                  : ""}
                              </b>
                            </div>
                            <div className="col-md-6">Gender:</div>
                            <div className="col-md-6">
                              <b>
                                {user.gender !== undefined
                                  ? user.gender.name
                                  : ""}
                              </b>
                            </div>
                            <div className="col-md-6">NID. No.:</div>
                            <div className="col-md-6">
                              <b>{user.gender !== undefined ? user.nid : ""}</b>
                            </div>
                            <div className="col-md-6">TIN. No.:</div>
                            <div className="col-md-6">
                              <b>
                                {user.tinNno !== undefined
                                  ? user.tinNno
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Date Of Birth:</div>
                            <div className="col-md-6">
                              <b>
                                {user.dateOfBirth !== undefined
                                  ? user.dateOfBirth
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">
                              Emergency Contact No. 1:
                            </div>
                            <div className="col-md-6">
                              <b>
                                {user.emergencyContactNo1 !== undefined
                                  ? user.emergencyContactNo1
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">
                              Emergency Contact No. 2:
                            </div>
                            <div className="col-md-6">
                              <b>
                                {user.emergencyContactNo2 !== undefined
                                  ? user.emergencyContactNo2
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Marital Status:</div>
                            <div className="col-md-6">
                              <b>
                                {user.maritalStatus !== undefined
                                  ? user.maritalStatus.name
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Aniversary Date:</div>
                            <div className="col-md-6">
                              <b>
                                {user.aniversaryDate !== undefined
                                  ? user.aniversaryDate
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">
                              Personal Phone Number:
                            </div>
                            <div className="col-md-6">
                              <b>
                                {user.personalPhoneNumber !== undefined
                                  ? user.personalPhoneNumber
                                  : "N/A"}
                              </b>
                            </div>
                          </div>
                          <fieldset>
                            <legend>Address:</legend>
                            <div className="row">
                              {user.userAddresses &&
                                user.userAddresses.map((address, ind) => {
                                  return (
                                    address && (
                                      <React.Fragment
                                        key={`user-address-${ind}`}
                                      >
                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-12">
                                              <h4>
                                                {address.title !== undefined
                                                  ? address.title
                                                  : "N/A"}
                                              </h4>
                                            </div>
                                            <div className="col-md-6">
                                              House
                                            </div>
                                            <div className="col-md-6">
                                              {address.house !== undefined
                                                ? address.house
                                                : "N/A"}
                                            </div>
                                            <div className="col-md-6">
                                              Village/Area
                                            </div>
                                            <div className="col-md-6">
                                              {address.village !== undefined
                                                ? address.village
                                                : "N/A"}
                                            </div>
                                            <div className="col-md-6">
                                              Street
                                            </div>
                                            <div className="col-md-6">
                                              {address.street !== undefined
                                                ? address.street
                                                : "N/A"}
                                            </div>
                                            <div className="col-md-6">
                                              Zip Code
                                            </div>
                                            <div className="col-md-6">
                                              {address.zipCode !== undefined
                                                ? address.zipCode
                                                : "N/A"}
                                            </div>

                                            <div className="col-md-6">City</div>
                                            <div className="col-md-6">
                                              {address.city !== undefined
                                                ? address.city
                                                : "N/A"}
                                            </div>
                                            <div className="col-md-6">
                                              Country
                                            </div>
                                            <div className="col-md-6">
                                              {address.country &&
                                                address.country.name}
                                            </div>
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    )
                                  );
                                })}
                            </div>
                          </fieldset>
                        </div>
                        {/*  Personal inf end */}
                        {/*  Professonal inf Start */}
                        <div className="post clearfix">
                          <div className="row">
                            <div className="col-md-12">
                              <h4>Professional Info</h4>
                            </div>
                            <div className="col-md-6">Joining Date:</div>
                            <div className="col-md-6">
                              <b>
                                {user.joiningDate !== undefined
                                  ? user.joiningDate
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Department:</div>
                            <div className="col-md-6">
                              <b>
                                {user.department !== undefined
                                  ? user.department.name
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Designation:</div>
                            <div className="col-md-6">
                              <b>
                                {user.designation !== undefined
                                  ? user.designation.name
                                  : "N/A"}
                              </b>
                            </div>
                            {/* /.user-block */}
                            <div className="col-md-6">Role:</div>
                            <div className="col-md-6">
                              {user.role !== undefined ? user.role.name : "N/A"}
                            </div>
                            <div className="col-md-6">Office Location:</div>
                            <div className="col-md-6">
                              {user.officeLocation !== undefined
                                ? user.officeLocation
                                : "N/A"}
                            </div>
                            <div className="col-md-6">Official Email:</div>
                            <div className="col-md-6">
                              {user.officialEmail !== undefined
                                ? user.officialEmail
                                : "N/A"}
                            </div>
                            <div className="col-md-6">Status:</div>
                            <div className="col-md-6">
                              <b>{user.status !== 1 ? "Active" : "Inactive"}</b>
                            </div>
                            <div className="col-md-6">Salary:</div>
                            <div className="col-md-6">
                              <b>
                                {user.salary !== undefined
                                  ? user.salary
                                  : "N/A"}
                              </b>
                            </div>
                            <div className="col-md-6">Mobile Allowance:</div>
                            <div className="col-md-6">
                              <b>
                                {user.mobileAllowance !== undefined
                                  ? user.mobileAllowance
                                  : "N/A"}
                              </b>
                            </div>
                          </div>
                          <fieldset>
                            <legend>Payment Info:</legend>
                            <div className="row">
                              <div className="col-md-6">Bank Name:</div>
                              <div className="col-md-6">
                                <b>
                                  {user.bankName !== undefined
                                    ? user.bankName
                                    : "N/A"}
                                </b>
                              </div>
                              <div className="col-md-6">Branch Name.:</div>
                              <div className="col-md-6">
                                <b>
                                  {user.branchName !== undefined
                                    ? user.branchName
                                    : "N/A"}
                                </b>
                              </div>
                              <div className="col-md-6">Account Name:</div>
                              <div className="col-md-6">
                                <b>
                                  {user.accountName !== undefined
                                    ? user.accountName
                                    : "N/A"}
                                </b>
                              </div>
                              <div className="col-md-6">Account No.:</div>
                              <div className="col-md-6">
                                <b>
                                  {user.accountNo !== undefined
                                    ? user.accountNo
                                    : "N/A"}
                                </b>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend>Attach File:</legend>
                            <div className="row">
                              <div className="col-md-6">
                                <h6>
                                  User Signatures:
                                  <a href={`${user.userSignaturesUrl}`}>
                                    &nbsp;here
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Resume:
                                  <a href={`${user.resumeUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Pledge:
                                  <a href={`${user.pledgeUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Application For Job:
                                  <a href={`${user.applicationForJobUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  NID:
                                  <a href={`${user.nidUrl}`}>&nbsp;here...</a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Birth Certificate:
                                  <a href={`${user.birthCertificateUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  SSC Equivalent:
                                  <a href={`${user.sscEquivalentUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  HSC Equivalent:
                                  <a href={`${user.hscEquivalentUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Bachelor/Honours:
                                  <a href={`${user.bachelorHonoursUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Masters:
                                  <a href={`${user.mastersUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  CA/FCA/CMA:
                                  <a href={`${user.caFcaCmaUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  PF/CA/FCA/CMA:
                                  <a href={`${user.pfCaFcaCmaUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  DiplomaUrl:
                                  <a href={`${user.diplomaUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Employment:
                                  <a href={`${user.employmentUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Nationality Certificate:
                                  <a href={`${user.nationalityCertificateUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Job Agreement:
                                  <a href={`${user.jobAgreementUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Security Deed:
                                  <a href={`${user.securityDeedUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Appointment Letter:
                                  <a href={`${user.appointmentLetterUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>
                                  Field Verification:
                                  <a href={`${user.fieldVerificationUrl}`}>
                                    &nbsp;here...
                                  </a>
                                </h6>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        {/*  Item Start */}
                        {/* Image And Video */}
                        <div className="post">
                          <div>{/* Video here! */}</div>
                          {/* /.user-block */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary">
                      <i className="fas fa-paint-brush" /> Images::
                    </h3>
                    <div className="mp-10 text-center mt-5 mb-3">
                      <div>
                        <img
                          src={
                            user.profileIimage !== undefined
                              ? `${EXT_BASE_URL}${user.profileIimage}`
                              : ""
                          }
                          width={260}
                          height={260}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UserDetails;
