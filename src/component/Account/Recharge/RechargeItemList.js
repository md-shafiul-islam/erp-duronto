import React from "react";
import { Image } from "react-bootstrap";
import ActionLink from "../../../utils/ActionLink";
import { esDateFormat } from "../../../utils/helper/esFunc";
import LoadingContent from "../../../utils/helper/LoadingContent";

const RechargeItemList = (params) => {
  if (!Array.isArray(params.recharges)) {
    return <LoadingContent />;
  }
  return (
    <React.Fragment>
      {params.recharges &&
        params.recharges.map((recharge, idx) => {
          return (
            <React.Fragment key={`recharge-pending-${idx}`}>
              <li className="recharge-item">
                <ul className="recharge-item-area">
                  <li className="srlnum ch-item">{idx + 1}.</li>
                  <li className="ch-item m-item">
                    {esDateFormat(recharge.date)}
                  </li>
                  <li className="ch-item m-item">
                    {esDateFormat(recharge.transectionDate)}
                  </li>
                  <li className="ch-item lg-item">{recharge.genId}</li>
                  <li className="ch-item m-item">
                    {recharge.customer && recharge.customer.fullName}
                  </li>
                  <li className="ch-item lg-item">
                    {recharge.customer && recharge.customer.email}
                  </li>
                  <li className="ch-item lg-item">
                    {recharge.customer && recharge.customer.phoneCode}
                    {recharge.customer && recharge.customer.phone}
                  </li>

                  <li className="ch-item m-item">
                    {recharge.bankAccount && recharge.bankAccount.bankName}
                  </li>
                  <li className="ch-item m-item">
                    {recharge.bankAccount && recharge.bankAccount.branchName}
                  </li>
                  <li className="ch-item m-item">
                    {recharge.bankAccount && recharge.bankAccount.accountName}
                  </li>
                  <li className="ch-item m-item">
                    {recharge.bankAccount && recharge.bankAccount.accountNumber}
                  </li>
                  <li className="ch-item lg-item">
                    {recharge.bankAccount && recharge.transectionId}
                  </li>
                  <li className="ch-item sm-item">{recharge.amount}</li>
                  <li className="ch-item sm-item">
                    <div className="recharge-image-area">
                      <Image
                        src={recharge.attachUrl}
                        thumbnail
                        onMouseOver={() => {
                          params.mouseOverAction(recharge.attachUrl);
                        }}
                      />
                    </div>
                  </li>
                  {params.actionStatus && (
                    <li className="ch-item m-item">
                      <div className="recharge-action">
                        <ActionLink
                          to={`/recharge/approve/${recharge.publicId}`}
                          label="Approve"
                          clazz="btn btn-success btn-sm ac-item"
                        />
                        <ActionLink
                          to={`/recharge/reject/${recharge.publicId}`}
                          label="Reject"
                          clazz="btn btn-danger btn-sm ac-item"
                        />
                      </div>
                    </li>
                  )}

                  <li className="ch-item sm-item">
                    <ActionLink
                      to={`/recharge/${recharge.publicId}`}
                      label="Details"
                      clazz="btn btn-block btn-primary btn-sm"
                    />
                  </li>
                </ul>
              </li>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default RechargeItemList;
