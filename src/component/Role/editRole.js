import React, { Component } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import Axios from "axios";
import { Tab, Row, Col, Nav } from "react-bootstrap";
//import { Checkbox } from "formik-material-ui";
import {
  Checkbox as 
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";
import { Redirect } from "react-router-dom";

let gAccessTypes = [{ id: 1, name: "Sale", value: "sale", numValue: 1 }];

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

class EditRole extends Component {
  constructor(props) {
    super(props);

    this.paramRoleId = props.match.params.id;
  }

  state = {
    redirectStatus: false,
    accessTyeps: [{ id: 1, name: "Sale", value: "sale", numValue: 1 }],
    loadAccessType: true,
    populateRole: {
      accesses: [
        {
          id: 4,
          accessType: {
            id: 1,
            name: "Sale",
            value: "sale",
            numValue: 1,
          },
          name: null,
          description: null,
          view: 1,
          noAccess: 1,
          add: 1,
          edit: 1,
          approve: 1,
          updateApproval: 1,
          all: 1,
        },
      ],
      users: [
        {
          userGemId: null,
          publicId: "y4ntX2mIcyPwrv7Msoi7wrzB8IRH2t",

          name: "Md Shahidul Islam",

          officialEmail: "shafiul2014bd@gmail.com",
        },
      ],
      name: "Developer",
      description: "Developer",
    },
    preLoad: true,
  };

  componentDidMount() {
    this.loadEditRole();
    this.loadAllAccessTypes();
  }

  isValid = (valueOne, valueTwo) => {
    if (valueOne === valueTwo) {
      return true;
    }
    return false;
  };

  loadEditRole = async () => {
    let dataUrl = `${BASE_URL}/roles/role/${this.paramRoleId}`;
    await Axios.get(dataUrl, { headers: REQUEST_HEADER })
      .then((res) => {
        roleData = {};
        roleData = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          accesses: [],
          authStatus: res.data.authStatus === 1 ? true : false,
          publicId: res.data.publicId,
        };

        res.data.accesses.forEach((acs, ind) => {
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

        this.setState({ populateRole: {} });
        this.setState({ populateRole: roleData });
        this.setState({ preLoad: false });
      })
      .catch((res) => {
        console.log("Role Load Error: ", res);
      });

    if (
      this.state.prepRole &&
      this.state.prepRole.accesses &&
      roleData &&
      roleData.accesses
    ) {
      this.setState({ populateRole: roleData });
    }

    if (
      this.state.populateRole &&
      0 >= this.state.populateRole.accesses.length
    ) {
      this.setState({ roleLoad: true });
      this.loadPrepRole();
    }
  };

  loadPrepRole = ()=>{
    console.log("Load PrepRole ... ");
  }

  // Access Types Load Start
  loadAllAccessTypes = async () => {
    await Axios.get(`${BASE_URL}/roles/access-tyeps`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        console.log("Access Type: ", res.data);
        if (gAccessTypes.length > 0) {
          gAccessTypes = [];
        }

        res.data.forEach((typeAccess, ind) => {
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

    this.setState({ accessTyeps: [] });

    this.setState({ accessTyeps: gAccessTypes });
    this.setState({ loadAccessType: false });

    if (this.state.accessTyeps.length >= 0 && gAccessTypes.length > 0) {
      this.setState({ accessTyeps: gAccessTypes });
      this.setState({ loadAccessType: false });
    }

    if (0 >= this.state.accessTyeps.length) {
      this.setState({ loadAccessType: true });
      this.loadAllAccessTypes();
    } else {
      this.setState({ loadAccessType: false });
    }
  };
  // Access Types Load End

  submitAction = (values) => {
    let strinfiValue = JSON.stringify(values, null, 2);
    let roleUpdateUrl = `${BASE_URL}/roles/role`;
    Axios.put(roleUpdateUrl, strinfiValue, { headers: REQUEST_HEADER })
      .then((res) => {
        console.log("Role Update Success, ", res.data);

        this.setState({ redirectStatus: true });
      })
      .catch((res) => {
        console.log("Role Update Error ", res);
      });
  };

  render() {
    if (this.state.redirectStatus) {
      return <Redirect to="/roles" />;
    }
    if (this.state.preLoad) {
      return (
        <React.Fragment>
          {console.log("Pram is: ", this.paramRoleId)}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12" style={{ margin: "10px auto" }}>
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Edit Or Update Role</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}

                  <Formik
                    initialValues={this.state.populateRole}
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
                    {({ values, handleChange, setFieldValue, handleBlur }) => (
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
                                  value={values.name}
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <FormControl component="fieldset">
                                <FormControlLabel
                                  name="authStatus"
                                  defaultValue={values.authStatus}
                                  checked={values.authStatus}
                                  control={<Checkbox color="primary" />}
                                  onChange={handleChange}
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
                                  &nbsp;Role
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
                                              {values.accesses.map(
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
                                                            <div
                                                              className="row"
                                                              cNData={
                                                                accessData.noAccess
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].noAccess`}
                                                                  value={`${values.accesses[ind].noAccess}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* No Access Row End */}
                                                            <div
                                                              className="row"
                                                              cVd={
                                                                accessData.view
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].view`}
                                                                  value={`${values.accesses[ind].view}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 2nd Row */}
                                                            {/* 3nd Row */}
                                                            <div
                                                              className="row"
                                                              cAVd={
                                                                accessData.add
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].add`}
                                                                  value={`${values.accesses[ind].add}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 3rd Row  */}
                                                            <div
                                                              className="row"
                                                              cEd={
                                                                accessData.edit
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].edit`}
                                                                  value={`${values.accesses[ind].edit}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 3rd Row  End */}

                                                            {/* 6th Row */}
                                                            <div
                                                              className="row"
                                                              faD={
                                                                accessData.all
                                                              }
                                                            >
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
                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].all`}
                                                                  value={`${values.accesses[ind].all}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  {console.log(
                                                                    "All Data: Current" +
                                                                      `${ind}`,
                                                                    values
                                                                      .accesses[
                                                                      ind
                                                                    ].all
                                                                  )}
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
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
                                                            <div
                                                              className="row"
                                                              cNData={
                                                                accessData.noAccess
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].noAccess`}
                                                                  value={`${values.accesses[ind].noAccess}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* No Access Row End */}
                                                            <div
                                                              className="row"
                                                              cVd={
                                                                accessData.view
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].view`}
                                                                  value={`${values.accesses[ind].view}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 2nd Row */}
                                                            {/* 3nd Row */}
                                                            <div
                                                              className="row"
                                                              cAVd={
                                                                accessData.add
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].add`}
                                                                  value={`${values.accesses[ind].add}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 3rd Row  */}
                                                            <div
                                                              className="row"
                                                              cEd={
                                                                accessData.edit
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].edit`}
                                                                  value={`${values.accesses[ind].edit}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 3rd Row  End */}
                                                            {/*  4th Row */}
                                                            <div
                                                              className="row"
                                                              AAp={
                                                                accessData.approve
                                                              }
                                                            >
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].approve`}
                                                                  value={`${values.accesses[ind].approve}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
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

                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].updateApproval`}
                                                                  value={`${values.accesses[ind].updateApproval}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
                                                            </div>
                                                            {/* 5th Row End */}
                                                            {/* 6th Row */}
                                                            <div
                                                              className="row"
                                                              faD={
                                                                accessData.all
                                                              }
                                                            >
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
                                                              <FormControl component="fieldset">
                                                                <RadioGroup
                                                                  row
                                                                  aria-label="position"
                                                                  name={`accesses[${ind}].all`}
                                                                  value={`${values.accesses[ind].all}`}
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                >
                                                                  {console.log(
                                                                    "All Data: Current" +
                                                                      `${ind}`,
                                                                    values
                                                                      .accesses[
                                                                      ind
                                                                    ].all
                                                                  )}
                                                                  <FormControlLabel
                                                                    value="1"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="On"
                                                                    labelPlacement="end"
                                                                  />
                                                                  <FormControlLabel
                                                                    value="0"
                                                                    control={
                                                                      <Radio color="primary" />
                                                                    }
                                                                    label="Off"
                                                                    labelPlacement="end"
                                                                  />
                                                                </RadioGroup>
                                                              </FormControl>
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
          {/* </div>  */}
        </React.Fragment>
      );
    }
  }
}

export default EditRole;
