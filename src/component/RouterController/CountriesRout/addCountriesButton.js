import React from "react";
import { Link } from "react-router-dom";

const AddCountryButton = () => {
  return (
    <React.Fragment>
      <Link to="/countries/country" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddCountryButton;
