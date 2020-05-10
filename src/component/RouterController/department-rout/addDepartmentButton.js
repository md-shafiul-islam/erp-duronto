import React from "react";
import { Link } from "react-router-dom";

const AddDepartmentButton = () => {
  return (
    <React.Fragment>
      <Link to="/departments/department" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddDepartmentButton;
