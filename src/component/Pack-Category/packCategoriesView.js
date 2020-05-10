import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const catList = [];
class PackCategoriesView extends Component {
  async componentDidMount() {
    this.loadPackCategoriesList();
  }

  loadPackCategoriesList = async () => {
    await Axios.get("http://localhost:8085/api/package-categories")
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
                        {this.state.categoriesList.map((item, ind) => {
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

export default PackCategoriesView;
