import React from "react";

const ApproveButton = (props) => {
  return (
    <React.Fragment>
      <a
        href={`javascript:void(0);`}
        className="btn btn-block btn-success btn-sm"
        onClick={() => {
          props.actionApprove();
        }}
      >
        Approve
      </a>
    </React.Fragment>
  );
};

export default ApproveButton;
