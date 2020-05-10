import React from "react";
import { Link } from "react-router-dom";

const AddDesignationButton = () => {
  return (
    <React.Fragment>
      <Link to="/designations/designation" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddDesignationButton;
