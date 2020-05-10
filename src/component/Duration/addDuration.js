import React, { Component } from "react";
import Axios from "axios";
import { Field, Formik, Form } from "formik";
import { Redirect } from "react-router-dom";

class AddDuration extends Component {
  state = {
    redirect: false,
  };

  addCategoryAction = (values) => {
    if (values != null) {
      let durations = JSON.stringify(values, null, 2);

      Axios.post("http://localhost:8085/api/durations/duration", durations)
        .then((res) => {
          console.log("Done Category Add: ", res.data);
          this.setState({ redirect: true });
        })
        .catch((res) => {
          console.log("Error: ", res);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/durations" />;
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-8" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Durations</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={{
                    name: "",
                    day: "",
                    nigth: "",
                  }}
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
                          <label htmlFor="description">Day:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="day"
                            name="day"
                            placeholder="Day"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="description">Day:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="nigth"
                            name="nigth"
                            placeholder="Night"
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

export default AddDuration;
