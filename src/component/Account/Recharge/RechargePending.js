import React, { useState, useEffect } from "react";

import ImageViewModal from "../../Modal/ImageViewModal";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getRechargePendings } from "../../../actions/rechargeAction";

import RechargeItemList from "./RechargeItemList";
import { getRestrictedImage } from "../../../utils/helper/esGetImageAction";

const RechargePending = (params) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLocation, setImageLocation] = useState("");
  console.log("Pending Recharge Compoment ", params);
  useEffect(() => {
    params.getRechargePendings();
  }, []);

  const mouseOverAction = async (location) => {
    if (location) {
      console.log("Mouse Over, ", location);
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
      <div className="content-wrapper recharge-wrapper">
        {/* /.card-header */}
        <div className="recharge-items-area">
          <ul className="recharge-items">
            <li className="recharge-item title bg-info">
              <ul className="recharge-item-area">
                <li>#</li>
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
                <li className="m-item">Action</li>
                <li className="sm-item">Details</li>
              </ul>
            </li>
            <RechargeItemList
              recharges={params.recharges}
              mouseOverAction={mouseOverAction}
              actionStatus={true}
            />
          </ul>
        </div>
        {/* /.card-body */}
      </div>
    </React.Fragment>
  );
};

RechargePending.prototype = {
  getRechargePendings: PropTypes.func.isRequired,
  recharges: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharges: state.recharge.pendingRecharges,
  };
};

export default connect(mapStateToProps, { getRechargePendings })(
  RechargePending
);
