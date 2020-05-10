import React from "react";
import { Link } from "react-router-dom";

const PackageConfrimViewButton = () => {
  return (
    <React.Fragment>
      <Link to="/packages/confirmed" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Confirmed Packages</p>
      </Link>
    </React.Fragment>
  );
};

export default PackageConfrimViewButton;
