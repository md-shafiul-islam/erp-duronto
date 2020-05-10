import React, { Component, createRef } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import Select from "react-select";
import Dropzone from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import Axios from "axios";

import UsoitCKEditor from "../../UsoitCKEditor";

const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
};

let categories = [{ value: 0, Lebel: "None" }];
let packCats = [{ value: 0, Lebel: "None" }];
let countries = [{ value: 0, Lebel: "None" }];
let vendorsGlobal = [{ value: 0, Lebel: "None" }];
let durationGlobal = [{ value: 0, Lebel: "None" }];

let dataLoad = false;

let headers = {
  "Content-Type": "application/json",
};
/*"Access-Control-Allow-Origin": "*",*/

class AddPackageData extends Component {
  state = {
    loadingAllData: true,
    countryesList: [{ value: 0, label: "None" }],
    packList: [{ value: 0, label: "None" }],
    catList: [{ value: 0, label: "None" }],
    vendorList: [{ value: 0, label: "None" }],
    uploadImageG: false,
    imagesSet: false,
    uploadProgressGallery: 0,
    uploadProgressScTwo: 0,
    uploadProgressScOne: 0,
    totalGaleryImage: 0,
    uploadedImage: 0,
    loadVendor: false,
    vendorId: 0,
    allVendor: null,
    durationList: [{ value: 0, label: "None" }],
  };
  async componentDidMount() {
    //Load Countries Start
    await Axios.get("http://localhost:8085/api/countries")
      .then((res) => {
        console.log("Success Get All Countries !! Axios Add Pack");
        console.log(res.data);
        res.data.map((count) => {
          console.log("From Axios: id. " + count.id + " Name: " + count.name);

          countries.push({ value: count.id, label: count.name });

          console.log(countries.length);
        });
      })
      .catch((response) => {
        console.log("Error: Loadin Countries !!");
        console.log(response);
      });
    //Load Countries End

    //Load Vendor Start
    await Axios.get("http://localhost:8085/api/vendors")
      .then((res) => {
        console.log("Success Get All Vendors Axios Add Pack");

        console.log(res.data);
        console.log("All Inf: ");

        this.setState({ allVendor: res.data });
        res.data.map((vendor) => {
          console.log(
            "Pack Category ID: " +
              vendor.id +
              " C Name: " +
              vendor.companyName +
              " Person Name: " +
              vendor.name
          );
          vendorsGlobal.push({
            value: vendor.id,
            label: `${vendor.vGenId} Person Name: ${vendor.companyName}`,
          });
        });
      })
      .catch((res) => {
        console.log("Error Get All Vendor!!");
        console.log(res.data);
      });
    //Load Vendor End

    //Load Packages-categories Start
    await Axios.get("http://localhost:8085/api/package-categories")
      .then((res) => {
        console.log("Success Get All Package Categories!! Axios Add Pack");
        res.data.map((pack) => {
          console.log("Pack Category ID: " + pack.id + " Name: " + pack.name);
          packCats.push({ value: pack.id, label: pack.name });
        });
      })
      .catch((res) => {
        console.log("Error Get All Package Categories!!");
        console.log(res.data);
      });
    //Load Packages-categories Start

    //Load Packages-categories Start
    await Axios.get("http://localhost:8085/api/categories")
      .then((res) => {
        console.log("Success Get All Categories!! Axios Add Pack");
        res.data.map((cat) => {
          console.log("Pack Category ID: " + cat.id + " Name: " + cat.name);
          categories.push({ value: cat.id, label: cat.name });
        });
      })
      .catch((res) => {
        console.log("Error Get All Categories!!");
        console.log(res.data);
      });
    //Load Packages-categories Start

    //Load Countries Start
    await Axios.get("http://localhost:8085/api/durations")
      .then((res) => {
        console.log("Success Get All Countries !! Axios Add Pack");
        console.log(res.data);
        res.data.map((duration) => {
          console.log(
            "From Axios Duration: id. " +
              duration.id +
              " Name: " +
              duration.name
          );

          durationGlobal.push({ value: duration.id, label: duration.name });

          console.log(durationGlobal.length);
        });
      })
      .catch((response) => {
        console.log("Error: Loadin Countries !!");
        console.log(response);
      });
    //Load Countries End

    console.log("After All data Load: ");

    console.log("Country Size: " + countries.length);
    console.log("Categories Size: " + categories.length);
    console.log("Pack Cats Size: " + packCats.length);

    this.setState({ catList: categories });
    this.setState({ countryesList: countries });
    this.setState({ packList: packCats });
    this.setState({ vendorList: vendorsGlobal });
    this.setState({ durationList: durationGlobal });
    this.setState({ loadingAllData: false });

    console.log("Cat Size: " + this.state.catList.length);
  }

  submitAction = (values) => {
    if (values != null) {
      console.log("Befor Submit Form: ");
      console.log(values);
      this.submitData(values);
    } else {
      console.log("Values Have No Data!!");
    }
  };

  uploadFile = async (values) => {
    console.log(values);

    const imgUploadconfigOne = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        console.log(" Befor");
        console.log(percentCompleted + "%");
        this.setState({ uploadProgressScOne: percentCompleted });
      },
    };

    const imgUploadconfigTwo = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        console.log(" Befor");
        console.log(percentCompleted + "%");
        this.setState({ uploadProgressScTwo: percentCompleted });
      },
    };

    const imgUploadconfigGallery = {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        console.log(" Befor");
        console.log(percentCompleted + "%");
        this.setState({ uploadProgressGallery: percentCompleted });
      },
    };

    console.log("itarnarys");
    await values.itarnarys.map(async (item) => {
      console.log(item.file[0]);
      console.log(item.fil2[0]);

      const srcFileOne = new FormData();
      srcFileOne.append("scFileOne", item.file[0]);

      const srcFileTwo = new FormData();
      srcFileTwo.append("scFileTwo", item.file[0]);
      let imgOneUrl = "";
      let imgTwoUrl = "";
      await Axios.put(
        "http://localhost:8085/api/uploadfile/source-one",
        srcFileOne,
        imgUploadconfigOne
      )
        .then((res) => {
          console.log("Success !! File One");
          console.log(res.data);
          imgOneUrl = res.data;
          return;
        })
        .catch((res) => {
          console.log("Error !! File One");
          console.log(res.data);
          return;
        });

      await Axios.put(
        "http://localhost:8085/api/uploadfile/source-two",
        srcFileTwo,
        imgUploadconfigTwo
      )
        .then((res) => {
          console.log("Success !! File Two");
          console.log(res.data);
          imgTwoUrl = res.data;
          return;
        })
        .catch((res) => {
          console.log("Error !! File Two");
          console.log(res.data);
          return;
        });

      item.file = null;
      item.fil2 = null;
      console.log("Image Urls: One: " + imgOneUrl + " Two: " + imgTwoUrl);
      item.sourceUrl = imgOneUrl;
      item.sourceUrl2 = imgTwoUrl;
      this.setState({ imagesSet: true });
      console.log("Status Image URL imagesSet: " + this.state.imagesSet);
    });

    console.log("Befor Gallery Image Upload!!");

    let imageSize = values.imageGalleries.length;
    this.setState({ totalGaleryImage: imageSize });
    await values.imageGalleries.map(async (image, idx) => {
      this.setState({ uploadedImage: idx + 1 });
      console.log(image.img_file[0]);
      const imageFile = new FormData();
      imageFile.append("imageFile", image.img_file[0]);
      if (imageSize == idx + 1) {
        console.log("Last Image");
        this.setState({ uploadProgressGallery: 100 });
      } else {
        console.log("Image Have");
        this.setState({ uploadProgressGallery: 0 });
        console.log("Current Status: " + this.state.uploadProgressGallery);
      }

      let imgUrlGallery = "";
      await Axios.put(
        "http://localhost:8085/api/uploadfile/image-gallery",
        imageFile,
        imgUploadconfigGallery
      )
        .then((res) => {
          console.log("Success !! Image");
          console.log(res.data);
          imgUrlGallery = res.data;
        })
        .catch((res) => {
          console.log("Error !! Image");
          console.log(res.data);
        });
      image.img_file = null;
      console.log("imgUrlGallery :" + imgUrlGallery);
      image.srcUrl = imgUrlGallery;

      this.setState({ uploadImageG: true });

      console.log("Status Image URL G: " + this.state.uploadImageG);
    });

    console.log("Afetr All Work");
  };

  submitData(values) {
    console.log("befor send IF Set Image");

    if (this.state.imagesSet && this.state.uploadImageG) {
      console.log("befor send IF Pass!!");
      let dataVal = JSON.stringify(values, null, 2);
      console.log("befor send Data: " + dataVal);

      Axios.post(
        "http://localhost:8085/api/packages/package",
        JSON.stringify(values, null, 2),
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log("Send Success!! Package Add");
          console.log(res.data);
        })
        .catch((res) => {
          console.log("Error send Pckage!!");
          console.log(res.data);
        });
    }
  }

  handleCountryChange(e) {
    console.log("Country Chanege Fire");

    console.log(e);
  }

  handleChangeImage = (e) => {
    console.log("Run Handeler Change Image");
    console.log(e);
  };

  handleState(opt) {
    console.log("handel State: ");
    console.log(opt);
  }

  onFocusHandeller(props) {
    console.log("on Focus Run");
    console.log(props);
  }

  imageHandeller = (param, filedName, e) => {
    console.log(param);

    console.log("Field Name: ");
    console.log(filedName);

    console.log("Event ");

    console.log(e);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loadingAllData ? (
          <React.Fragment>
            <div>Loading Data...</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12" style={{ margin: "10px auto" }}>
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Add Package</h3>
                    </div>

                    <Formik
                      initialValues={{
                        isSecondButton: false,
                        name: "",
                        code: "",

                        packIncludedText: "",
                        packExcludedText: "",
                        packHightlightText: "",
                        packageCat: 0,
                        duration: 0,

                        itarnarys: [
                          {
                            index: Math.random(),

                            hotel: "",
                            itn_country: 0,
                            city: "",

                            dayOrDurations: 0,
                            vendor: 0,
                            heading: "",
                            description: "",
                            hightLightText: "",
                            hotelText: "",
                            includedText: "",
                            excludedText: "",
                            category: 0,
                            file: [],
                            fil2: [],
                            expDate: "",
                            sourceUrl: "",
                            sourceUrl2: "",
                          },
                        ],
                        imageGalleries: [
                          {
                            index: Math.random(),
                            img_name: "",
                            altTag: "",
                            location: "",
                            img_file: [],
                            srcUrl: "",
                          },
                        ],

                        taxVat: 0.0,
                        highlight: false,
                        price: 0.0,
                        videoUrl: "",
                        countries: [
                          {
                            index: Math.random(),
                            id: 0,
                          },
                        ],
                      }}
                      onSubmit={(values, actions) => {
                        if (values.isSecondButton) {
                          console.log("2nd Button");
                          this.uploadFile(values);
                          values.isSecondButton = false;
                        } else {
                          console.log("Main Submit Button");

                          this.submitAction(values);
                          console.log("After submitAction Main Submit Button");
                        }

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
                              <div className="col-md-12">
                                <fieldset>
                                  <legend>Package Info</legend>

                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <Field
                                          className="form-control"
                                          type="text"
                                          name="name"
                                          placeholder="Name..."
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="code">Code:</label>
                                        <Field
                                          type="text"
                                          name="code"
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="packageCat">
                                          Package category:
                                        </label>

                                        <Select
                                          name="packageCat"
                                          id="packageCat"
                                          options={this.state.packList}
                                          value={this.value}
                                          onChange={(opt, e) => {
                                            props.handleChange.bind(this);
                                            props.setFieldValue(
                                              `packageCat`,
                                              opt.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="duration">
                                          Package Duration:
                                        </label>

                                        <Select
                                          name="duration"
                                          id="duration"
                                          options={this.state.durationList}
                                          value={this.value}
                                          onChange={(opt, e) => {
                                            props.handleChange.bind(this);
                                            props.setFieldValue(
                                              `duration`,
                                              opt.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/** Package Info */}

                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <Field
                                          type="text"
                                          name="price"
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <FieldArray name="countries">
                                      {({ push, remove }) => (
                                        <React.Fragment>
                                          {props.values.countries.map(
                                            (cont, indx) => {
                                              return (
                                                <React.Fragment>
                                                  <div
                                                    className="col-md-3"
                                                    key={cont.index}
                                                  >
                                                    <div className="form-group">
                                                      <label htmlFor="country">
                                                        Country:
                                                      </label>
                                                      <Select
                                                        name={`countries[${indx}].id`}
                                                        id={`countries[${indx}].id`}
                                                        options={
                                                          this.state
                                                            .countryesList
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
                                                  <div className="col-md-1 n-content">
                                                    {indx === 0 ? (
                                                      <span></span>
                                                    ) : (
                                                      <a
                                                        href="javascript:void(0);"
                                                        onClick={() =>
                                                          remove(indx)
                                                        }
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
                                                index: Math.random(),
                                                id: 0,
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

                                {/** Itn Start */}

                                <div className="row pading-top">
                                  <div className="col-12">
                                    <div className="card">
                                      <div className="card-header">
                                        <h3 className="card-title">
                                          Itinerary:
                                        </h3>
                                      </div>
                                      {/* /.card-header */}
                                      <FieldArray name="itarnarys">
                                        {({ push, remove }) => (
                                          <React.Fragment>
                                            {/* Item loop set here */}

                                            {props.values.itarnarys.map(
                                              (item, inx) => {
                                                console.log(
                                                  "Item Loop !! After Upload!!"
                                                );
                                                console.log(item.index);
                                                return (
                                                  <React.Fragment>
                                                    <div
                                                      className="card-body"
                                                      key={item.index}
                                                    >
                                                      <div className="row pading-top">
                                                        <div className="col-md-12">
                                                          <fieldset>
                                                            <legend className="area-outlin">
                                                              Day: {inx + 1}
                                                            </legend>
                                                            <input
                                                              type="hidden"
                                                              name={`itarnarys[${inx}].dayOrDurations`}
                                                              id={`itarnarys[${inx}].dayOrDurations`}
                                                              value={inx + 1}
                                                            />
                                                            <div className="row">
                                                              <div className="col-md-12">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Heading:
                                                                  </label>
                                                                  <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name={`itarnarys[${inx}].heading`}
                                                                    id={`itarnarys[${inx}].heading`}
                                                                    value={
                                                                      item.heading
                                                                    }
                                                                    onChange={
                                                                      props.handleChange
                                                                    }
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="col-md-12">
                                                                <div className="form-group">
                                                                  <label>
                                                                    HightLight:
                                                                  </label>

                                                                  <UsoitCKEditor
                                                                    onChange={(
                                                                      e,
                                                                      editor
                                                                    ) => {
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].hightLightText`,
                                                                        editor.getData()
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="row">
                                                              <div className="col-md-12">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Description
                                                                  </label>

                                                                  <UsoitCKEditor
                                                                    onChange={(
                                                                      e,
                                                                      editor
                                                                    ) => {
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].description`,
                                                                        editor.getData()
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="row">
                                                              <div className="col-md-12">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Included:
                                                                  </label>

                                                                  <UsoitCKEditor
                                                                    onChange={(
                                                                      e,
                                                                      editor
                                                                    ) => {
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].includedText`,
                                                                        editor.getData()
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="col-md-12">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Excluded:
                                                                  </label>

                                                                  <UsoitCKEditor
                                                                    onChange={(
                                                                      e,
                                                                      editor
                                                                    ) => {
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].excludedText`,
                                                                        editor.getData()
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="row">
                                                              <div className="col-md-6">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Hotel
                                                                    Category:
                                                                  </label>
                                                                  <Select
                                                                    isSearchable={
                                                                      true
                                                                    }
                                                                    isClearable={
                                                                      false
                                                                    }
                                                                    name={`itarnarys[${inx}].category`}
                                                                    id={`itarnarys[${inx}].category`}
                                                                    value={
                                                                      this.value
                                                                    }
                                                                    options={
                                                                      this.state
                                                                        .catList
                                                                    }
                                                                    onChange={(
                                                                      opt,
                                                                      e
                                                                    ) => {
                                                                      props.handleChange.bind(
                                                                        this
                                                                      );
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].category`,
                                                                        opt.value
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>

                                                              <div className="col-md-6">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Hotel Name:
                                                                  </label>
                                                                  <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name={`itarnarys[${inx}].hotel`}
                                                                    id={`itarnarys[${inx}].hotel`}
                                                                    value={
                                                                      item.hotel
                                                                    }
                                                                    onChange={
                                                                      props.handleChange
                                                                    }
                                                                    placeholder="Hotel Name Or Title"
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>

                                                            <div className="row">
                                                              <div className="col-md-6">
                                                                <div className="form-group">
                                                                  <label>
                                                                    Country:
                                                                  </label>

                                                                  <Select
                                                                    isSearchable={
                                                                      true
                                                                    }
                                                                    isClearable={
                                                                      false
                                                                    }
                                                                    options={
                                                                      this.state
                                                                        .countryesList
                                                                    }
                                                                    name={`itarnarys[${inx}].itn_country`}
                                                                    id={`itarnarys[${inx}].itn_country`}
                                                                    value={
                                                                      this.value
                                                                    }
                                                                    onChange={(
                                                                      opt,
                                                                      e
                                                                    ) => {
                                                                      props.handleChange.bind(
                                                                        this
                                                                      );
                                                                      props.setFieldValue(
                                                                        `itarnarys[${inx}].itn_country`,
                                                                        opt.value
                                                                      );
                                                                    }}
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <div className="form-group">
                                                                  <label>
                                                                    City:
                                                                  </label>
                                                                  <Field
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="City"
                                                                    name={`itarnarys[${inx}].city`}
                                                                    id={`itarnarys[${inx}].city`}
                                                                    value={
                                                                      item.city
                                                                    }
                                                                    onChange={
                                                                      props.handleChange
                                                                    }
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>

                                                            <fieldset className="mp-10">
                                                              <legend className="area-outlin">
                                                                Source Info
                                                              </legend>
                                                              <div className="row">
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      Vendor:
                                                                    </label>{" "}
                                                                    <Select
                                                                      isClearable={
                                                                        false
                                                                      }
                                                                      isSearchable={
                                                                        true
                                                                      }
                                                                      options={
                                                                        this
                                                                          .state
                                                                          .vendorList
                                                                      }
                                                                      name={`itarnarys[${inx}].vendor`}
                                                                      id={`itarnarys[${inx}].vendor`}
                                                                      value={
                                                                        this
                                                                          .value
                                                                      }
                                                                      onChange={(
                                                                        opt,
                                                                        e
                                                                      ) => {
                                                                        props.handleChange.bind(
                                                                          this
                                                                        );
                                                                        this.setState(
                                                                          {
                                                                            loadVendor: true,
                                                                            vendorId:
                                                                              opt.value,
                                                                          }
                                                                        );
                                                                        props.setFieldValue(
                                                                          `itarnarys[${inx}].vendor`,
                                                                          opt.value
                                                                        );
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      Exp Date:
                                                                    </label>
                                                                    <Field
                                                                      className="form-control"
                                                                      type="date"
                                                                      placeholder="Exp Date"
                                                                      name={`itarnarys[${inx}].expDate`}
                                                                      id={`itarnarys[${inx}].expDate`}
                                                                      value={
                                                                        item.expDate
                                                                      }
                                                                      onChange={
                                                                        props.handleChange
                                                                      }
                                                                    />
                                                                  </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      Source
                                                                      File:
                                                                    </label>{" "}
                                                                    <Dropzone
                                                                      fileName={`itarnarys[${inx}].file`}
                                                                      onDropAccepted={(
                                                                        e
                                                                      ) => {
                                                                        props.setFieldValue(
                                                                          `itarnarys[${inx}].file`,
                                                                          e
                                                                        );
                                                                        this.imageHandeller(
                                                                          props,
                                                                          `itarnarys[${inx}].file`,
                                                                          e.value
                                                                        );
                                                                      }}
                                                                      onDrop={(
                                                                        acceptedFiles
                                                                      ) =>
                                                                        console.log(
                                                                          acceptedFiles
                                                                        )
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
                                                                              {...getRootProps(
                                                                                {
                                                                                  className:
                                                                                    "dropzone",
                                                                                }
                                                                              )}
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
                                                                                {acceptedFiles.map(
                                                                                  (
                                                                                    file
                                                                                  ) => (
                                                                                    <li
                                                                                      key={
                                                                                        file.path
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        file.path
                                                                                      }{" "}
                                                                                      -{" "}
                                                                                      {
                                                                                        file.size
                                                                                      }{" "}
                                                                                      bytes
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
                                                                <div className="col-md-6">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      Source
                                                                      File:
                                                                    </label>

                                                                    <Dropzone
                                                                      fileName={`itarnarys[${inx}].fil2`}
                                                                      onDropAccepted={(
                                                                        e
                                                                      ) => {
                                                                        props.setFieldValue(
                                                                          `itarnarys[${inx}].fil2`,
                                                                          e
                                                                        );
                                                                      }}
                                                                      onDrop={(
                                                                        acceptedFiles
                                                                      ) =>
                                                                        console.log(
                                                                          acceptedFiles
                                                                        )
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
                                                                              {...getRootProps(
                                                                                {
                                                                                  className:
                                                                                    "dropzone",
                                                                                }
                                                                              )}
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
                                                                                {acceptedFiles.map(
                                                                                  (
                                                                                    file
                                                                                  ) => (
                                                                                    <li
                                                                                      key={
                                                                                        file.path
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        file.path
                                                                                      }{" "}
                                                                                      -{" "}
                                                                                      {
                                                                                        file.size
                                                                                      }{" "}
                                                                                      bytes
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
                                                              <div
                                                                className="row"
                                                                id="jsonLoadVendor"
                                                              >
                                                                {/* Json data load here */}

                                                                {this.state
                                                                  .allVendor !=
                                                                  null &&
                                                                this.state
                                                                  .vendorId >
                                                                  0 ? (
                                                                  <React.Fragment>
                                                                    {this.state.allVendor.map(
                                                                      (
                                                                        vend,
                                                                        idx
                                                                      ) => {
                                                                        return (
                                                                          <React.Fragment>
                                                                            {vend.id ==
                                                                            this
                                                                              .state
                                                                              .vendorId ? (
                                                                              <React.Fragment>
                                                                                <div
                                                                                  className="row"
                                                                                  key={
                                                                                    idx
                                                                                  }
                                                                                >
                                                                                  <div className="row mp10">
                                                                                    {" "}
                                                                                    <h2>
                                                                                      {" "}
                                                                                      Vendor
                                                                                      Info
                                                                                    </h2>
                                                                                    <div className="col-md-12">
                                                                                      {" "}
                                                                                      <label className="inf-label">
                                                                                        Vendor
                                                                                        Id:
                                                                                        {
                                                                                          vend.vGenId
                                                                                        }
                                                                                      </label>
                                                                                      <label className="inf-label">
                                                                                        Company
                                                                                        Name:
                                                                                        {` ${vend.companyName}`}
                                                                                      </label>
                                                                                    </div>
                                                                                  </div>
                                                                                  <div className="row mp10">
                                                                                    {vend.contactPersons.map(
                                                                                      (
                                                                                        person,
                                                                                        ind
                                                                                      ) => {
                                                                                        return (
                                                                                          <div
                                                                                            className="col-md-6"
                                                                                            key={
                                                                                              ind
                                                                                            }
                                                                                          >
                                                                                            <h3>
                                                                                              {" "}
                                                                                              Person
                                                                                              Information:
                                                                                              {` ${
                                                                                                ind +
                                                                                                1
                                                                                              }`}
                                                                                            </h3>
                                                                                            <label className="inf-label">
                                                                                              Name:
                                                                                              {` ${person.name}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Phone
                                                                                              No.
                                                                                              1:
                                                                                              {` ${person.phoneNo}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Phone
                                                                                              No.
                                                                                              2:
                                                                                              {` ${person.phoneNo2}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Email:
                                                                                              {` ${person.email}`}
                                                                                            </label>
                                                                                          </div>
                                                                                        );
                                                                                      }
                                                                                    )}
                                                                                  </div>
                                                                                  <div className="row mp10">
                                                                                    {vend.addresses.map(
                                                                                      (
                                                                                        addr,
                                                                                        indx
                                                                                      ) => {
                                                                                        return (
                                                                                          <div
                                                                                            className="col-md-6"
                                                                                            key={
                                                                                              indx
                                                                                            }
                                                                                          >
                                                                                            <h3>
                                                                                              {" "}
                                                                                              Address
                                                                                              Information:
                                                                                              {` ${
                                                                                                indx +
                                                                                                1
                                                                                              }`}
                                                                                            </h3>
                                                                                            <label className="inf-label">
                                                                                              House:
                                                                                              {` ${addr.house}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Street:
                                                                                              {` ${addr.street}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Village/Area:
                                                                                              {` ${addr.village}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              Zip
                                                                                              Code:
                                                                                              {` ${addr.zipCode}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              City:
                                                                                              {` ${addr.city}`}
                                                                                            </label>
                                                                                            <label className="inf-label">
                                                                                              County:
                                                                                              {` ${addr.country.name}`}
                                                                                            </label>
                                                                                          </div>
                                                                                        );
                                                                                      }
                                                                                    )}
                                                                                  </div>
                                                                                </div>
                                                                              </React.Fragment>
                                                                            ) : (
                                                                              <div></div>
                                                                            )}
                                                                          </React.Fragment>
                                                                        );
                                                                      }
                                                                    )}
                                                                  </React.Fragment>
                                                                ) : (
                                                                  <div>
                                                                    Vendor Not
                                                                    yet Select
                                                                  </div>
                                                                )}
                                                              </div>
                                                            </fieldset>
                                                            {/*  */}
                                                          </fieldset>
                                                        </div>
                                                        <div className="col-md-1 n-content">
                                                          {inx === 0 ? (
                                                            <span></span>
                                                          ) : (
                                                            <a
                                                              href="javascript:void(0);"
                                                              onClick={() =>
                                                                remove(inx)
                                                              }
                                                            >
                                                              Remove
                                                            </a>
                                                          )}
                                                        </div>
                                                      </div>
                                                      {/* Item loop End */}
                                                    </div>
                                                  </React.Fragment>
                                                );
                                              }
                                            )}

                                            {/** Item End */}
                                            <div className="row">
                                              <div className="col-md-offset-11 col-md-1 top-padding">
                                                {
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      push({
                                                        index: Math.random(),

                                                        hotel: "",
                                                        itn_country: 0,
                                                        city: "",

                                                        dayOrDurations: 0,
                                                        vendor: 0,
                                                        heading: "",
                                                        description: "",
                                                        hightLightText: "",
                                                        hotelText: "",
                                                        includedText: "",
                                                        excludedText: "",
                                                        category: 0,
                                                        file: null,
                                                        fil2: null,
                                                        expDate: "",
                                                        sourceUrl: "",
                                                        sourceUrl2: "",
                                                      })
                                                    }
                                                  >
                                                    Add
                                                  </a>
                                                }
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        )}
                                      </FieldArray>
                                      {/* /.card-body */}
                                    </div>
                                    {/* /.card */}
                                    {/* /.card */}
                                  </div>
                                  {/* /.col */}
                                </div>

                                {/**Itn End */}

                                {/** Strat Package Info Editor Base */}
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label htmlFor="packHightlightText">
                                        Package Highlight:
                                      </label>

                                      <UsoitCKEditor
                                        onChange={(e, editor) => {
                                          props.setFieldValue(
                                            "packHightlightText",
                                            editor.getData()
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label htmlFor="packIncludedText">
                                        Package Included:
                                      </label>

                                      <UsoitCKEditor
                                        onChange={(e, editor) => {
                                          props.setFieldValue(
                                            "packIncludedText",
                                            editor.getData()
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label htmlFor="packExcludedText">
                                        Package ExcludedText:
                                      </label>

                                      <UsoitCKEditor
                                        onChange={(e, editor) => {
                                          props.setFieldValue(
                                            "packExcludedText",
                                            editor.getData()
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/** End Package Info Editor Base */}

                                <div className="row">
                                  <fieldset className="col-md-12">
                                    <legend>Images &amp; Video:</legend>
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Embed Video Url:</label>
                                          <Field
                                            className="form-control"
                                            name="videoUrl"
                                            component="textarea"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/** set Image Gallery Here */}
                                    <div className="row">
                                      <FieldArray name="imageGalleries">
                                        {({ push, remove }) => (
                                          <React.Fragment>
                                            <div className="col-md-12">
                                              {props.values.imageGalleries.map(
                                                (imgGalery, imIndex) => {
                                                  return (
                                                    <React.Fragment>
                                                      <div
                                                        className="row"
                                                        key={imgGalery.index}
                                                      >
                                                        <div className="col-md-4">
                                                          <div className="form-group">
                                                            <label>
                                                              Image:
                                                            </label>{" "}
                                                            <Dropzone
                                                              fileName={`imageGalleries[${imIndex}].img_file`}
                                                              onDropAccepted={(
                                                                e
                                                              ) => {
                                                                props.setFieldValue(
                                                                  `imageGalleries[${imIndex}].img_file`,
                                                                  e
                                                                );
                                                              }}
                                                              onDrop={(
                                                                acceptedFiles
                                                              ) =>
                                                                console.log(
                                                                  acceptedFiles
                                                                )
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
                                                                      {...getRootProps(
                                                                        {
                                                                          className:
                                                                            "dropzone",
                                                                        }
                                                                      )}
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
                                                                        {acceptedFiles.map(
                                                                          (
                                                                            file
                                                                          ) => (
                                                                            <li
                                                                              key={
                                                                                file.path
                                                                              }
                                                                            >
                                                                              {
                                                                                file.path
                                                                              }{" "}
                                                                              -{" "}
                                                                              {
                                                                                file.size
                                                                              }{" "}
                                                                              bytes
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
                                                        <div className="col-md-3">
                                                          <div className="form-group">
                                                            <label>Name:</label>{" "}
                                                            <Field
                                                              className="form-control"
                                                              type="text"
                                                              placeholder="Image Name"
                                                              name={`imageGalleries[${imIndex}].name`}
                                                              id={`imageGalleries[${imIndex}].name`}
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className="form-group">
                                                            <label>Tag:</label>{" "}
                                                            <Field
                                                              className="form-control"
                                                              name={`imageGalleries[${imIndex}].altTag`}
                                                              id={`imageGalleries[${imIndex}].alert`}
                                                              type="text"
                                                              placeholder="Tag"
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                          <div className="form-group">
                                                            <label>
                                                              Location:
                                                            </label>{" "}
                                                            <Field
                                                              className="form-control"
                                                              type="text"
                                                              placeholder="Location"
                                                              name={`imageGalleries[${imIndex}].location`}
                                                              id={`imageGalleries[${imIndex}].location`}
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="col-md-1 n-content">
                                                          {imIndex === 0 ? (
                                                            <span></span>
                                                          ) : (
                                                            <a
                                                              href="javascript:void(0);"
                                                              onClick={() =>
                                                                remove(imIndex)
                                                              }
                                                            >
                                                              Remove
                                                            </a>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </React.Fragment>
                                                  );
                                                }
                                              )}

                                              <div className="row">
                                                {
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      push({
                                                        index: Math.random(),
                                                        img_name: "",
                                                        altTag: "",
                                                        location: "",
                                                        img_file: null,
                                                        srcUrl: "",
                                                      })
                                                    }
                                                  >
                                                    Add
                                                  </a>
                                                }
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        )}
                                      </FieldArray>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                              {/**End col-md-12 */}
                            </div>
                            {/**End card body */}
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
                          </div>

                          {this.state.uploadProgressScTwo > 0 ||
                          this.state.uploadProgressScOne > 0 ||
                          this.state.uploadProgressGallery > 0 ? (
                            <div id="progresss-bar" className="row">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-12 p10">
                                    <ProgressBar
                                      now={this.state.uploadProgressScOne}
                                      animated
                                      variant="success"
                                      label={`${this.state.uploadProgressScOne}%`}
                                    />
                                  </div>

                                  <div className="col-md-12 p10">
                                    <ProgressBar
                                      animated
                                      variant="success"
                                      now={this.state.uploadProgressScTwo}
                                      label={`${this.state.uploadProgressScTwo}%`}
                                    />
                                  </div>

                                  <div className="col-md-12 p10">
                                    <ProgressBar
                                      animated
                                      variant="success"
                                      now={this.state.uploadProgressGallery}
                                      label={`${this.state.uploadProgressGallery}% ${this.state.uploadedImage} / ${this.state.totalGaleryImage}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <React.Fragment></React.Fragment>
                          )}

                          <div className="row mp10">
                            <div className="col-md-2 offset-md-5">
                              <button
                                type="submit"
                                className="btn btn-block btn-outline-primary btn-sm"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AddPackageData;
