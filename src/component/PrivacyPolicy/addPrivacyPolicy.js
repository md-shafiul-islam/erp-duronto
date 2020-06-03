import React, { Component } from "react";

import UsoitCKEditor from "../UsoitCKEditor";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
import { Redirect, Link } from "react-router-dom";

const baseUrl = "http://localhost:8085/api";
let headers = {
  "Content-Type": "application/json",
};

class AddPrivacyPolicy extends Component {
  state = {
    redirectStatus: false,
    policyStatus: false,
  };

  addTermsAndConditionsAction = async (fData) => {
    let tandcUrl = `${baseUrl}/privacy-policies/policy`;
    let dJsonData = JSON.stringify(fData, null, 2);
    dJsonData &&
      (await Axios.post(tandcUrl, dJsonData, { headers: headers })
        .then((res) => {
          this.setState({
            policyMSG: res.data,
            policyStatus: true,
            redirectStatus: true,
          });
        })
        .catch((res) => {
          this.setState({
            policyMSG: "Please, check your connection then try again",
            policyStatus: true,
          });
        }));
  };

  render() {
    if (this.state.redirectStatus) {
      return <Redirect to="/privacyPolicies" />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Privacy Policy</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={{
                    name: "",
                    discription: "",
                  }}
                  onSubmit={(values, actions) => {
                    console.log(
                      "Before Send Data",
                      JSON.stringify(values, null, 2)
                    );
                    this.addTermsAndConditionsAction(values);
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
                          <label htmlFor="description">Discription:</label>
                          <UsoitCKEditor
                            onChange={(e, editor) => {
                              props.setFieldValue(
                                "discription",
                                editor.getData()
                              );
                            }}
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
                          <span className="text">Save</span>
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

export default AddPrivacyPolicy;
