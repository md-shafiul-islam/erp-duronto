import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

let countryList = [];

class Countries extends Component {
  state = {
    counties: countryList,
    dataLoad: false,
  };

  async componentDidMount() {
    this.getAllCountries();
    console.log("Done!!");
  }

  getAllCountries = async () => {
    await Axios.get(`${BASE_URL}/countries`, { headers: REQUEST_HEADER })
      .then((res) => {
       console.log("Countries Done: ", res);
        res.data.forEach((country) => {
          countryList.push(country);
        });
      })
      .catch((res) => {
        console.log("Error Countries: ", res);
      });

    this.setState({ counties: countryList });
    this.setState({ dataLoad: true });
  };

  render() {
    return !this.state.dataLoad && this.state.counties === null ? (
      <div>Loading...</div>
    ) : (
      <React.Fragment>
        {console.log("After Render: ", countryList)}

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
                          <th>ISO Code</th>
                          <th>Num Code</th>
                          <th>ISO 3 Code</th>
                          <th>Dial Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.counties.map((item, ind) => {
                          return (
                            <React.Fragment>
                              <tr key={ind}>
                                <td>{item.id}</td>
                                <td>
                                  {" "}
                                  {item.name !== "" ? item.name : "Anonymous"}
                                </td>
                                <td>
                                  {item.isoCode !== null ? item.isoCode : ""}
                                </td>

                                <td>
                                  {item.numCode !== null ? item.numCode : ""}
                                </td>
                                <td>
                                  {item.iso3Code !== null ? item.iso3Code : ""}
                                </td>
                                <td>
                                  {item.dialOrPhoneCode !== null
                                    ? item.dialOrPhoneCode
                                    : ""}
                                </td>

                                <td>
                                  <Link
                                    to={`/countries/country/edit/${item.id}`}
                                    class="btn btn-info btn-icon-split"
                                  >
                                    <span class="icon text-white-50">
                                      <i class=" nav-icon fas fa-edit"></i>
                                    </span>
                                    <span class="text">Edit</span>
                                  </Link>
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

export default Countries;
