import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import Dropzone from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { REQUEST_HEADER, BASE_URL } from "../../actions/types";

let headers = REQUEST_HEADER;

const genderList = [{ value: 0, label: "None" }];
const departmentList = [{ value: 0, label: "None" }];
const designationList = [{ value: 0, label: "None" }];
const roleList = [{ value: 0, label: "None" }];
const maritalStatusList = [{ value: 0, label: "None" }];
const countryList = [{ value: 0, label: "None" }];
let count = 1;

class AddUser extends Component {
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
  };
  //this.setState({ totalAttachFile: this.state.totalAttachFile + 1 });

  componentDidMount() {
    this.loadCountries();
    this.loadDesignations();
    this.loadDepartmets();
    this.loadRoles();
    this.loadMaritalStatuses();
    this.loadGender();
  }

  loadCountries = async () => {
    console.log("Run Country User");

    await Axios.get(`${BASE_URL}/countries`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((country) => {
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
  };

  loadDepartmets = async () => {
    await Axios.get(`${BASE_URL}/departments`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((department) => {
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
  };

  loadDesignations = async () => {
    await Axios.get(`${BASE_URL}/designations`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((designation) => {
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
  };

  loadGender = async () => {
    await Axios.get(`${BASE_URL}/genders`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((gender) => {
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
  };

  loadMaritalStatuses = async () => {
    await Axios.get(`${BASE_URL}/marital-status`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((maritalStatus) => {
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
  };

  loadRoles = async () => {
    await Axios.get(`${BASE_URL}/roles`, { headers: REQUEST_HEADER })
      .then((res) => {
        res.data.forEach((role) => {
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
      console.log(percentCompleted, " % File No: ", count);
    },
    headers: REQUEST_HEADER,
  };

  uploadAllfile = async (values) => {
    count = 0;
    const bUrl = `${BASE_URL}/uploadfile/user-file/`;

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

    Axios.post(`${BASE_URL}/users/user`, sendData, {
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
                  initialValues={{
                    index: 0,
                    name: "",
                    fatherName: "",
                    motherName: "",
                    husbandName: "",
                    officialEmail: "",
                    personalEmail: "",
                    gender: 0,
                    nationalIdNo: "",
                    tinNno: "",
                    dateOfBirth: "",
                    joiningDate: "",
                    emergencyContactNo1: "",
                    emergencyContactNo2: "",
                    maritalStatus: 0,
                    aniversaryDate: "",
                    salary: 0.0,
                    mobileAllowance: 0.0,
                    role: 0,
                    officeLocation: "",
                    designation: 0,
                    department: 0,
                    officialPhoneNumber: "",
                    personalPhoneNumber: "",
                    profileIimage: "",
                    bankName: "",
                    accountName: "",
                    accountNo: "",
                    branchName: "",
                    userSignaturesUrl: "",
                    resumeUrl: "",
                    pledgeUrl: "",
                    applicationForJobUrl: "",
                    nidUrl: "",
                    birthCertificateUrl: "",
                    sscEquivalentUrl: "",
                    hscEquivalentUrl: "",
                    bachelorHonoursUrl: "",
                    mastersUrl: "",
                    caFcaCmaUrl: "",
                    pfCaFcaCmaUrl: "",
                    diplomaUrl: "",
                    employmentUrl: "",
                    nationalityCertificateUrl: "",
                    jobAgreementUrl: "",
                    securityDeedUrl: "",
                    appointmentLetterUrl: "",
                    fieldVerificationUrl: "",
                    authenticationStatus: true,
                    userAddresses: [
                      {
                        id: 0,
                        index: 0,
                        title: "Present Address",
                        house: "",
                        village: "",
                        street: "",
                        zip_code: "",
                        city: "",
                        country: 0,
                        code_name: "",
                      },

                      {
                        id: 0,
                        index: 0,
                        title: "Permanent Address",
                        house: "",
                        village: "",
                        street: "",
                        zip_code: "",
                        city: "",
                        country: 0,
                        code_name: "",
                      },
                    ],
                    passportNo: "",
                    contactName1: "",
                    contactName2: "",
                    pfImageFile: null,
                    signImgFile: null,
                    resumeFile: null,
                    pledgeFile: null,
                    applicationForJobFile: null,
                    nidFile: null,
                    sscEquivalentFile: null,
                    hscEquivalentFile: null,
                    bachelorHonoursFile: null,
                    mastersFile: null,
                    birthCertificateFile: null,
                    caFcaCmaFile: null,
                    pfCaFcaCmaFile: null,
                    diplomaFile: null,
                    employmentFile: null,
                    nationalityCertificateFile: null,
                    jobAgreementFile: null,
                    securityDeedFile: null,
                    appointmentLetterFile: null,
                    fieldVerificationFile: null,
                  }}
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
                                    {props.values.userAddresses.map(
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
                                    <Field
                                      type="date"
                                      className="form-control"
                                      name="joiningDate"
                                      id="joiningDate"
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
                              <div className="row">
                                <div className="col-md-8">
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
                                </div>
                                <div className="col-md-4 pading-top-25">
                                  <FormControl component="fieldset">
                                    <FormControlLabel
                                      name="authenticationStatus"
                                      defaultValue={
                                        props.values.authenticationStatus
                                      }
                                      checked={
                                        props.values.authenticationStatus
                                      }
                                      control={<Checkbox color="primary" />}
                                      onChange={props.handleChange}
                                      label="Non-Management"
                                      labelPlacement="start"
                                    />
                                  </FormControl>
                                </div>
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
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <label htmlFor="pfCaFcaCmaFile">
                                        Choose CA/FCA/CMA:
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

export default AddUser;
