import React, { Component } from "react";
import ItarnarysList from "./ItarnarysList";
import ImageGalleryList from "./ImageGalleryList";
import Select from "react-select";

const cuntOptions = [
  { value: "1", label: "Bangladesh" },
  { value: "2", label: "USA" },
  { value: "3", label: "UAE" },
];

class AddPackage extends Component {
  constructor() {
    super();

    this.handelFormChange = this.handelFormChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handelSelectChange = this.handelSelectChange.bind(this);
  }

  state = {
    name: "",
    code: "",
    description: "",
    packIncludedText: "",
    packExcludedText: "",
    packHightlightText: "",
    packageCat: 0,

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
        file: "???",
        fil2: "???",
        expDate: "",
      },
    ],
    imageGalleries: [
      {
        index: Math.random(),
        img_name: "",
        altTag: "",
        location: "",
        img_file: "???",
      },
    ],
    eDay: 0,
    eNight: 0,
    taxVat: 0.0,
    highlight: false,
    price: 0.0,
    videoUrl: null,
    countries: [
      {
        index: Math.random(),
        id: 0,
      },
    ],
  };

  handelFormChange(e) {
    //County, Image, Itn
    console.log("Change Run!!!");
    console.log(e.target.name);

    if (
      [
        "hotel",
        "itn_country",
        "city",
        "vendor",
        "heading",
        "description",
        "hightLightText",
        "hotelText",
        "includedText",
        "excludedText",
        "category",
        "file",
        "fil2",
        "expDate",
      ].includes(e.target.name) ||
      ["img_name", "altTag", "location", "img_file"].includes(e.target.name)
    ) {
      console.log("If Pass");
      console.log(e.target.name);

      if (
        [
          "hotel",
          "itn_country",
          "city",
          "vendor",
          "heading",
          "description",
          "hightLightText",
          "hotelText",
          "includedText",
          "excludedText",
          "category",
          "file",
          "fil2",
          "expDate",
        ].includes(e.target.name) ||
        ["img_name", "altTag", "location", "file"].includes(e.target.name)
      ) {
        // Image Itn

        if (
          [
            "hotel",
            "itn_country",
            "city",
            "vendor",
            "heading",
            "description",
            "hightLightText",
            "hotelText",
            "includedText",
            "excludedText",
            "category",
            "file",
            "fil2",
            "expDate",
          ].includes(e.target.name)
        ) {
          //Itn

          if (["itn_country"].includes(e.target.name)) {
            console.log("Itn Country: Value, Name & Set Value ");
            console.log(e.target.value);
          }

          console.log("Itn selected");
          console.log(e.target.name);

          let itarnarys = [...this.state.itarnarys];
          itarnarys[e.target.dataset.id][e.target.name] = e.target.value;

          console.log("Itarnarys selected Row");
          console.log(e.target.dataset.id);
          console.log("Value: ");
          console.log(e.target.value);
          console.log("Name Value :");
          console.log(itarnarys[e.target.dataset.id][e.target.name]);
        } else {
          //Image
          console.log("Image Selected");
          console.log(e.target.name);
          let imageGalleries = [...this.state.imageGalleries];
          imageGalleries[e.target.dataset.id][e.target.name] = e.target.value;
        }
      }
    } else {
      //Package
      this.setState({ [e.target.name]: e.target.value });
      console.log("Package");
      console.log(e.target.name);
    }
  }

  addCountryToPack(e) {
    console.log("Run add country Fnc");

    let { nCount } = this.state;

    console.log(nCount);

    this.setState((prevState) => ({
      countries: [...prevState.countries, { index: Math.random(), id: 0 }],
    }));
  }

  addItarnarysItemBindFnc() {
    console.log("Run add Itarnary Fnc");

    this.setState((prevState) => ({
      itarnarys: [
        ...prevState.itarnarys,
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
          file: "???",
          fil2: "???",
          expDate: "",
        },
      ],
    }));
  }

  deleteCountryToPack(index) {
    this.setState({
      countries: this.state.countries.filter((s, sindex) => index !== sindex),
    });
  }

  deleteBindFnc(record) {
    this.setState({
      countries: this.state.countries.filter((r) => r !== record),
    });
  }

  deleteItarnarysItem(index) {
    this.setState({
      itarnarys: this.state.itarnarys.filter((s, sindex) => index !== sindex),
    });
  }

  deleteItarnarysItemBindFnc(record) {
    this.setState({
      itarnarys: this.state.itarnarys.filter((r) => r !== record),
    });
  }

  deleteImageItemBindFnc(record) {
    this.setState({
      imageGalleries: this.state.imageGalleries.filter((r) => r !== record),
    });
  }

  handelSubmit(e) {
    e.preventDefault();

    console.log(e);
    console.log("Current State: ");
    console.log(this.state);
  }

  addImageItemBindFnc(e) {
    console.log("Run add Image Fnc");

    this.setState((prevState) => ({
      imageGalleries: [
        ...prevState.imageGalleries,
        {
          index: Math.random(),
          img_name: "",
          altTag: "",
          location: "",
          img_file: "???",
          date: null,
        },
      ],
    }));
  }

  handelSelectChange(selectedOption) {
    console.log(selectedOption);
  }

  render() {
    let { countries } = this.state;
    let { itarnarys } = this.state;
    let { imageGalleries } = this.state;

    //console.log(countries);

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px auto" }}>
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Package</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form
                  onSubmit={this.handelSubmit}
                  onChange={this.handelFormChange}
                  role="form"
                  id="turPack"
                  name="turPack"
                  method="post"
                  action="/"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <fieldset>
                          <legend>Package Info</legend>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="name">Name:</label>{" "}
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="Name"
                                  value={this.state.name}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="code">Code:</label>{" "}
                                <input
                                  type="text"
                                  className="form-control"
                                  name="code"
                                  id="code"
                                  placeholder="Code"
                                  value={this.state.code}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="packageCat">
                                  Package Category:
                                </label>{" "}
                                <select
                                  className="form-control"
                                  id="packageCat"
                                  name="packageCat"
                                  value={this.state.packageCat}
                                >
                                  <option>
                                    Select One Package Category...
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="duration">Day:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="eDay"
                                      id="Day"
                                      placeholder="Day"
                                      value={this.state.eDay}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="duration">Night:</label>{" "}
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="eNight"
                                      id="Night"
                                      placeholder="Night"
                                      value={this.state.eNight}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Package HightLight:</label>
                                <textarea
                                  className="form-control editor"
                                  name="packHightlightText"
                                  id="packHightlightText"
                                  placeholder="Package Hightlight"
                                  value={this.state.hightLightText}
                                />
                              </div>
                              <div className="form-group">
                                <label>Package Included:</label>
                                <textarea
                                  className="form-control editor"
                                  name="packIncludedText"
                                  id="packIncludedText"
                                  placeholder="Package Included"
                                  value={this.state.packIncludedText}
                                />
                              </div>
                              <div className="form-group">
                                <label>Package Excluded:</label>
                                <textarea
                                  className="form-control editor"
                                  name="packExcludedText"
                                  id="packExcludedText"
                                  placeholder="Package Excluded"
                                  value={this.state.packExcludedText}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="price"
                                  id="price"
                                  placeholder="Price"
                                  value={this.state.price}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            {/* Countries set Here */}
                            {/*<PackCountryList
                              countries={countries}
                              add={this.addCountryToPack.bind(this)}
                              delete={this.deleteBindFnc.bind(this)}
                              onChange={this.handelSelectChange}
                            />*/}

                            <Select
                              name="countries"
                              isSearchable
                              isClearable
                              isMulti
                              onChange={this.handelSelectChange}
                              options={cuntOptions}
                            />
                          </div>
                          <div className="row p10">
                            <div className="col-md-1">
                              <a
                                href="javascript:void(0);"
                                onClick={this.addCountryToPack.bind(this)}
                              >
                                Add
                              </a>
                            </div>
                          </div>
                        </fieldset>

                        <div className="row pading-top">
                          <div className="col-12">
                            <div className="card">
                              <div className="card-header">
                                <h3 className="card-title">Itinerary:</h3>
                              </div>
                              {/* /.card-header */}
                              <div className="card-body">
                                {/* Item loop set here */}
                                <ItarnarysList
                                  itarnarys={itarnarys}
                                  delete={this.deleteItarnarysItemBindFnc.bind(
                                    this
                                  )}
                                />
                                {/** Item End */}
                                <div className="row">
                                  <div className="col-md-offset-11 col-md-1 top-padding">
                                    {
                                      <a
                                        href="javascript:void(0);"
                                        onClick={this.addItarnarysItemBindFnc.bind(
                                          this
                                        )}
                                      >
                                        Add
                                      </a>
                                    }
                                  </div>
                                </div>
                              </div>
                              {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* /.card */}
                          </div>
                          {/* /.col */}
                        </div>
                        <fieldset>
                          <legend>Images &amp; Video:</legend>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Embed Video Url:</label>
                                <textarea
                                  className="form-control"
                                  name="videoUrl"
                                  value={this.state.videoUrl}
                                />
                              </div>
                            </div>
                          </div>

                          {/** set Image Gallery Here */}
                          <ImageGalleryList
                            imageGalleries={imageGalleries}
                            delete={this.deleteImageItemBindFnc.bind(this)}
                          />
                          <div className="row">
                            {
                              <a
                                href="javascript:void(0);"
                                onClick={this.addImageItemBindFnc.bind(this)}
                              >
                                Add
                              </a>
                            }
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    {/* Form 1st row End */}
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary ">
                      <span>
                        {" "}
                        <i className="fas fa-save" />
                      </span>{" "}
                      <span className="text">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPackage;
