import React, { Component } from "react";
import AddBank from "./Banks/AddBank";
import * as Yup from "yup";
import { helperIsEmpty } from "../../utils/helper/esFunc";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAddBankAccountAction } from "../../actions/bankActions";

class Account extends Component {
  validationScema = () => {
    return Yup.object().shape({
      accountName: Yup.string().required(
        "Required. Please, Input bank account name."
      ),
      accountNumber: Yup.string().required(
        "Required. Please, Input bank account number"
      ),
      bankName: Yup.string().required("Required. Please, Input bank name "),
      branchName: Yup.string().required(
        "Required. Please, Input bank branch name"
      ),
      bankingType: Yup.string().required("Required, Please Select one type"),
      country: Yup.string().required("Required, Please Select a country"),
      initialAmount: Yup.number().typeError("You must input number").min(0),
    });
  };

  isError = (errors, touched, fieldName) => {
    let msg = undefined;
    if (
      !helperIsEmpty(errors) &&
      !helperIsEmpty(touched) &&
      !helperIsEmpty(fieldName)
    ) {
      if (
        !helperIsEmpty(errors[fieldName]) &&
        !helperIsEmpty(touched[fieldName])
      ) {
        msg = errors[fieldName];
      }
    }

    if (touched[fieldName]) {
      if (msg) {
        return { cls: "is-invalid", msg: msg, status: true };
      } else {
        return { cls: "is-valid", msg: "", status: false };
      }
    }
    return { cls: "", msg: msg, status: false };
  };

  addBankAccountAction = (values) => {
    console.log("Bank Accounts Info, ", JSON.stringify(values, null, 2));
    if (values) {
      this.props.getAddBankAccountAction(values);
    }
  };

  render() {
    return (
      <React.Fragment>
        <AddBank
          isError={this.isError}
          submitAction={this.addBankAccountAction}
          validationScema={this.validationScema}
          title={"Add Bank Informatio"}
        />
      </React.Fragment>
    );
  }
}

Account.prototypes = {
  getAddBankAccountAction: PropTypes.func.isRequired,
  addBankAccount: PropTypes.object.isRequired,
  addBankAccountError: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addBankAccount: state.bankAccount.addBankAccount,
    addBankAccountError: state.bankAccount.bankError,
  };
};

export default connect(mapStateToProps, { getAddBankAccountAction })(Account);
