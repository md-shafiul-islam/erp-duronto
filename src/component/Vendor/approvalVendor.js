import React, { Component } from "react";
import VendorView from "./vendorView";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

const baseUrl = BASE_URL;

const headers = REQUEST_HEADER;

class ApprovalVendor extends Component {
  state = {
    vendorMSG: "",
    getVendorStatus: true,
    vendors: [],
    approveMsg: "",
    rejectMsg: "",
  };
  componentDidMount() {
    this.loadPandingVendors();
  }

  loadPandingVendors = async () => {
    let vendorsUrl = `${baseUrl}/vendors/panding`;

    Axios.get(vendorsUrl, { headers: headers })
      .then((res) => {
        this.setState({ vendors: [] });
        this.setState({ vendors: res.data, getVendorStatus: false });
      })
      .catch((res) => {
        console.log("Vendor Error: ", res);
      });

    if (this.state.vendors !== undefined) {
      if (this.state.vendors[0] === undefined) {
        this.setState({ vendorMSG: "Vendor List Is Empty" });
      }
    }
  };

  vendorApproveAction = async (vendorId) => {
    Axios.get(`${baseUrl}/vendors/vendor/approval/${vendorId}`, {
      headers: headers,
    })
      .then((res) => {
        if (res.data !== undefined) {
          this.loadPandingVendors();
          this.setState({ approveMsg: "Approve Sucess" });
        }
      })
      .catch((res) => {
        console.log("Error ", res);
        this.setState({ approveMsg: "Connection Error" });
      });
  };

  vendorRejectAction = async (vendorId) => {
    Axios.get(`${baseUrl}/vendors/vendor/reject/${vendorId}`, {
      headers: headers,
    })
      .then((res) => {
        if (res.data !== undefined) {
          this.loadPandingVendors();
          this.setState({ rejectMsg: "Reject Sucess" });
        }
      })
      .catch((res) => {
        console.log("Error ", res);
        this.setState({ rejectMsg: "Connection Error" });
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
                            <th>Details</th>
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
                            approveStatus={true}
                            onActionRej={this.vendorRejectAction.bind(this)}
                            onActionApprove={this.vendorApproveAction.bind(
                              this
                            )}
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
    }
  }
}

export default ApprovalVendor;
