import React from "react";

const VendorInfLabelValue = (props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">{props.lebal}</div>
        <div className="col-md-6">{props.value}</div>
      </div>
    </React.Fragment>
  );
};

export default VendorInfLabelValue;
