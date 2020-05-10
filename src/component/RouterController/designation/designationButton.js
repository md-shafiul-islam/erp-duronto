import React from "react";
import { Link } from "react-router-dom";

const DesignationButton = () => {
  return (
    <React.Fragment>
      <Link to="/designations" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default DesignationButton;
