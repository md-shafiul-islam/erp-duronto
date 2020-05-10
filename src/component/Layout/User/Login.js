import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import Axios from "axios";

class Login extends Component {
  submitAction = (values) => {
    console.log(values);

    let loginData = JSON.stringify(values);
    console.log("After Strigfi Data");
    console.log(loginData);

    let url = `http://localhost:8081/login?username=${values.username}&password=${values.password}`;

    console.log(
      "username: " + values.username + " Password: " + values.password
    );
    console.log("URL: " + url);

    Axios.post(url, { loginData }).then((res) => {
      console.log(res.data);
    });

    console.log("Submit ACtion");
  };
  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-6 offset-md-3">
                {/* jquery validation */}
                <div className="card card-primary">
                  <div className="row">
                    <div className="col-md-12">
                      <a>
                        <img
                          align="middle"
                          className="image-area"
                          height={160}
                          width={140}
                          alt="Duronto Tourism, Durontotourism, Duronto Tour"
                          src="/asset-img/logo.png"
                        />
                      </a>
                    </div>
                    <div className="col-md-12">
                      <h1>
                        Welcome to <br />{" "}
                        <b className="header_text">Duronto Tourism</b>
                      </h1>
                    </div>
                  </div>
                  <div className="card-header">
                    <h3 className="card-title">User login</h3>
                  </div>
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
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="email">Email Or Phone</label>
                              <Field
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Enter email Or Phone"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>{" "}
                              <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                              />
                            </div>
                          </div>

                          {/* /.card-body */}
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                              Login
                            </button>
                          </div>
                        </Form>
                      </React.Fragment>
                    )}
                  </Formik>
                </div>
                {/* /.card */}
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

export default Login;
