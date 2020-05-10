import React from "react";
import { Link } from "react-router-dom";

const PackageRejectViewBuuton = () => {
  return (
    <React.Fragment>
      <Link to="/packages/rejected" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Rejected Packages</p>
      </Link>
    </React.Fragment>
  );
};

export default PackageRejectViewBuuton;
