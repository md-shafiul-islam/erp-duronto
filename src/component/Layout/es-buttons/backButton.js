import React from "react";

const BackButton = (props) => {
  return (
    <React.Fragment>
      <a
        href={`javascript:void(0);`}
        className="btn btn-block btn-primary btn-sm"
        onClick={() => {
          props.actionBack();
        }}
      >
        Back
      </a>
    </React.Fragment>
  );
};

export default BackButton;
