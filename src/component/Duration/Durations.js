import React, { Component } from "react";
import Axios from "axios";

const durationsList = [];

class Durations extends Component {
  async componentDidMount() {
    this.loadDesignationList();
  }

  loadDesignationList = async () => {
    await Axios.get("http://localhost:8085/api/durations")
      .then((res) => {
        if (durationsList.length > 0) {
          durationsList = [];
        }

        console.log("Success Categories Loading... ", res);
        res.data.map((item, idx) => {
          durationsList.push(item);
        });
      })
      .catch((res) => {
        console.log("Error Categories Loading... ", res);
      });

    console.log("Cat List After All work: ", durationsList);

    if (this.state.durations.length > 0) {
      this.setState({ durations: [] });
      this.setState({ durations: durationsList });
    } else {
      this.setState({ durations: durationsList });
      this.setState({ dataLoad: true });
    }

    if (durationsList.length > 0) {
      console.log("load All data Done IF");
      return;
    } else {
      console.log("load All data Done Else Run Again this Fnc");
      this.loadDesignationList();
    }
  };

  state = {
    durations: durationsList,
    dataLoad: false,
    redirect: false,
  };

  render() {
    return !this.state.dataLoad && this.state.durations === null ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {console.log("After Render: ", durationsList)}

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
                          <th>Day</th>
                          <th>Night</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.durations.map((item, ind) => {
                          return (
                            <React.Fragment>
                              <tr key={ind}>
                                <td>{item.id}</td>
                                <td>
                                  {" "}
                                  {item.name !== "" ? item.name : "Anonymous"}
                                </td>
                                <td>{item.day !== null ? item.day : ""}</td>

                                <td>{item.night !== null ? item.night : ""}</td>

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

export default Durations;
