import React, { Component } from "react";
import Axios from "axios";
import VendorView from "./vendorView";

const baseUrl = "http://localhost:8085/api";
let headers = {
  "Content-Type": "application/json",
};

class Vendors extends Component {
  state = {
    vendorMSG: "",
    getVendorStatus: true,
    vendors: [],
  };
  componentDidMount() {
    this.loadConfVendors();
  }

  loadConfVendors = async () => {
    let vendorsUrl = `${baseUrl}/vendors/list`;

    Axios.get(vendorsUrl)
      .then((res) => {
        this.state.vendors = [];
        this.setState({ vendors: res.data, getVendorStatus: false });

        console.log("vendors State: ", this.state.vendors);
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

  render() {
    if (this.getVendorStatus) {
      return;
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

export default Vendors;
