import React, { Component } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/Layout/Header";
import Menu from "./component/Layout/Menu";
import Footer from "./component/Layout/Footer";

import Dashboard from "./component/Layout/Dashboard";
import AddPackageData from "./component/Product/PackFormik/AddPackageData";
import TestForm from "./component/Product/PackFormik/TestForm";

import AddCategory from "./component/Category/AddCategory";
import CategoriesView from "./component/Category/CategoriesView";
import AddCountry from "./component/Country/addCountry";
import Countries from "./component/Country/Countries";
import Departments from "./component/Department/Departments";
import AddDepartment from "./component/Department/addDepartment";
import AddDesignation from "./component/Designation/addDesignation";
import Designations from "./component/Designation/Designations";
import AddDuration from "./component/Duration/addDuration";
import Durations from "./component/Duration/Durations";
import PackCategoriesView from "./component/Pack-Category/packCategoriesView";
import AddPackCategory from "./component/Pack-Category/addPackCategory";
import AddUser from "./component/User/addUser";
import Users from "./component/User/Users";
import Roles from "./component/Role/Roles";
import AddRole from "./component/Role/addRole";
import EditRole from "./component/Role/editRole";
import PackagesView from "./component/Product/Package/packagesView";
import EditPackage from "./component/Product/Package/editPackage";
import PackageDetailsView from "./component/Product/Package/packageDetailsView";
import PackageConfrimedView from "./component/Product/Package/packageConfrimedView";
import PackageRejectView from "./component/Product/Package/packageRejectView";
import PackageUpdateApprovalPending from "./component/Product/Package/packageUpdateApprovalPending";
import PackageUpdateView from "./component/Product/Package/packageUpdateView";
import EditUser from "./component/User/editUser";
import UserDetails from "./component/User/userDetails";
import UpdatePandingUsers from "./component/User/updatePandingUsers";
import UpdateDetailsView from "./component/User/updateDetailsView";
import EditableUsers from "./component/User/editableUsers";
import UserApprovalPanding from "./component/User/userApprovalPanding";
import RejectUsers from "./component/User/rejectUsers";
import AddTermsAndConditions from "./component/TermsAndConditions/addTermsAndConditions";
import TermsAndConditions from "./component/TermsAndConditions/termsAndConditions";
import TermsDetails from "./component/TermsAndConditions/termsDetails";
import UpdateTermsAndConds from "./component/TermsAndConditions/updateTermsAndConds";
import AddPrivacyPolicy from "./component/PrivacyPolicy/addPrivacyPolicy";
import PrivacyPolicy from "./component/PrivacyPolicy/privacyPolicy";
import DetailsPrivacyPolicy from "./component/PrivacyPolicy/detailsPrivacyPolicy";
import UpdatePrivacyPolicy from "./component/PrivacyPolicy/updatePrivacyPolicy";
import Vendors from "./component/Vendor/vendors";
import DetailsVendor from "./component/Vendor/detailsVendor";
import UpdateVendor from "./component/Vendor/updateVendor";
import AddVendor from "./component/Vendor/addVendor";
import ApprovalVendor from "./component/Vendor/approvalVendor";
import EditVendor from "./component/Vendor/editVendor";
import UpdateApprovalVendor from "./component/Vendor/updateApprovalVendor";
import VendorUpdateDetails from "./component/Vendor/vendorUpdateDetails";
import RejectedVendors from "./component/Vendor/rejectedVendors";

import Login from "./component/Layout/User/Login";
import { Provider, connect } from "react-redux";
import store from "./store";
import setJWTToken from "./SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logOut } from "./actions/securityActions";
import { PropTypes } from "prop-types";
import { getAccess } from "./actions/appStoreAction";
import SecuredRoute from "./SecurityUtils/securedRoute";
import packCategoryEdit from "./component/Pack-Category/packCategoryEdit";
import DepartmentEdit from "./component/Department/DepartmentEdit";
import editDesignation from "./component/Designation/editDesignation";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logOut());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <Menu />

            {/** Public Route Start*/}
            <Route exact path="/login" component={Login} />
            {/** Public Route End */}

            <Switch>
              {/** Private  Route Start*/}
              <SecuredRoute exact path="/" component={Dashboard} />

              <SecuredRoute
                exact
                path="/addPackageData"
                component={AddPackageData}
              />
              <SecuredRoute
                exact
                path="/category/add"
                component={AddCategory}
              />
              <SecuredRoute exact path="/testFormik" component={TestForm} />
              <SecuredRoute
                exact
                path="/categories"
                component={CategoriesView}
              />
              <SecuredRoute exact path="/countries" component={Countries} />
              <SecuredRoute
                exact
                path="/countries/country"
                component={AddCountry}
              />
              <SecuredRoute exact path="/departments" component={Departments} />
              <SecuredRoute
                exact
                path="/departments/department"
                component={AddDepartment}
              />

              <SecuredRoute
                exact
                path="/departments/department/edit/:id"
                component={DepartmentEdit}
              />

              <SecuredRoute
                exact
                path="/designations"
                component={Designations}
              />
              <SecuredRoute
                exact
                path="/designations/designation"
                component={AddDesignation}
              />

              <SecuredRoute
                exact
                path="/designations/designation/edit/:id"
                component={editDesignation}
              />

              <SecuredRoute exact path="/durations" component={Durations} />
              <SecuredRoute
                exact
                path="/durations/duration"
                component={AddDuration}
              />

              <SecuredRoute
                exact
                path="/package-categories"
                component={PackCategoriesView}
              />
              <SecuredRoute
                exact
                path="/package-categories/package-category"
                component={AddPackCategory}
              />

              <SecuredRoute
                exact
                path="/package-categories/package-category/edit/:id"
                component={packCategoryEdit}
              />

              <SecuredRoute exact path="/users" component={Users} />
              <SecuredRoute exact path="/users/user" component={AddUser} />
              <SecuredRoute
                exact
                path="/users/user/edit/:id"
                component={EditUser}
              />
              <SecuredRoute
                exact
                path="/users/user/:id"
                component={UserDetails}
              />
              <SecuredRoute
                exact
                path="/update/users"
                component={UpdatePandingUsers}
              />
              <SecuredRoute
                exact
                path="/users/update/user/:id"
                component={UpdateDetailsView}
              />

              <SecuredRoute
                exact
                path="/users/upgrade"
                component={EditableUsers}
              />

              <SecuredRoute
                exact
                path="/users/reject"
                component={RejectUsers}
              />

              <SecuredRoute exact path="/roles" component={Roles} />
              <SecuredRoute exact path="/roles/role" component={AddRole} />

              <SecuredRoute path="/roles/role/edit/:id" component={EditRole} />

              <SecuredRoute exact path="/packages" component={PackagesView} />

              <SecuredRoute
                exact
                path="/users/approval"
                component={UserApprovalPanding}
              />
              <SecuredRoute
                exact
                path="/packages/package/edit/:id"
                component={EditPackage}
              />

              <SecuredRoute
                exact
                path="/packages/update-packages"
                component={PackageUpdateView}
              />

              <SecuredRoute
                exact
                path="/packages/package/detail/:id"
                component={PackageDetailsView}
              />

              <SecuredRoute
                exact
                path="/packages/confirmed"
                component={PackageConfrimedView}
              />
              <SecuredRoute
                exact
                path="/packages/rejected"
                component={PackageRejectView}
              />
              <SecuredRoute
                exact
                path="/packages/update-approval-pending"
                component={PackageUpdateApprovalPending}
              />

              <SecuredRoute
                exact
                path="/terms"
                component={TermsAndConditions}
              />
              <SecuredRoute
                exact
                path="/terms/add"
                component={AddTermsAndConditions}
              />
              <SecuredRoute
                exact
                path="/terms/term/details/:id"
                component={TermsDetails}
              />
              <SecuredRoute
                exact
                path="/terms/term/edit/:id"
                component={UpdateTermsAndConds}
              />

              <SecuredRoute
                exact
                path="/privacyPolicies"
                component={PrivacyPolicy}
              />
              <SecuredRoute
                exact
                path="/privacyPolicies/add"
                component={AddPrivacyPolicy}
              />
              <SecuredRoute
                exact
                path="/privacyPolicies/policy/details/:id"
                component={DetailsPrivacyPolicy}
              />
              <SecuredRoute
                exact
                path="/privacyPolicies/policy/edit/:id"
                component={UpdatePrivacyPolicy}
              />

              <SecuredRoute exact path="/vendors" component={Vendors} />
              <SecuredRoute exact path="/vendors/add" component={AddVendor} />
              <SecuredRoute
                exact
                path="/vendors/approval"
                component={ApprovalVendor}
              />
              <SecuredRoute
                exact
                path="/vendors/update"
                component={UpdateVendor}
              />

              <SecuredRoute
                exact
                path="/vendors/vendor/details/:id"
                component={DetailsVendor}
              />
              <SecuredRoute
                exact
                path="/vendors/vendor/edit/:id"
                component={EditVendor}
              />
              <SecuredRoute
                exact
                path="/vendors/update-approval"
                component={UpdateApprovalVendor}
              />

              <SecuredRoute
                exact
                path="/vendors/update/details/:id"
                component={VendorUpdateDetails}
              />

              <SecuredRoute
                exact
                path="/vendors/reject"
                component={RejectedVendors}
              />
              {/** Private  Route End*/}
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

//export default App; //connect(mapStateToProps, { getAccess })(App);
