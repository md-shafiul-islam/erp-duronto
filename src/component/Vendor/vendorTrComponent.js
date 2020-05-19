import React from "react";

const VendorTrComponent = (props) => {
  return (
    <React.Fragment>
      {props !== undefined ? (
        props.cValue !== props.reqValue ? (
          <tr>
            <td>
              {props !== undefined
                ? props.labelName !== undefined
                  ? props.labelName
                  : ""
                : ""}
            </td>
            <td>
              {props !== undefined
                ? props.cValue !== undefined
                  ? props.cValue
                  : ""
                : ""}
            </td>
            <td>
              {props !== undefined
                ? props.reqValue !== undefined
                  ? props.reqValue
                  : ""
                : ""}
            </td>
          </tr>
        ) : (
          " "
        )
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default VendorTrComponent;
