import React, {useState} from "react";
import { Image } from "react-bootstrap";
import ActionLink from "../../../utils/ActionLink";
import ImageViewModal from "../../Modal/ImageViewModal";




const RechargePending = (params) => {

    const [displayModal, setDisplayModal] = useState(false);
    const [imageLocation, setImageLocation] = useState("");

  const mouseOverAction = (location) => {
    if (location) {
      console.log("Mouse Over, ", location);
      setDisplayModal(true);
      setImageLocation(location);
    }
  };

  const hideAction = (status)=>{
      setDisplayModal(status);
  }
  return (
    <React.Fragment>
        <ImageViewModal showModal={displayModal} location={imageLocation} hideAction ={hideAction} />
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
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>11/09/2021</td>
                  <td>10/09/2021</td>
                  <td>48451</td>
                  <td>Md Shafiul Islam</td>
                  <td>shafiul2014bd@gmail.com</td>
                  <td>01725686029</td>
                  <td>Brack Bank</td>
                  <td>Bogura</td>
                  <td>Duronto Trip</td>
                  <td>4984841541</td>
                  <td>AG48184H484KA84L</td>
                  <td>4,481584</td>
                  <td>
                    <div className="recharge-image-area">
                      <Image
                        src="/dist/img/photo1.png"
                        thumbnail
                        onMouseOver={() => {
                          mouseOverAction("/uimage/slip.jpg");
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="rechargeA-action">
                      <ActionLink
                        to={`/recharge/approve/${1}`}
                        label="Approve"
                        clazz="btn btn-block btn-success btn-sm"
                      />
                      <ActionLink
                        to={`/recharge/reject/${1}`}
                        label="Reject"
                        clazz="btn btn-block btn-danger btn-sm"
                      />
                    </div>
                  </td>
                  <td>
                    <ActionLink
                      to={`/recharge/${1}`}
                      label="Details"
                      clazz="btn btn-block btn-primary btn-sm"
                    />
                  </td>
                </tr>

                <tr>
                  <td>1.</td>
                  <td>11/09/2021</td>
                  <td>10/09/2021</td>
                  <td>Client ID</td>
                  <td>Client Name</td>
                  <td>Email</td>
                  <td>Phone No</td>
                  <td>Brack Bank</td>
                  <td>Bogura</td>
                  <td>Duronto Trip</td>
                  <td>4984841541</td>
                  <td>AG48184H484KA84L</td>
                  <td>4,481584</td>
                  <td>
                    <div className="recharge-image-area">
                      <i className="fas fa-image"></i>
                    </div>
                  </td>
                  <td>
                    <div className="rechargeA-action">
                      <ActionLink
                        to={`/recharge/approve/${1}`}
                        label="Approve"
                        clazz="btn btn-block btn-success btn-sm"
                      />
                      <ActionLink
                        to={`/recharge/reject/${1}`}
                        label="Reject"
                        clazz="btn btn-block btn-danger btn-sm"
                      />
                    </div>
                  </td>
                  <td>
                    <ActionLink
                      to={`/recharge/${1}`}
                      label="Details"
                      clazz="btn btn-block btn-primary btn-sm"
                    />
                  </td>
                </tr>
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

export default RechargePending;
