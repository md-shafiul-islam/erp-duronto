import React, { Component } from "react";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { Formik, Form, Field } from "formik";
import UsoitCKEditor from "../UsoitCKEditor";
import { Redirect} from "react-router-dom";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

const baseUrl = BASE_URL;
let headers = REQUEST_HEADER;

class UpdatePrivacyPolicy extends Component {
  constructor(props) {
    super(props);

    this.pubId = props.match.params.id;
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
    if (this.pubId === undefined) {
      return;
    }

    let policyUrl = `${baseUrl}/privacy-policies/policy/${this.pubId}`;

    Axios.get(policyUrl, { headers: REQUEST_HEADER }).then((res) => {
      if (res.data !== undefined) {
        if (res.data.name !== undefined) {
          this.setState({ policy: res.data, getPolicyStatus: false });
        }
      }

      console.log(" Edit Policy: ", this.state.policy);
    });
  };

  addPrivacyPolicyAction = async (fData) => {
    let tandcUrl = `${baseUrl}/privacy-policies/policy`;
    let dJsonData = JSON.stringify(fData, null, 2);
    dJsonData &&
      (await Axios.put(tandcUrl, dJsonData, { headers: headers })
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

    if (this.state.getPolicyStatus) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Edit Or Update Privacy Policy</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={this.state.policy}
                  onSubmit={(values, actions) => {
                    console.log(
                      "Before Send Data",
                      JSON.stringify(values, null, 2)
                    );
                    this.addPrivacyPolicyAction(values);
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
                            value={props.values.name}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="description">Description:</label>
                          <UsoitCKEditor
                            onChange={(e, editor) => {
                              props.setFieldValue(
                                "description",
                                editor.getData()
                              );
                            }}
                            data={props.values.description}
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

export default UpdatePrivacyPolicy;
