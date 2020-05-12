import React, { Component } from "react";
import LoadingData from "../Layout/LoadingData";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
import UsoitCKEditor from "../UsoitCKEditor";
import { Redirect } from "react-router-dom";

const baseUrl = "http://localhost:8085/api";

let headers = {
  "Content-Type": "application/json",
};

class UpdateTermsAndConds extends Component {
  constructor(props) {
    super(props);

    this.publicId = props.match.params.id;
  }
  state = {
    cTerm: {},
    termLoadStatus: true,
    tNcMsg: "",
    tersmMsg: "",
    redirectStatus: false,
  };

  componentDidMount() {
    this.loadTermData();
  }

  loadTermData = async () => {
    if (this.publicId === undefined) {
      this.publicId = "";
    }
    let editTermUrl = `${baseUrl}/terms/term/${this.publicId}`;

    await Axios.get(editTermUrl)
      .then((res) => {
        if (res.data !== undefined) {
          this.setState({ cTerm: res.data, termLoadStatus: false });
        }
      })
      .catch((res) => {
        this.setState({
          tersmMsg:
            "Connection Error, Please check your connection and try again. Thanks",
        });
      });

    if (this.state.cTerm.publicId === undefined) {
      this.setState({ termLoadStatus: true });
      this.loadTermData();
    }
  };

  addTermsAndConditionsAction = async (fData) => {
    let tandcUrl = `${baseUrl}/terms/term`;

    fData &&
      (await Axios.put(tandcUrl, JSON.stringify(fData, null, 2), {
        headers: headers,
      })
        .then((res) => {
          this.setState({
            tNcMsg: res.data,
            tNcNsgStatus: true,
            redirectStatus: true,
          });
        })
        .catch((res) => {
          this.setState({
            tNcMsg: "Please, check your connection then try again",
            tNcNsgStatus: true,
          });
        }));
  };

  render() {
    if (this.state.termLoadStatus) {
      return <LoadingData />;
    }

    if (this.state.redirectStatus) {
      return <Redirect to="/terms" />;
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Terms And Conditions</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={this.state.cTerm}
                  onSubmit={(values, actions) => {
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
                            value={props.values.name}
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
                            data={props.values.discription}
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

export default UpdateTermsAndConds;
