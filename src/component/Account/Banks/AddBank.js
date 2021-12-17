/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getCountryOptions } from "../../../actions/countryActions";
import { helperIsEmpty } from "../../../utils/helper/esFunc";
import {
  getBankAccountTypeOptions,
  getBankNameOptions,
} from "../../../actions/bankActions";
import { connect } from "react-redux";

const AddBank = ({
  title,
  validationScema,
  submitAction,
  isError,
  ...params
}) => {
  const [countries, setCountries] = useState([{ label: "", value: 0 }]);
  const [bankAccountTypes, setBankAccountTypes] = useState([
    { label: "", value: 0 },
  ]);

  useEffect(() => {
    getCountryOptions(setCountries);
    getBankAccountTypeOptions(setBankAccountTypes);

    if (!helperIsEmpty(params.bankOptions)) {
      if (params.bankOptions.lenght === 0) {
        params.getBankNameOptions();
      }
    } else {
      params.getBankNameOptions();
    }
  }, []);

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12" style={{ margin: "10px auto" }}>
            <Card className="bank-add-content card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  {title ? title : "Add Bank Account "}
                </h3>
              </div>
              <Card.Body>
                <Formik
                  initialValues={{
                    accountName: "",
                    accountNumber: "",
                    bankName: "",
                    branchName: "",
                    country: "",
                    bankingType: "",
                    initialAmount: 0,
                  }}
                  validationSchema={validationScema}
                  onSubmit={(values, actions) => {
                    submitAction(values);
                    setTimeout(() => {
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Row className="card-pay-row">
                        <Col md={6}>
                          <label className="form-label" htmlFor="bankingType">
                            Banking Category/Type
                          </label>
                          <Select
                            placeholder="Select One..."
                            name={`bankingType`}
                            onChange={(item) => {
                              props.setFieldValue(
                                `bankingType`,
                                item ? item.value : ""
                              );
                            }}
                            onBlur={() => {
                              props.setFieldTouched(`bankingType`, true);
                            }}
                            id={`bankingType`}
                            options={bankAccountTypes}
                            className={`vselect-item ${
                              isError(
                                props.errors,
                                props.touched,
                                "bankingType"
                              ).cls
                            }`}
                          />
                          {console.log(
                            "Current Error, bankingType ",
                            isError(props.errors, props.touched, "bankingType")
                          )}
                          <div
                            className={`invalid-feedback ${
                              isError(
                                props.errors,
                                props.touched,
                                "bankingType"
                              ).status
                                ? "active"
                                : ""
                            }`}
                          >
                            {
                              isError(
                                props.errors,
                                props.touched,
                                "bankingType"
                              ).msg
                            }
                          </div>
                        </Col>
                        <Col md={6}>
                          <label className="form-label" htmlFor="accountName">
                            Account Name.{" "}
                          </label>
                          <Field
                            placeholder="Account Name"
                            name={`accountName`}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            id={`accountName`}
                            className={`form-control ${
                              isError(
                                props.errors,
                                props.touched,
                                "accountName"
                              ).cls
                            }`}
                          />
                          <div className="invalid-feedback">
                            {
                              isError(
                                props.errors,
                                props.touched,
                                "accountName"
                              ).msg
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row className="card-pay-row">
                        <Col md={6}>
                          <label className="form-label" htmlFor="bankName">
                            Bank Name.{" "}
                          </label>
                          <Select
                            placeholder="Bank Name"
                            name={`bankName`}
                            onChange={(item) => {
                              props.setFieldValue(
                                `bankName`,
                                item ? item.label : ""
                              );
                            }}
                            onBlur={() => {
                              props.setFieldTouched(`bankName`, true);
                            }}
                            id={`bankName`}
                            options={params.bankOptions}
                            className={`vselect-item ${
                              isError(props.errors, props.touched, "bankName")
                                .cls
                            }`}
                          />

                          <div className="invalid-feedback">
                            {
                              isError(props.errors, props.touched, "bankName")
                                .msg
                            }
                          </div>
                        </Col>
                        <Col md={6}>
                          <label className="form-label" htmlFor="branchName">
                            Branch Name.{" "}
                          </label>
                          <Field
                            placeholder="branchName"
                            name={`branchName`}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            id={`branchName`}
                            className={`form-control ${
                              isError(props.errors, props.touched, "branchName")
                                .cls
                            }`}
                          />
                          <div className="invalid-feedback">
                            {
                              isError(props.errors, props.touched, "branchName")
                                .msg
                            }
                          </div>
                        </Col>
                      </Row>

                      <Row className="card-pay-row">
                        <Col md={6}>
                          <label className="form-label" htmlFor="accountNumber">
                            Account Number.{" "}
                          </label>
                          <Field
                            placeholder="Ac/No. "
                            name={`accountNumber`}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            id={`accountNumber`}
                            className={`form-control ${
                              isError(
                                props.errors,
                                props.touched,
                                "accountNumber"
                              ).cls
                            }`}
                          />
                          <div className="invalid-feedback">
                            {
                              isError(
                                props.errors,
                                props.touched,
                                "accountNumber"
                              ).msg
                            }
                          </div>
                        </Col>

                        <Col md={6}>
                          <label className="form-label" htmlFor="country">
                            Country
                          </label>
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
                            options={countries}
                            className={`vselect-item ${
                              isError(props.errors, props.touched, "country")
                                .cls
                            }`}
                          />
                          {console.log(
                            "Current Error, BankName ",
                            isError(props.errors, props.touched, "country")
                          )}
                          <div
                            className={`invalid-feedback ${
                              isError(props.errors, props.touched, "country")
                                .status
                                ? "active"
                                : ""
                            }`}
                          >
                            {
                              isError(props.errors, props.touched, "country")
                                .msg
                            }
                          </div>
                        </Col>
                      </Row>

                      <Row className="card-pay-row">
                        <Col md={6}>
                          <label className="form-label" htmlFor="initialAmount">
                            Initial Balance
                          </label>
                          <Field
                            placeholder="Opening Balance"
                            name={`initialAmount`}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            id={`initialAmount`}
                            className={`form-control ${
                              isError(
                                props.errors,
                                props.touched,
                                "initialAmount"
                              ).cls
                            }`}
                          />
                          <div className="invalid-feedback">
                            {
                              isError(
                                props.errors,
                                props.touched,
                                "initialAmount"
                              ).msg
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row className="card-pay-row">
                        <Col md={8}>
                          <p className="pay-text">
                            {props.errors.accountNumber && (
                              <div id="feedback">
                                {props.errors.accountNumber}
                              </div>
                            )}
                          </p>
                        </Col>
                        <Col md={4}>
                          <Button type="submit" className="add-bank-btn">
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    bankOptions: state.bank.bankOptions,
  };
};

export default connect(mapStateToProps, { getBankNameOptions })(AddBank);
