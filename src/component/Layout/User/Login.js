import React, { Component } from "react";
import { Formik, Form, Field } from "formik";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/securityActions";

class Login extends Component {
  constructor() {
    super();
  }

  state = {
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Change state: ", nextProps);

    if (nextProps.security !== undefined) {
      if (nextProps.security.validToken) {
        this.props.history.push("/");
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  submitAction = async (values) => {
    console.log(values);

    let loginData = JSON.stringify(values);
    console.log("After Strigfi Data");
    console.log(loginData);

    this.props.loginAction(loginData);

    console.log("Submit ACtion");
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row pading-35">
              {/* left column */}
              <div className="col-md-8">{/** Image Add Here */}</div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-11">
                    {/* jquery validation */}
                    <div className="card card-primary ">
                      {/* /.card-header */}
                      {/* form start */}
                      <Formik
                        initialValues={{
                          username: "",
                          password: "",
                        }}
                        onSubmit={(values, actions) => {
                          console.log("User Login Submited");
                          this.submitAction(values);
                          setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                            console.log(JSON.stringify(values, null, 2));
                          }, 1000);
                        }}
                      >
                        {(props) => (
                          <React.Fragment>
                            <Form>
                              <div className="card-body mp35">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter email Or Phone"
                                  />
                                </div>
                                <div className="form-group">
                                  <Field
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                  />
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <button
                                        type="submit"
                                        className="btn btn-block btn-primary btn-lg"
                                      >
                                        Log In
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <a href="/fogetpassword" className="link">
                                      Forget Password ?
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* /.card-body */}
                            </Form>
                          </React.Fragment>
                        )}
                      </Formik>
                    </div>
                    {/* /.card */}
                  </div>
                </div>
              </div>
              {/*/.col (left) */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    );
  }
}

Login.prototypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginAction })(Login);
