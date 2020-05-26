import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import { PropTypes } from "prop-types";

class CategoriesView extends Component {
  async componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(nProps) {
    const { categories } = nProps.category;
    this.setState({ setCatsStatus: false });
    this.setState({ categories: categories });
  }

  state = {
    dataLoad: false,
    redirect: false,
    setCatsStatus: true,
    categories: [],
  };

  render() {
    return this.state.setCatsStatus ||
      (this.state.categories.length === undefined &&
        this.state.categories.length > 0) ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Category List View</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="departmentTable"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.categories &&
                          this.state.categories.map((item, ind) => {
                            return (
                              <React.Fragment>
                                <tr key={ind}>
                                  <td>{item.id}</td>
                                  <td>
                                    {" "}
                                    {item.name !== "" ? item.name : "Anonymous"}
                                  </td>
                                  <td>
                                    {item.description !== null
                                      ? item.description
                                      : ""}
                                  </td>

                                  <td>
                                    <a
                                      href="/categories/category/id"
                                      class="btn btn-info btn-icon-split"
                                    >
                                      <span class="icon text-white-50">
                                        <i class=" nav-icon fas fa-edit"></i>
                                      </span>
                                      <span class="text">Edit</span>
                                    </a>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                        </tr>
                      </tfoot>
                    </table>
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

CategoriesView.prototypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(CategoriesView);
