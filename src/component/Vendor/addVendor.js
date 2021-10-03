import React, { Component } from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import Select from "react-select";

import Axios from "axios";
import LoadingData from "../Layout/LoadingData";
import { Redirect } from "react-router-dom";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

const countries = [];
const countryOprions = [];
const countryPhoneCode = [];
const vendorOptions = [{ label: `None`, value: 0 }];

class AddVendor extends Component {
  state = {
    countryesList: [],
    optionStatus: true,
    venCatLis: [],
    vendorCatStatus: true,
    redirecStatus: false,
  };

  componentDidMount() {
    this.loadCountry();
    this.loadVendorCats();
  }

  loadVendorCats = async () => {
    await Axios.get(`${BASE_URL}/vendor-cats`, { headers: REQUEST_HEADER }).then(
      (res) => {
        res.data &&
          res.data.forEach((item, inx) => {
            vendorOptions.push({ label: `${item.name}`, value: item.id });
          });

        this.setState({ venCatLis: vendorOptions });
      }
    );

    this.setState({ vendorCatStatus: false });
  };

  loadCountry = async () => {
    await Axios.get(`${BASE_URL}/countries`, { headers: REQUEST_HEADER })

      .then((res) => {
        res.data.forEach((count) => {
          countries.push(count);
        });
      })
      .catch((response) => {
        console.log(response);
      });
    //Load Countries End

    if (countries !== undefined) {
      if (countries.length !== undefined) {
        countries.forEach((countOp, ind) => {
          countryOprions.push({ label: `${countOp.name}`, value: countOp.id });
        });
        this.setState({ countryesList: countryOprions });
        countries.forEach((cntCode, indx) => {
          countryPhoneCode.push({
            label: `${cntCode.isoCode}, ${cntCode.dialOrPhoneCode}`,
            value: cntCode.dialOrPhoneCode,
          });
        });

        if (countryOprions.length > 0 && countryPhoneCode.length > 0) {
          this.setState({ optionStatus: false });
        }
      }
    }
  };

  submitAction = async (values) => {
    let fData = JSON.stringify(values, null, 2);
    await Axios.post(`${BASE_URL}/vendors/vendor`, fData, { headers: REQUEST_HEADER })
      .then((res) => {
        this.setState({ redirecStatus: true });
      })
      .catch((res) => {
        console.log("Error: ", res);
      });
  };

  render() {
    if (this.state.optionStatus || this.state.vendorCatStatus) {
      return <LoadingData />;
    }

    if (this.state.redirecStatus) {
      return <Redirect to="/vendors" />;
    }

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Vendor</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Formik
                  initialValues={{
                    companyName: null,
                    ownerName: null,
                    comPhoneNo: "",
                    phoneCode: "",
                    contactPersons: [
                      {
                        name: "",
                        phoneNo: "",
                        conPhoneCode: "",
                        email: "",
                        designation: "",
                      },
                    ],
                    addresses: [
                      {
                        id: 0,
                        house: null,
                        title: null,
                        village: null,
                        street: null,
                        zipCode: null,
                        city: null,
                        country: 0,
                        code_name: null,
                      },
                    ],
                    email: null,
                    website: null,
                    paymentInfos: [
                      {
                        accountNo: null,
                        accountName: null,
                        branchName: null,
                        bankName: null,
                        country: null,
                        city: null,
                      },
                    ],
                    vendorCategory: 0,
                  }}
                  onSubmit={(values, actions) => {
                    console.log(
                      "After Submit, ",
                      JSON.stringify(values, null, 2)
                    );

                    this.submitAction(values);

                    setTimeout(() => {
                      //this.submitData(values);
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                      console.log("Pomt Data:");
                      console.log(JSON.stringify(values, null, 2));
                    }, 1000);
                  }}
                >
                  {(props) => (
                    <Form>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="website">
                                Vendor/Supplier Category:
                              </label>
                              <Select
                                name={`vendorCategory`}
                                id={`vendorCategory`}
                                options={this.state.venCatLis}
                                value={this.value}
                                onChange={(opt, e) => {
                                  props.handleChange.bind(this);
                                  props.setFieldValue(
                                    `vendorCategory`,
                                    opt.value
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <h3>Company Info</h3>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="companyName">Company Name:</label>{" "}
                              <Field
                                type="text"
                                className="form-control"
                                name="companyName"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="ownerName">Owner Name:</label>{" "}
                              <Field
                                type="text"
                                className="form-control"
                                name="ownerName"
                                placeholder="Owner Name"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="phoneNo">Phone No.:</label>
                              <div className="row">
                                <div className="col-md-4">
                                  <Select
                                    options={countryPhoneCode}
                                    value={this.value}
                                    name="phoneCode"
                                    onChange={(opt, e) => {
                                      props.handleChange.bind(this);
                                      props.setFieldValue(
                                        `phoneCode`,
                                        opt.value
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="comPhoneNo"
                                    placeholder=" 1710000000"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="email">Email:</label>{" "}
                              <Field
                                className="form-control"
                                name="email"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="website">Web:</label>{" "}
                              <Field
                                type="text"
                                className="form-control"
                                name="website"
                                placeholder="Web"
                              />
                            </div>
                          </div>
                        </div>

                        <fieldset className="mp-10">
                          <legend>Contact Person Info</legend>
                          <div className="row">
                            <FieldArray name="contactPersons">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {props.values.contactPersons.map(
                                    (cPerson, indx) => {
                                      return (
                                        <React.Fragment>
                                          <div
                                            className="col-md-12"
                                            key={`cont-${indx + 1}`}
                                          >
                                            <div className="row">
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="name">
                                                    Name:
                                                  </label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`contactPersons[${indx}].name`}
                                                    placeholder="Person Name"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="phoneNo">
                                                    Phone No:
                                                  </label>
                                                  <div className="row">
                                                    <div className="col-md-4">
                                                      <Select
                                                        options={
                                                          countryPhoneCode
                                                        }
                                                        name={`contactPersons[${indx}].conPhoneCode`}
                                                        value={this.value}
                                                        onChange={(opt, e) => {
                                                          props.handleChange.bind(
                                                            this
                                                          );
                                                          props.setFieldValue(
                                                            `contactPersons[${indx}].conPhoneCode`,
                                                            opt.value
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="col-md-8">
                                                      <Field
                                                        type="text"
                                                        className="form-control"
                                                        name={`contactPersons[${indx}].phoneNo`}
                                                        placeholder=" 1710000000"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="designation">
                                                    Designation:
                                                  </label>{" "}
                                                  <Field
                                                    className="form-control"
                                                    name={`contactPersons[${indx}].designation`}
                                                    placeholder="Designation here"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="email">
                                                    Person Email:
                                                  </label>{" "}
                                                  <Field
                                                    type="email"
                                                    className="form-control"
                                                    name={`contactPersons[${indx}].email`}
                                                    placeholder="Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-1 n-content">
                                            {indx === 0 ? (
                                              <span></span>
                                            ) : (
                                              <a
                                                href="javascript:void(0);"
                                                onClick={() => remove(indx)}
                                              >
                                                Remove
                                              </a>
                                            )}
                                          </div>
                                        </React.Fragment>
                                      );
                                    }
                                  )}

                                  <a
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      push({
                                        name: "",
                                        phoneNo: "",
                                        conPhoneCode: "",
                                        email: "",
                                        designation: "",
                                      })
                                    }
                                  >
                                    Add
                                  </a>
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </fieldset>

                        <fieldset className="mp-10">
                          <legend>Address Info</legend>
                          <div className="row">
                            <FieldArray name="addresses">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {props.values.addresses.map(
                                    (address, inx) => {
                                      return (
                                        <React.Fragment>
                                          <div
                                            className="col-md-12"
                                            key={`address-${inx + 1}`}
                                          >
                                            <div className="row">
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>House:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`addresses[${inx}].house`}
                                                    placeholder="House"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Street:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`addresses[${inx}].street`}
                                                    placeholder="House"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Village/Area:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`addresses[${inx}].village`}
                                                    placeholder="Village"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Zip Code:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`addresses[${inx}].zipCode`}
                                                    placeholder="Zip Code"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="city">
                                                    City:
                                                  </label>
                                                  <Field
                                                    className="form-control"
                                                    type="text"
                                                    name={`addresses[${inx}].city`}
                                                    placeholder="City"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="country">
                                                    Country:
                                                  </label>
                                                  <Select
                                                    name={`addresses[${inx}].country`}
                                                    id={`addresses[${inx}].country`}
                                                    options={
                                                      this.state.countryesList
                                                    }
                                                    value={this.value}
                                                    onChange={(opt, e) => {
                                                      props.handleChange.bind(
                                                        this
                                                      );
                                                      props.setFieldValue(
                                                        `addresses[${inx}].country`,
                                                        opt.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-1 n-content">
                                            {inx === 0 ? (
                                              <span></span>
                                            ) : (
                                              <a
                                                href="javascript:void(0);"
                                                onClick={() => remove(inx)}
                                              >
                                                Remove
                                              </a>
                                            )}
                                          </div>
                                        </React.Fragment>
                                      );
                                    }
                                  )}

                                  <a
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      push({
                                        house: "",
                                        title: "",
                                        village: "",
                                        street: "",
                                        zipCode: "",
                                        city: "",
                                        country: 0,
                                        code_name: "",
                                      })
                                    }
                                  >
                                    Add
                                  </a>
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </fieldset>

                        <fieldset className="mp-10">
                          <legend>Payment Info</legend>

                          <div className="row">
                            <FieldArray name="paymentInfos">
                              {({ push, remove }) => (
                                <React.Fragment>
                                  {props.values.paymentInfos.map(
                                    (cPayInf, idx) => {
                                      return (
                                        <React.Fragment>
                                          <div
                                            className="col-md-12"
                                            key={`paymentInfos-${idx + 1}`}
                                          >
                                            <div className="row">
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Bank Name:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`paymentInfos[${idx}].bankName`}
                                                    placeholder="Bank Name"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Branch Name:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`paymentInfos[${idx}].branchName`}
                                                    placeholder="Branch Name"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Account Name:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`paymentInfos[${idx}].accountName`}
                                                    placeholder="Account Name"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Account No:</label>{" "}
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    name={`paymentInfos[${idx}].accountNo`}
                                                    placeholder="Account No."
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="city">
                                                    City:
                                                  </label>
                                                  <Field
                                                    className="form-control"
                                                    type="text"
                                                    name={`paymentInfos[${idx}].city`}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label>Country:</label>{" "}
                                                  <Select
                                                    name={`paymentInfos[${idx}].country`}
                                                    id={`paymentInfos[${idx}].country`}
                                                    options={
                                                      this.state.countryesList
                                                    }
                                                    value={this.value}
                                                    onChange={(opt, e) => {
                                                      props.handleChange.bind(
                                                        this
                                                      );
                                                      props.setFieldValue(
                                                        `paymentInfos[${idx}].country`,
                                                        opt.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-1 n-content">
                                            {idx === 0 ? (
                                              <span></span>
                                            ) : (
                                              <a
                                                href="javascript:void(0);"
                                                onClick={() => remove(idx)}
                                              >
                                                Remove
                                              </a>
                                            )}
                                          </div>
                                        </React.Fragment>
                                      );
                                    }
                                  )}

                                  <a
                                    href="javascript:void(0);"
                                    onClick={() =>
                                      push({
                                        accountNo: "",
                                        accountName: "",
                                        branchName: "",
                                        bankName: "",
                                        country: 0,
                                        city: "",
                                      })
                                    }
                                  >
                                    Add
                                  </a>
                                </React.Fragment>
                              )}
                            </FieldArray>
                          </div>
                        </fieldset>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary ">
                          <span>
                            {" "}
                            <i className="fas fa-save" />
                          </span>{" "}
                          <span className="text">Save</span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddVendor;
