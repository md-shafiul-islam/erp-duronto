import React from "react";
import { Link } from "react-router-dom";

const AddUserButton = () => {
  return (
    <React.Fragment>
      <Link to="/users/user" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>User Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddUserButton;
