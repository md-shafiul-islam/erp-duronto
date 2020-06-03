import React, { Component } from "react";

import { Field, Formik, Form } from "formik";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";

import { updatePackCategoryAction } from "../../actions/packCatAction";
import { BASE_URL, REQUEST_HEADER_GET } from "../../actions/types";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";

class PackCategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.paramId = props.match.params.id;
  }
  state = {
    redirect: false,
    packCat: {},
    pacCatLoadStatus: true,
  };

  componentDidMount() {
    this.getSelectedPacageCat();
  }

  getSelectedPacageCat = async () => {
    let url = `${BASE_URL}/package-categories/package-category/${this.paramId}`;

    await Axios.get(url, { headers: REQUEST_HEADER_GET })
      .then((res) => {
        this.setState({ packCat: res.data, pacCatLoadStatus: false });
      })
      .catch((res) => {
        this.setState({ pacCatLoadStatus: true });
        console.log("Error:, ", res);
      });
  };

  addCategoryAction = (values) => {
    if (values != null) {
      let category = JSON.stringify(values, null, 2);
      this.props.updatePackCategoryAction(category, this.props.history);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/package-categories" />;
    }

    if (this.state.pacCatLoadStatus) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-8" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Package Category</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={this.state.packCat}
                  onSubmit={(values, actions) => {
                    console.log(JSON.stringify(values, null, 2));
                    this.addCategoryAction(values);
                  }}
                >
                  {(props) => (
                    <Form>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="name">Name Or Title:</label>{" "}
                          <Field
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description:</label>
                          <Field
                            component="textarea"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Description"
                          />
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary ">
                          <span>
                            {" "}
                            <i className="fas fa-save" />
                          </span>{" "}
                          <span className="text">Update</span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/** Form End */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { updatePackCategoryAction })(PackCategoryEdit);
