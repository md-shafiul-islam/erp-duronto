import React, { Component } from "react";

import Axios from "axios";

import CommonTableView from "../Layout/TableView/CommonTableView";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAccess } from "../../actions/appStoreAction";
import {
  updateDesignation,
  getDesignationById,
} from "../../actions/designationActions";
import { Formik, Form, Field } from "formik";

class EditDesignation extends Component {
  constructor(props) {
    super(props);
    this.paramId = props.match.params.id;
  }

  componentDidMount() {
    this.props.getDesignationById(this.paramId, this.props.history);
  }

  updateDesignationAction = (values) => {
    let data = JSON.stringify(values, null, 2);
    this.props.updateDesignation(data, this.props.history);
  };

  render() {
    let { designation } = this.props.designation;

    return !this.props.designation.designations ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="row mp-35">
              <div className="col-11">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Update Or Edit Description</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    {/* form start */}

                    <Formik
                      enableReinitialize={true}
                      initialValues={designation}
                      onSubmit={(values, actions) => {
                        console.log(JSON.stringify(values, null, 2));
                        this.updateDesignationAction(values);
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

EditDesignation.prototypes = {
  getAccess: PropTypes.func.isRequired,
  getDesignationById: PropTypes.func.isRequired,
  updateDesignation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  tokenData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  tokenData: state.tokenData,
  designation: state.designation,
});

export default connect(mapStateToProps, {
  getAccess,
  getDesignationById,
  updateDesignation,
})(EditDesignation);
