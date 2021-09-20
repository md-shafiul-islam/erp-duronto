import React from "react";
import { Image } from "react-bootstrap";
import { EXT_BASE_URL } from "../../../actions/types";
import ActionLink from "../../../utils/ActionLink";

const RecharhgeItem = ({ recharge, mouseOverAction, keyName, idx, detailsUrl }) => {
  return (
    <React.Fragment key={`recharge-${keyName}`}>
      <tr>
        <td>{idx + 1}.</td>
        <td>{recharge.date}</td>
        <td>{recharge.transectionDate}</td>
        <td>{recharge.customer && recharge.customer.publicId}</td>
        <td>{recharge.customer && recharge.customer.firstName}</td>
        <td>{recharge.customer && recharge.customer.email}</td>
        <td>{recharge.customer && recharge.customer.phone}</td>
        <td>{recharge.bankAccount && recharge.bankAccount.bankName}</td>
        <td>{recharge.bankAccount && recharge.bankAccount.branchName}</td>
        <td>{recharge.bankAccount && recharge.bankAccount.accountName}</td>
        <td>{recharge.bankAccount && recharge.bankAccount.accountNumber}</td>
        <td>{recharge.transectionId}</td>
        <td>{recharge.amount}</td>
        <td>
          <div className="recharge-image-area">
            {recharge.attachUrl === null ? (
              ""
            ) : (
              <Image
                src={`${EXT_BASE_URL}${recharge.attachUrl}`}
                thumbnail
                onMouseOver={() => {
                  mouseOverAction(`${EXT_BASE_URL}${recharge.attachUrl}`);
                }}
              />
            )}
          </div>
        </td>
        
        <td>
          <ActionLink
            to={detailsUrl}
            label="Details"
            clazz="btn btn-block btn-primary btn-sm"
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default RecharhgeItem;
