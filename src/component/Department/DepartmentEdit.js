import React, { Component } from "react";
import { REQUEST_HEADER, BASE_URL } from "../../actions/types";
import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

class DepartmentEdit extends Component {
  constructor(props) {
    super(props);

    this.paramId = props.match.params.id;
  }
  state = {
    redirect: false,
    department: {},
  };

  componentDidMount() {
    this.loadSelectedDepartment();
  }

  loadSelectedDepartment = async () => {
    let dUrl = `${BASE_URL}/departments/department/${this.paramId}`;

    Axios.get(dUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        if (res.data) {
          console.log("Receve Department to db : ", res.data);
          this.setState({ department: res.data, loadStatus: false });
        }
      })
      .catch((res) => {
        console.log("Error Load Department: ", res);
        this.setState({ loadStatus: true });
      });
  };

  updateCategoryAction = (values) => {
    if (values != null) {
      let department = JSON.stringify(values, null, 2);

      Axios.put(`${BASE_URL}/departments/department`, department, {
        headers: REQUEST_HEADER,
      })
        .then((res) => {
          console.log("Done Category Add: ", res.data);
          this.setState({ redirect: true });
          this.props.history.push("/departments");
        })
        .catch((res) => {
          console.log("Error: ", res);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      console.log("Link Run");
      return <Link to="/departments" />;
    }

    if (this.state.loadStatus) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-8" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Edit Or Update Department</h3>
                </div>

                {/* form start */}

                <Formik
                  enableReinitialize={true}
                  initialValues={this.state.department}
                  onSubmit={(values, actions) => {
                    console.log(JSON.stringify(values, null, 2));
                    this.updateCategoryAction(values);
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

export default DepartmentEdit;
