import React from "react";
import { Link } from "react-router-dom";

const AddCatButtion = () => {
  return (
    <React.Fragment>
      <Link to="/category/add" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddCatButtion;
