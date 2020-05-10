import React from "react";
import Select from "react-select";
//import FileInput from "@brainhubeu/react-file-input";

const cuntOptions = [
  { value: "1", label: "Bangladesh" },
  { value: "2", label: "USA" },
  { value: "3", label: "UAE" },
];

const packCatOptions = [
  { value: "1", label: "Basic" },
  { value: "2", label: "Standerd" },
  { value: "3", label: "Premium" },
];

const ItarnarysList = (props) => {
  console.log("Props: ");
  console.log(props);
  console.log("After Props: !!!!! ");
  return props.itarnarys.map((val, idx) => {
    let dayOrDurations = `dayOrDurations-${idx}`,
      heading = `heading-${idx}`,
      hightLightText = `hightLightText-${idx}`,
      description = `description${idx}`,
      includedText = `includedText-${idx}`,
      excludedText = `excludedText-${idx}`,
      category = `category-${idx}`,
      hotelText = `hotelText-${idx}`,
      itn_country = `itn_country-${idx}`,
      city = `city-${idx}`,
      vendor = `vendor-${idx}`,
      file = `file-${idx}`,
      fil2 = `fil2-${idx}`,
      expDate = `expDate-${idx}`;

    console.log("Itarnarys: " + val.index);

    const cIndex = idx + 1;
    console.log(cIndex);

    return (
      <React.Fragment>
        <div className="row pading-top" key={val.index}>
          <div className="col-md-11">
            <fieldset>
              <legend className="area-outlin">Day: {cIndex}</legend>
              <input
                type="hidden"
                name="dayOrDurations"
                data-id={idx}
                id={dayOrDurations}
                value={cIndex}
              />
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Heading:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="heading"
                      data-id={idx}
                      id={heading}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>HightLight:</label>
                    <textarea
                      className="form-control hightLightText"
                      name="hightLightText"
                      placeholder="Itarnary Heading"
                      data-id={idx}
                      id={hightLightText}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      data-id={idx}
                      id={description}
                      className="form-control description"
                      name="description"
                      placeholder="Itarnary Description"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Included:</label>
                    <textarea
                      data-id={idx}
                      id={includedText}
                      className="form-control editor"
                      name="includedText"
                      placeholder="Itarnary Heading"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Excluded:</label>
                    <textarea
                      data-id={idx}
                      id={excludedText}
                      className="form-control editor"
                      name="excludedText"
                      placeholder="Itarnary Heading"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Hotel Category:</label>
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      name="category"
                      data-id={idx}
                      id={includedText}
                      options={packCatOptions}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Hotel Name:</label>{" "}
                    <input
                      data-id={idx}
                      id={hotelText}
                      className="form-control"
                      type="text"
                      name="hotelText"
                      placeholder="Itarnary Heading"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country:</label>

                    <Select
                      name="itn_country"
                      isClearable={true}
                      isSearchable={true}
                      options={packCatOptions}
                      data-id={idx}
                      id={itn_country}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City:</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      placeholder="City"
                      data-id={idx}
                      id={city}
                    />
                  </div>
                </div>
              </div>

              <fieldset className="mp-10">
                <legend className="area-outlin">Source Info</legend>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Vendor:</label>{" "}
                      <Select
                        name="vendor"
                        isClearable={true}
                        isSearchable={true}
                        options={packCatOptions}
                        data-id={idx}
                        id={vendor}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Source File:</label>{" "}
                      <input
                        type="file"
                        multiple
                        name="file"
                        placeholder="Source File"
                        data-id={idx}
                        id={file}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Source File:</label>

                      <input
                        type="file"
                        multiple
                        data-id={idx}
                        id={file}
                        name="fil2"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Exp Date:</label>
                      <input
                        className="form-control"
                        type="date"
                        name="expDate"
                        placeholder="Exp Date"
                        data-id={idx}
                        id={expDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="row" id="jsonLoadVendor">
                  {/* Json data load here */}
                </div>
              </fieldset>
              {/*  */}
            </fieldset>
          </div>
          <div className="col-md-1 n-content">
            {idx === 0 ? (
              <span>&nbsp;</span>
            ) : (
              <a href="javascript:void(0);" onClick={() => props.delete(val)}>
                Remove
              </a>
            )}
          </div>
        </div>
        {/* Item loop End */}
      </React.Fragment>
    );
  });
};

export default ItarnarysList;
