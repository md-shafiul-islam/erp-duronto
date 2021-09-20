import React, { Component } from "react";

import NoAction from "../Helper/NoAction";
import AddPackageButton from "../Product/Package/AddPackageButton";
import AddCatButtion from "../RouterController/Cat/AddCatButtion";

import ViewCategories from "../RouterController/Cat/viewCategories";
import CountriesButton from "../RouterController/CountriesRout/CountriesButton";
import AddCountryButton from "../RouterController/CountriesRout/addCountriesButton";
import DepartmentViewButton from "../RouterController/department-rout/departmentViewButton";
import AddDepartmentButton from "../RouterController/department-rout/addDepartmentButton";
import DesignationButton from "../RouterController/designation/designationButton";
import AddDesignationButton from "../RouterController/designation/addDesignationButton";
import DurationButton from "../RouterController/durations-rout/durationButton";
import AddDurationButton from "../RouterController/durations-rout/addDurationButton";
import PackCategoriesView from "../Pack-Category/packCategoriesView";
import PackCategoryButton from "../RouterController/package-category-rout/packCategoryButton";
import AddPackCatButton from "../RouterController/package-category-rout/addPackCatButton";
import UserButton from "../RouterController/user-rout/userButton";
import AddUserButton from "../RouterController/user-rout/addUserButton";
import AddRoleButton from "../RouterController/role-rout/addRoleButton";
import RoleViewButton from "../RouterController/role-rout/roleVewButton";
import PackageConfrimViewButton from "../RouterController/package-rout/packageConfrimViewButton";
import PackageRejectViewBuuton from "../RouterController/package-rout/packageRejectViewButton";
import PackageUpdateApprovalButton from "../RouterController/package-rout/packageUpdateApprovalButton";
import AddPackApprovalPemdingButton from "../RouterController/package-rout/addPackApprovalPemdingButton";
import UpdatePackageButton from "../RouterController/package-rout/updatePackageButton";
import UpdatePandingUsersButton from "../RouterController/user-rout/updatePandingUsersButton";
import MenuLinkOrButton from "./menuLinkOrButton";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAccess } from "../../actions/appStoreAction";
import LoadingData from "./LoadingData";

class Menu extends Component {
  state = {
    accessStatus: true,
    reloadStatus: true,
  };

  componentDidMount() {
    console.log("Commponent Run Menu, ", this.props.security);
    if (this.props && this.props.security.validToken) {
      if (this.props.security.user.id) {
        // this.props.getAccess(this.props.security.user.id);
        this.loadAccess(0);
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log("This Props: ", this.props);
      console.log("Next Props: ", nextProps);

      // if (nextProps.validToken) {
      //   this.props.getAccess(
      //     this.props.security.user.id,
      //     nextProps.tokenData.token
      //   );
      // }
    }
  }

  loadAccess = (count) => {
    console.log("Load Access Data, ", count);
    if (this.props.security.validToken) {
      this.props.getAccess(
        this.props.security.user.id,
        this.props.tokenData.token
      );
    }

    if (this.props.accesses !== undefined) {
      if (this.props.accesses.user === undefined) {
        this.loadAccess(count + 1);
      }
    }
  };

  render() {
    let {
      package_ac,
      role,
      sale,
      user,
      vendor,
      category,
      countries,
      department,
      designation,
      duration,
      pack_category,
      privacy_policy,
      purchase,
      rules_and_regulation,
      terms_tandc,
      visa_service,
    } = this.props.access.accesses;
    let { validToken } = this.props.security;

    let classNameData = "main-sidebar sidebar-dark-primary elevation-4";
    if (!validToken) {
      classNameData += " visibale-inactive";
    } else {
      classNameData =
        "main-sidebar sidebar-dark-primary elevation-4 visibale-active";
    }

    return (
      <React.Fragment>
        {/* Main Sidebar Container Menu Start*/}
        <aside className={classNameData}>
          {/* Brand Logo */}
          <a href="/" className="brand-link">
            {" "}
            <img
              src="/dist/img/AdminLTELogo.png"
              alt="Avater"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Dashboard</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User"
                />
              </div>
              <div className="info">
                <a
                  href="javascript:void(0);"
                  onClick={NoAction}
                  className="d-block"
                >
                  Alexander Pierce
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
	               with font-awesome or any other icon font library */}
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    {" "}
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard</p>
                  </a>
                </li>
                {/*  Accounts Start */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-landmark" />
                    <p>
                      Bank Accounts <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/view?page=0"
                        btnIconClass="fas fa-list nav-icon"
                        labelName="Bank Info View"
                      />
                    </li>
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/add"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Add"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/pending"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Add Approval"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/edit/"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Edit / Update"
                      />
                    </li>
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/update/pending"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Edit / Update Approval"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/update/pending"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Edit / Update View"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/bank/reject"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Reject"
                      />
                    </li>
                  </ul>
                </li>
                {/* Accounts End */}
                {/*  Rechargae Start */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-coins" />
                    <p>
                      Rechargae <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/recharge/pending"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Approval Recharge"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/recharge/confirmed"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Confirmed Recharge"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/recharge/reject"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Reject Recharge"
                      />
                    </li>
                  </ul>
                </li>
                {/* Recharge End */}

                {/*  Wallet Withdarw Start */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-coins" />
                    <p>
                      Wallet Withdarwals <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/walletwithdraw/pending"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Approval Wallet Withdraw"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/walletwithdraw/confirmed"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Confirmed Wallet Withdraw"
                      />
                    </li>

                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/walletwithdraw/reject"
                        btnIconClass="fas fa-book nav-icon"
                        labelName="Reject Wallet Withdraw"
                      />
                    </li>
                  </ul>
                </li>
                {/* Wallet Withdarw End */}
                {/*  Sale */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Sale <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/sales"
                        btnIconClass="fas fa-list nav-icon"
                        labelName="View"
                      />
                    </li>
                    <li className="nav-item">
                      <a href="/sale/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>Add</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Sale End */}
                {/*  Purchase */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Purchase <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>View</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>Add</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Purchase End */}
                {/*  Pay */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Pay <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>View</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>Add</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Pay End */}
                {/*  Receive */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Receive <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>View</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>Add</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Receive End */}
                {/*  Reports */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Reports <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>User activity report</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>User attendance report</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Reports End */}
                {/*  Expenses */}
                <li className="nav-item has-treeview">
                  <a href="  " className="nav-link">
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Expenses <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>User activity report</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>User attendance report</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Expenses End */}
                {/*  Vsset */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Vsset <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>User activity report</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>User attendance report</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Vsset End */}
                {/*  Office / Branch Location */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Office / Branch Location{" "}
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>User activity report</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category/add" className="nav-link">
                        {" "}
                        <i className="fas fa-plus-square nav-icon" />
                        <p>User attendance report</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* Office / Branch Location End */}
                {/*  Clients & Vendors */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Clients &amp; Vendors{" "}
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {/* Clients / Customer Start */}

                    <li className="nav-item">
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>
                          Clients / Customer{" "}
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {/* Sub Menu Client & Customer */}
                        <li className="nav-item">
                          <a href="/role/view?page=0" className="nav-link">
                            {" "}
                            <i className="fas fa-list nav-icon" />
                            <p>
                              Clients / Customer{" "}
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview">
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new Clients</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new Clients approval</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>Clients update</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>Clients update approval</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>Clients confirmed</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>Clients rejected</p>
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/*  Sub Menu Client & Customer */}
                        {/*  Sub Menu Corporate Client / Customer */}
                        <li className="nav-item">
                          <a href="/role/add" className="nav-link">
                            {" "}
                            <i className="fas fa-plus-square nav-icon" />
                            <p>
                              Corporate Client / Customer{" "}
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview">
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new corporate client</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new corporate client</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>corporate client update</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>corporate client update approval</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>corporate client confirmed</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>corporate client rejected</p>
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/*  Sub Menu Corporate Client / Customer End*/}
                        {/*  Sub Menu B2B Client / Customer */}
                        <li className="nav-item">
                          <a href="/role/add" className="nav-link">
                            {" "}
                            <i className="fas fa-plus-square nav-icon" />
                            <p>
                              B2B Client / Customer{" "}
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview">
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new B2B client</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/view?page=0" className="nav-link">
                                {" "}
                                <i className="fas fa-list nav-icon" />
                                <p>new B2B client approval</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>new B2B client update</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>new B2B client update approval</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>new B2B client confirmed</p>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/role/add" className="nav-link">
                                {" "}
                                <i className="fas fa-plus-square nav-icon" />
                                <p>new B2B client rejected</p>
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/*  Sub Menu B2B Client / Customer */}
                      </ul>
                    </li>

                    {/* Clients / Customer End */}

                    {/* vendor / supplier Start */}
                    {vendor && vendor.noAccess !== 1 ? (
                      <li className="nav-item">
                        <a
                          href="javascript:void(0);"
                          onClick={NoAction}
                          className="nav-link"
                        >
                          {" "}
                          <i className="fas fa-plus-square nav-icon" />
                          <p>
                            vendor / supplier{" "}
                            <i className="right fas fa-angle-left" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          {vendor.add === 1 || vendor.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-plus-square nav-icon"
                                labelName="vendor/supplier Add"
                                action="/vendors/add"
                              />
                            </li>
                          ) : (
                            ""
                          )}

                          {vendor.approve === 1 || vendor.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-list nav-icon"
                                labelName="vendor/supplier approval"
                                action="/vendors/approval"
                              />
                            </li>
                          ) : (
                            ""
                          )}

                          {vendor.edit === 1 || vendor.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-list nav-icon"
                                labelName="vendor/supplier Update "
                                action="/vendors/update"
                              />
                            </li>
                          ) : (
                            ""
                          )}

                          {vendor.updateApproval === 1 || vendor.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-list nav-icon"
                                labelName="vendor/supplier Update approval"
                                action="/vendors/update-approval"
                              />
                            </li>
                          ) : (
                            ""
                          )}
                          {vendor.noAccess === 1 ? (
                            ""
                          ) : (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-list nav-icon"
                                labelName="vendor/supplier Confirmed"
                                action="/vendors"
                              />
                            </li>
                          )}
                          {vendor.add === 1 ||
                          vendor.updateApproval === 1 ||
                          vendor.approve === 1 ||
                          vendor.edit ||
                          vendor.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                btnIconClass="fas fa-list nav-icon"
                                labelName="vendor/supplier Rejected"
                                action="/vendors/reject"
                              />
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    {/* vendor / supplier End */}
                  </ul>
                </li>
                {/* Clients & Vendors End */}
                {/*  Category */}
                {category &&
                  (category.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-project-diagram" />
                        <p>
                          Category <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {category.add === 1 ||
                        category.edit === 1 ||
                        category.all === 1 ? (
                          <li className="nav-item">
                            <ViewCategories />
                          </li>
                        ) : (
                          ""
                        )}
                        {category.add === 1 || category.all === 1 ? (
                          <li className="nav-item">
                            <AddCatButtion />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}
                {/* Category End */}

                {/** Package Category Start */}

                {pack_category &&
                  (pack_category.noAccess !== 1 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-project-diagram" />
                        <p>
                          Package Category{" "}
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {pack_category.view === 1 ||
                        pack_category.edit === 1 ||
                        pack_category.all === 1 ||
                        pack_category.add === 1 ? (
                          <li className="nav-item">
                            <PackCategoryButton />
                          </li>
                        ) : (
                          ""
                        )}
                        {pack_category.add === 1 || pack_category.all === 1 ? (
                          <li className="nav-item">
                            <AddPackCatButton />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/** Package Category End */}

                {/*  Department */}
                {department &&
                  (department.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-sitemap" />
                        <p>
                          Department <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {department.add === 1 ||
                        department.edit === 1 ||
                        department.view === 1 ||
                        department.all === 1 ? (
                          <li className="nav-item">
                            <DepartmentViewButton />
                          </li>
                        ) : (
                          ""
                        )}
                        {department.add === 1 || department.all === 1 ? (
                          <li className="nav-item">
                            <AddDepartmentButton />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}
                {/* Department End */}
                {/*  Designation  */}
                {designation &&
                  (designation.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-user-tag" />
                        <p>
                          Designation <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {designation.add === 1 ||
                        designation.all === 1 ||
                        designation.view === 1 ||
                        designation.edit === 1 ? (
                          <li className="nav-item">
                            <DesignationButton />
                          </li>
                        ) : (
                          ""
                        )}

                        {designation.add === 1 || designation.all === 1 ? (
                          <li className="nav-item">
                            <AddDesignationButton />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}
                {/*  Designation  End */}
                {/*  HR  */}

                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-user-tie" />
                    <p>
                      HR <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {/* User */}
                    {user && user.noAccess !== 1 ? (
                      <li className="nav-item has-treeview">
                        <a
                          href="javascript:void(0);"
                          onClick={NoAction}
                          className="nav-link"
                        >
                          {" "}
                          <i className="nav-icon fas fa-user-tie" />
                          <p>
                            User Or Employee{" "}
                            <i className="right fas fa-angle-left" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          {user.add === 1 || user.all === 1 ? (
                            <li className="nav-item">
                              <AddUserButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {user.approve === 1 || user.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                action="/users/approval"
                                btnIconClass="nav-icon fas fa-user-edit"
                                labelName="Add Approval"
                              />
                            </li>
                          ) : (
                            ""
                          )}

                          {user.edit === 1 || user.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                action="/users/upgrade"
                                btnIconClass="nav-icon fas fa-user-edit"
                                labelName="User Upgrade"
                              />
                            </li>
                          ) : (
                            ""
                          )}

                          {user.updateApproval === 1 || user.all === 1 ? (
                            <li className="nav-item">
                              <UpdatePandingUsersButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {user.noAccess === 1 ? (
                            ""
                          ) : (
                            <li className="nav-item">
                              <UserButton />
                            </li>
                          )}

                          {user.add === 1 ||
                          user.approval === 1 ||
                          user.all === 1 ? (
                            <li className="nav-item">
                              <MenuLinkOrButton
                                action="/users/reject"
                                btnIconClass="nav-icon fas fa-user-edit"
                                labelName="Reject Users"
                              />
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    {/* User End */}

                    <li className="nav-item">
                      <a href="/user/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>Payroll</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/user/add" className="nav-link">
                        <i className="fas fa-user-plus nav-icon" />
                        <p>Bonus</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/user/edit" className="nav-link">
                        <i className="fas fa-user-lock nav-icon" />
                        <p>Mobile Allowance</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/user/edit" className="nav-link">
                        <i className="fas fa-user-lock nav-icon" />
                        <p>Leave &amp; Outdoor </p>
                      </a>
                    </li>
                  </ul>
                </li>

                {/*  HR End */}
                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-circle" />
                    <p>
                      Settings <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {/*  Sub menu Role Start */}
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="fas fa-user-shield nav-icon" />
                        <p>
                          Role <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <RoleViewButton />
                        </li>
                        <li className="nav-item">
                          <AddRoleButton />
                        </li>
                      </ul>
                    </li>
                    {/* Sub menu Role End */}
                  </ul>
                </li>

                {/** Product Menu Start */}

                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-circle" />
                    <p>
                      Product <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {package_ac && package_ac.noAccess !== 1 ? (
                      <li className="nav-item">
                        <a
                          href="javascript:void(0);"
                          onClick={NoAction}
                          className="nav-link"
                        >
                          {" "}
                          <i className="far fa-circle nav-icon" />
                          <p>Tour packages</p>
                        </a>
                        <ul className="nav nav-treeview">
                          {package_ac.add === 1 || package_ac.all == 1 ? (
                            <li className="nav-item">
                              <AddPackageButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {package_ac.approve === 1 || package_ac.all == 1 ? (
                            <li className="nav-item">
                              <AddPackApprovalPemdingButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {package_ac.edit === 1 || package_ac.all == 1 ? (
                            <li className="nav-item">
                              <UpdatePackageButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {package_ac.updateApproval === 1 ||
                          package_ac.all == 1 ? (
                            <li className="nav-item">
                              <PackageUpdateApprovalButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {package_ac.view === 1 ||
                          package_ac.add == 1 ||
                          package_ac.all == 1 ||
                          package_ac.edit == 1 ||
                          package_ac.approval == 1 ||
                          package_ac.updateApproval == 1 ? (
                            <li className="nav-item">
                              <PackageConfrimViewButton />
                            </li>
                          ) : (
                            ""
                          )}

                          {package_ac.add === 1 || package_ac.all == 1 ? (
                            <li className="nav-item">
                              <PackageRejectViewBuuton />
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="nav-item">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="far fa-circle nav-icon" />
                        <p>Visa Service</p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>New Visa Service Add</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>New Visa Service Approval</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>New Visa Service Update</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>New Visa Service Approval</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>Visa Service Confirmed</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="javascript:void(0);"
                            onClick={NoAction}
                            className="nav-link"
                          >
                            {" "}
                            <i className="far fa-dot-circle nav-icon" />
                            <p>Visa Service Rejected</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                {/** Product Menu End */}

                {/** Duration Start */}

                {duration &&
                  (duration.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-user-tag" />
                        <p>
                          Duration <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {duration.view === 1 ||
                        duration.add === 1 ||
                        duration.edit === 1 ||
                        duration.all ? (
                          <li className="nav-item">
                            <DurationButton />
                          </li>
                        ) : (
                          ""
                        )}

                        {duration.add === 1 || duration.all ? (
                          <li className="nav-item">
                            <AddDurationButton />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/** Duration End */}

                {/** Countries start */}

                {countries &&
                  (countries.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-sitemap" />
                        <p>
                          Countries <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {countries.view === 1 ||
                        countries.add === 1 ||
                        countries.edit === 1 ||
                        countries.all === 1 ? (
                          <li className="nav-item">
                            <CountriesButton />
                          </li>
                        ) : (
                          ""
                        )}

                        {countries.add === 1 || countries.all === 1 ? (
                          <li className="nav-item">
                            <AddCountryButton />
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/** Countries End */}

                {/*  Rules & Regulation  */}
                {rules_and_regulation &&
                  (rules_and_regulation.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-project-diagram" />
                        <p>
                          Rules &amp; Regulation{" "}
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          {rules_and_regulation.add === 1 ||
                          rules_and_regulation.all == 1 ||
                          rules_and_regulation.view === 1 ||
                          rules_and_regulation.edit === 1 ? (
                            <MenuLinkOrButton
                              action="/rules"
                              labelName="View"
                              btnIconClass="fas fa-plus-square nav-icon"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                        <li className="nav-item">
                          {rules_and_regulation.add === 1 ||
                          rules_and_regulation.all == 1 ? (
                            <MenuLinkOrButton
                              action="/rules/add"
                              labelName="Add"
                              btnIconClass="fas fa-plus-square nav-icon"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/* Rules & Regulation End */}

                {/** T&C Start */}

                {terms_tandc &&
                  (terms_tandc.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-clipboard-check" />
                        <p>
                          Terms & Conditions (T&C)
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        {terms_tandc.view === 1 ||
                        terms_tandc.edit === 1 ||
                        terms_tandc.add === 1 ||
                        terms_tandc.all === 1 ? (
                          <li className="nav-item">
                            <MenuLinkOrButton
                              action="/terms/add"
                              labelName="Add (T&C)"
                              btnIconClass="fas fa-plus-square nav-icon"
                            />
                          </li>
                        ) : (
                          ""
                        )}
                        <li className="nav-item">
                          {terms_tandc.add === 1 || terms_tandc.all === 1 ? (
                            <MenuLinkOrButton
                              action="/terms"
                              labelName="T&C View"
                              btnIconClass="fas fa-tasks nav-icon"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/** T&C End */}

                {/** Policy Start */}

                {privacy_policy &&
                  (privacy_policy.noAccess === 0 ? (
                    <li className="nav-item has-treeview">
                      <a
                        href="javascript:void(0);"
                        onClick={NoAction}
                        className="nav-link"
                      >
                        {" "}
                        <i className="nav-icon fas fa-clipboard-check" />
                        <p>
                          Privacy Policy
                          <i className="right fas fa-angle-left" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          {privacy_policy.add === 1 ||
                          privacy_policy.all === 1 ? (
                            <MenuLinkOrButton
                              action="/privacyPolicies/add"
                              labelName="Add Privacy Policy"
                              btnIconClass="fas fa-plus-square nav-icon"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                        <li className="nav-item">
                          {privacy_policy.add === 1 ||
                          privacy_policy.all === 1 ||
                          privacy_policy.edit === 1 ||
                          privacy_policy.view === 1 ? (
                            <MenuLinkOrButton
                              action="/privacyPolicies"
                              labelName="Privacy Policies"
                              btnIconClass="fas fa-tasks nav-icon"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </li>
                  ) : (
                    ""
                  ))}

                {/** Policy End */}
                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="far fa-circle nav-icon" />
                    <p>Tasks</p>
                  </a>
                </li>
                <li className="nav-header">LABELS</li>
                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon far fa-circle text-danger" />
                    <p className="text">Important</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Warning</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon far fa-circle text-info" />
                    <p>Informational</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        {/* Main Sidebar Container Menu End */}
      </React.Fragment>
    );
  }
}

Menu.prototypes = {
  getAccess: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  tokenData: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  access: state.appStore,
  tokenData: state.tokenData,
});

export default connect(mapStateToProps, { getAccess })(Menu);
