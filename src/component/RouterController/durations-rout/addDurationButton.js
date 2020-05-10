import React from "react";
import { Link } from "react-router-dom";

const AddDurationButton = () => {
  return (
    <React.Fragment>
      <Link to="/durations/duration" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add</p>
      </Link>
    </React.Fragment>
  );
};

export default AddDurationButton;
