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
import { Provider } from "react-redux";
import store from "./store";

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

            {/** Private  Route Start*/}
            <Route exact path="/" component={Dashboard} />

            <Route exact path="/addPackageData" component={AddPackageData} />
            <Route exact path="/category/add" component={AddCategory} />
            <Route exact path="/testFormik" component={TestForm} />
            <Route exact path="/categories" component={CategoriesView} />
            <Route exact path="/countries" component={Countries} />
            <Route exact path="/countries/country" component={AddCountry} />
            <Route exact path="/departments" component={Departments} />
            <Route
              exact
              path="/departments/department"
              component={AddDepartment}
            />

            <Route exact path="/designations" component={Designations} />
            <Route
              exact
              path="/designations/designation"
              component={AddDesignation}
            />

            <Route exact path="/durations" component={Durations} />
            <Route exact path="/durations/duration" component={AddDuration} />

            <Route
              exact
              path="/package-categories"
              component={PackCategoriesView}
            />
            <Route
              exact
              path="/package-categories/package-category"
              component={AddPackCategory}
            />

            <Route exact path="/users" component={Users} />
            <Route exact path="/users/user" component={AddUser} />
            <Route exact path="/users/user/edit/:id" component={EditUser} />
            <Route exact path="/users/user/:id" component={UserDetails} />
            <Route exact path="/update/users" component={UpdatePandingUsers} />
            <Route
              exact
              path="/users/update/user/:id"
              component={UpdateDetailsView}
            />

            <Route exact path="/users/upgrade" component={EditableUsers} />

            <Route exact path="/users/reject" component={RejectUsers} />

            <Route exact path="/roles" component={Roles} />
            <Route exact path="/roles/role" component={AddRole} />

            <Route path="/roles/role/edit/:id" component={EditRole} />

            <Route exact path="/packages" component={PackagesView} />

            <Route
              exact
              path="/users/approval"
              component={UserApprovalPanding}
            />
            <Route
              exact
              path="/packages/package/edit/:id"
              component={EditPackage}
            />

            <Route
              exact
              path="/packages/update-packages"
              component={PackageUpdateView}
            />

            <Route
              exact
              path="/packages/package/detail/:id"
              component={PackageDetailsView}
            />

            <Route
              exact
              path="/packages/confirmed"
              component={PackageConfrimedView}
            />
            <Route
              exact
              path="/packages/rejected"
              component={PackageRejectView}
            />
            <Route
              exact
              path="/packages/update-approval-pending"
              component={PackageUpdateApprovalPending}
            />

            <Route exact path="/terms" component={TermsAndConditions} />
            <Route exact path="/terms/add" component={AddTermsAndConditions} />
            <Route
              exact
              path="/terms/term/details/:id"
              component={TermsDetails}
            />
            <Route
              exact
              path="/terms/term/edit/:id"
              component={UpdateTermsAndConds}
            />

            <Route exact path="/privacyPolicies" component={PrivacyPolicy} />
            <Route
              exact
              path="/privacyPolicies/add"
              component={AddPrivacyPolicy}
            />
            <Route
              exact
              path="/privacyPolicies/policy/details/:id"
              component={DetailsPrivacyPolicy}
            />
            <Route
              exact
              path="/privacyPolicies/policy/edit/:id"
              component={UpdatePrivacyPolicy}
            />

            <Route exact path="/vendors" component={Vendors} />
            <Route exact path="/vendors/add" component={AddVendor} />
            <Route exact path="/vendors/approval" component={ApprovalVendor} />
            <Route exact path="/vendors/update" component={UpdateVendor} />

            <Route
              exact
              path="/vendors/vendor/details/:id"
              component={DetailsVendor}
            />
            <Route
              exact
              path="/vendors/vendor/edit/:id"
              component={EditVendor}
            />
            <Route
              exact
              path="/vendors/update-approval"
              component={UpdateApprovalVendor}
            />

            <Route
              exact
              path="/vendors/update/details/:id"
              component={VendorUpdateDetails}
            />

            <Route exact path="/vendors/reject" component={RejectedVendors} />
            {/** Private  Route End*/}
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
