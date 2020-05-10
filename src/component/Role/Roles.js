import React, { Component } from "react";
import Axios from "axios";

let gRole = [];

class Roles extends Component {
  state = {
    roles: [
      {
        genId: "",
        name: "Developer",
        description: "Developer",
        publicId: "",
      },
    ],
    loadRole: false,
  };

  async componentDidMount() {
    await Axios.get("http://localhost:8085/api/roles")
      .then((res) => {
        gRole = res.data;
        this.setState({ roles: [] });

        this.setState({ roles: gRole, loadRole: true });
        console.log("Success Load All Roles", this.state.roles);
      })
      .catch((res) => {
        console.log("Error Load All Roles", res);
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Department List View</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="departmentTable"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Description</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.roles.map((role, ind) => {
                          return (
                            <React.Fragment>
                              <tr>
                                <td>{role.genId}</td>
                                <td>
                                  {role.name != null ? role.name : "Anonymous"}
                                </td>
                                <td>
                                  {role.description != null
                                    ? role.description
                                    : ""}
                                </td>

                                <td>
                                  <a
                                    href={`/roles/role/edit/${role.publicId}`}
                                    className="btn btn-info btn-icon-split"
                                  >
                                    <span className="icon text-white-50">
                                      <i className=" nav-icon fas fa-edit" />
                                    </span>
                                    <span className="text">Edit</span>
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

        {/** End Main Warpper */}
      </React.Fragment>
    );
  }
}

export default Roles;
