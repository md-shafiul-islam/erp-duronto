import React from "react";
import B2CUserList from "./B2CUserList";

const B2CRejectedUsers = (params) => {
  return (
    <React.Fragment>
      <B2CUserList status={3} />
    </React.Fragment>
  );
};

export default B2CRejectedUsers;
