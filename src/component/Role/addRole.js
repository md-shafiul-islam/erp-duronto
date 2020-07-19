import React, { Component } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import Axios from "axios";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { FormControl, FormControlLabel, Checkbox } from "@material-ui/core";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";
import { Redirect } from "react-router-dom";

const index = 0;
const acItem = [{}];
let gAccessTypes = [{ id: 1, name: "Sale", value: "sale", numValue: 1 }];

const gRole = {
  id: 0,
  name: null,
  description: null,
  accesses: [
    {
      id: 0,
      accessType: {
        id: 1,
        name: "Sale",
        value: "sale",
        numValue: 1,
      },
      name: null,
      description: null,
      view: 0,
      noAccess: 0,
      add: 0,
      edit: 0,
      approve: 0,
      updateApproval: 0,
      all: 0,
    },
  ],
};

let roleData = {
  id: 0,
  name: null,
  description: null,
  accesses: [
    {
      id: 0,
      accessType: {
        id: 1,
        name: "Sale",
        value: "sale",
        numValue: 1,
      },
      name: null,
      description: null,
      view: 0,
      noAccess: 0,
      add: 0,
      edit: 0,
      approve: 0,
      updateApproval: 0,
      all: 0,
    },
  ],
};

class AddRole extends Component {
  state = {
    accessTyeps: [{ id: 1, name: "Sale", value: "sale", numValue: 1 }],
    accessTypeLoad: false,
    roleLoad: false,
    prepRole: {},
    redirectStatus: false,
  };

  componentDidMount() {
    this.loadAllAccessTypes();
    this.loadPrepRole();
  }

  /** Pref Role Load Start */
  loadPrepRole = async () => {

    console.log("Header Role:", REQUEST_HEADER)

    await Axios.get(`${BASE_URL}/roles/access/add`, { headers: REQUEST_HEADER })
      .then((res) => {
        roleData = {};
        roleData = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,

          accesses: [],
          authStatus: res.data.authStatus === 1 ? true : false,
        };

        res.data.accesses.map((acs, ind) => {
          roleData.accesses.push({
            id: acs.id,
            accessType: {
              id: acs.accessType.id,
              name: acs.accessType.name,
              value: acs.accessType.value,
              numValue: acs.accessType.numValue,
            },
            name: acs.name,
            description: acs.description,
            view: acs.view,
            noAccess: acs.noAccess,
            add: acs.add,
            edit: acs.edit,
            approve: acs.approve,
            updateApproval: acs.updateApproval,
            all: acs.all,
          });
        });

        this.setState({ prepRole: {} });
        this.setState({ prepRole: roleData });

        console.log("After Set Role Data: ", this.state.prepRole);
        this.setState({ roleLoad: true });
      })
      .catch((res) => {
        console.log("Role Load Error: ", res);
      });

    if (this.state.prepRole.length >= 0 && roleData.length > 0) {
      this.setState({ prepRole: roleData });
    }

    if (0 >= this.state.prepRole.length) {
      this.setState({ roleLoad: false });
      this.loadPrepRole();
    }
  };
  /** Pref Role Load End */

  /** Access Types Load Start */
  loadAllAccessTypes = async () => {
    await Axios.get(`${BASE_URL}/roles/access-tyeps`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        if (gAccessTypes.length > 0) {
          gAccessTypes = [];
        }

        res.data.map((typeAccess, ind) => {
          gAccessTypes.push({
            id: typeAccess.id,
            name: typeAccess.name,
            value: typeAccess.value,
            numValue: typeAccess.numValue,
          });
        });
      })
      .catch((res) => {
        console.log("access Type Load Error: ", res);
      });

    this.state.accessTyeps = [];

    this.setState({ accessTyeps: gAccessTypes });

    if (this.state.accessTyeps.length >= 0 && gAccessTypes.length > 0) {
      this.setState({ accessTyeps: gAccessTypes });
    }

    if (0 >= this.state.accessTyeps.length) {
      this.setState({ accessTypeLoad: false });
      this.loadAllAccessTypes();
    } else {
      this.setState({ accessTypeLoad: true });
    }
  };

  isValid = (valueOne, valueTwo) => {
    if (valueOne === valueTwo) {
      return true;
    }
    return false;
  };
  /** Access Types Load End */

  submitAction = (values) => {
    let strinfiValue = JSON.stringify(values, null, 2);
    let roleUpdateUrl = `${BASE_URL}/roles/role`;
    Axios.post(roleUpdateUrl, strinfiValue, { headers: REQUEST_HEADER })
      .then((res) => {
        console.log("Role Save Success, ", res.data);
        this.setState({ redirectStatus: true });
      })
      .catch((res) => {
        console.log("Role Save Error ", res);
      });
  };

  render() {
    if (this.state.redirectStatus) {
      return <Redirect to="/roles" />;
    }

    if (!this.state.roleLoad) {
      return (
        <React.Fragment>
          <div>
            <p style={{ marginLeft: 350 }}>Data Loading...</p>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12" style={{ margin: "10px auto" }}>
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Role</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}

                  <Formik
                    initialValues={this.state.prepRole}
                    onSubmit={(values, actions) => {
                      console.log("Role Submit!!");

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
                            <div className="col-md-8">
                              <div className="form-group">
                                <label htmlFor="name">Name:</label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="Name"
                                />
                              </div>
                            </div>

                            <div className="col-md-4 pading-top-25">
                              <FormControl component="fieldset">
                                <FormControlLabel
                                  name="authStatus"
                                  defaultValue={props.values.authStatus}
                                  checked={props.values.authStatus}
                                  control={<Checkbox color="primary" />}
                                  onChange={props.handleChange}
                                  label="Management"
                                  labelPlacement="start"
                                />
                              </FormControl>
                            </div>
                          </div>

                          {/* Role access Start */}
                          {/* First Row */}
                          <div className="row">
                            <div className="card card-primary card-outline col-md-12">
                              <div className="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-user-shield" />
                                  &nbsp; Role
                                </h3>
                              </div>
                              <div className="card-body">
                                <h4>Role</h4>
                                <Tab.Container
                                  id="left-tabs-Role"
                                  defaultActiveKey="sale-1"
                                >
                                  <Row>
                                    <Col sm={2} className="role-tab">
                                      <Nav
                                        variant="pills"
                                        className="nav flex-column nav-tabs h-100"
                                      >
                                        {this.state.accessTyeps.map(
                                          (accessTypeItem, idx) => {
                                            return (
                                              <React.Fragment>
                                                <Nav.Item>
                                                  <Nav.Link
                                                    eventKey={`${accessTypeItem.value}-${accessTypeItem.id}`}
                                                  >
                                                    {accessTypeItem.name}
                                                  </Nav.Link>
                                                </Nav.Item>
                                              </React.Fragment>
                                            );
                                          }
                                        )}
                                      </Nav>
                                    </Col>

                                    <Col sm={10}>
                                      <Tab.Content>
                                        <FieldArray name="accesses">
                                          {({ push, remove }) => (
                                            <React.Fragment>
                                              {props.values.accesses.map(
                                                (accessData, ind) => {
                                                  return (
                                                    <React.Fragment>
                                                      {this.isValid(
                                                        accessData.accessType
                                                          .value,
                                                        "category"
                                                      ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "pack_category"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "department"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "designation"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "duration"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "countries"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "rules_and_regulation"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "terms_tandc"
                                                        ) ||
                                                        this.isValid(
                                                          accessData.accessType
                                                            .value,
                                                          "privacy_policy"
                                                        ) ? (
                                                          <React.Fragment
                                                            key={`${accessData.accessType.id}-${ind}`}
                                                          >
                                                            <Tab.Pane
                                                              eventKey={`${accessData.accessType.value}-${accessData.accessType.id}`}
                                                            >
                                                              <h5>
                                                                {accessData.accessType !=
                                                                  null
                                                                  ? "Set Access for: " +
                                                                  accessData
                                                                    .accessType
                                                                    .name
                                                                  : "Set Access for:"}
                                                              </h5>
                                                              {/* No Access Row Start */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Deny Or No
                                                                        Access
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      No Access{" "}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        id={`accesses[${ind}].noAccessOn`}
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].noAccess`}
                                                                      />

                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].noAccessOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].noAccess`}
                                                                        value="0"
                                                                        id={`accesses[${ind}].noAccessOff`}
                                                                      />
                                                                      <label
                                                                        htmlFor={`accesses[${ind}].noAccessOff`}
                                                                        className="custom-control-label"
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* No Access Row End */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>View</b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Details,
                                                                      Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        value="1"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].view`}
                                                                        id={`accesses[${ind}].viewOn`}
                                                                      />
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].viewOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].view'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].view`}
                                                                        id={`accesses[${ind}].viewOff`}
                                                                      />
                                                                      {/**  th:attr="for='accesses['+${acTypeState.index}+'].view'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].viewOff`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 2nd Row */}
                                                              {/* 3nd Row */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Add &amp;
                                                                        View
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Add, Pending
                                                                      View,
                                                                      Details,
                                                                      Confirm
                                                                      View, Reject
                                                                      View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].add1'" */}
                                                                      <Field
                                                                        value="1"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].add`}
                                                                        id={`accesses[${ind}].add1`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].add1'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].add1`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].add'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].add`}
                                                                        id={`accesses[${ind}].add0`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].add'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].add0`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 3rd Row  */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Edit Or
                                                                        Update
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      {" "}
                                                                    Edit Or
                                                                    Update,
                                                                    Details
                                                                    View,
                                                                    Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].update1'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].edit`}
                                                                        id={`accesses[${ind}].editOn`}
                                                                        value="1"
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].update1'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].editOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].update'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].edit`}
                                                                        id={`accesses[${ind}].editOff`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].update'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].editOff`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 3rd Row  End */}

                                                              {/* 6th Row */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Full
                                                                        Access
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      All Kind Of
                                                                      Approve,
                                                                      Add, Update,
                                                                      Reject, View
                                                                      Or Full
                                                                      control this
                                                                      system.
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].all2'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].all`}
                                                                        id={`accesses[${ind}].allOn`}
                                                                      />
                                                                      {/**  th:attr="for='accesses['+${acTypeState.index}+'].all2'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].allOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/* th:attr="data-itemId=${itemState.index}"  */}
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].all'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].all`}
                                                                        id={`accesses[${ind}].allInactive`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].all'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].allInactive`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 6th Row */}
                                                            </Tab.Pane>
                                                          </React.Fragment>
                                                        ) : (
                                                          <React.Fragment
                                                            key={`${accessData.accessType.id}-${ind}`}
                                                          >
                                                            <Tab.Pane
                                                              eventKey={`${accessData.accessType.value}-${accessData.accessType.id}`}
                                                            >
                                                              <h5>
                                                                {accessData.accessType !=
                                                                  null
                                                                  ? "Set Access for: " +
                                                                  accessData
                                                                    .accessType
                                                                    .name
                                                                  : "Set Access for:"}
                                                              </h5>
                                                              {/* No Access Row Start */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Deny Or No
                                                                        Access
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      No Access{" "}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        id={`accesses[${ind}].noAccessOn`}
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].noAccess`}
                                                                      />

                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].noAccessOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].noAccess`}
                                                                        value="0"
                                                                        id={`accesses[${ind}].noAccessOff`}
                                                                      />
                                                                      <label
                                                                        htmlFor={`accesses[${ind}].noAccessOff`}
                                                                        className="custom-control-label"
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* No Access Row End */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>View</b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Details,
                                                                      Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      <Field
                                                                        value="1"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].view`}
                                                                        id={`accesses[${ind}].viewOn`}
                                                                      />
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].viewOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].view'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].view`}
                                                                        id={`accesses[${ind}].viewOff`}
                                                                      />
                                                                      {/**  th:attr="for='accesses['+${acTypeState.index}+'].view'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].viewOff`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 2nd Row */}
                                                              {/* 3nd Row */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Add &amp;
                                                                        View
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Add, Pending
                                                                      View,
                                                                      Details,
                                                                      Confirm
                                                                      View, Reject
                                                                      View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].add1'" */}
                                                                      <Field
                                                                        value="1"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].add`}
                                                                        id={`accesses[${ind}].add1`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].add1'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].add1`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].add'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].add`}
                                                                        id={`accesses[${ind}].add0`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].add'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].add0`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 3rd Row  */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Edit Or
                                                                        Update
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      {" "}
                                                                    Edit Or
                                                                    Update,
                                                                    Details
                                                                    View,
                                                                    Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].update1'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].edit`}
                                                                        id={`accesses[${ind}].editOn`}
                                                                        value="1"
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].update1'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].editOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].update'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].edit`}
                                                                        id={`accesses[${ind}].editOff`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].update'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].editOff`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 3rd Row  End */}
                                                              {/*  4th Row */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Add
                                                                        Approve
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Add Approval
                                                                      Pending
                                                                      View,
                                                                      Approve,
                                                                      Details
                                                                      View,
                                                                      Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].addApproval1'" */}
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].addApproval1'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].addApprove`}
                                                                        id={`accesses[${ind}].addApproval1`}
                                                                      />
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].addApproval1`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/**  th:attr="id='accesses['+${acTypeState.index}+'].addApprove'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].addApprove`}
                                                                        id={`accesses[${ind}].addApprove0`}
                                                                      />
                                                                      {/** attr="for='accesses['+${acTypeState.index}+'].addApprove'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].addApprove0`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 4th Row End */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Update
                                                                        Approval
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      Update Or
                                                                      Edit
                                                                      Approval
                                                                      Pending
                                                                      View,
                                                                      Approve
                                                                      Update,
                                                                      Details
                                                                      View,
                                                                      Confirm View
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/**  th:attr="id='accesses['+${acTypeState.index}+'].updateApproval'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].updateApproval`}
                                                                        id={`accesses[${ind}].updateApprovalOn`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].updateApproval'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].updateApprovalOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].updateApproval1'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].updateApproval`}
                                                                        id={`accesses[${ind}].updateApprovalOff`}
                                                                      />
                                                                      {/** attr="for='accesses['+${acTypeState.index}+'].updateApproval1'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].updateApprovalOff`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 5th Row End */}
                                                              {/* 6th Row */}
                                                              <div className="row">
                                                                <div className="col-md-3">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      <b>
                                                                        Full
                                                                        Access
                                                                    </b>
                                                                    </label>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <p>
                                                                      All Kind Of
                                                                      Approve,
                                                                      Add, Update,
                                                                      Reject, View
                                                                      Or Full
                                                                      control this
                                                                      system.
                                                                  </p>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].all2'" */}
                                                                      <Field
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`accesses[${ind}].all`}
                                                                        id={`accesses[${ind}].allOn`}
                                                                      />
                                                                      {/**  th:attr="for='accesses['+${acTypeState.index}+'].all2'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].allOn`}
                                                                      >
                                                                        On
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <div className="form-group">
                                                                    <div className="custom-control custom-radio">
                                                                      {/* th:attr="data-itemId=${itemState.index}"  */}
                                                                      {/** th:attr="id='accesses['+${acTypeState.index}+'].all'" */}
                                                                      <Field
                                                                        value="0"
                                                                        className="custom-control-input"
                                                                        type="radio"
                                                                        name={`accesses[${ind}].all`}
                                                                        id={`accesses[${ind}].allInactive`}
                                                                      />
                                                                      {/** th:attr="for='accesses['+${acTypeState.index}+'].all'" */}
                                                                      <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`accesses[${ind}].allInactive`}
                                                                      >
                                                                        Off
                                                                    </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {/* 6th Row */}
                                                            </Tab.Pane>
                                                          </React.Fragment>
                                                        )}
                                                    </React.Fragment>
                                                  );
                                                }
                                              )}
                                            </React.Fragment>
                                          )}
                                        </FieldArray>
                                      </Tab.Content>
                                    </Col>
                                    {/* Col-7 col-9- */}
                                  </Row>
                                </Tab.Container>
                                {/* Role Row */}
                              </div>
                              {/* card-body */}

                              <div className="card-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary "
                                >
                                  <span>
                                    {" "}
                                    <i className="fas fa-save" />
                                  </span>{" "}
                                  <span className="text">Save</span>
                                </button>
                              </div>
                            </div>
                            {/* /.card */}
                          </div>
                          {/* First Row End*/}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                {/* Role access End */}
              </div>
              {/* /.card-body */}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default AddRole;
