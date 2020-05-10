import React from "react";
import { Link } from "react-router-dom";

const AddPackApprovalPemdingButton = () => {
  return (
    <React.Fragment>
      <Link to="/packages" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Add Packages Approval</p>
      </Link>
    </React.Fragment>
  );
};

export default AddPackApprovalPemdingButton;
