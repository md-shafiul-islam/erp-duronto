import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import { PropTypes } from "prop-types";
import CommonTableView from "../Layout/TableView/CommonTableView";

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
                                <CommonTableView
                                  item={item}
                                  index={ind}
                                  actionIconClass={`nav-icon fas fa-edit`}
                                  actionLabel={`Edit`}
                                  action={`/categories/category/edit/`}
                                />
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
