import React, { useState, useEffect } from "react";
import ActionLink from "../../../utils/ActionLink";
import { getAllConfrimedBanks } from "../../../actions/bankActions";

const Banks = (params) => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getAllConfrimedBanks(setBanks);
  }, []);

  return (
    <React.Fragment>
      <div className="content-wrapper" style={{ background: "#fff" }}>
        <table className="table table-bordered bank-table">
          <thead>
            <tr>
              <th style={{ width: 10 }}>#</th>
              <th>Account Name</th>
              <th>Bank Name</th>
              <th>Bank Brance</th>
              <th>Category</th>
              <th style={{ width: 40 }}>Account Number</th>
              <th>Country</th>
              <th>Balance</th>
              <th>Add User</th>
              <th>Approve User</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {banks &&
              banks.map((bank, idx) => {
                return (
                  <tr>
                    <td>{idx}.</td>
                    <td>{bank.accountName}</td>
                    <td>{bank.bankName}</td>
                    <td>{bank.branchName}</td>
                    <td>{bank.bankAccountType && bank.bankAccountType.name}</td>

                    <td>{bank.accountNumber}</td>
                    <td>
                      <span className="badge bg-danger">
                        {bank.country && bank.country.name}
                      </span>
                    </td>
                    <td>{bank.amount}</td>
                    <td>{bank.user && bank.user.name}</td>
                    <td>{bank.approveUser && bank.approveUser.name}</td>
                    <td>
                      <ActionLink
                        clazz="btn btn-block btn-success btn-sm"
                        to={`/banks/approve/${bank.publicId}`}
                        label="Approve"
                      />
                    </td>
                    <td>
                      <ActionLink
                        clazz="btn btn-block btn-primary btn-sm"
                        to={`/banks/details/${bank.publicId}`}
                        label="Details"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div class="card">
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
    </React.Fragment>
  );
};

export default Banks;
