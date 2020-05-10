import React from "react";
import { Link } from "react-router-dom";

const PackageUpdateApprovalButton = () => {
  return (
    <React.Fragment>
      <Link to="/packages/update-approval-pending" className="nav-link">
        <i className="far fa-dot-circle nav-icon" />
        <p>Update Approval</p>
      </Link>
    </React.Fragment>
  );
};

export default PackageUpdateApprovalButton;
