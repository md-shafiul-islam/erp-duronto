import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import Dropzone from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import LoadingData from "../Layout/LoadingData";
import { TextField } from "@material-ui/core";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

let baseUrl = BASE_URL;
let headers = REQUEST_HEADER;

const genderList = [{ value: 0, label: "None" }];
const departmentList = [{ value: 0, label: "None" }];
const designationList = [{ value: 0, label: "None" }];
const roleList = [{ value: 0, label: "None" }];
const maritalStatusList = [{ value: 0, label: "None" }];
const countryList = [{ value: 0, label: "None" }];
let count = 1;

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.userId = props.match.params.id;

    console.log("User Id: ", this.userId);
  }

  state = {
    genders: [{ value: 0, label: "None" }],
    departments: [{ value: 0, label: "None" }],
    designations: [{ value: 0, label: "None" }],
    roles: [{ value: 0, label: "None" }],
    maritalStatuses: [{ value: 0, label: "None" }],
    countries: [{ value: 0, label: "None" }],
    totalAttachFile: 0,
    redirect: false,
    isSecondButton: false,
    currentUpload: 0,
    uploadProgress: 0,

    departmentStatus: true,
    designationStatus: true,
    loadMaritalStatus: true,
    countryStatus: true,
    userStatus: true,
    currentUser: {},
    roleStatus: true,
  };
  //this.setState({ totalAttachFile: this.state.totalAttachFile + 1 });

  componentDidMount() {
    this.loadCountries();
    this.loadDesignations();
    this.loadDepartmets();

    this.loadMaritalStatuses();
    this.loadGender();
    this.loadUser();
    this.loadRoles();
  }

  getDateLocal = (dateString) => {
    let cDate = new Date(dateString);
    console.log(dateString);
    let rDateString = "";
    rDateString += cDate.getFullYear();
    rDateString += "-";
    rDateString += cDate.getMonth();
    rDateString += "-";
    rDateString += cDate.getDate();

    console.log("Fun Date : ", rDateString);
    return rDateString;
  };

  loadRoles = async () => {
    console.log("Run Roles User");

    await Axios.get(`${baseUrl}/roles`)
      .then((res) => {
        res.data.map((role) => {
          roleList.push({
            value: role.id,
            label: role.name,
          });
        });
      })
      .catch((res) => {
        console.log("Load Faield Roles User", res);
      });

    this.setState({ roles: roleList });

    if (roleList.length > 0 && 0 >= this.state.roles) {
      this.setState({ roles: roleList });
    }

    if (0 >= this.state.roles.length) {
      this.loadRoles();
    }

    if (this.state.roles.length >= 1) {
      this.setState({ roleStatus: false });
    }
  };

  loadUser = async () => {
    let userUrl = `${baseUrl}/users/user/edit/${this.userId}`;

    await Axios.get(userUrl, { headers: headers })
      .then((res) => {
        this.state.currentUser = res.data;
        this.setState({ userStatus: false });
      })
      .catch((res) => {
        console.log("Error User Load: ", res);
      });
  };

  loadCountries = async () => {
    console.log("Run Country User");

    await Axios.get(`${baseUrl}/countries`, { headers: headers })
      .then((res) => {
        res.data.map((country) => {
          countryList.push({ value: country.id, label: country.name });
        });
      })
      .catch((res) => {
        console.log("Load Faield Country User", res);
      });

    this.setState({ countries: countryList });

    if (countryList.length > 0 && 0 >= this.state.countries) {
      this.setState({ countries: countryList });
    }

    if (0 >= this.state.countries) {
      this.loadCountries();
    }

    if (this.state.countries && this.state.countries.length > 0) {
      this.setState({ countryStatus: false });
    }

    if (this.state.countries !== undefined) {
      if (this.state.countries.length > 0) {
        this.setState({ countryStatus: false });
      }
    }
  };

  loadDepartmets = async () => {
    await Axios.get(`${baseUrl}/departments`, { headers: headers })
      .then((res) => {
        res.data.map((department) => {
          departmentList.push({ value: department.id, label: department.name });
        });
      })
      .catch((res) => {
        console.log("Load Faield department User", res);
      });

    this.setState({ departments: departmentList });

    if (departmentList.length > 0 && 0 >= this.state.departments.length) {
      this.setState({ departments: departmentList });
    }

    if (0 >= this.state.departments.length) {
      this.loadDepartmets();
    }

    if (0 < this.state.departments.length) {
      this.setState({ departmentStatus: false });
    }
  };

  loadDesignations = async () => {
    await Axios.get(`${baseUrl}/designations`, { headers: headers })
      .then((res) => {
        res.data.map((designation) => {
          designationList.push({
            value: designation.id,
            label: designation.name,
          });
        });
      })
      .catch((res) => {
        console.log("Load Faield designation User", res);
      });

    this.setState({ designations: designationList });

    if (designationList.length > 0 && 0 >= this.state.designations.length) {
      this.setState({ designations: designationList });
    }

    if (0 >= this.state.designations.length) {
      this.loadDesignations();
    }

    if (this.state.designations.length > 0) {
      this.setState({
        designationStatus: false,
      });
    }
  };

  loadGender = async () => {
    await Axios.get(`${baseUrl}/genders`, { headers: headers })
      .then((res) => {
        console.log("Done Gender User");
        res.data.map((gender) => {
          genderList.push({
            value: gender.id,
            label: gender.name,
          });
        });
      })
      .catch((res) => {
        console.log("Load Faield gender User", res);
      });

    this.setState({ genders: genderList });

    if (genderList.length > 0 && 0 >= this.state.genders.length) {
      this.setState({ genders: genderList });
    }

    if (0 >= this.state.genders.length) {
      this.loadGender();
    }

    if (this.state.genders.length > 0) {
      this.setState({ genderStatus: false });
    }
  };

  loadMaritalStatuses = async () => {
    await Axios.get(`${baseUrl}/marital-status`, { headers: headers })
      .then((res) => {
        res.data.map((maritalStatus) => {
          maritalStatusList.push({
            value: maritalStatus.id,
            label: maritalStatus.name,
          });
        });
      })
      .catch((res) => {
        console.log("Load Faield MS  User", res);
      });

    this.setState({ maritalStatuses: maritalStatusList });

    if (
      maritalStatusList.length > 0 &&
      0 >= this.state.maritalStatuses.length
    ) {
      this.setState({ maritalStatuses: maritalStatusList });
    }

    if (0 >= this.state.maritalStatuses.length) {
      this.loadMaritalStatuses();
    }

    if (this.state.maritalStatuses.length > 0) {
      this.setState({ loadMaritalStatus: false });
    }
  };

  imgUploadconfig = {
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      count++;
      this.setState({
        uploadProgress: percentCompleted,
      });
      console.log(percentCompleted + "%" + "File No: " + count);
    },
    headers: headers,
  };

  uploadAllfile = async (values) => {
    count = 0;
    const bUrl = `${baseUrl}/uploadfile/user-file/`;

    if (values.fieldVerificationFile !== null) {
      /** fieldVerificationFile Start */
      const fieldVeri = new FormData();
      fieldVeri.append("attachFile", values.fieldVerificationFile[0]);
      let fvfVarUrl = bUrl + "field_ver";

      await Axios.put(fvfVarUrl, fieldVeri, this.imgUploadconfig)
        .then((res) => {
          values.fieldVerificationUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("E V U Error:", res);
        });

      /**fieldVerificationFile End */
    }

    /** NID Start */

    if (values.nidFile !== null) {
      const localNidFile = new FormData();
      localNidFile.append("attachFile", values.nidFile[0]);
      let localNidFileUrl = bUrl + "nid";

      await Axios.put(localNidFileUrl, localNidFile, this.imgUploadconfig)
        .then((res) => {
          values.nidUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localNidFile Error:", res);
        });
    }

    /** NID End */

    /** applicationForJobFile  Start */
    if (values.applicationForJobFile !== null) {
      const localApplicationForJob = new FormData();
      localApplicationForJob.append(
        "attachFile",
        values.applicationForJobFile[0]
      );
      let localApplicationForJobUrl = bUrl + "appforjob";

      await Axios.put(
        localApplicationForJobUrl,
        localApplicationForJob,
        this.imgUploadconfig
      )
        .then((res) => {
          this.setState({ currentUpload: count });
          values.applicationForJobUrl = res.data;
        })
        .catch((res) => {
          console.log("localApplicationForJob Error:", res);
        });
    }
    /** applicationForJobFile  End */

    /** appointmentLetterFile  Start */
    if (values.appointmentLetterFile !== null) {
      const localDataAppointmentLetterFile = new FormData();
      localDataAppointmentLetterFile.append(
        "attachFile",
        values.appointmentLetterFile[0]
      );
      let localDataAppointmentLetterUrl = bUrl + "appointletter";

      await Axios.put(
        localDataAppointmentLetterUrl,
        localDataAppointmentLetterFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.appointmentLetterUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataAppointmentLetterFile Error:", res);
        });
    }
    /** appointmentLetterFile  End */

    /** localDataBachelorHonoursFile  Start */
    if (values.bachelorHonoursFile !== null) {
      const localDataBachelorHonoursFile = new FormData();
      localDataBachelorHonoursFile.append(
        "attachFile",
        values.bachelorHonoursFile[0]
      );
      let localDatalocalDataBachelorHonoursUrl = bUrl + "bachelor";

      await Axios.put(
        localDatalocalDataBachelorHonoursUrl,
        localDataBachelorHonoursFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.bachelorHonoursUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDatalocalDataBachelorHonoursUrl Error:", res);
        });
    }
    /** localDatalocalDataBachelorHonoursFile  End */

    /** birthCertificateUrlFile  Start */
    if (values.birthCertificateFile !== null) {
      const localDataBirthCertificateFile = new FormData();
      localDataBirthCertificateFile.append(
        "attachFile",
        values.birthCertificateFile[0]
      );
      let localDatalocalBirthCertificateFileUrl = bUrl + "birth";

      await Axios.put(
        localDatalocalBirthCertificateFileUrl,
        localDataBirthCertificateFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.birthCertificateUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("birthCertificateUrl Error:", res);
        });
    }
    /** birthCertificateFile  End */

    /** localDataCaFcaCmaFile  Start */
    if (values.caFcaCmaFile !== null) {
      const localDataCaFcaCmaFile = new FormData();
      localDataCaFcaCmaFile.append("attachFile", values.caFcaCmaFile[0]);
      let localDataCaFcaCmaFileUrl = bUrl + "cafcacma";

      await Axios.put(
        localDataCaFcaCmaFileUrl,
        localDataCaFcaCmaFile,
        this.imgUploadconfig
      )
        .then((res) => {
          this.setState({ currentUpload: count });
          values.caFcaCmaUrl = res.data;
        })
        .catch((res) => {
          console.log("localDataCaFcaCmaFile Error:", res);
        });
    }
    /** localDataCaFcaCmaFile  End */

    /** diplomaFile  Start */
    if (values.diplomaFile !== null) {
      const localDataDiplomaFileFile = new FormData();
      localDataDiplomaFileFile.append("attachFile", values.diplomaFile[0]);
      let localDataDiplomaFileFileUrl = bUrl + "diplomaFile";

      await Axios.put(
        localDataDiplomaFileFileUrl,
        localDataDiplomaFileFile,
        this.imgUploadconfig
      )
        .then((res) => {
          this.setState({ currentUpload: count });
          values.diplomaUrl = res.data;
        })
        .catch((res) => {
          console.log("diplomaFile Error:", res);
        });
    }
    /** diplomaFile  End */

    /** localDataEmploymentFile  Start */
    if (values.employmentFile !== null) {
      const localDataEmploymentFile = new FormData();
      localDataEmploymentFile.append("attachFile", values.employmentFile[0]);
      let localDataEmploymentFileUrl = bUrl + "employee";

      await Axios.put(
        localDataEmploymentFileUrl,
        localDataEmploymentFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.employmentUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataEmploymentFile Error:", res);
        });
    }
    /** localDataEmploymentFile  End */

    /** localDataHscEquivalentFileUrl  Start */
    if (values.hscEquivalentFile !== null) {
      const localDataHscEquivalentFile = new FormData();
      localDataHscEquivalentFile.append(
        "attachFile",
        values.hscEquivalentFile[0]
      );
      let localDataHscEquivalentFileUrl = bUrl + "hsc";

      await Axios.put(
        localDataHscEquivalentFileUrl,
        localDataHscEquivalentFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.hscEquivalentUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataHscEquivalentFileUrl Error:", res);
        });
    }
    /** localDataHscEquivalentFileUrl  End */

    /** localDataJobAgreementFile  Start */
    if (values.jobAgreementFile !== null) {
      const localDataJobAgreementFile = new FormData();
      localDataJobAgreementFile.append(
        "attachFile",
        values.jobAgreementFile[0]
      );
      let localDataJobAgreementFileUrl = bUrl + "job_agre";

      await Axios.put(
        localDataJobAgreementFileUrl,
        localDataJobAgreementFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.jobAgreementUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataJobAgreementFile Error:", res);
        });
    }
    /** localDataJobAgreementFile  End */

    /** localDataMastersFile  Start */
    if (values.mastersFile !== null) {
      const localDataMastersFile = new FormData();
      localDataMastersFile.append("attachFile", values.mastersFile[0]);
      let localDataMastersFileUrl = bUrl + "master";

      await Axios.put(
        localDataMastersFileUrl,
        localDataMastersFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.mastersUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataJobAgreementFile Error:", res);
        });
    }
    /** localDataMastersFile  End */

    /** localDataNationalityCertificateFile  Start */
    if (values.nationalityCertificateFile !== null) {
      const localDataNationalityCertificateFile = new FormData();
      localDataNationalityCertificateFile.append(
        "attachFile",
        values.nationalityCertificateFile[0]
      );
      let localDataNationalityCertificateFileUrl = bUrl + "national";

      await Axios.put(
        localDataNationalityCertificateFileUrl,
        localDataNationalityCertificateFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.nationalityCertificateUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataNationalityCertificateFileUrl Error:", res);
        });
    }
    /** localDataNationalityCertificateFile  End */

    /** localDataPfCaFcaCmaFile  Start */
    if (values.pfCaFcaCmaFile !== null) {
      const localDataPfCaFcaCmaFile = new FormData();
      localDataPfCaFcaCmaFile.append("attachFile", values.pfCaFcaCmaFile[0]);
      let localDataPfCaFcaCmaFileUrl = bUrl + "pfcafcma";

      await Axios.put(
        localDataPfCaFcaCmaFileUrl,
        localDataPfCaFcaCmaFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.pfCaFcaCmaUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataNationalityCertificateFileUrl Error:", res);
        });
    }
    /** localDataPfCaFcaCmaFile  End */

    /** localDataPfImageFile  Start */
    if (values.pfImageFile !== null) {
      const localDataPfImageFile = new FormData();
      localDataPfImageFile.append("attachFile", values.pfImageFile[0]);
      let localDataPfImageFileUrl = bUrl + "prfile";

      await Axios.put(
        localDataPfImageFileUrl,
        localDataPfImageFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.profileIimage = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataNationalityCertificateFileUrl Error:", res);
        });
    }
    /** localDataPfImageFile  End */

    /** localDataPledgeFile  Start */
    if (values.pledgeFile !== null) {
      const localDataPledgeFile = new FormData();
      localDataPledgeFile.append("attachFile", values.pledgeFile[0]);
      let localDataPledgeFileUrl = bUrl + "pledge";

      await Axios.put(
        localDataPledgeFileUrl,
        localDataPledgeFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.pledgeUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataPledgeFile Error:", res);
        });
    }
    /** localDataPledgeFile  End */

    /** localDataResumeFile  Start */
    if (values.resumeFile !== null) {
      const localDataResumeFile = new FormData();
      localDataResumeFile.append("attachFile", values.resumeFile[0]);
      let localDataResumeFileUrl = bUrl + "resume";

      await Axios.put(
        localDataResumeFileUrl,
        localDataResumeFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.resumeUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataResumeFile Error:", res);
        });
    }
    /** localDataResumeFile  End */

    /** localDataSecurityDeedFile  Start */
    if (values.securityDeedFile !== null) {
      const localDataSecurityDeedFile = new FormData();
      localDataSecurityDeedFile.append(
        "attachFile",
        values.securityDeedFile[0]
      );
      let localDataSecurityDeedFileUrl = bUrl + "security_deed";

      await Axios.put(
        localDataSecurityDeedFileUrl,
        localDataSecurityDeedFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.securityDeedUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataSecurityDeedFileUrl Error:", res);
        });
    }
    /** localDataSecurityDeedFile  End */

    /** localDataSscEquivalentFile  Start */
    if (values.sscEquivalentFile !== null) {
      const localDataSscEquivalentFile = new FormData();
      localDataSscEquivalentFile.append(
        "attachFile",
        values.sscEquivalentFile[0]
      );
      let localDataSscEquivalentFileUrl = bUrl + "sscequ";

      await Axios.put(
        localDataSscEquivalentFileUrl,
        localDataSscEquivalentFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.sscEquivalentUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataSscEquivalentFile Error:", res);
        });
    }
    /** localDataSscEquivalentFile  End */

    /** localDataSscEquivalentFile  Start */
    if (values.signImgFile !== null) {
      const localDataSignImgFile = new FormData();
      localDataSignImgFile.append("attachFile", values.signImgFile[0]);
      let localDataSignImgFileUrl = bUrl + "signature";

      await Axios.put(
        localDataSignImgFileUrl,
        localDataSignImgFile,
        this.imgUploadconfig
      )
        .then((res) => {
          values.userSignaturesUrl = res.data;
          this.setState({ currentUpload: count });
        })
        .catch((res) => {
          console.log("localDataSignImgFile Error:", res);
        });
    }
    /** localDataSignImgFile  End */
  };

  submitActionUpload = (values) => {
    console.log(JSON.stringify(values, null, 2));
    let cnt = 0;

    if (values.applicationForJobFile !== null) {
      cnt++;
    }
    if (values.appointmentLetterFile !== null) {
      cnt++;
    }
    if (values.bachelorHonoursFile !== null) {
      cnt++;
    }
    if (values.birthCertificateFile !== null) {
      cnt++;
    }
    if (values.caFcaCmaFile !== null) {
      cnt++;
    }
    if (values.diplomaFile !== null) {
      cnt++;
    }
    if (values.employmentFile !== null) {
      cnt++;
    }
    if (values.fieldVerificationFile !== null) {
      cnt++;
    }
    if (values.hscEquivalentFile !== null) {
      cnt++;
    }
    if (values.jobAgreementFile !== null) {
      cnt++;
    }
    if (values.mastersFile !== null) {
      cnt++;
    }

    if (values.nationalityCertificateFile !== null) {
      cnt++;
    }
    if (values.pfCaFcaCmaFile !== null) {
      cnt++;
    }
    if (values.pfImageFile !== null) {
      cnt++;
    }
    if (values.pledgeFile !== null) {
      cnt++;
    }

    if (values.resumeFile !== null) {
      cnt++;
    }
    if (values.securityDeedFile !== null) {
      cnt++;
    }
    if (values.sscEquivalentFile !== null) {
      cnt++;
    }
    if (values.signImgFile !== null) {
      cnt++;
    }

    if (values.nidFile !== null) {
      cnt++;
    }

    console.log("Total File: " + cnt);
    this.setState({ totalAttachFile: cnt });

    this.uploadAllfile(values);
  };

  submitActionSaveData = (values) => {
    values.signImgFile = null;
    values.fieldVerificationFile = null;
    values.nidFile = null;
    values.applicationForJobFile = null;
    values.appointmentLetterFile = null;
    values.bachelorHonoursFile = null;
    values.birthCertificateFile = null;
    values.caFcaCmaFile = null;
    values.diplomaFile = null;
    values.employmentFile = null;
    values.hscEquivalentFile = null;
    values.jobAgreementFile = null;
    values.mastersFile = null;
    values.nationalityCertificateFile = null;
    values.pfCaFcaCmaFile = null;
    values.pfImageFile = null;
    values.pledgeFile = null;
    values.resumeFile = null;
    values.securityDeedFile = null;
    values.sscEquivalentFile = null;

    let sendData = JSON.stringify(values, null, 2);

    console.log("Befor Submit Data to Save", sendData);

    Axios.put(`${baseUrl}/users/user`, sendData, {
      headers: headers,
    })
      .then((res) => {
        this.setState({ redirect: true });
      })
      .catch((res) => {
        console.log("User Save Error: ", res);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/users" />;
    }

    if (
      this.state.countryStatus ||
      this.state.genderStatus ||
      this.state.loadMaritalStatus ||
      this.state.departmentStatus ||
      this.state.designationStatus ||
      this.state.userStatus ||
      this.state.roleStatus ||
      this.state.currentUser.name === undefined
    ) {
      return <LoadingData />;
    }

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add User</h3>
                </div>
                {/* /.card-header */}
                {/* Formik start */}

                <Formik
                  initialValues={this.state.currentUser}
                  onSubmit={(values, actions) => {
                    if (values.isSecondButton) {
                      console.log("2nd Button");
                      this.submitActionUpload(values);
                      values.isSecondButton = false;
                    } else {
                      console.log("Main Submit Button");

                      this.submitActionSaveData(values);
                      console.log("After submitAction Main Submit Button");
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <fieldset className="mp-10">
                              <legend>Personal Info</legend>
                              <div className="row">
                                <div className="col-md-6">
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
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>{" "}
                                    <Select
                                      name="gender"
                                      id="gender"
                                      options={this.state.genders}
                                      defaultValue={
                                        this.state.genders &&
                                        this.state.genders[
                                          props.values.gender > 0
                                            ? props.values.gender
                                            : 0
                                        ] &&
                                        this.state.genders[
                                          props.values.gender > 0
                                            ? props.values.gender
                                            : 0
                                        ]
                                      }
                                      value={this.value}
                                      onChange={(opt, e) => {
                                        props.handleChange.bind(this);
                                        props.setFieldValue(
                                          `gender`,
                                          opt.value
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="fatherName">
                                      Father Name:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="fatherName"
                                      id="fatherName"
                                      placeholder="Father Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="motherName">
                                      Mother Name:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="motherName"
                                      id="motherName"
                                      placeholder="Mother Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="maritalStatus">
                                      Marital Status:
                                    </label>{" "}
                                    <Select
                                      name="maritalStatus"
                                      id="maritalStatus"
                                      options={this.state.maritalStatuses}
                                      defaultValue={
                                        this.state.maritalStatuses &&
                                        this.state.maritalStatuses[
                                          props.values.maritalStatus > 0
                                            ? props.values.maritalStatus
                                            : 0
                                        ] &&
                                        this.state.maritalStatuses[
                                          props.values.maritalStatus > 0
                                            ? props.values.maritalStatus
                                            : 0
                                        ]
                                      }
                                      value={this.value}
                                      onChange={(opt, e) => {
                                        props.handleChange.bind(this);
                                        props.setFieldValue(
                                          `maritalStatus`,
                                          opt.value
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="husbandName">
                                      Husband Name:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="husbandName"
                                      id="husbandName"
                                      placeholder="Husband Name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="personalEmail">
                                      Personal Phone:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="personalPhoneNumber"
                                      id="personalPhoneNumber"
                                      placeholder="Personal Phone No."
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="personalEmail">
                                      Personal Email:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="personalEmail"
                                      id="personalEmail"
                                      placeholder="Personal Email"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="passportNo">
                                      Passport No.:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="passportNo"
                                      id="passportNo"
                                      placeholder="Passport No."
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="nationalIdNo">
                                      National Id No.:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="nationalIdNo"
                                      id="nationalIdNo"
                                      placeholder="NID No."
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="tinNno">TIN No.:</label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="tinNno"
                                      id="tinNno"
                                      placeholder="TIN No."
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="dateOfBirth">
                                      Date Of Birth:
                                    </label>{" "}
                                    <Field
                                      type="date"
                                      className="form-control"
                                      name="dateOfBirth"
                                      id="dateOfBirth"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="aniversaryDate">
                                      Anniversary Date:
                                    </label>{" "}
                                    <Field
                                      type="date"
                                      className="form-control"
                                      name="aniversaryDate"
                                      id="aniversaryDate"
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <fieldset className="mp-10">
                              <legend>Address::</legend>

                              <FieldArray name="userAddresses">
                                {({ push, remove }) => (
                                  <React.Fragment>
                                    {props.values.userAddresses &&
                                      props.values.userAddresses.map(
                                        (addre, indx) => {
                                          return (
                                            <React.Fragment>
                                              <div
                                                className="row"
                                                key="addre.index"
                                              >
                                                <div className="col-md-12">
                                                  <h5>{`${addre.title} : `}</h5>
                                                  <hr />
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="house">
                                                      House:
                                                    </label>{" "}
                                                    <Field
                                                      type="text"
                                                      className="form-control"
                                                      name={`userAddresses[${indx}].house`}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="house">
                                                      Village:
                                                    </label>{" "}
                                                    <Field
                                                      type="text"
                                                      className="form-control"
                                                      name={`userAddresses[${indx}].village`}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="house">
                                                      Street:
                                                    </label>{" "}
                                                    <Field
                                                      type="text"
                                                      className="form-control"
                                                      name={`userAddresses[${indx}].street`}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="house">
                                                      Zip Code:
                                                    </label>{" "}
                                                    <Field
                                                      type="text"
                                                      className="form-control"
                                                      name={`userAddresses[${indx}].zip_code`}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="house">
                                                      City:
                                                    </label>{" "}
                                                    <Field
                                                      type="text"
                                                      className="form-control"
                                                      name={`userAddresses[${indx}].city`}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="form-group">
                                                    <label htmlFor="maritalStatus">
                                                      Country:
                                                    </label>{" "}
                                                    <Select
                                                      name={`userAddresses[${indx}].country`}
                                                      options={
                                                        this.state.countries
                                                      }
                                                      defaultValue={
                                                        this.state.countries &&
                                                        this.state.countries[
                                                          props.values
                                                            .userAddresses[indx]
                                                            .country > 0
                                                            ? props.values
                                                                .userAddresses[
                                                                indx
                                                              ].country
                                                            : 0
                                                        ] &&
                                                        this.state.countries[
                                                          props.values
                                                            .userAddresses[indx]
                                                            .country > 0
                                                            ? props.values
                                                                .userAddresses[
                                                                indx
                                                              ].country
                                                            : 0
                                                        ]
                                                      }
                                                      value={this.value}
                                                      onChange={(opt, e) => {
                                                        props.handleChange.bind(
                                                          this
                                                        );
                                                        props.setFieldValue(
                                                          `userAddresses[${indx}].country`,
                                                          opt.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          );
                                        }
                                      )}
                                  </React.Fragment>
                                )}
                              </FieldArray>

                              <hr />
                            </fieldset>
                          </div>
                          <div className="col-md-6">
                            <fieldset className="mp-10">
                              <legend>Emergency Contact Info</legend>
                              <div className="form-group">
                                <label htmlFor="contactName1"> Name 1 :</label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="contactName1"
                                  id="contactName1"
                                  placeholder="Emergency Contact Name. 1"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="emergencyContactNo1">
                                  Phone No. 1 :
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="emergencyContactNo1"
                                  id="emergencyContactNo1"
                                  placeholder="Emergency Contact No. 1"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="emergencyContactNo2">
                                  {" "}
                                  Name 2 :
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="contactName2"
                                  id="contactName2"
                                  placeholder="Emergency Contact Name. 2 :"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="emergencyContactNo2">
                                  Phone No. 2 :
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="emergencyContactNo2"
                                  id="emergencyContactNo2"
                                  placeholder="Emergency Contact No. 2 :"
                                />
                              </div>
                            </fieldset>
                            <fieldset className="mp-10">
                              <legend>Professional Info</legend>
                              <div className="form-group">
                                <label htmlFor="officialEmail">
                                  Official Email:
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="officialEmail"
                                  id="officialEmail"
                                  placeholder="Official Email"
                                />
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="department">
                                      Department:
                                    </label>{" "}
                                    <Select
                                      name="department"
                                      id="department"
                                      options={this.state.departments}
                                      value={this.value}
                                      defaultValue={
                                        this.state.departments &&
                                        this.state.departments[
                                          props.values.department > 0
                                            ? props.values.department
                                            : 0
                                        ] &&
                                        this.state.departments[
                                          props.values.department > 0
                                            ? props.values.department
                                            : 0
                                        ]
                                      }
                                      onChange={(opt, e) => {
                                        props.handleChange.bind(this);
                                        props.setFieldValue(
                                          `department`,
                                          opt.value
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="designation">
                                      Designation:
                                    </label>{" "}
                                    <Select
                                      name="designation"
                                      id="designation"
                                      options={this.state.departments}
                                      defaultValue={
                                        this.state.departments &&
                                        this.state.departments[
                                          props.values.department > 0
                                            ? props.values.department
                                            : 0
                                        ] &&
                                        this.state.departments[
                                          props.values.department > 0
                                            ? props.values.department
                                            : 0
                                        ]
                                      }
                                      value={this.value}
                                      onChange={(opt, e) => {
                                        props.handleChange.bind(this);
                                        props.setFieldValue(
                                          `designation`,
                                          opt.value
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="role">Role:</label>{" "}
                                    <Select
                                      name="role"
                                      id="role"
                                      options={this.state.roles}
                                      defaultValue={this.state.roles.map(
                                        (cRole, rIndx) => {
                                          console.log(
                                            "Map Role: index",
                                            rIndx,
                                            cRole.value,
                                            cRole.label
                                          );
                                          console.log(
                                            "Both: ",
                                            cRole.id,
                                            props.values.role
                                          );
                                          if (
                                            cRole.value === props.values.role
                                          ) {
                                            console.log(
                                              "Match Role: ",
                                              cRole.label
                                            );
                                            return cRole;
                                          }
                                        }
                                      )}
                                      value={this.value}
                                      onChange={(opt, e) => {
                                        props.handleChange.bind(this);
                                        props.setFieldValue(`role`, opt.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="joiningDate">
                                      Joining Date:
                                    </label>{" "}
                                    <TextField
                                      type="date"
                                      defaultValue={`${this.getDateLocal(
                                        props.values.joiningDate
                                      )}`}
                                      className="form-control"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      id={`joiningDate`}
                                      onChange={props.handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="salary">Salary:</label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="salary"
                                      id="salary"
                                      placeholder="Salary"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="mobileAllowance">
                                      Mobile Allowance:
                                    </label>{" "}
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="mobileAllowance"
                                      id="mobileAllowance"
                                      placeholder="Mobile Allowance"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="officeLocation">
                                  Office Location:
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="officeLocation"
                                  id="officeLocation"
                                  placeholder="Office Location"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="officialPhoneNumber">
                                  Official Phone Number:
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="officialPhoneNumber"
                                  id="officialPhoneNumber"
                                  placeholder="Official Phone Number"
                                />
                              </div>
                            </fieldset>

                            <fieldset className="mp-10">
                              <legend>Bank Info:</legend>
                              <div className="form-group">
                                <label htmlFor="bankName">Bank Name:</label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="bankName"
                                  id="bankName"
                                  placeholder="Bank Name"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="accountName">
                                  Account Name:
                                </label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="accountName"
                                  id="accountName"
                                  placeholder="Account Name"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="accountNo">Account No.:</label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="accountNo"
                                  id="accountNo"
                                  placeholder="Account No."
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="branchName">Branch Name:</label>{" "}
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="branchName"
                                  id="branchName"
                                  placeholder="Branch Name"
                                />
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        {/* Form 1st row End */}
                        {/* Form 2nd row Start */}
                        <div className="row">
                          <div className="col-md-12">
                            <fieldset>
                              <legend>Attach file</legend>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="pfImageFile">
                                        Choose Profile Image:
                                      </label>{" "}
                                      <Dropzone
                                        maxFiles={1}
                                        multiple={false}
                                        fileName="pfImageFile"
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(`pfImageFile`, e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles &&
                                                    acceptedFiles.map(
                                                      (file) => (
                                                        <li key={file.path}>
                                                          {file.path} -{" "}
                                                          {file.size} bytes
                                                        </li>
                                                      )
                                                    )}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.profileIimage && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.profileIimage}`}
                                          >
                                            Profile Image
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="signImgFile">
                                        Choose User Signatures:
                                      </label>

                                      <Dropzone
                                        fileName="signImgFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("signImgFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>

                                      {props.values.userSignaturesUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.userSignaturesUrl}`}
                                          >
                                            Signature
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="resumeFile">
                                        Choose Resume:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="resumeFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("resumeFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.resumeUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.resumeUrl}`}
                                          >
                                            Resume
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="pledgeFile">
                                        Choose Pledge:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="pledgeFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("pledgeFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.pledgeUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.pledgeUrl}`}
                                          >
                                            Pledge
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="applicationForJobFile">
                                        Choose Application For Job:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="applicationForJobFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "applicationForJobFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.applicationForJobUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.applicationForJobUrl}`}
                                          >
                                            Application For Job File
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="nidFile">
                                        Choose NID:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="nidFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("nidFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.nidUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.nidUrl}`}
                                          >
                                            NID
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="birthCertificateFile">
                                        Choose Birth Certificate:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="birthCertificateFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "birthCertificateFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.birthCertificateUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.birthCertificateUrl}`}
                                          >
                                            Birth Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="sscEquivalentFile">
                                        Choose SSC/O LEVEL/DAKHIL/VOCATIONAL:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="sscEquivalentFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "sscEquivalentFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.sscEquivalentUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.sscEquivalentUrl}`}
                                          >
                                            SSC Equivalent Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="hscEquivalentFile">
                                        Choose HSC/A LEVEL/ ALIM/ HSC
                                        VOCATIONAL:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="hscEquivalentFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "hscEquivalentFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.hscEquivalentUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.hscEquivalentUrl}`}
                                          >
                                            HSC Equivalent Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="diplomaFile">
                                        Choose DIPLOMA:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="diplomaFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("diplomaFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.diplomaUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.diplomaUrl}`}
                                          >
                                            Diploma Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="bachelorHonoursFile">
                                        Choose BACHELOR/HONOURS:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="bachelorHonoursFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "bachelorHonoursFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.bachelorHonoursUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.bachelorHonoursUrl}`}
                                          >
                                            Bachelor, Honours Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="mastersFile">
                                        Choose MASTERS/MBA:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="mastersFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue("mastersFile", e);
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.mastersUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.mastersUrl}`}
                                          >
                                            Masters/MBA Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="caFcaCmaFile">
                                        Choose CA/FCA/CMA:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="caFcaCmaFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "caFcaCmaFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.caFcaCmaUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.caFcaCmaUrl}`}
                                          >
                                            CA/FCA/CMA Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="pfCaFcaCmaFile">
                                        Choose Professional CA/FCA/CMA:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="pfCaFcaCmaFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "pfCaFcaCmaFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.pfCaFcaCmaUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.pfCaFcaCmaUrl}`}
                                          >
                                            PF: CA/FCA/CMA Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="employmentFile">
                                        Choose Employment:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="employmentFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "employmentFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.employmentUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.employmentUrl}`}
                                          >
                                            Employment Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="nationalityCertificateFile">
                                        Choose Nationality Certificate:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="nationalityCertificateFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "nationalityCertificateFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values
                                        .nationalityCertificateUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.nationalityCertificateUrl}`}
                                          >
                                            Nationality Certificate
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="securityDeedFile">
                                        Choose Security Deed:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="securityDeedFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "securityDeedFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.securityDeedUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.securityDeedUrl}`}
                                          >
                                            Security Deed
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="appointmentLetterFile">
                                        Choose Appointment Letter:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="appointmentLetterFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "appointmentLetterFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.appointmentLetterUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.appointmentLetterUrl}`}
                                          >
                                            Appointment Letter
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row image-area">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="jobAgreementFile">
                                        Choose Job Agreement:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="jobAgreementFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "jobAgreementFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.jobAgreementUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.jobAgreementUrl}`}
                                          >
                                            Job Agreement
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="fieldVerificationFile">
                                        Choose Field Verification:
                                      </label>{" "}
                                      <Dropzone
                                        fileName="fieldVerificationFile"
                                        maxFiles={1}
                                        multiple={false}
                                        onDropAccepted={(e) => {
                                          props.setFieldValue(
                                            "fieldVerificationFile",
                                            e
                                          );
                                        }}
                                        onDrop={(acceptedFiles) =>
                                          console.log(acceptedFiles)
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                          acceptedFiles,
                                        }) => (
                                          <section>
                                            <div className="container">
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <input
                                                  className="input-area"
                                                  {...getInputProps()}
                                                />
                                                <a
                                                  className="upload-area"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                                </a>
                                              </div>
                                              <aside>
                                                <ul className="file_label">
                                                  {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                      {file.path} - {file.size}{" "}
                                                      bytes
                                                    </li>
                                                  ))}
                                                </ul>
                                              </aside>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                      {props.values.fieldVerificationUrl && (
                                        <label>
                                          Download:{" "}
                                          <a
                                            href={`${baseUrl}${props.values.fieldVerificationUrl}`}
                                          >
                                            Field Verification
                                          </a>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>

                            <div className="row mp10">
                              <div className="col-md-2">
                                <button
                                  className="btn btn-block btn-outline-success btn-sm"
                                  type="submit"
                                  id="second-button"
                                  onClick={(e) => {
                                    props.setFieldValue("isSecondButton", true);
                                    props.handleSubmit(e);
                                  }}
                                >
                                  Upload Images
                                </button>
                              </div>
                            </div>

                            <div className="col-md-12 p10">
                              <ProgressBar
                                animated
                                variant="success"
                                now={this.state.uploadProgress}
                                label={`${this.state.uploadProgress}% ${this.state.currentUpload} / ${this.state.totalAttachFile}`}
                              />
                            </div>
                          </div>
                        </div>
                        {/*  form 2nd row end */}
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-md-2 offset-md-5">
                            <button
                              type="submit"
                              className="btn btn-block btn-outline-primary btn-sm"
                            >
                              <span>
                                {" "}
                                <i className="fas fa-save" />
                              </span>{" "}
                              <span className="text">Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/** Formik End */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditUser;
