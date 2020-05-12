import React from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/Layout/Header";
import Menu from "./component/Layout/Menu";
import Footer from "./component/Layout/Footer";

import Dashboard from "./component/Layout/Dashboard";
import AddPackageData from "./component/Product/PackFormik/AddPackageData";
import TestForm from "./component/Product/PackFormik/TestForm";
import Login from "./component/Layout/User/Login";
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

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Menu />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/addPackageData" component={AddPackageData} />
        <Route exact path="/category/add" component={AddCategory} />
        <Route exact path="/testFormik" component={TestForm} />
        <Route exact path="/categories" component={CategoriesView} />
        <Route exact path="/countries" component={Countries} />
        <Route exact path="/countries/country" component={AddCountry} />
        <Route exact path="/departments" component={Departments} />
        <Route exact path="/departments/department" component={AddDepartment} />

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

        <Route exact path="/users/approval" component={UserApprovalPanding} />
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
        <Route exact path="/packages/rejected" component={PackageRejectView} />
        <Route
          exact
          path="/packages/update-approval-pending"
          component={PackageUpdateApprovalPending}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
