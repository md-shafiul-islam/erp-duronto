import React, { Component } from "react";
import Axios from "axios";

const departmentList = [];

class Departments extends Component {
  async componentDidMount() {
    this.loadDepartmentList();
  }

  loadDepartmentList = async () => {
    await Axios.get("http://localhost:8085/api/departments")
      .then((res) => {
        if (departmentList.length > 0) {
          departmentList = [];
        }

        console.log("Success Categories Loading... ", res);
        res.data.map((item, idx) => {
          departmentList.push(item);
        });
      })
      .catch((res) => {
        console.log("Error Categories Loading... ", res);
      });

    console.log("Cat List After All work: ", departmentList);

    if (this.state.departments.length > 0) {
      this.setState({ departments: [] });
      this.setState({ departments: departmentList });
    } else {
      this.setState({ departments: departmentList });
      this.setState({ dataLoad: true });
    }

    if (departmentList.length > 0) {
      console.log("load All data Done IF");
      return;
    } else {
      console.log("load All data Done Else Run Again this Fnc");
      this.loadDepartmentList();
    }
  };

  state = {
    departments: departmentList,
    dataLoad: false,
    redirect: false,
  };

  render() {
    return !this.state.dataLoad && this.state.departments === null ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {console.log("After Render: ", departmentList)}

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Category List View</h3>
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
                        {this.state.departments.map((item, ind) => {
                          return (
                            <React.Fragment>
                              <tr key={ind}>
                                <td>{item.id}</td>
                                <td>
                                  {" "}
                                  {item.name !== "" ? item.name : "Anonymous"}
                                </td>
                                <td>
                                  {item.description !== null
                                    ? item.description
                                    : ""}
                                </td>

                                <td>
                                  <a
                                    href="/categories/category/id"
                                    class="btn btn-info btn-icon-split"
                                  >
                                    <span class="icon text-white-50">
                                      <i class=" nav-icon fas fa-edit"></i>
                                    </span>
                                    <span class="text">Edit</span>
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

export default Departments;
