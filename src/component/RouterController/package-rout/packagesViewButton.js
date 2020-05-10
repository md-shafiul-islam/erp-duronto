import React from "react";
import { Link } from "react-router-dom";

const PackagesViewButton = () => {
  return (
    <React.Fragment>
      <Link to="/packages" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default PackagesViewButton;
