import React from "react";
import { Link } from "react-router-dom";

const PackCategoryButton = () => {
  return (
    <React.Fragment>
      <Link to="/package-categories" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default PackCategoryButton;
