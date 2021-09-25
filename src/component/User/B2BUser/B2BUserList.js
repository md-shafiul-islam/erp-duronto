import React from "react";
import { Link } from "react-router-dom";
import WrapperCardContent from "../../Layout/WrapperCardContent";

const B2BUserList = (params) => {
  let { users, status } = params;
  return (
    <React.Fragment>
      <WrapperCardContent title="All B2B Approval Pending Users">
        <table
          id="departmentTable"
          className="table table-bordered table-hover"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Client ID</th>
              <th>Since</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>

              <th>Company Name</th>
              {status === -1 || status === 2 ? "" : <th>Commission %</th>}

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
              users.map((item, idx) => {
                return (
                  <React.Fragment>
                    <tr>
                      <td>{idx + 1}</td>

                      <td>
                        <Link
                          to={`/b2bclients/user/${item.publicId}`}
                          className="btn btn-block btn-outline-primary btn-sm"
                        >
                          {item.userGemId}
                        </Link>
                      </td>

                      <td>{item.name != null ? item.name : "Anonymous"}</td>
                      <td>{item.officialEmail}</td>
                      <td>{item.officialPhoneNumber}</td>
                      <td>{item.role != null ? item.role.name : ""}</td>
                      <td>{item.officeLocation}</td>

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
      </WrapperCardContent>
    </React.Fragment>
  );
};

export default B2BUserList;
