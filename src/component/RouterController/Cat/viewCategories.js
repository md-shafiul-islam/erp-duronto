import React from "react";
import { Link } from "react-router-dom";

const ViewCategories = () => {
  return (
    <React.Fragment>
      <Link to="/categories" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default ViewCategories;
