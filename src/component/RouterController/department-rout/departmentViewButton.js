import React from "react";
import { Link } from "react-router-dom";

const DepartmentViewButton = () => {
  return (
    <React.Fragment>
      <Link to="/departments" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default DepartmentViewButton;
