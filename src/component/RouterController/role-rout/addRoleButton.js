import React from "react";
import { Link } from "react-router-dom";

const AddRoleButton = () => {
  return (
    <React.Fragment>
      <Link to="/roles/role" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddRoleButton;
