import React from "react";
import { Link } from "react-router-dom";

const MenuLinkOrButton = (props) => {
  return (
    <React.Fragment>
      <Link to={props.action} className="nav-link">
        <i className={props.btnIconClass} />
        <p>{props.labelName}</p>
      </Link>
    </React.Fragment>
  );
};

export default MenuLinkOrButton;
