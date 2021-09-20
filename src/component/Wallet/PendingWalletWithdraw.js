import React, { useEffect } from "react";
import WalletItem from "./WithDraw/WalletWithdrawItem";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getApprovePendingWalletWithdraws } from "../../actions/walletWithdrawAction";

const PendingWalletWithdraw = (params) => {
  useEffect(() => {
    params.getApprovePendingWalletWithdraws();
  }, []);

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className="recharge-table">
          <h2>B2B/B2C Wallet Withdraw Pending</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: 10 }}>#</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Wallet Balance</th>
                <th>Withdraw Type</th>
                <th>Bank Name</th>
                <th>Branch Name</th>
                <th>Account Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {params.walletWithDrawals &&
                params.walletWithDrawals.map((withDraw, idx) => {
                  return (
                    <WalletItem
                      key={`wallet-withdraw-${idx}`}
                      withdarw={withDraw}
                    />
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={16}>
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
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

PendingWalletWithdraw.prototypes = {
  getApprovePendingWalletWithdraws: PropTypes.func.isRequired,
  walletWithDrawals: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    walletWithDrawals: state.walletWithdarw.walletWithDrawals,
    error: state.walletWithdarw.error,
  };
};

export default connect(mapStateToProps, { getApprovePendingWalletWithdraws })(
  PendingWalletWithdraw
);
