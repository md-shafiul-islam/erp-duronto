import React from "react";

const ImageGalleryList = (props) => {
  return props.imageGalleries.map((val, idx) => {
    let img_file = `img_file-${idx}`,
      img_name = `img_name-${idx}`,
      altTag = `altTag-${idx}`,
      location = `location-${idx}`;

    return (
      <React.Fragment>
        <div className="row" key={val.index}>
          <div className="col-md-2">
            <div className="form-group">
              <label>Image:</label>{" "}
              <input
                type="file"
                multiple
                name="img_file"
                placeholder="Source File"
                data-id={idx}
                id={img_file}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Name:</label>{" "}
              <input
                className="form-control"
                type="text"
                name="img_name"
                placeholder="Name"
                id={img_name}
                data-id={idx}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Tag:</label>{" "}
              <input
                className="form-control"
                id={altTag}
                data-id={idx}
                type="text"
                name="altTag"
                placeholder="Tag"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Location:</label>{" "}
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Location"
                id={location}
                data-id={idx}
              />
            </div>
          </div>
          <div className="col-md-1 n-content">
            {idx === 0 ? (
              <span></span>
            ) : (
              <a href="javascript:void(0);" onClick={() => props.delete(val)}>
                Remove
              </a>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  });
};

export default ImageGalleryList;
