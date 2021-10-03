import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";
import { Link } from "react-router-dom";

let userList = [];
class UserApprovalPanding extends Component {
  state = {
    users: userList,
    userLoad: false,
    approveStatus: false,
    rjectStatus: false,
    approveMsg: "",
    rejectMsg: "",
  };

  actionApprove = async (publicId) => {
    let approveUrl = `${BASE_URL}/users/user/approve/${publicId}`;

    console.log("Approve Requesed ID", publicId);

    if (publicId == null) {
      console.log("Approve Action User Id Is Null");
      return;
    }

    await Axios.put(approveUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ approveStatus: true });

          this.setState({ approveMsg: res.data });
        }
      })
      .catch((res) => {
        this.setState({
          approveMsg:
            "User Reject Request failed, Please try again later Or Chaeck you connection !!",
        });
      });

    this.loadAllUsers();
  };

  actionReject = async (publicId) => {
    let rejectUrl = `${BASE_URL}/users/user/reject/${publicId}`;

    if (publicId == null) {
      console.log("Reject Action User Id Is Null");
      return;
    }

    await Axios.put(rejectUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        if (res.data === true) {
          this.setState({ rjectStatus: true, rejectMsg: res.data });
        }
      })
      .catch((res) => {
        this.setState({
          rejectMsg:
            "User Reject failed, Please try again later Or Chaeck you connection !!",
        });
      });

    this.loadAllUsers();
  };

  componentDidMount() {
    this.loadAllUsers();

    if (0 >= userList.length) {
      this.loadAllUsers();
    }

    if (0 < userList.length && 0 >= this.state.users.length) {
      this.setState({ users: userList });
      this.setState({ userLoad: true });
    }
  }

  loadAllUsers = async () => {
    await Axios.get(`${BASE_URL}/users/add-approvepanding`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        if (userList.length > 0) {
          userList = [];
        }

        res.data.forEach((user) => {
          userList.push(user);
        });
      })
      .catch((res) => {
        console.log("Error Loading Users:", res);
      });

    this.setState({ users: userList });
    this.setState({ userLoad: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Add Approval User</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="departmentTable"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Sl. No.</th>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Office Location</th>
                          <th>Department</th>
                          <th>Join Date</th>

                          <th>Details</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((item, idx) => {
                          return (
                            <React.Fragment>
                              <tr>
                                <td>{idx + 1}</td>
                                <td>{item.userGemId}</td>
                                <td>
                                  {item.name != null ? item.name : "Anonymous"}
                                </td>
                                <td>{item.officialEmail}</td>
                                <td>{item.officialPhoneNumber}</td>
                                <td>
                                  {item.role != null ? item.role.name : ""}
                                </td>
                                <td>{item.officeLocation}</td>
                                <td>
                                  {item.department != null
                                    ? item.department.name
                                    : ""}
                                </td>
                                <td>
                                  {item.joiningDate != null
                                    ? new Date(item.joiningDate).toDateString()
                                    : "Not Set !!"}
                                </td>

                                <td>
                                  <Link
                                    to={`/users/user/${item.publicId}`}
                                    className="btn btn-block btn-outline-primary btn-sm"
                                  >
                                    Details{" "}
                                  </Link>
                                </td>

                                <td>
                                  <a
                                    href={`javascript:void(0);`}
                                    className="btn btn-block btn-success btn-sm"
                                    onClick={() => {
                                      this.actionApprove(item.publicId);
                                    }}
                                  >
                                    Approve
                                  </a>
                                  <a
                                    href={`javascript:void(0);`}
                                    className="btn btn-block btn-danger btn-sm"
                                    onClick={() => {
                                      this.actionReject(item.publicId);
                                    }}
                                  >
                                    Reject
                                  </a>
                                  <br />
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UserApprovalPanding;
