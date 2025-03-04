import React, { Component } from "react";

import { Field, Formik, Form } from "formik";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addCategoryAction } from "../../actions/categoryActions";
import { PropTypes } from "prop-types";

class AddCategory extends Component {
  state = {
    redirect: false,
  };

  addCatAction = (values) => {
    if (values != null) {
      let category = JSON.stringify(values, null, 2);

      this.props.addCategoryAction(category, this.props.history);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Link to="/categores" />;
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
                    this.addCatAction(values);
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

AddCategory.prototypes = {
  addCategoryAction: PropTypes.func.isRequired,
};
export default connect(null, { addCategoryAction })(AddCategory);
