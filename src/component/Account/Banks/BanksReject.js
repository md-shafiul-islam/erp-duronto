import React from "react";
import ActionLink from "../../../utils/ActionLink";

const BanksReject = (params)=> {
  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Bordered Table</h3>
          </div>
          <div>
            {/* /.card-header */}
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: 10 }}>#</th>
                    <th>Account Name</th>
                    <th>Bank Name</th>
                    <th>Bank Brance</th>
                    <th>Category</th>
                    <th style={{ width: 40 }}>Account Number</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
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

export default BanksReject;
