import React from "react";
import { Link } from "react-router-dom";

const UserEditButton = () => {
  return (
    <React.Fragment>
      <Link to="/users" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>User Upgrade</p>
      </Link>
    </React.Fragment>
  );
};

export default UserEditButton;
