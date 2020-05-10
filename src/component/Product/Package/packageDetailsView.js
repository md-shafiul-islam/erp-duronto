import React, { Component } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class PackageDetailsView extends Component {
  constructor(props) {
    super(props);

    this.paramPackId = props.match.params.id;
  }

  state = {
    package: {},
    packLoadStatus: true,
    backStatus: false,
    approveActionStatus: false,
    rejectActionStatus: false,
  };

  backAction = (e) => {
    console.log("back Trigge!!");
    this.setState({ backStatus: true });
  };

  rejectPackAction = async (e) => {
    console.log("Reject Trigge!!");
    let rData = { id: this.paramPackId };
    let urlRData = `http://localhost:8085/api/packages/package/reject`;
    await Axios.put(urlRData, rData)
      .then((res) => {
        console.log("Reject Done!!", res.data);

        this.setState({ rejectActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });
  };

  approvePackAction = async (e) => {
    console.log("Approve Trigge!!");
    let urlData = `http://localhost:8085/api/packages/package/approve`;
    let apData = { id: this.paramPackId };
    await Axios.put(urlData, apData)
      .then((res) => {
        console.log("Approve Done!!", res.data);
        this.setState({ approveActionStatus: res.data });
      })
      .catch((res) => {
        console.log("Reject Error ", res);
      });
  };

  componentDidMount = async () => {
    this.getPackageDetails();
  };

  getPackageDetails = async () => {
    //Load Vendor Start
    let packUrl = `http://localhost:8085/api/packages/package/${this.paramPackId}`;
    await Axios.get(packUrl)
      .then((res) => {
        console.log("Success Get All Vendors Axios Add Pack");

        console.log("Done !!", res.data);

        this.setState({ package: res.data });
      })
      .catch((res) => {
        console.log("Error Get All Vendor!!");
        console.log(res.data);
      });

    if (this.state.package && this.state.package.publicId) {
      if (1 >= this.state.package.publicId.length) {
        this.setState({ packImg: true });
        this.getPackageDetails();
      } else {
        this.setState({ packLoadStatus: false });
      }
    } else {
      this.setState({ packImg: true });
      this.getPackageDetails();
    }
    //Load Vendor End
  };

  render() {
    if (
      this.state.backStatus ||
      this.state.approveActionStatus ||
      this.state.rejectActionStatus
    ) {
      return <Redirect to="/packages" />;
    }

    if (this.state.packLoadStatus) {
      return (
        <React.Fragment>
          <div style={{ marginLeft: 305 }}>
            <p>Loading Package Details....</p>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Package Detail</h6>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                    data-toggle="tooltip"
                    title="Remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                    <div className="row">
                      <div className="col-12">
                        <div className="post">
                          <h6>
                            Name:
                            <b>{this.state.package.name}</b>
                          </h6>
                          <h6>
                            Code:
                            <b>{this.state.package.code}</b>
                          </h6>
                          <h6>
                            Category:
                            <b>
                              {this.state.package.packageCat &&
                                this.state.package.packageCat.name}
                            </b>
                          </h6>
                          <h6>
                            Duration:
                            <b>
                              {this.state.package.duration &&
                                this.state.package.duration.name}
                            </b>
                          </h6>
                          <h6>
                            <span>Country:&nbsp;</span>
                            <span>
                              {this.state.package.countries &&
                                this.state.package.countries.map(
                                  (country, indx) => {
                                    return this.state.package.countries
                                      .length !==
                                      indx + 1
                                      ? `${country.name}, `
                                      : `${country.name}`;
                                  }
                                )}
                            </span>
                          </h6>
                          <h6>
                            Price:
                            <b>{this.state.package.price}</b>
                          </h6>
                        </div>
                        {/*  Item Start */}
                        <div className="post clearfix">
                          {this.state.package.itarnarys &&
                            this.state.package.itarnarys.map((item, itnIdx) => {
                              return (
                                <React.Fragment>
                                  <h6>Itinerary::</h6>
                                  <h6>{`Day: ${item.dayOrDurations}`}</h6>
                                  <h6>
                                    <b>Heading:&nbsp;</b>
                                    <br />
                                    {item.heading}
                                  </h6>

                                  {/* /.user-block */}
                                  <h6>Description:</h6>
                                  <div>{item.description}</div>
                                  <h6>HightLight:</h6>
                                  <div>
                                    <b>{item.hightLightText}</b>
                                  </div>
                                  <h6>Included:</h6>
                                  <div>{item.includedText}</div>
                                  <h6>Excluded:</h6>
                                  <div>{item.excludedText}</div>
                                  <div className="user-block">
                                    <h6>
                                      <b>Hotel Category:&nbsp;</b>

                                      {item.category && item.category.nameName}
                                    </h6>
                                    <h6>
                                      <b>Hotel Name:&nbsp;</b>
                                      {item && item.hotelText}
                                    </h6>
                                    <h6>
                                      <b>Country:&nbsp;</b>
                                      {item.country && item.country.name}
                                    </h6>
                                    <h6>
                                      <b>City:&nbsp;</b>
                                      {item.city}
                                    </h6>
                                  </div>

                                  <div className="row">
                                    <Col xs={3} md={2}>
                                      <Image
                                        src={`http://localhost:8085${item.sourceUrl}`}
                                        thumbnail
                                        height="200"
                                        width="180"
                                        title="Source Two Docs"
                                      />
                                      <label>{`Name: `}</label>
                                    </Col>

                                    <Col xs={3} md={2}>
                                      <Image
                                        src={`http://localhost:8085${item.sourceUrl2}`}
                                        thumbnail
                                        height="200"
                                        width="180"
                                        title="Source One Docs"
                                      />
                                      <label>{`Name: `}</label>
                                    </Col>
                                  </div>

                                  <fieldset>
                                    <div className="row">
                                      <div className="row mp-10">
                                        <h2>Vendor Info</h2>
                                        <div className="col-md-12">
                                          <label className="inf-label">
                                            Vendor Id:{" "}
                                            <b>
                                              {item.vendor &&
                                                item.vendor.vGenId}
                                            </b>
                                          </label>
                                          <label className="inf-label">
                                            Company Name:{" "}
                                            <b>
                                              {item.vendor &&
                                                item.vendor.companyName}
                                            </b>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="row mp-10">
                                        <div className="col-md-6">
                                          {item.vendor.contactPersons &&
                                            item.vendor.contactPersons.map(
                                              (person, pIndx) => {
                                                return (
                                                  <React.Fragment
                                                    key={`vPerson-${pIndx}`}
                                                  >
                                                    <h6>
                                                      Person Information:
                                                      {` ${pIndx + 1}`}
                                                    </h6>
                                                    <label className="inf-label">
                                                      Name: &nbsp;
                                                      <span>
                                                        {person && person.name}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Phone No. 1:&nbsp;
                                                      <span>
                                                        {person &&
                                                          person.phoneNo}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Phone No. 2:&nbsp;{" "}
                                                      <span>
                                                        {person &&
                                                          person.phoneNo2}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Email: &nbsp;
                                                      <span>
                                                        {person && person.email}
                                                      </span>
                                                    </label>
                                                  </React.Fragment>
                                                );
                                              }
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                          {item.vendor.addresses &&
                                            item.vendor.addresses.map(
                                              (address, adInx) => {
                                                return (
                                                  <React.Fragment
                                                    key={`address-${adInx}`}
                                                  >
                                                    <h6>
                                                      Address Information:&nbsp;{" "}
                                                      {address.title}
                                                    </h6>

                                                    <label className="inf-label">
                                                      House: &nbsp;
                                                      <span>
                                                        {address.house}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Street: &nbsp;
                                                      <span>
                                                        {address.street}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Village/Area: &nbsp;
                                                      <span>
                                                        {address.village}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      Zip Code: &nbsp;
                                                      <span>
                                                        {address.zipCode}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      City: &nbsp;
                                                      <span>
                                                        {address.city}
                                                      </span>
                                                    </label>
                                                    <label className="inf-label">
                                                      County: &nbsp;
                                                      <span>
                                                        {address.country &&
                                                          address.country.name}
                                                      </span>
                                                    </label>
                                                  </React.Fragment>
                                                );
                                              }
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </fieldset>
                                </React.Fragment>
                              );
                            })}
                        </div>
                        {/*  Item Start */}
                        {/* Image And Video */}

                        <div className="post">
                          <h5>Pack Highlight:</h5>
                          <div>{this.state.package.packHightlightText}</div>
                          <br />
                          <h5>Pack Included:</h5>
                          <div>{this.state.package.packIncludedText}</div>
                          <br />
                          <h5>Pack Excluded:</h5>
                          <div>{this.state.package.packExcludedText}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h6 className="text-primary">
                      <i className="fas fa-paint-brush" /> Images::
                    </h6>
                    {/** View Previous Images start */}

                    {this.state.package.imageGalleries &&
                      this.state.package.imageGalleries.map(
                        (cImage, cImInd) => {
                          return (
                            <React.Fragment key={`img-gallery-${cImInd}`}>
                              <Col xs={12} md={12}>
                                <Image
                                  src={`http://localhost:8085${cImage.srcUrl}`}
                                  thumbnail
                                  height="360"
                                  width="260"
                                  title={`${cImage.name}`}
                                />
                              </Col>
                              <label>{`Name: ${cImage.name}`}</label>
                            </React.Fragment>
                          );
                        }
                      )}

                    {/** View Previous Images End  */}
                  </div>
                </div>
                <div className="row mp10">
                  <div className="col-md-2">
                    <a
                      href={`javascript:void(0);`}
                      className="btn btn-block btn-outline-primary btn-sm"
                      onClick={this.backAction}
                    >
                      Back
                    </a>
                  </div>

                  {this.state.package.approvalStatus === 0 &&
                  this.state.package.updateApproval === 0 ? (
                    <React.Fragment>
                      <div className="col-md-2">
                        <a
                          href={`javascript:void(0);`}
                          className="btn btn-block btn-outline-danger btn-sm"
                          onClick={this.rejectPackAction}
                        >
                          Reject
                        </a>
                      </div>

                      <div className="col-md-2">
                        <a
                          href={`javascript:void(0);`}
                          className="btn btn-block btn-outline-success btn-sm"
                          onClick={this.approvePackAction}
                        >
                          Approve
                        </a>
                      </div>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* /.card-body */}
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default PackageDetailsView;
