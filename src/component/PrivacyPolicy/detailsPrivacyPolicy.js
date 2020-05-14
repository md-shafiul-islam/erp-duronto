import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";

const baseUrl = "http://localhost:8085/api";
let headers = {
  "Content-Type": "application/json",
};

class DetailsPrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.pubId = props.match.params.id;

    console.log("C ID Cons", props.match.params.id);
  }

  state = {
    redirectStatus: false,
    policyStatus: false,
    getPolicyStatus: true,
    policy: {},
  };

  componentDidMount() {
    this.loadPolicyByPbId();
  }

  loadPolicyByPbId = async () => {
    let policyUrl = `${baseUrl}/privacy-policies/policy/${this.pubId}`;

    await Axios.get(policyUrl).then((res) => {
      console.log("recive Data: ", res.data);
      this.setState({ policy: res.data });

      if (this.state.policy.name !== undefined) {
        this.setState({ getPolicyStatus: false });
      }
    });
  };

  render() {
    if (this.state.getPolicyStatus && !this.state.policy.name) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper" style={{ minHeight: "1589.56px" }}>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Privacy Policys Details</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/privacyPolicies/">Privacy Policies</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Privacy Policy/details
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            {/* Default box */}
            {this.state.policy && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{this.state.policy.name}</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                      data-toggle="tooltip"
                      title="Remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div
                  className="card-body"
                  dangerouslySetInnerHTML={{
                    __html: this.state.policy.description,
                  }}
                />

                {/* /.card-body */}
                <div className="card-footer">
                  <div className="row">
                    <div className="offset-md-6 col-md-2">
                      <a
                        href={`/terms`}
                        className="btn btn-block btn-outline-primary btn-sm"
                      >
                        Back
                      </a>
                    </div>
                    <div className="col-md-2">
                      {() => {
                        console.log(this.state.term.publicId);
                      }}
                      <a
                        href={`/privacyPolicies/policy/edit/${this.state.policy.publicId}`}
                        className="btn btn-block btn-outline-success btn-sm"
                      >
                        Edit Or Update
                      </a>
                    </div>
                  </div>
                </div>
                {/* /.card-footer*/}
              </div>
            )}
            {/* /.card */}
          </section>
          {/* /.content */}
        </div>
      </React.Fragment>
    );
  }
}

export default DetailsPrivacyPolicy;
