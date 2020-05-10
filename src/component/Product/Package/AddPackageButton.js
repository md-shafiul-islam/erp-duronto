import React from "react";
import { Link } from "react-router-dom";

const AddPackageButton = () => {
  return (
    <React.Fragment>
      <Link to="/addPackageData" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add Packages</p>
      </Link>
    </React.Fragment>
  );
};

export default AddPackageButton;
