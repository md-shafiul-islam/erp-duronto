import React, { Component } from "react";
import Axios from "axios";
import CommonTableView from "../Layout/TableView/CommonTableView";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAccess } from "../../actions/appStoreAction";
import { getDesignations } from "../../actions/designationActions";

class Designations extends Component {
  componentDidMount() {
    if (this.props && this.props.security.user) {
      if (this.props.security.user.id) {
        this.props.getAccess(
          this.props.security.user.id,
          this.props.tokenData.token
        );

        this.setState({ accessStatus: false });
      }
    }

    this.loadDesignationsList();
  }

  loadDesignationsList = () => {
    this.props.getDesignations();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.designation.designations.lenght > 0) {
      this.setState({
        designations: this.props.designation.designations,
        dataLoad: true,
      });
    }
  }

  render() {
    return !this.props.designation.designations ? (
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
                        {this.props.designation.designations &&
                          this.props.designation.designations.map(
                            (item, ind) => {
                              return (
                                <CommonTableView
                                  item={item}
                                  index={ind}
                                  actionIconClass={`nav-icon fas fa-edit`}
                                  actionLabel={`Edit`}
                                  action={`/designations/designation/edit/`}
                                />
                              );
                            }
                          )}
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

Designations.prototypes = {
  getAccess: PropTypes.func.isRequired,
  getDesignations: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  tokenData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  tokenData: state.tokenData,
  designation: state.designation,
});

export default connect(mapStateToProps, { getAccess, getDesignations })(
  Designations
);
