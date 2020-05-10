import React from "react";
import { Link } from "react-router-dom";

const UpdatePackageButton = () => {
  return (
    <React.Fragment>
      <Link to="/packages/update-packages" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Update Packages</p>
      </Link>
    </React.Fragment>
  );
};

export default UpdatePackageButton;
