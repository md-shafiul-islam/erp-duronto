import React, { useState, useEffect } from "react";
import { connect, shallowEqual, useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";

import ActionLink from "../../../utils/ActionLink";
import {
  getAllUpdatePendingBanks,
  getBankAccountTypes,
  getUpdateApproveBankAccount,
} from "../../../actions/bankActions";
import { getCountries } from "../../../actions/countryActions";
import { helperIsEmpty } from "../../../utils/helper/esFunc";
import { Button } from "react-bootstrap";
import { SET_BANK_CHANGE_STATUS } from "../../../actions/types";

const BanksUpdatePending = (params) => {
  const [banks, setBanks] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUpdatePendingBanks(setBanks);
    if (helperIsEmpty(params.countries)) {
      params.getCountries();
    }
    console.log("Accounts Type ", params.bankAccountTypes);
    if (helperIsEmpty(params.bankAccountTypes)) {
      params.getBankAccountTypes();
    }
  }, []);

  useEffect(() => {
    getAllUpdatePendingBanks(setBanks);
    if(params.approveStatus){
      dispatch({type:SET_BANK_CHANGE_STATUS, payload:false})
    }
  }, [params.approveStatus]);

  const bankUpdateAction = (bank) => {
    console.log("Befor Reinitialize Bank Account: ", bank);

    let { country, bankAccountType } = bank;
    bank.country = Number(country.id);
    bank.bankAccountType = Number(bankAccountType.id);
    bank[bank.restUpdateInf.fieldName] = bank.restUpdateInf.value;

    console.log("Reinitialize Bank Account: ", JSON.stringify(bank, null, 2));
    params.getUpdateApproveBankAccount(JSON.stringify(bank, null, 2));
  };

  const getCountryByID = (id) => {
    let country = undefined;
    params.countries.every((item) => {
      if (Number(item.id) === Number(id)) {
        country = item;
        return false;
      }
      return true;
    });

    return country;
  };
  const getBankAccountTypeByID = (id) => {
    id = Number(id);
    let accountType = undefined;
    params.bankAccountTypes.every((item, idx) => {
      console.log("Bank account each ", item);
      if (Number(item.id) === id) {
        accountType = item;
        return false;
      }

      return true;
    });
    console.log("Bank Type: ", accountType);
    return accountType;
  };
  const getFieldValue = (bank, type) => {
    if (bank.restUpdateInf && type === 1) {
      console.log(
        "bank.restUpdateInf.fieldName ",
        bank.restUpdateInf.fieldName,
        " Value, ",
        bank.restUpdateInf.value
      );
      if (
        bank.restUpdateInf.fieldName === "country" ||
        bank.restUpdateInf.fieldName === "bankAccountType"
      ) {
        return bank[bank.restUpdateInf.fieldName].name;
      } else {
        return bank[bank.restUpdateInf.fieldName];
      }
    }

    if (bank.restUpdateInf && type === 2) {
      if (bank.restUpdateInf.fieldName === "country") {
        if (Array.isArray(params.countries)) {
          let country = getCountryByID(bank.restUpdateInf.value);
          console.log("Selected Country, ", country);
          return country && country.name;
        }
      } else if (bank.restUpdateInf.fieldName === "bankAccountType") {
        let bnakType = getBankAccountTypeByID(bank.restUpdateInf.value);
        return bnakType && bnakType.name;
      } else {
        return bank.restUpdateInf.value;
      }
    }
  };

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
              <th>Update User</th>
              <th>Current Info</th>
              <th>Update Info</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {banks &&
              banks.map((bank, idx) => {
                return (
                  <tr key={`bank-update-list-${idx}`}>
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
                    <td>{bank.updateUser && bank.updateUser.name}</td>
                    <td>
                      <div className="updateinf-col">
                        {getFieldValue(bank, 1)}
                      </div>
                    </td>
                    <td>
                      <div className="updateinf-col">
                        {getFieldValue(bank, 2)}
                      </div>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          bankUpdateAction(bank);
                        }}
                        class="btn btn-block btn-success btn-sm"
                      >
                        Approve
                      </Button>
                    </td>
                    <td>
                      <ActionLink
                        clazz="btn btn-block btn-primary btn-sm"
                        to={`/banks/update/details/${bank.publicId}`}
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

BanksUpdatePending.prototype = {
  getCountries: PropTypes.func.isRequired,
  getBankAccountTypes: PropTypes.func.isRequired,
  countries: PropTypes.func.isRequired,
  bankAccountTypes: PropTypes.object.isRequired,
  approveStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Country State ", state);
  return {
    countries: state.country.countres,
    bankAccountTypes: state.bankAccount.bankAccountTypes,
    approveStatus: state.bankAccount.bankAccountUpdateApproveStatus,
  };
};

export default connect(mapStateToProps, {
  getCountries,
  getBankAccountTypes,
  getUpdateApproveBankAccount,
})(BanksUpdatePending);
