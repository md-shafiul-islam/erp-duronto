import React, { Component } from "react";
import ActionLink from "../../utils/ActionLink";

class Sales extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Sales</h3>
            </div>
            <div>
              {/* /.card-header */}
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: 10 }}>#</th>
                      <th>Booking ID</th>
                      <th>Title</th>
                      <th>Customer ID</th>
                      <th>Transection ID</th>                      
                      <th>PNR</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>41484-478-4854-SEF5 </td>
                      <td>DAC TO SPD</td>
                      <td>GU4741484</td>
                      <td>49T8G45H84654L78</td>

                      <td>03LP4</td>
                      <td>
                        <span className="badge bg-danger">3200</span>
                      </td>
                      <td>
                        <ActionLink to={`/sales/${1}`} label="Details" />
                      </td>
                    </tr>

                    <tr>
                      <td>2.</td>
                      <td>Duronto Trip </td>
                      <td>Bank Asia</td>
                      <td>Bogura</td>
                      <td>General Banking</td>

                      <td>481845484518472</td>
                      <td>
                        <span className="badge bg-danger">Banglades</span>
                      </td>
                      <td>
                        <ActionLink to={`/banks/${1}`} label="Details" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      «
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      »
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sales;
