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
                    console.log(JSON.stringify(values, null, 2));
                    this.updateCountry(values);
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
  country: state.category,
});
export default connect(mapStateToProps, { getCountry, updateCountry })(
  EditCoutry
);
