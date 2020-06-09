import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL, REQUEST_HEADER } from "../../../actions/types";
import { Link } from "react-router-dom";
let url = `${BASE_URL}/packages/panding`;

class PackagesView extends Component {
  state = {
    pandinPacks: [
      {
        publicId: null,
      },
    ],
    packLoad: true,
  };
  componentDidMount() {
    this.loadAllPandingPackages();
  }

  loadAllPandingPackages = async () => {
    let packas = [];

    await Axios.get(url, { headers: REQUEST_HEADER })
      .then((res) => {
        packas = res.data;

        this.setState({ pandinPacks: [] });

        this.setState({ pandinPacks: packas });
        this.setState({ packLoad: false });
      })
      .catch((res) => {
        console.log("Error Panding Packs ", res);
      });
  };

  rejectPackAction = async (pubId) => {
    console.log("Reject Trigge!! Public ID: ", pubId);
    let rData = { id: pubId };
    let urlRData = `${BASE_URL}/packages/package/reject`;
    await Axios.put(urlRData, rData)
      .then((res) => {
        console.log("Reject Done!!", res.data);

        this.setState({ rejectActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });
    window.location.reload(false);
  };

  approvePackAction = async (pId) => {
    console.log("Approve Trigge!!");

    console.log("This Public ID: ", pId);

    let urlData = `${BASE_URL}/packages/package/approve`;
    let apData = { id: pId };
    await Axios.put(urlData, apData)
      .then((res) => {
        this.setState({ approveActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });

    window.location.reload(false);
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
                      All Add Pending Package List View
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
                          if (
                            item.publicId === undefined &&
                            1 >= this.state.pandinPacks.length
                          ) {
                            return (
                              <React.Fragment>
                                <div style={{ marginLeft: 350 }}>
                                  <p>Not Found Any Panding Package !!</p>
                                </div>
                              </React.Fragment>
                            );
                          }

                          return (
                            <React.Fragment key={`pack-pen-${ind}`}>
                              {item && (
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
                                    {item.packageCat && item.packageCat.name}
                                  </td>
                                  <td>{item.duration && item.duration.name}</td>
                                  <td>
                                    {item.price != null ? item.price : "0"}
                                  </td>
                                  <td>
                                    <Link
                                      to={`/packages/package/detail/${item.publicId}`}
                                      className="btn btn-info btn-icon-split"
                                    >
                                      <span className="icon text-white-50">
                                        <i className=" nav-icon fas fa-edit" />
                                      </span>
                                      <span className="text">Detail</span>
                                    </Link>
                                  </td>
                                  <td>
                                    <a
                                      onClick={() => {
                                        this.approvePackAction(item.publicId);
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
                                        this.rejectPackAction(item.publicId);
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
                              )}
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

export default PackagesView;
