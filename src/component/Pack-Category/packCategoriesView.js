import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import CommonTableView from "../Layout/TableView/CommonTableView";
import { getAccess } from "../../actions/appStoreAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

const catList = [];
class PackCategoriesView extends Component {
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

    this.loadPackCategoriesList();
    //this.props.getPackageCategories();
  }

  loadPackCategoriesList = async () => {
    await Axios.get(`${BASE_URL}/package-categories`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        if (catList.length > 0) {
          catList = [];
        }

        console.log("Success Pack Categories Loading... ", res);
        res.data.map((item, idx) => {
          catList.push(item);
        });
      })
      .catch((res) => {
        console.log("Error Categories Loading... ", res);
      });

    console.log("Cat List After All work: ", catList);

    if (this.state.categoriesList.length > 0) {
      this.setState({ categoriesList: [] });
      this.setState({ categoriesList: catList });
    } else {
      this.setState({ categoriesList: catList });
      this.setState({ dataLoad: true });
    }

    if (catList.length > 0) {
      console.log("load All data Done IF");
      return;
    } else {
      console.log("load All data Done Else Run Again this Fnc");
      this.loadPackCategoriesList();
    }
  };

  state = {
    categoriesList: catList,
    dataLoad: false,
    redirect: false,
  };

  render() {
    return !this.state.dataLoad && this.state.categoriesList === null ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {console.log("After Render: ", catList)}

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
                        {this.state.categoriesList &&
                          this.state.categoriesList.map((item, ind) => {
                            return (
                              <React.Fragment>
                                <CommonTableView
                                  item={item}
                                  index={ind}
                                  actionIconClass={`nav-icon fas fa-edit`}
                                  actionLabel={`Edit`}
                                  action={`/package-categories/package-category/edit/`}
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

PackCategoriesView.prototypes = {
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

export default connect(mapStateToProps, { getAccess })(PackCategoriesView);
