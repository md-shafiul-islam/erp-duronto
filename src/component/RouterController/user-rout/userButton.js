import React from "react";
import { Link } from "react-router-dom";

const UserButton = () => {
  return (
    <React.Fragment>
      <Link to="/users" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default UserButton;
