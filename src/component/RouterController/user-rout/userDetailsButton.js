import React from "react";
import { Link } from "react-router-dom";

const UserDetailsButton = () => {
  return (
    <React.Fragment>
      <Link to="/users" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>User Details</p>
      </Link>
    </React.Fragment>
  );
};

export default UserDetailsButton;
