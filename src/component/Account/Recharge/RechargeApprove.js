import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import ImageViewModal from "../../Modal/ImageViewModal";
import RechargeItemList from "./RechargeItemList";
import { connect } from "react-redux";
import { getApprovedRecharges } from "../../../actions/rechargeAction";
import { getRestrictedImage } from "../../../utils/helper/esGetImageAction";

const RechargeApprove = (params) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLocation, setImageLocation] = useState(undefined);

  useEffect(() => {
    params.getApprovedRecharges();
  }, []);

  const mouseOverAction = async (location) => {
    if (location) {
      console.log("Mouse Over, Location ", location);
      setImageLocation(undefined);

      const respImage = await getRestrictedImage(location);

      setDisplayModal(true);
      if (respImage.status) {
        setImageLocation(respImage.image);
      }
    }
  };

  const hideAction = (status) => {
    setDisplayModal(status);
  };
  return (
    <React.Fragment>
      <ImageViewModal
        showModal={displayModal}
        location={imageLocation}
        hideAction={hideAction}
      />
      <div className="content-wrapper">
        <div className="recharge-items-area">
          <ul className="recharge-items">
            <li className="recharge-item title bg-info">
              <ul className="recharge-item-area">
                <li className="srlnum">#</li>
                <li className="m-item">Date</li>
                <li className="m-item">Trans. Date</li>
                <li className="lg-item">Client ID</li>
                <li className="m-item">Client Name</li>
                <li className="lg-item">Email</li>
                <li className="lg-item">Phone No</li>

                <li className="m-item">Bank Name</li>
                <li className="m-item">Brance Name</li>
                <li className="m-item">Account Name</li>
                <li className="m-item">Account Number</li>
                <li className="lg-item">Transection Id</li>
                <li className="sm-item">Amount</li>
                <li className="sm-item">Image</li>
                <li className="sm-item">Details</li>
              </ul>
            </li>
            <RechargeItemList
              recharges={
                params.recharges && params.recharges.status
                  ? params.recharges.data
                  : undefined
              }
              mouseOverAction={mouseOverAction}
              actionStatus={false}
            />
          </ul>
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
};

RechargeApprove.prototype = {
  getApprovedRecharges: PropTypes.func.isRequired,
  recharges: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharges: state.recharge.approveRecharges,
  };
};

export default connect(mapStateToProps, { getApprovedRecharges })(
  RechargeApprove
);
