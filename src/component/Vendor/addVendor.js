import React, { Component } from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import Select from "react-select";

class AddVendor extends Component {
  state = {
    countryesList: [],
  };
  constructor(props) {
    super(props);
    console.log("Add Vendor !!!");
  }
  render() {
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
                    contactPersons: [
                      {
                        name: null,
                        phoneNo: null,
                        phoneNo2: null,
                        country1: null,
                        country2: null,
                        email: null,
                      },
                    ],
                    addresses: [
                      {
                        id: 0,
                        house: null,
                        title: null,
                        village: null,
                        street: null,
                        zip_code: null,
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
                                options={this.state.countryesList}
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
                                                      <select></select>
                                                    </div>
                                                    <div className="col-md-8">
                                                      <Field
                                                        type="text"
                                                        className="form-control"
                                                        name={`contactPersons[${indx}].phoneNo`}
                                                        placeholder="Phone No."
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="phoneNo">
                                                    Phone No 2:
                                                  </label>
                                                  <div className="row">
                                                    <div className="col-md-8">
                                                      <Field
                                                        type="text"
                                                        className="form-control"
                                                        name={`contactPersons[${indx}].phoneNo2`}
                                                        placeholder="Phone No 2."
                                                      />
                                                    </div>
                                                  </div>
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
                                              <div className="col-md-4">
                                                <div className="form-group">
                                                  <label htmlFor="country">
                                                    Country:
                                                  </label>
                                                  <Select
                                                    name={`countries[${indx}].id`}
                                                    id={`countries[${indx}].id`}
                                                    options={
                                                      this.state.countryesList
                                                    }
                                                    value={this.value}
                                                    onChange={(opt, e) => {
                                                      props.handleChange.bind(
                                                        this
                                                      );
                                                      props.setFieldValue(
                                                        `countries[${indx}].id`,
                                                        opt.value
                                                      );
                                                    }}
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
                                        phoneNo2: "",
                                        country1: "",
                                        country2: "",
                                        email: "",
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
                            {console.log("values: ", props.values)}
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
                                                    name={`addresses[${inx}].zip_code`}
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
                                                    name={`countries[${inx}].id`}
                                                    id={`countries[${inx}].id`}
                                                    options={
                                                      this.state.countryesList
                                                    }
                                                    value={this.value}
                                                    onChange={(opt, e) => {
                                                      props.handleChange.bind(
                                                        this
                                                      );
                                                      props.setFieldValue(
                                                        `countries[${inx}].id`,
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
                                        zip_code: "",
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
                                                    id={`countries[${idx}].id`}
                                                    options={
                                                      this.state.countryesList
                                                    }
                                                    value={this.value}
                                                    onChange={(opt, e) => {
                                                      props.handleChange.bind(
                                                        this
                                                      );
                                                      props.setFieldValue(
                                                        `countries[${idx}].id`,
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
