import React from "react";
import { Link } from "react-router-dom";

const CommonTableView = (props) => {
  return (
    <React.Fragment>
      <tr key={props.index}>
        <td>{props.item.id}</td>
        <td> {props.item.name !== "" ? props.item.name : "Anonymous"}</td>
        <td>{props.item.description !== null ? props.item.description : ""}</td>

        <td>
          <Link
            to={`${props.action}${props.item.id}`}
            class="btn btn-info btn-icon-split"
          >
            <span class="icon text-white-50">
              <i class={props.actionIconClass}></i>
            </span>
            <span class="text">{props.actionLabel}</span>
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CommonTableView;
