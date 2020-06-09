import React, { Component } from "react";

import { Field, Formik, Form } from "formik";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCountry, updateCountry } from "../../actions/countryActions";
import { PropTypes } from "prop-types";

class EditCoutry extends Component {
  constructor(props) {
    super(props);

    //this.countryId = props.match.params.id;
    props.getCountry(props.match.params.id, this.props.history);
  }
  state = {
    redirect: false,
  };

  componentDidMount() {
    console.log("After Category Run ", this.catId);
  }

  updateCatAction = (values) => {
    if (values != null) {
      let country = JSON.stringify(values, null, 2);
      console.log(country);
      this.props.updateCountry(country, this.props.history);
    }
  };

  render() {
    let { country } = this.props.country;

    if (this.state.redirect) {
      return <Redirect to="/categores" />;
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-8" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Edit Or Update Country</h3>
                </div>

                {/* form start */}

                <Formik
                  enableReinitialize={true}
                  initialValues={country}
                  onSubmit={(values, actions) => {
                    this.updateCatAction(values);
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
                          <label htmlFor="niceName">ISO 3 Code:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="description"
                            name="iso3Code"
                            placeholder="Description"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="isoCode">ISO Code:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="isoCode"
                            name="isoCode"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="numCode">Number Code:</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="numCode"
                            name="numCode"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="dialOrPhoneCode">
                            Dial Or Phone Code:
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="dialOrPhoneCode"
                            name="dialOrPhoneCode"
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

EditCoutry.prototypes = {
  getCountry: PropTypes.func.isRequired,
  updateCountry: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  country: state.country,
});
export default connect(mapStateToProps, { getCountry, updateCountry })(
  EditCoutry
);
