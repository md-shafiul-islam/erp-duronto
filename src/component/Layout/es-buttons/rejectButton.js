import React from "react";

const RejectButton = (props) => {
  return (
    <React.Fragment>
      <a
        href={`javascript:void(0);`}
        className="btn btn-block btn-danger btn-sm"
        onClick={() => {
          props.actionReject();
        }}
      >
        Reject
      </a>
    </React.Fragment>
  );
};

export default RejectButton;
