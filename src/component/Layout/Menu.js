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

class Menu extends Component {
  render() {
    return (
      <div>
        {/* Main Sidebar Container Menu Start*/}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
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
                {/*  Rules & Regulation  */}
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
                      <a href="/category/view?page=0" className="nav-link">
                        {" "}
                        <i className="fas fa-list nav-icon" />
                        <p>View</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <AddCatButtion />
                    </li>
                  </ul>
                </li>

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
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/terms/add"
                        labelName="Add (T&C)"
                        btnIconClass="fas fa-plus-square nav-icon"
                      />
                    </li>
                    <li className="nav-item">
                      <MenuLinkOrButton
                        action="/terms"
                        labelName="T&C View"
                        btnIconClass="fas fa-tasks nav-icon"
                      />
                    </li>
                  </ul>
                </li>

                {/* Rules & Regulation End */}
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
                        <li className="nav-item">
                          <a href="/vendor/add" className="nav-link">
                            {" "}
                            <i className="fas fa-list nav-icon" />
                            <p>new vendor / supplier add</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/vendor/approval" className="nav-link">
                            <i className="fas fa-plus-square nav-icon" />
                            <p>new vendor / supplier approval</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/vendor/up-approval" className="nav-link">
                            <i className="fas fa-plus-square nav-icon" />
                            <p>vendor / supplier update approval</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/vendor/view?page=0" className="nav-link">
                            <i className="fas fa-plus-square nav-icon" />
                            <p>vendor / supplier confirmed</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/vendor/rej-view" className="nav-link">
                            <i className="fas fa-plus-square nav-icon" />
                            <p>vendor / supplier rejected</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* vendor / supplier End */}
                  </ul>
                </li>
                {/* Clients & Vendors End */}
                {/*  Category */}
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
                    <li className="nav-item">
                      <ViewCategories />
                    </li>
                    <li className="nav-item">
                      <AddCatButtion />
                    </li>
                  </ul>
                </li>
                {/* Category End */}

                {/** Package Category Start */}

                <li className="nav-item has-treeview">
                  <a
                    href="javascript:void(0);"
                    onClick={NoAction}
                    className="nav-link"
                  >
                    {" "}
                    <i className="nav-icon fas fa-project-diagram" />
                    <p>
                      Package Category <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <PackCategoryButton />
                    </li>
                    <li className="nav-item">
                      <AddPackCatButton />
                    </li>
                  </ul>
                </li>

                {/** Package Category End */}

                {/*  Department */}
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
                    <li className="nav-item">
                      <DepartmentViewButton />
                    </li>
                    <li className="nav-item">
                      <AddDepartmentButton />
                    </li>
                  </ul>
                </li>
                {/* Department End */}
                {/*  Designation  */}
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
                    <li className="nav-item">
                      <DesignationButton />
                    </li>
                    <li className="nav-item">
                      <AddDesignationButton />
                    </li>
                  </ul>
                </li>
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
                        <li className="nav-item">
                          <AddUserButton />
                        </li>

                        <li className="nav-item">
                          <MenuLinkOrButton
                            action="/users/approval"
                            btnIconClass="nav-icon fas fa-user-edit"
                            labelName="Add Approval"
                          />
                        </li>

                        <li className="nav-item">
                          <MenuLinkOrButton
                            action="/users/upgrade"
                            btnIconClass="nav-icon fas fa-user-edit"
                            labelName="User Upgrade"
                          />
                        </li>

                        <li className="nav-item">
                          <UpdatePandingUsersButton />
                        </li>

                        <li className="nav-item">
                          <UserButton />
                        </li>

                        <li className="nav-item">
                          <MenuLinkOrButton
                            action="/users/reject"
                            btnIconClass="nav-icon fas fa-user-edit"
                            labelName="Reject Users"
                          />
                        </li>
                      </ul>
                    </li>
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
                        <li className="nav-item">
                          <AddPackageButton />
                        </li>
                        <li className="nav-item">
                          <AddPackApprovalPemdingButton />
                        </li>
                        <li className="nav-item">
                          <UpdatePackageButton />
                        </li>
                        <li className="nav-item">
                          <PackageUpdateApprovalButton />
                        </li>
                        <li className="nav-item">
                          <PackageConfrimViewButton />
                        </li>
                        <li className="nav-item">
                          <PackageRejectViewBuuton />
                        </li>
                      </ul>
                    </li>
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

                {/** Duration Start */}

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
                    <li className="nav-item">
                      <DurationButton />
                    </li>
                    <li className="nav-item">
                      <AddDurationButton />
                    </li>
                  </ul>
                </li>

                {/** Duration End */}

                {/** Countries start */}

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
                    <li className="nav-item">
                      <CountriesButton />
                    </li>
                    <li className="nav-item">
                      <AddCountryButton />
                    </li>
                  </ul>
                </li>

                {/** Countries End */}

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
      </div>
    );
  }
}

export default Menu;
