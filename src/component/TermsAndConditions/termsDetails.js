import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:8085/api";

class TermsDetails extends Component {
  constructor(props) {
    super(props);
    this.pubId = props.match.params.id;
  }

  state = { term: {}, termLoadStatus: true };

  componentDidMount() {
    this.loadTermAndCondsById();
  }

  loadTermAndCondsById = async () => {
    if (this.pubId === undefined) {
      this.pubId = "";
    }

    let conditionUrl = `${baseUrl}/terms/term/${this.pubId}`;

    Axios.get(conditionUrl)
      .then((res) => {
        this.setState({ term: res.data, termLoadStatus: false });
        console.log("Receive Data", this.state.term);
        console.log("publicId: ", this.pubId);
      })
      .catch((res) => {
        this.setState({ termMsg: "Connection Error", termLoadStatus: true });
      });
  };

  render() {
    if (this.state.termLoadStatus) {
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
                  <h1>Terms And Conditions Details</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/terms/">Terms</a>
                    </li>
                    <li className="breadcrumb-item active">term/details</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            {/* Default box */}
            {this.state.term && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{this.state.term.name}</h3>
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
                    __html: this.state.term.discription,
                  }}
                />

                {/* /.card-body */}
                <div className="card-footer">
                  <div className="row">
                    <div className="offset-md-6 col-md-2">
                      <Link
                        to={`/terms`}
                        className="btn btn-block btn-outline-primary btn-sm"
                      >
                        Back
                      </Link>
                    </div>
                    <div className="col-md-2">
                      {() => {
                        console.log(this.state.term.publicId);
                      }}
                      <Link
                        to={`/terms/term/edit/${this.state.term.publicId}`}
                        className="btn btn-block btn-outline-success btn-sm"
                      >
                        Edit Or Update
                      </Link>
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

export default TermsDetails;
