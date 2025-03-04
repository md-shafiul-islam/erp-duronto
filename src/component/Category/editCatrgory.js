import React, { Component } from "react";

import { Field, Formik, Form } from "formik";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory, updateCategory } from "../../actions/categoryActions";
import { PropTypes } from "prop-types";

class EditCategory extends Component {
  constructor(props) {
    super(props);

    this.catId = props.match.params.id;
  }
  state = {
    redirect: false,
  };

  componentDidMount() {
    this.props.getCategory(this.catId, this.props.history);
    console.log("After Category Run ", this.catId);
  }

  updateCatAction = (values) => {
    if (values != null) {
      let category = JSON.stringify(values, null, 2);

      this.props.updateCategory(category, this.props.history);
    }
  };

  render() {
    let { category } = this.props.category;

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

EditCategory.prototypes = {
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  category: state.category,
});
export default connect(mapStateToProps, { getCategory, updateCategory })(
  EditCategory
);
