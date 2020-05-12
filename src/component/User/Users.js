import React, { Component } from "react";
import Axios from "axios";

let userList = [];
const baseUrl = "http://localhost:8085/api";

class Users extends Component {
  state = {
    users: userList,
    userLoad: false,
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

  userInActive = async (pubId) => {
    let inActiveUrl = `${baseUrl}/users/user/inactive/${pubId}`;
    console.log(" User InActive Action !!");
    console.log(" User InActive Action URL ", inActiveUrl);
    await Axios.put(inActiveUrl)
      .then((res) => {
        this.setState({ inactiveMsg: res.data });
        this.loadAllUsers();
        console.log(
          " User InActive Action Done!! MSG ",
          this.state.inactiveMsg
        );
      })
      .catch((res) => {
        this.setState({
          inactiveMsg:
            "Please chaeck you network connection and try again or contact administrator, Thanks",
        });
        console.log(
          " User Active InAction Done!! MSG CA",
          this.state.activeMsg
        );
      });
    console.log(" User InActive Action All Pass");
  };

  userActiveAction = async (pubId) => {
    let activeUrl = `${baseUrl}/users/user/active/${pubId}`;

    console.log(" User Active Action !!");
    console.log(" User Active Action URL ", activeUrl);
    await Axios.put(activeUrl)
      .then((res) => {
        this.setState({ activeMsg: res.data });
        console.log(" User Active Action Done!! MSG ", this.state.activeMsg);
        this.loadAllUsers();
      })
      .catch((res) => {
        this.setState({
          activeMsg:
            "Please chaeck you network connection and try again or contact administrator, Thanks",
        });
        console.log(" User Active Action Done!! MSG CA", this.state.activeMsg);
      });

    console.log(" User Active Action All Pass");
  };

  loadAllUsers = async () => {
    await Axios.get("http://localhost:8085/api/users")
      .then((res) => {
        if (userList.length > 0) {
          userList = [];
        }

        res.data.map((user) => {
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
                    <h3 className="card-title">All Confirmed User</h3>
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
                          <th>Status</th>
                          <th>Details</th>
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
                                  <b>
                                    {item.status == 1 ? (
                                      <b className="btn btn-block btn-success btn-sm">
                                        Active
                                      </b>
                                    ) : (
                                      <b className="btn btn-block btn-danger btn-sm">
                                        Deactive
                                      </b>
                                    )}
                                  </b>
                                  <br />

                                  {item &&
                                    (item.status == 1 ? (
                                      <a
                                        href={`javascript:void(0);`}
                                        onClick={() => {
                                          this.userInActive(item.publicId);
                                        }}
                                      >
                                        Deactive
                                      </a>
                                    ) : (
                                      <a
                                        href={`javascript:void(0);`}
                                        onClick={() => {
                                          this.userActiveAction(item.publicId);
                                        }}
                                      >
                                        Active
                                      </a>
                                    ))}
                                  <br />
                                </td>

                                {console.log("Public ID: ", item.publicId)}
                                {console.log("User Status: ", item.status)}
                                <td>
                                  <a
                                    href={`/users/user/${item.publicId}`}
                                    className="btn btn-block btn-outline-primary btn-sm"
                                  >
                                    Details{" "}
                                  </a>
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

export default Users;
