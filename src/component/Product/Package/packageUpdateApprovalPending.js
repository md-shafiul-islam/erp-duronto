import React, { Component } from "react";
import Axios from "axios";
let url = "http://localhost:8085/api/packages/update-approval-panding";

class PackageUpdateApprovalPending extends Component {
  state = {
    pandinPacks: [],
    packLoad: true,
    approveActionStatus: false,
    rejectActionStatus: false,
  };
  componentDidMount() {
    this.loadAllPandingPackages();
  }

  loadAllPandingPackages = async () => {
    let packas = [];

    await Axios.get(url)
      .then((res) => {
        packas = res.data;

        this.setState({ pandinPacks: [] });
        console.log("Data Packages Load: ", packas);

        this.setState({ pandinPacks: packas });
        this.setState({ packLoad: false });
      })
      .catch((res) => {
        console.log("Error Panding Packs ", res);
      });
  };

  approveAction = async (pId) => {
    console.log("Public ID ", pId);

    let urlData = `http://localhost:8085/api/packages/package/update-approve`;
    let apData = { id: pId };
    await Axios.put(urlData, apData)
      .then((res) => {
        console.log("Approve Done!!", res.data);
        this.setState({ approveActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });

    if (this.state.approveActionStatus) {
      window.location.reload(false);
    }
  };

  rejectAction = async (pId) => {
    console.log("Reject Trigge!! Public ID: ", pId);
    let rData = { id: pId };
    let urlRData = `http://localhost:8085/api/packages/package/update-reject`;
    await Axios.put(urlRData, rData)
      .then((res) => {
        console.log("Reject Done!!", res.data);

        this.setState({ rejectActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });
    this.state.rejectActionStatus && window.location.reload(false);
  };

  render() {
    if (this.state.packLoad) {
      return (
        <React.Fragment>
          <div style={{ marginLeft: 350 }}>
            <p>Data Loading</p>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      All Update Approval List View
                    </h3>
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
                          <th>Code</th>
                          <th>Package Name</th>

                          <th>Country</th>

                          <th>Category</th>
                          <th>Duration</th>
                          <th>Price</th>

                          <th>Details</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.pandinPacks.map((item, ind) => {
                          return (
                            <React.Fragment key={`pack-update-${ind}`}>
                              <tr>
                                <td>{`${ind + 1}`}</td>
                                <td>{item.code !== null ? item.code : ""}</td>
                                <td>{item.name != null ? item.name : ""}</td>
                                <td>
                                  {item.countries &&
                                    item.countries.map((coun, inx) => {
                                      return item.countries.lenght > inx
                                        ? coun.name + ", "
                                        : coun.name;
                                    })}
                                </td>

                                <td>
                                  {item.packageCat != null
                                    ? item.packageCat.name
                                    : ""}
                                </td>
                                <td>
                                  {item.duration !== null
                                    ? item.duration.name
                                    : " Not Set "}
                                </td>
                                <td>{item.price != null ? item.price : "0"}</td>

                                <td>
                                  <a
                                    href={`/packages/package/detail/${item.publicId}`}
                                    className="btn btn-info btn-icon-split"
                                  >
                                    <span className="icon text-white-50">
                                      <i className=" nav-icon fas fa-edit" />
                                    </span>
                                    <span className="text">Detail</span>
                                  </a>
                                </td>

                                <td>
                                  <a
                                    onClick={() => {
                                      this.approveAction(item.publicId);
                                    }}
                                    href={`javascript:void(0);`}
                                    className="btn btn-outline-success btn-icon-split mp-5"
                                  >
                                    <span className="icon text-white-50">
                                      <i className=" nav-icon fas fa-edit" />
                                    </span>
                                    <span className="text">Approve</span>
                                  </a>

                                  <a
                                    onClick={() => {
                                      this.rejectAction(item.publicId);
                                    }}
                                    href={`javascript:void(0);`}
                                    className="btn btn-outline-danger btn-icon-split mp-5"
                                  >
                                    <span className="icon text-white-50">
                                      <i className=" nav-icon fas fa-edit" />
                                    </span>
                                    <span className="text">Reject</span>
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

export default PackageUpdateApprovalPending;
