import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  updateCategoryAction,
  getCategory,
} from "../../actions/categoryActions";

class EditCatrgory extends Component {
  constructor(props) {
    super(props);

    this.catId = props.match.params.id;
  }

  state = {
    redirectStatus: false,
  };

  componentDidMount() {
    this.props.getCategory(this.catId, this.props.history);
  }

  updateCatAction = (values) => {
    this.props.updateCategoryAction(values);
  };

  render() {
    let { category } = this.props;

    if (this.state.redirectStatus) {
      return <Redirect to="/categories" />;
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
                  enableReinitialize={true}
                  initialValues={category}
                  onSubmit={(values, actions) => {
                    console.log(JSON.stringify(values, null, 2));
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

EditCatrgory.prototypes = {
  updateCategoryAction: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  category: state.category,
});

export default connect(mapStateToProps, {
  getCategory,
  updateCategoryAction,
})(EditCatrgory);
