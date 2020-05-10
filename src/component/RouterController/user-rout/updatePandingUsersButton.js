import React from "react";
import { Link } from "react-router-dom";

const UpdatePandingUsersButton = () => {
  return (
    <React.Fragment>
      <Link to="/update/users" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Update Users Approval</p>
      </Link>
    </React.Fragment>
  );
};

export default UpdatePandingUsersButton;
