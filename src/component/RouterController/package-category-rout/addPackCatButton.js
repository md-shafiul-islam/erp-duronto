import React from "react";
import { Link } from "react-router-dom";

const AddPackCatButton = () => {
  return (
    <React.Fragment>
      <Link to="/package-categories/package-category" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddPackCatButton;
