import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import DataNotFound from "../Layout/dataNotFound";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";
import { Redirect } from "react-router-dom";

class UpdateDetailsView extends Component {
  userId = "";

  constructor(props) {
    super(props);

    this.userId = props.match.params.id;
  }

  state = {
    user: {},
    userTemp: {},
    userLoadStatus: true,
    userTempLoadStatus: true,
    aproveRedirect: false,
    approveError: false,
    rejectRedirect: false,
    rejectError: false,
    responseMsg: "",
  };

  isChange = (data1, data2) => {
    if (data1 === data2) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    if (this.userId === undefined) {
      this.userId = "";
    }

    this.loadUser();
    this.loadUserTemp();
  }

  userBackPackAction = () => {
    console.log("Run User Update Details Back");
    window.history.back(1);
  };

  userApprovePackAction = async () => {
    let approveUrl = `${BASE_URL}/users/update/approve/${this.userId}`;

    await Axios.put(approveUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        this.setState({ aproveRedirect: true });
      })
      .catch((res) => {
        this.setState({ approveErrorStatus: res.data });
        this.setState({ approveError: true });
      });
  };

  userRejectPackAction = async () => {
    let approveUrl = `${BASE_URL}/users/update/reject/${this.userId}`;

    await Axios.put(approveUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        this.setState({ rejectRedirect: true });
      })
      .catch((res) => {
        this.setState({ rejectErrorStatus: res.data });
        this.setState({ rejectError: true });
        console.log("User Update Error ", res);
      });
  };

  loadUser = async () => {
    let userUrl = `${BASE_URL}/users/user/${this.userId}`;
    await Axios.get(userUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ user: res.data });
        }
      })
      .catch((res) => {
        console.log("User Load Error: ");
        this.setState({ userLoadStatus: true });
      });

    if (this.state.user.publicId !== undefined) {
      this.setState({ userLoadStatus: false });
    }
  };

  loadUserTemp = async () => {
    let userUrl = `${BASE_URL}/users/usertemp/${this.userId}`;
    await Axios.get(userUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ userTemp: res.data });

          if (res.data.publicId === undefined) {
            this.setState({ userTempLoadStatus: false });
            this.setState({ responseMsg: res.data });
          }
        }
      })
      .catch((res) => {
        this.setState({ responseMsg: "User Data Load unsuccessful !!!" });
      });

    if (this.state.userTemp.publicId !== undefined) {
      this.setState({ userTempLoadStatus: false });
    }
  };

  render() {
    if (this.state.userLoadStatus || this.state.userTempLoadStatus) {
      return <LoadingData />;
    }

    let { user, userTemp } = this.state;

    if (user.publicId !== userTemp.publicId) {
      return <DataNotFound msg={this.state.responseMsg} />;
    }

    if (this.state.rejectRedirect || this.state.aproveRedirect) {
      return <Redirect to="/users" />;
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
                  <div className="col-12 col-md-12">
                    <div className="row">
                      <div className="col-12">
                        <h4>User Detail</h4>

                        {user && userTemp && (
                          <div className="post">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-12">
                                    <h4>Personal Info</h4>
                                  </div>
                                  <table className="table table-bordered table-hover">
                                    <thead>
                                      <tr>
                                        <th>Label</th>
                                        <th>Current Data</th>
                                        <th>Change Request Data</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.isChange(
                                        user.userGemId,
                                        userTemp.userGemId
                                      ) ? (
                                        <tr>
                                          <td>User ID</td>
                                          <td>{user.userGemId}</td>
                                          <td>{user.userGemId}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.name,
                                        userTemp.name
                                      ) ? (
                                        <tr>
                                          <td>Name</td>
                                          <td>{user.name}</td>
                                          <td>{userTemp.name}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.fatherName,
                                        userTemp.fatherName
                                      ) ? (
                                        <tr>
                                          <td>Father Name</td>
                                          <td>{user.fatherName}</td>

                                          <td>{userTemp.fatherName}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.motherName,
                                        userTemp.motherName
                                      ) ? (
                                        <tr>
                                          <td>Mother Name</td>
                                          <td>{user.motherName}</td>
                                          <td>{userTemp.motherName}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.husbandName,
                                        userTemp.husbandName
                                      ) ? (
                                        <tr>
                                          <td>Husband Name</td>
                                          <td>{user.husbandName}</td>
                                          <td>{userTemp.husbandName}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.personalEmail,
                                        userTemp.personalEmail
                                      ) ? (
                                        <tr>
                                          <td>Personal Email</td>
                                          <td>{user.personalEmail}</td>
                                          <td>{userTemp.personalEmail}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {user.gender !== undefined ||
                                      userTemp.gender !== undefined ? (
                                        this.isChange(
                                          user.gender !== undefined
                                            ? user.gender.id
                                            : 0,
                                          userTemp.gender !== undefined
                                            ? userTemp.gender.id
                                            : 0
                                        ) ? (
                                          <tr>
                                            <td>Gender</td>
                                            <td>
                                              {user.gender !== undefined
                                                ? user.gender.name
                                                : ""}
                                            </td>
                                            <td>
                                              {userTemp.gender !== undefined
                                                ? user.gender.name
                                                : ""}
                                            </td>
                                          </tr>
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.nationalIdNo,
                                        userTemp.nationalIdNo
                                      ) ? (
                                        <tr>
                                          <td>NID. No.</td>
                                          <td>{user.nationalIdNo}</td>
                                          <td>{userTemp.nationalIdNo}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.tinNno,
                                        userTemp.tinNno
                                      ) ? (
                                        <tr>
                                          <td>Tin No.</td>
                                          <td>{user.tinNno}</td>
                                          <td>{userTemp.tinNno}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.dateOfBirth,
                                        userTemp.dateOfBirth
                                      ) ? (
                                        <tr>
                                          <td>Date Of Birth</td>
                                          <td>{user.dateOfBirth}</td>
                                          <td>{userTemp.dateOfBirth}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.emergencyContactNo1,
                                        userTemp.emergencyContactNo1
                                      ) ? (
                                        <tr>
                                          <td>Emergency Contact No. 1</td>
                                          <td>{user.emergencyContactNo1}</td>
                                          <td>
                                            {userTemp.emergencyContactNo1}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.emergencyContactNo1,
                                        userTemp.emergencyContactNo1
                                      ) ? (
                                        <tr>
                                          <td>Emergency Contact No. 2</td>
                                          <td>{user.emergencyContactNo2}</td>
                                          <td>
                                            {userTemp.emergencyContactNo2}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {user.maritalStatus !== undefined ||
                                      userTemp.maritalStatus !== undefined ? (
                                        this.isChange(
                                          user.maritalStatus &&
                                            user.maritalStatus.id,
                                          userTemp.maritalStatus &&
                                            userTemp.maritalStatus.id
                                        ) ? (
                                          <tr>
                                            <td>Marital Status</td>
                                            <td>
                                              {user.maritalStatus &&
                                                user.maritalStatus.name}
                                            </td>
                                            <td>
                                              {userTemp.maritalStatus &&
                                                userTemp.maritalStatus.name}
                                            </td>
                                          </tr>
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.aniversaryDate,
                                        userTemp.aniversaryDate
                                      ) ? (
                                        <tr>
                                          <td>Aniversary Date</td>
                                          <td>{user.aniversaryDate}</td>
                                          <td>{userTemp.aniversaryDate}</td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.personalPhoneNumber,
                                        userTemp.personalPhoneNumber
                                      ) ? (
                                        <tr>
                                          <td>Personal Phone Number</td>
                                          <td>{user.personalPhoneNumber}</td>
                                          <td>
                                            {userTemp.personalPhoneNumber}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}
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

                              <div className="row">
                                <div className="col-md-12">
                                  <h4>Professional Info</h4>
                                </div>
                                <table className="table table-bordered table-hover">
                                  <thead>
                                    <tr>
                                      <th>Label</th>
                                      <th>Current Data</th>
                                      <th>Change Request Data</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.isChange(
                                      user.joiningDate,
                                      userTemp.joiningDate
                                    ) ? (
                                      <tr>
                                        <td>Joining Date</td>
                                        <td>{user.joiningDate}</td>
                                        <td>{userTemp.joiningDate}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {user.department !== undefined ||
                                    userTemp.department !== undefined ? (
                                      this.isChange(
                                        user.department !== undefined
                                          ? user.department.id
                                          : 0,
                                        userTemp.department !== undefined
                                          ? userTemp.department.id
                                          : 0
                                      ) ? (
                                        <tr>
                                          <td>Department</td>
                                          <td>
                                            {user.department &&
                                              user.department.name}
                                          </td>
                                          <td>
                                            {userTemp.department &&
                                              userTemp.department.name}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}

                                    {user.designation !== undefined ||
                                    userTemp.designation !== undefined ? (
                                      this.isChange(
                                        user.designation !== undefined
                                          ? user.designation.id
                                          : 0,
                                        userTemp.designation !== undefined
                                          ? userTemp.designation.id
                                          : 0
                                      ) ? (
                                        <tr>
                                          <td>Designation</td>
                                          <td>
                                            {user.designation !== undefined
                                              ? user.designation.name
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.designation !== undefined
                                              ? userTemp.designation.name
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}

                                    {user.role || userTemp.role ? (
                                      this.isChange(
                                        user.role !== undefined
                                          ? user.role.id
                                          : 0,
                                        userTemp.role !== undefined
                                          ? userTemp.role.id
                                          : 0
                                      ) ? (
                                        <tr>
                                          <td>Role</td>
                                          <td>
                                            {user.role !== undefined
                                              ? user.role.name
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.role !== undefined
                                              ? user.role.name
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.officeLocation,
                                      userTemp.officeLocation
                                    ) ? (
                                      <tr>
                                        <td>Office Location</td>
                                        <td>{user.officeLocation}</td>
                                        <td>{userTemp.officeLocation}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.officialEmail,
                                      userTemp.officialEmail
                                    ) ? (
                                      <tr>
                                        <td>Official Email</td>
                                        <td>{user.officialEmail}</td>
                                        <td>{userTemp.officialEmail}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.status,
                                      userTemp.status
                                    ) ? (
                                      <tr>
                                        <td>Status</td>
                                        <td>{user.status}</td>
                                        <td>{userTemp.status}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.salary,
                                      userTemp.salary
                                    ) ? (
                                      <tr>
                                        <td>Salary</td>
                                        <td>{user.salary}</td>
                                        <td>{userTemp.salary}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.mobileAllowance,
                                      userTemp.mobileAllowance
                                    ) ? (
                                      <tr>
                                        <td>Mobile Allowance</td>
                                        <td>{user.mobileAllowance}</td>
                                        <td>{userTemp.mobileAllowance}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}
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

                              <div className="row">
                                <div className="col-md-12">
                                  <h4>Payment Info</h4>
                                </div>
                                <table className="table table-bordered table-hover">
                                  <thead>
                                    <tr>
                                      <th>Label</th>
                                      <th>Current Data</th>
                                      <th>Change Request Data</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.isChange(
                                      user.bankName,
                                      userTemp.bankName
                                    ) ? (
                                      <tr>
                                        <td>Bank Name</td>
                                        <td>{user.bankName}</td>
                                        <td>{userTemp.bankName}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.branchName,
                                      userTemp.branchName
                                    ) ? (
                                      <tr>
                                        <td>Branch Name</td>
                                        <td>{user.branchName}</td>
                                        <td>{userTemp.branchName}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.accountName,
                                      userTemp.accountName
                                    ) ? (
                                      <tr>
                                        <td>Account Name</td>
                                        <td>{user.accountName}</td>
                                        <td>{userTemp.accountName}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {this.isChange(
                                      user.accountNo,
                                      userTemp.accountNo
                                    ) ? (
                                      <tr>
                                        <td>Account No</td>
                                        <td>{user.accountNo}</td>
                                        <td>{userTemp.accountNo}</td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}
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

                              <div className="row">
                                <div className="col-md-12">
                                  <h4>Address::</h4>
                                </div>
                                {user.userAddresses !== undefined ||
                                userTemp.userAddresses !== undefined ? (
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
                                          <h5>
                                            {user.userAddresses !== undefined
                                              ? user.userAddresses[0] !==
                                                undefined
                                                ? user.userAddresses[0].title
                                                : userTemp.userAddresses !==
                                                  undefined
                                                ? userTemp.userAddresses[0] !==
                                                  undefined
                                                  ? userTemp.userAddresses[0]
                                                      .title
                                                  : " "
                                                : ""
                                              : userTemp.userAddresses !==
                                                undefined
                                              ? userTemp.userAddresses[0] !==
                                                undefined
                                                ? userTemp.userAddresses[0]
                                                    .title
                                                : ""
                                              : ""}
                                          </h5>
                                        </td>
                                      </tr>
                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[0] !== undefined
                                          ? user.userAddresses[0].house
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[0] !==
                                            undefined
                                          ? userTemp.userAddresses[0].house
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Hous</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[0] !== undefined
                                              ? user.userAddresses[0].house
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[0] !==
                                              undefined
                                              ? userTemp.userAddresses[0].house
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[0] !== undefined
                                          ? user.userAddresses[0].village
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[0] !==
                                            undefined
                                          ? userTemp.userAddresses[0].village
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Village</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[0] !== undefined
                                              ? user.userAddresses[0].village
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[0] !==
                                              undefined
                                              ? userTemp.userAddresses[0]
                                                  .village
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[0] !== undefined
                                          ? user.userAddresses[0].street
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[0] !==
                                            undefined
                                          ? userTemp.userAddresses[0].street
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Street</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[0] !== undefined
                                              ? user.userAddresses[0].street
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[0] !==
                                              undefined
                                              ? userTemp.userAddresses[0].street
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[0] !== undefined
                                          ? user.userAddresses[0].zip_code
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[0] !==
                                            undefined
                                          ? userTemp.userAddresses[0].zip_code
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Zip Code </td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[0] !== undefined
                                              ? user.userAddresses[0].zip_code
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[0] !==
                                              undefined
                                              ? userTemp.userAddresses[0]
                                                  .zip_code
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[0] !== undefined
                                          ? user.userAddresses[0].city
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[0] !==
                                            undefined
                                          ? userTemp.userAddresses[0].city
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>City </td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[0] !== undefined
                                              ? user.userAddresses[0].city
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[0] !==
                                              undefined
                                              ? userTemp.userAddresses[0].city
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {user.userAddresses !== undefined ||
                                      userTemp.userAddresses !== undefined ? (
                                        this.isChange(
                                          user.userAddresses &&
                                            user.userAddresses[0] &&
                                            user.userAddresses[0].country !==
                                              undefined
                                            ? user.userAddresses[0].country.id
                                            : 0,

                                          userTemp.userAddresses &&
                                            userTemp.userAddresses[0] &&
                                            userTemp.userAddresses[0]
                                              .country !== undefined
                                            ? userTemp.userAddresses[0].country
                                                .id
                                            : 0
                                        ) ? (
                                          <tr>
                                            <td>Country </td>
                                            <td>
                                              {user.userAddresses &&
                                              user.userAddresses[0] &&
                                              user.userAddresses[0].country !==
                                                undefined
                                                ? user.userAddresses[0].country
                                                    .name
                                                : ""}
                                            </td>
                                            <td>
                                              {userTemp.userAddresses &&
                                              userTemp.userAddresses[0] &&
                                              userTemp.userAddresses[0]
                                                .country !== undefined
                                                ? userTemp.userAddresses[0]
                                                    .country.name
                                                : ""}
                                            </td>
                                          </tr>
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        ""
                                      )}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                ) : (
                                  ""
                                )}

                                {
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
                                          <h5>
                                            {user.userAddresses !== undefined
                                              ? user.userAddresses[1] !==
                                                undefined
                                                ? user.userAddresses[1].title
                                                : userTemp.userAddresses !==
                                                  undefined
                                                ? userTemp.userAddresses[1] !==
                                                  undefined
                                                  ? userTemp.userAddresses[1]
                                                      .title
                                                  : " "
                                                : ""
                                              : /**** */ userTemp.userAddresses !==
                                                undefined
                                              ? userTemp.userAddresses[1] !==
                                                undefined
                                                ? userTemp.userAddresses[1]
                                                    .title
                                                : "Update Data Not Set"
                                              : ""}
                                          </h5>
                                        </td>
                                      </tr>
                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[1] !== undefined
                                          ? user.userAddresses[1].house
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[1] !==
                                            undefined
                                          ? userTemp.userAddresses[1].house
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Hous</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[1] !== undefined
                                              ? user.userAddresses[1].house
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[1] !==
                                              undefined
                                              ? userTemp.userAddresses[1].house
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[1] !== undefined
                                          ? user.userAddresses[1].village
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[1] !==
                                            undefined
                                          ? userTemp.userAddresses[1].village
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Village</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[1] !== undefined
                                              ? user.userAddresses[1].village
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[1] !==
                                              undefined
                                              ? userTemp.userAddresses[1]
                                                  .village
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[1] !== undefined
                                          ? user.userAddresses[1].street
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[1] !==
                                            undefined
                                          ? userTemp.userAddresses[1].street
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Street</td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[1] !== undefined
                                              ? user.userAddresses[1].street
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[1] !==
                                              undefined
                                              ? userTemp.userAddresses[1].street
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[1] !== undefined
                                          ? user.userAddresses[1].zip_code
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[1] !==
                                            undefined
                                          ? userTemp.userAddresses[1].zip_code
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>Zip Code </td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[1] !== undefined
                                              ? user.userAddresses[1].zip_code
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[1] !==
                                              undefined
                                              ? userTemp.userAddresses[1]
                                                  .zip_code
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {this.isChange(
                                        user.userAddresses &&
                                          user.userAddresses[1] !== undefined
                                          ? user.userAddresses[1].city
                                          : "",
                                        userTemp.userAddresses &&
                                          userTemp.userAddresses[1] !==
                                            undefined
                                          ? userTemp.userAddresses[1].city
                                          : ""
                                      ) ? (
                                        <tr>
                                          <td>City </td>
                                          <td>
                                            {user.userAddresses &&
                                            user.userAddresses[1] !== undefined
                                              ? user.userAddresses[1].city
                                              : ""}
                                          </td>
                                          <td>
                                            {userTemp.userAddresses &&
                                            userTemp.userAddresses[1] !==
                                              undefined
                                              ? userTemp.userAddresses[1].city
                                              : ""}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}

                                      {(user.userAddresses &&
                                        user.userAddresses[1] &&
                                        user.userAddresses[1].country !==
                                          undefined) ||
                                      (userTemp.userAddresses &&
                                        userTemp.userAddresses[1] &&
                                        userTemp.userAddresses[1].country !==
                                          undefined) ? (
                                        this.isChange(
                                          user.userAddresses &&
                                            user.userAddresses[1] &&
                                            user.userAddresses[1].country !==
                                              undefined
                                            ? user.userAddresses[1].country.id
                                            : 0,
                                          userTemp.userAddresses &&
                                            userTemp.userAddresses[1] &&
                                            userTemp.userAddresses[1]
                                              .country !== undefined
                                            ? userTemp.userAddresses[1].country
                                                .id
                                            : 0
                                        ) ? (
                                          <tr>
                                            <td>Country </td>
                                            <td>
                                              {user.userAddresses &&
                                              user.userAddresses[1] &&
                                              user.userAddresses[1].country !==
                                                undefined
                                                ? user.userAddresses[1].country
                                                    .name
                                                : ""}
                                            </td>
                                            <td>
                                              {userTemp.userAddresses &&
                                              userTemp.userAddresses[1] &&
                                              userTemp.userAddresses[1]
                                                .country !== undefined
                                                ? userTemp.userAddresses[1]
                                                    .country.name
                                                : ""}
                                            </td>
                                          </tr>
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        ""
                                      )}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                }
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="row">
                          <div className="offset-md-6 col-md-6">
                            <div className="row">
                              <div className="col-md-4">
                                <a
                                  href="javascript:viod();"
                                  onClick={this.userBackPackAction}
                                  className="btn btn-block btn-outline-primary  btn-sm"
                                >
                                  Back
                                </a>
                              </div>

                              <div className="col-md-4">
                                <a
                                  href="javascript:viod();"
                                  onClick={this.userRejectPackAction}
                                  className="btn btn-block btn-outline-danger  btn-sm"
                                >
                                  Reject
                                </a>
                              </div>

                              <div className="col-md-4">
                                <a
                                  href={`javascript:void(0);`}
                                  className="btn btn-block btn-outline-success btn-sm"
                                  onClick={this.userApprovePackAction}
                                >
                                  Approve
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default UpdateDetailsView;
