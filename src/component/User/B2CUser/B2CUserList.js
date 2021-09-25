import React from "react";
import { Link } from "react-router-dom";

const B2CUserList = (params) => {
  const { users, status } = params;
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
                        <th>#</th>
                        <th>Client ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Since</th>
                        {status === 2 ? (
                          <React.Fragment>
                            <th>Prev Info</th>
                            <th>Updated Info </th>
                            <th>Action</th>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                        {status === 1 ? (
                          <React.Fragment>
                            <th>Status</th>
                            <th>Updated history</th>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user, idx) => {
                          return (
                            <React.Fragment>
                              <tr>
                                <td>{idx + 1}</td>
                                <td>{user.userGemId}</td>
                                <td>
                                  {user.name != null ? user.name : "Anonymous"}
                                </td>
                                <td>{user.officialEmail}</td>
                                <td>{user.officialPhoneNumber}</td>
                                <td>
                                  {user.role != null ? user.role.name : ""}
                                </td>
                                <td>{user.officeLocation}</td>

                                <td>
                                  <b>
                                    {user.status == 1 ? (
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

                                  {user &&
                                    (user.status == 1 ? (
                                      <a
                                        href={`javascript:void(0);`}
                                        onClick={() => {
                                          this.userInActive(user.publicId);
                                        }}
                                      >
                                        Deactive
                                      </a>
                                    ) : (
                                      <a
                                        href={`javascript:void(0);`}
                                        onClick={() => {
                                          this.userActiveAction(user.publicId);
                                        }}
                                      >
                                        Active
                                      </a>
                                    ))}
                                  <br />
                                </td>

                                <td>
                                  <Link
                                    to={`/users/user/${user.publicId}`}
                                    className="btn btn-block btn-outline-primary btn-sm"
                                  >
                                    Details{" "}
                                  </Link>
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr></tr>
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
};

export default B2CUserList;
