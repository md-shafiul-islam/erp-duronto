import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { restPasswordAction } from "../../actions/userActions";
import { Redirect } from "react-router-dom";

class SetRestPassword extends Component {
  constructor(props) {
    super(props);

    this.userId = props.match.params.id;

    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.checkPasswordMixVal = this.checkPasswordMixVal.bind(this);
    this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
    this.openToolTipHandeller = this.openToolTipHandeller.bind(this);
  }

  state = {
    user: {},
    userPass: {},
    matchStatus: false,
    mixStatus: false,
    isPasswordShow: false,
    open: false,
  };

  checkPasswordMatch = (nPass, cPass) => {
    console.log("N Pass: " + nPass);
    console.log("C Pass: " + cPass);

    if (nPass === cPass) {
      return true;
    } else {
      return false;
    }
  };

  checkPasswordMixVal = (nPassWord) => {
    let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    console.log("N Pass: " + nPassWord);

    if (paswd.test(nPassWord)) {
      console.log("Password Requerment is match !!");

      this.setState({
        requermentMsg: "Password Requerment is match !!",
        mixStatus: true,
      });
    } else {
      this.setState({
        requermentMsg: "Password Requerment is not match !!",
        mixStatus: false,
      });
    }

    console.log("Mix Status: ", this.state.mixStatus);
  };

  oldPasswordMatch = (cNPassword) => {};

  passwordRequerment = (password) => {
    let err = "";

    console.log("New Password ", password);
    if (this.checkPasswordMixVal(password)) {
      err = " Password Requerment is match ";
    } else {
      err = "Password Requerment is not match ";
    }
    return err;
  };

  passwordMatch = (cnfPass, npass) => {
    console.log("Conf Password, Password ", cnfPass, npass);

    let err = "";
    if (cnfPass === npass) {
      this.setState({ mathMsg: "Password Match ", matchStatus: true });
      err = "Confrim Password match ";
    } else {
      this.setState({ mathMsg: "Password not Match " });
      err = "Confrim Password not match ";
    }

    return err;
  };

  togglePasswordVisiblity = () => {
    console.log("Toggle :");
    const { isPasswordShow } = this.state;
    console.log("Toggle :", isPasswordShow);
    this.setState({ isPasswordShow: !isPasswordShow });
  };

  openToolTipHandeller = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  submitAction = (values) => {
    let restPassData = {
      oldPass: values.oldPassword,
      nPass: values.password,
      cPass: values.confPassword,
      userId: this.userId,
    };

    console.log("Send Befor Rest inf ", JSON.stringify(restPassData));

    this.props.restPasswordAction(JSON.stringify(restPassData, null, 2));
  };

  render() {
    let { isPasswordShow, open, mixStatus } = this.state;

    let { passRetData, passStatus } = this.props.restData;

    if (passStatus) {
      return <Redirect to="/users" />;
    }

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  {/* jquery validation */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">User Rest Password</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}

                    <Formik
                      initialValues={{
                        oldPassword: "",
                        password: "",
                        confPassword: "",
                      }}
                      onSubmit={(values, actions) => {
                        console.log("User Login Password Set ");
                        this.submitAction(values);
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          actions.setSubmitting(false);
                          console.log(JSON.stringify(values, null, 2));
                        }, 1000);
                      }}
                    >
                      {(props) => (
                        <Form>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="oldPassword">
                                    Old Password
                                  </label>{" "}
                                  <p
                                    className={`requerMsg ${
                                      passRetData.oldPass ? " success" : " err"
                                    }`}
                                  >
                                    {passRetData.oldPassMsg}
                                  </p>
                                  <Field
                                    type="password"
                                    name="oldPassword"
                                    className="form-control"
                                    id="oldPassword"
                                    placeholder="Old Password"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <p id="msg" />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="password">
                                    New Password:{" "}
                                  </label>{" "}
                                  <p
                                    className={`requerMsg ${
                                      mixStatus ? " success" : " err"
                                    }`}
                                  >
                                    {this.state.requermentMsg}
                                  </p>
                                  <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="New Password"
                                    type={isPasswordShow ? "text" : "password"}
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        `password`,
                                        e.target.value
                                      );

                                      this.passwordRequerment(e.target.value);
                                    }}
                                  />
                                  <i
                                    className={`icon-position far ${
                                      !isPasswordShow
                                        ? " fa-eye"
                                        : " fa-eye-slash"
                                    }`}
                                    onClick={this.togglePasswordVisiblity}
                                  ></i>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <Tooltip
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  open={open}
                                  disableFocusListener
                                  disableHoverListener
                                  disableTouchListener
                                  placement="bottom-start"
                                  title="Password must contains one upper case, one lower case, number and special character. e.g a1H4@5%^s"
                                >
                                  <i
                                    className="icon-position-inf fas fa-info"
                                    onClick={this.openToolTipHandeller}
                                  ></i>
                                </Tooltip>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="confPassword">
                                    Confirm Password
                                  </label>{" "}
                                  <p
                                    className={`requerMsg ${
                                      this.state.matchStatus
                                        ? " success"
                                        : " err"
                                    }`}
                                  >
                                    {this.state.mathMsg}
                                  </p>
                                  <Field
                                    type="password"
                                    name="confPassword"
                                    className="form-control"
                                    id="confPassword"
                                    placeholder="Confirm Password"
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        "confPassword",
                                        e.target.value
                                      );
                                      this.passwordMatch(
                                        e.target.value,
                                        props.values.password
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  {/* /.card */}
                </div>
                {/*/.col (left) */}
                {/* right column */}
                <div className="col-md-6" />
                {/*/.col (right) */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

SetRestPassword.prototypes = {
  restPasswordAction: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  restData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  restData: state.restData,
});

export default connect(mapStateToProps, { restPasswordAction })(
  SetRestPassword
);
