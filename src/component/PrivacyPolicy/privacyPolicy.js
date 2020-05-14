import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";

const baseUrl = "http://localhost:8085/api";
class PrivacyPolicy extends Component {
  state = { terms: {}, termLoadStatus: true };

  componentDidMount() {
    this.loadTermCnds();
  }

  loadTermCnds = async () => {
    let termUrl = `${baseUrl}/privacy-policies`;
    await Axios.get(termUrl)
      .then((res) => {
        console.log("Response Data: ", res.data);

        if (res.data !== undefined) {
          if (res.data[0] !== undefined) {
            console.log("Response Data If Set : ", res.data[0]);
            this.setState({ terms: res.data, termLoadStatus: false });
            this.setState({
              termMsg: "Status Return",
            });
          }
        }
      })
      .catch((res) => {
        this.setState({
          termMsg: "Please, Check connection and try Again. Thanks",
        });
      });

    console.log("Msg: ", this.state.termMsg);

    console.log("Terms Status: ", this.state.termLoadStatus);

    if (this.state.terms !== undefined) {
      console.log("terms After Set ", this.state.terms);
    } else {
      this.setState({ termLoadStatus: true });
      this.loadTermCnds();
    }
  };

  render() {
    if (this.state.termLoadStatus) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All privacy Policy </h3>
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

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.terms !== undefined
                          ? this.state.terms.map((term, indx) => {
                              return (
                                <tr>
                                  <td>{indx + 1}</td>
                                  <td>
                                    {term.name !== undefined
                                      ? term.name
                                      : "Anonymous"}
                                  </td>

                                  <td>
                                    <a
                                      href={`/privacyPolicies/policy/details/${term.publicId}`}
                                      className="btn btn-info btn-icon-split"
                                    >
                                      <span className="icon text-white-50">
                                        <i className=" nav-icon fas fa-task" />
                                      </span>
                                      <span className="text">Details</span>
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          : ""}
                      </tbody>
                      <tfoot>
                        <tr>
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

export default PrivacyPolicy;
