import React from "react";
import { Link } from "react-router-dom";

const DurationButton = () => {
  return (
    <React.Fragment>
      <Link to="/durations" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>View</p>
      </Link>
    </React.Fragment>
  );
};

export default DurationButton;
