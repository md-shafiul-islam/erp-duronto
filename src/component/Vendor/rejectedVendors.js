import React, { Component } from "react";
import LoadingData from "../Layout/LoadingData";
import Axios from "axios";
import DataNotFound from "../Layout/dataNotFound";
import VendorView from "./vendorView";

const baseUrl = "http://localhost:8085/api";

const headers = {
  "Content-Type": "application/json",
};

class RejectedVendors extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    vendors: [],
    getVendorStatus: true,
  };

  componentDidMount() {
    this.loadRejectedVendor();
  }

  loadRejectedVendor = async () => {
    await Axios.get(`${baseUrl}/vendors/rejected`)
      .then((res) => {
        res.data &&
          this.setState({ vendors: res.data, getVendorStatus: false });
      })
      .catch((res) => {
        console.log("Connection Error, ", res);
      });
  };

  render() {
    if (this.getVendorStatus) {
      return <LoadingData />;
    }

    if (this.state.vendors !== undefined) {
      return (
        <React.Fragment>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">All Rejected Vendor</h3>
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
                            <th>Company Name</th>
                            <th>Owner Name</th>
                            <th>Category</th>
                            <th>Added By</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <VendorView
                            vendors={this.state.vendors}
                            userStatus={true}
                            userActin={`/users/user/`}
                            detailStatus={true}
                            detailActin="/vendors/vendor/details/"
                            editStatus={false}
                            approveStatus={false}
                          />
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
    } else {
      return (
        <React.Fragment>
          <DataNotFound />
        </React.Fragment>
      );
    }
  }
}

export default RejectedVendors;
