import React, { useState, useEffect } from "react";
import ImageViewModal from "../../Modal/ImageViewModal";
import RechargeItemList from "./RechargeItemList";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getRejectedRecharges } from "../../../actions/rechargeAction";
import { getRestrictedImage } from "../../../utils/helper/esGetImageAction";

const RechargeReject = (params) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLocation, setImageLocation] = useState("");

  useEffect(() => {
    params.getRejectedRecharges();
  }, []);

  const mouseOverAction = async (location) => {
    if (location) {
      console.log("Mouse Over, ", location);
      setImageLocation(undefined);

      const respImage = await getRestrictedImage(location);
      if (respImage.status) {
        setImageLocation(respImage.image);
      }
      setDisplayModal(true);
    }
  };

  const hideAction = (status) => {
    setDisplayModal(status);
  };
  return (
    <React.Fragment>
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
        <ImageViewModal
          showModal={displayModal}
          location={imageLocation}
          hideAction={hideAction}
        />
      </div>
    </React.Fragment>
  );
};

RechargeReject.prototype = {
  getRejectRecharge: PropTypes.func.isRequired,
  recharges: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharges: state.recharge.rejectRecharges,
  };
};

export default connect(mapStateToProps, { getRejectedRecharges })(
  RechargeReject
);
