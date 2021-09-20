import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import ActionLink from "../../../utils/ActionLink";
import { PropTypes } from "prop-types";
import ImageViewModal from "../../Modal/ImageViewModal";
import { getApprovePendingRecharges } from "../../../actions/rechargeAction";
import { EXT_BASE_URL } from "../../../actions/types";
import RecharhgeItem from "./RecharhgeItem";

const RechargeConfirmed = (params) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLocation, setImageLocation] = useState("");

  console.log("Recharge Approve page ", params);

  useEffect(() => {
    params.getApprovePendingRecharges();
  }, []);

  const mouseOverAction = (location) => {
    if (location) {
      console.log("Mouse Over, ", location);
      setDisplayModal(true);
      setImageLocation(location);
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
        {/* /.card-header */}
        <div className="recharge-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: 10 }}>#</th>
                <th>Date</th>
                <th>Trans. Date</th>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone No</th>

                <th>Bank Name</th>
                <th>Brance Name</th>
                <th>Account Name</th>
                <th style={{ width: "16vw" }}>Account Number</th>
                <th>Transection Id</th>
                <th>Amount</th>
                <th>Image</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {params.recharges &&
                params.recharges.map((recharge, idx) => {
                  return (
                    <RecharhgeItem
                      idx={idx}
                      keyName="pen"
                      recharge={recharge}
                      mouseOverAction={mouseOverAction}
                      detailsUrl={`/recharge/${recharge.publicId}`}
                    />
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={16}>
                  <div className="card-footer clearfix">
                    <ul className="pagination pagination-sm m-0 float-right">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          «
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          »
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* /.card-body */}
      </div>
    </React.Fragment>
  );
};

RechargeConfirmed.prototypes = {
  getApproveConfrimedRecharges: PropTypes.func.isRequired,
  recharges: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharges: state.recharge.pendingRecharges,
  };
};

export default connect(mapStateToProps, {
  getApprovePendingRecharges,
})(RechargeConfirmed);
