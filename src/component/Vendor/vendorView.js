import React from "react";

const VendorView = (props) => {
  return (
    <React.Fragment>
      {console.log("Vendor Commponent: ", props.vendors)}
      {props.vendors &&
        props.vendors.map((item, idx) => {
          return (
            <React.Fragment>
              <tr>
                <td>{idx + 1}</td>
                <td>{item.vGenId}</td>
                <td>
                  {item.companyName != null ? item.companyName : "Anonymous"}
                </td>
                <td>{item.ownerName != null ? item.ownerName : "Anonymous"}</td>

                <td>
                  {item.restVendorCategory && item.restVendorCategory.name}
                </td>

                {props.userStatus && (
                  <td>
                    <a href={`${props.userActin}${item.userPublicId}`}>
                      {item.userId}
                    </a>
                  </td>
                )}

                {props.detailStatus && (
                  <td>
                    <a
                      href={`${props.detailActin}${item.publicId}`}
                      className="btn btn-block btn-outline-primary btn-sm"
                    >
                      Details{" "}
                    </a>
                  </td>
                )}

                {props.editStatus && (
                  <td>
                    <a
                      href={`${props.editActin}${item.publicId}`}
                      className="btn btn-block btn-outline-info btn-sm"
                    >
                      Edit
                    </a>
                  </td>
                )}
              </tr>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default VendorView;
