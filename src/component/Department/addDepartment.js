import React, { Component } from "react";
import Axios from "axios";
import { Field, Formik, Form } from "formik";
import { Redirect } from "react-router-dom";

let headers = {
  "Content-Type": "application/json",
};

class AddDepartment extends Component {
  state = {
    redirect: false,
  };

  addCategoryAction = (values) => {
    if (values != null) {
      let department = JSON.stringify(values, null, 2);

      Axios.post(
        "http://localhost:8085/api/departments/department",
        department,
        { headers: headers }
      )
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
      return <Redirect to="/departments" />;
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-8" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Category</h3>
                </div>

                {/* form start */}

                <Formik
                  initialValues={{
                    name: "",
                    description: "",
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

export default AddDepartment;
