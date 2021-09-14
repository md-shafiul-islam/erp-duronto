import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ImageViewModal from "../../Modal/ImageViewModal";
import RecharhgeItem from "./RecharhgeItem";
import { getRejectRecharges } from "../../../actions/rechargeAction";

const RechargeReject = (params) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLocation, setImageLocation] = useState("");

  const { recharges } = params;

  useEffect(() => {
    params.getRejectRecharges();
  }, [])

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
        <div>
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
                {recharges &&
                  recharges.map((recharge, idx) => {
                    return (
                      <RecharhgeItem
                        idx={idx}
                        keyName="reject"
                        recharge={recharge}
                        mouseOverAction={mouseOverAction}
                        action={false}
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
      </div>
    </React.Fragment>
  );
};

RechargeReject.prototypes = {
  getRejectRecharges: PropTypes.func.isRequired,
  recharges: PropTypes.object.isRequired,
  rechargesStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    recharges: state.recharge.rejectRecharges,
    rechargesStatus: state.recharge.rejectRecharges,
  };
};

export default connect(mapStateToProps, {getRejectRecharges})(RechargeReject);
