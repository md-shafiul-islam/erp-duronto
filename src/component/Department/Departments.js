import React, { Component } from "react";
import Axios from "axios";
import CommonTableView from "../Layout/TableView/CommonTableView";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAccess } from "../../actions/appStoreAction";
import { REQUEST_HEADER, BASE_URL } from "../../actions/types";

const departmentList = [];

class Departments extends Component {
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

    this.loadDepartmentList();
  }

  loadDepartmentList = async () => {
    await Axios.get(`${BASE_URL}/departments`, { headers: REQUEST_HEADER })
      .then((res) => {

        console.log("Success Categories Loading... ", res);
        res.data.forEach((item, idx) => {
          departmentList.push(item);
        });
      })
      .catch((res) => {
        console.log("Error Department Loading... ", res);
      });

    console.log("Cat List After All work: ", departmentList);

    if (this.state.departments.length > 0) {
      this.setState({ departments: [] });
      this.setState({ departments: departmentList });
    } else {
      this.setState({ departments: departmentList });
      this.setState({ dataLoad: true });
    }

    if (departmentList.length > 0) {
      console.log("load All data Done IF");
      return;
    } else {
      console.log("load All data Done Else Run Again this Fnc");
      this.loadDepartmentList();
    }
  };

  state = {
    departments: departmentList,
    dataLoad: false,
    redirect: false,
  };

  render() {
    return !this.state.dataLoad && this.state.departments === null ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {console.log("After Render: ", departmentList)}

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
                        {this.state.departments.map((item, ind) => {
                          return (
                            <CommonTableView
                              item={item}
                              index={ind}
                              actionIconClass={`nav-icon fas fa-edit`}
                              actionLabel={`Edit`}
                              action={`/departments/department/edit/`}
                            />
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

Departments.prototypes = {
  getAccess: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, { getAccess })(Departments);
