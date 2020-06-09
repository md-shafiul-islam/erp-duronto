import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL, REQUEST_HEADER } from "../../../actions/types";
import { Link } from "react-router-dom";
let url = `${BASE_URL}/packages/reject`;

class PackageRejectView extends Component {
  state = {
    pandinPacks: [],
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
                    <h3 className="card-title">All Reject Package List View</h3>
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
                          <th>Reject From</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.pandinPacks.map((item, ind) => {
                          return (
                            <React.Fragment>
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

                                <td>{item.modyfiyStatus}</td>
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

export default PackageRejectView;
