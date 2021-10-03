import React, { Component } from "react";
import LoadingData from "../Layout/LoadingData";
import VendorView from "./vendorView";
import Axios from "axios";
import DataNotFound from "../Layout/dataNotFound";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

class UpdateApprovalVendor extends Component {
  state = {
    vendors: [],
    getVendorStatus: true,
  };

  componentDidMount() {
    this.loadUpdatePandingVendor();
  }

  loadUpdatePandingVendor = async () => {
    await Axios.get(`${BASE_URL}/vendors/update-approval`, { headers: REQUEST_HEADER })
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
                      <h3 className="card-title">All Confirmed Vendor</h3>
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
                            detailActin="/vendors/update/details/"
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

export default UpdateApprovalVendor;
