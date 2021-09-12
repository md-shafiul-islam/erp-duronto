import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import { PropTypes } from "prop-types";
import Select from "react-select";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getCountryOptionsViaRedux } from "../../../actions/countryActions";
import {
  getAllConfrimedBankAccounts,
  getBankAcccountUpdate,
  getBankAccountTypeOptionsViaRedux,
} from "../../../actions/bankActions";
import * as Yup from "yup";
import { helperIsEmpty, isFieldError } from "../../../utils/helper/esFunc";
import { connect } from "react-redux";

class UpdateBankAccount extends Component {
 
  state = {
    accountNameStatus: false,
    accountNumberStatus: false,
    bankNameStatus: false,
    branchNameStatus: false,
    countryStatus: false,
    bankAccountTypeStatus: false,
    amountStatus: false,
    accountOptons: [],
    selectOption: [
      { label: "Account Name", value: "accountName" },
      { label: "Account Number", value: "accountNumber" },
      { label: "Bank Name", value: "bankName" },
      { label: "Branch Name", value: "branchName" },
      { label: "Country", value: "country" },
      { label: "Banking Type", value: "bankAccountType" },
      { label: "Initial Amount", value: "amount" },
    ],
    bankAccounts: [],
    selectedAccount: {},
    selectedValue: "",
    sectedField: null,
    countryOptions: [],
  };

  componentDidMount() {
    this.getBankAccounts();
    this.props.getBankAccountTypeOptionsViaRedux();
    this.props.getCountryOptionsViaRedux();
  }

  getBankAccounts = () => {
    getAllConfrimedBankAccounts(this);
  };
  submitAction = (values) => {
    console.log("Selected Account, ", this.state.selectedAccount);
    console.log("Selected Field, ", this.state.sectedField);
    console.log("Selected Value, ", this.state.selectedValue.value);
    console.log("Selected Values, ", values);
    console.log(
      "Selected Values Value -> ",
      values[this.state.sectedField.value]
    );
    console.log("Current Selected Field Name: ", this.state.sectedField.value);
    const bankAccountReq = {
      bankId: this.state.selectedAccount&&this.state.selectedAccount.publicId,
      fieldName: this.state.sectedField.value,
      value: values[this.state.sectedField.value],
    };

    this.props.getBankAcccountUpdate(bankAccountReq);
  };

  validationScema = () => {
    return Yup.object().shape({
      accountName: Yup.string(),
      accountNumber: Yup.string(),
      bankName: Yup.string(),
      branchName: Yup.string(),
      bankAccountType: Yup.string(),
      country: Yup.string(),
      amount: Yup.number()
        .typeError("Initial amount input must be number(s)")
        .min(0),
    });
  };

  selectBankAccount = (account) => {
    this.setState({
      accountNameStatus: false,
      accountNumberStatus: false,
      bankNameStatus: false,
      branchNameStatus: false,
      countryStatus: false,
      bankAccountTypeStatus: false,
      amountStatus: false,
      selectedAccount: this.state.bankAccounts[account.value],
      selectedValue: "",
      sectedField: null,
    });
  };
  changeFieldOption = (item) => {
    console.log("Selected Item Or Field, ", item);

    this.setState({
      accountNameStatus: false,
      accountNumberStatus: false,
      bankNameStatus: false,
      branchNameStatus: false,
      countryStatus: false,
      bankAccountTypeStatus: false,
      amountStatus: false,
      sectedField: item,
    });

    if (!helperIsEmpty(this.state.selectedAccount)) {
      switch (item.value) {
        case "accountName":
          this.setState({
            accountNameStatus: true,
            selectedValue: this.state.selectedAccount.accountName,
          });
          break;
        case "accountNumber":
          this.setState({
            accountNumberStatus: true,
            selectedValue: this.state.selectedAccount.accountNumber,
          });
          break;
        case "bankName":
          this.setState({
            bankNameStatus: true,
            selectedValue: this.state.selectedAccount.bankName,
          });
          break;

        case "branchName":
          this.setState({
            branchNameStatus: true,
            selectedValue: this.state.selectedAccount.branchName,
          });
          break;
        case "country":
          this.setState({
            countryStatus: true,
            selectedValue: this.state.selectedAccount.country.name,
          });
          break;
        case "bankAccountType":
          this.setState({
            bankAccountTypeStatus: true,
            selectedValue: this.state.selectedAccount.bankAccountType.name,
          });
          break;
        case "amount":
          this.setState({
            amountStatus: true,
            selectedValue: this.state.selectedAccount.amount,
          });
          break;

        default:
          break;
      }
    }
  };

  render() {
    console.log("Update Bank Account, Props ", this.props);

    let {
      selectOption,
      accountNameStatus,
      accountNumberStatus,
      bankNameStatus,
      branchNameStatus,
      countryStatus,
      bankAccountTypeStatus,
      amountStatus,
      accountOptons,
    } = this.state;
    return (
      <React.Fragment>
        
        <div className="content-wrapper">
          <Card.Body className="bank-account">
            <Row className="bank-in-row">
              <Col md={6}>
                <label className="form-label" htmlFor="bankAccount">
                  Select Bank Account
                </label>
                <Select
                  placeholder="Select One..."
                  name={`bankAccount`}
                  onChange={(item) => {
                    this.selectBankAccount(item);
                  }}
                  id={`bankAccount`}
                  options={accountOptons}
                />
              </Col>
              <Col md={6}>
                <label className="form-label" htmlFor="bankingType">
                  &nbsp;
                </label>
                <input
                  className={`form-control`}
                  value={this.state.selectedAccount.accountName}
                  readOnly
                />
              </Col>
            </Row>
            <Row className="bank-in-row">
              <Col md={3}>
                <label className="form-label" htmlFor="selectField">
                  Select Update Field
                </label>
                <Select
                  placeholder="Select One Field..."
                  name={`selectField`}
                  onChange={(item) => {
                    this.changeFieldOption(item);
                  }}
                  id={`selectField`}
                  options={selectOption}
                  value={this.state.sectedField}
                />
              </Col>
              <Col mdd={9}>
                <label className="form-label" htmlFor="plasecholder">
                  &nbsp;
                </label>
                <input
                  className={`form-control`}
                  value={this.state.selectedValue && this.state.selectedValue}
                  readOnly
                />
              </Col>
            </Row>
            <Formik
              initialValues={{
                accountName: "",
                accountNumber: "",
                bankName: "",
                branchName: "",
                country: "",
                bankAccountType: "",
                amount: "",
              }}
              validationSchema={this.validationScema}
              onSubmit={(values, actions) => {
                this.submitAction(values);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  {bankAccountTypeStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="bankAccountType">
                          Banking Category/Type
                        </label>
                      </Col>
                      <Col md={9}>
                        <Select
                          placeholder="Select One..."
                          name={`bankAccountType`}
                          onChange={(item) => {
                            props.setFieldValue(
                              `bankAccountType`,
                              item ? item.value : ""
                            );
                          }}
                          onBlur={() => {
                            props.setFieldTouched(`bankAccountType`, true);
                          }}
                          id={`bankAccountType`}
                          options={
                            this.props.bankAccountTypes
                              ? this.props.bankAccountTypes
                              : null
                          }
                          className={`vselect-item ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "bankAccountType"
                            ).cls
                          }`}
                        />

                        <div
                          className={`invalid-feedback ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "bankAccountType"
                            ).status
                              ? "active"
                              : ""
                          }`}
                        >
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "bankAccountType"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  {accountNameStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="accountName">
                          Account Name.{" "}
                        </label>
                      </Col>
                      <Col md={9}>
                        <Field
                          placeholder="Account Name"
                          name={`accountName`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`accountName`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "accountName"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "accountName"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  {bankNameStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="bankName">
                          Bank Name.{" "}
                        </label>
                      </Col>
                      <Col md={9}>
                        <Field
                          placeholder="Bank Name"
                          name={`bankName`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`bankName`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "bankName"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "bankName"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  {branchNameStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="branchName">
                          Branch Name.{" "}
                        </label>
                      </Col>
                      <Col md={9}>
                        <Field
                          placeholder="branchName"
                          name={`branchName`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`branchName`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "branchName"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "branchName"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  {accountNumberStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="accountNumber">
                          Account Number.{" "}
                        </label>
                      </Col>
                      <Col md={9}>
                        <Field
                          placeholder="Ac/No. "
                          name={`accountNumber`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`accountNumber`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "accountNumber"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "accountNumber"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  {countryStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="country">
                          Country
                        </label>
                      </Col>
                      <Col md={9}>
                        <Select
                          placeholder="Select One..."
                          name={`country`}
                          onChange={(item) => {
                            props.setFieldValue(
                              `country`,
                              item ? item.value : ""
                            );
                          }}
                          onBlur={() => {
                            props.setFieldTouched(`country`, true);
                          }}
                          id={`country`}
                          options={
                            this.props.countryOptions
                              ? this.props.countryOptions
                              : null
                          }
                          className={`vselect-item ${
                            isFieldError(props.errors, props.touched, "country")
                              .cls
                          }`}
                        />
                        {console.log(
                          "Current Error, BankName ",
                          isFieldError(props.errors, props.touched, "country")
                        )}
                        <div
                          className={`invalid-feedback ${
                            isFieldError(props.errors, props.touched, "country")
                              .status
                              ? "active"
                              : ""
                          }`}
                        >
                          {
                            isFieldError(props.errors, props.touched, "country")
                              .msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  {amountStatus ? (
                    <Row className="bank-in-row">
                      <Col md={3}>
                        <label className="form-label" htmlFor="amount">
                          Initial Balance
                        </label>
                      </Col>

                      <Col md={9}>
                        <Field
                          placeholder="Balance"
                          name={`amount`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          id={`amount`}
                          className={`form-control ${
                            isFieldError(
                              props.errors,
                              props.touched,
                              "amount"
                            ).cls
                          }`}
                        />
                        <div className="invalid-feedback">
                          {
                            isFieldError(
                              props.errors,
                              props.touched,
                              "amount"
                            ).msg
                          }
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  <Row className="bank-in-row">
                    <Col md={{ span: 3 }}>
                      <Button type="submit" className="add-bank-btn">
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </div>
      </React.Fragment>
    );
  }
}

UpdateBankAccount.prototypes = {
  getAddBankAccountAction: PropTypes.func.isRequired,
  getCountryOptionsViaRedux: PropTypes.func.isRequired,
  getBankAcccountUpdate: PropTypes.func.isRequired,
  countryOptions: PropTypes.object.isRequired,
  bankAccountTypes: PropTypes.object.isRequired,
  approveStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("State To Props, country, ", state.country);
  return {
    bankAccountTypes: state.bankAccount.bankAccountTypesOptions,
    countryOptions: state.bankAccount.countryOptions,
    approveStatus: state.bankAccount.bankAccountUpdateApproveStatus,
  };
};

export default connect(mapStateToProps, {
  getCountryOptionsViaRedux,
  getBankAccountTypeOptionsViaRedux,
  getBankAcccountUpdate,
})(UpdateBankAccount);
