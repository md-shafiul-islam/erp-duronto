import React from "react";
import { Link } from "react-router-dom";

const CountriesButton = () => {
  return (
    <React.Fragment>
      <Link to="/countries" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default CountriesButton;
