import React from "react";
import Select from "react-select";

const cuntOptions = [
  { value: "1", label: "Bangladesh" },
  { value: "2", label: "USA" },
  { value: "3", label: "UAE" },
];

const PackCountryList = (props) => {
  return props.countries.map((val, idx) => {
    let countryId = `country-${idx}`;
    console.log("current Index: " + idx);

    console.log("Current Country List: " + cuntOptions);
    return (
      <React.Fragment>
        <div className="col-md-4" key={val.index}>
          <div className="form-group">
            <label htmlFor="country">Country:</label>

            <Select
              isClearable={true}
              isSearchable={true}
              name="country"
              options={cuntOptions}
              id={countryId}
              data-id={idx}
              onChange={() => props.handelSelectChange}
            />
          </div>
        </div>
        <div className="col-md-1 top-padding">
          {idx === 0 ? (
            <span>&nbsp;</span>
          ) : (
            <a href="javascript:void(0);" onClick={() => props.delete(val)}>
              Remove
            </a>
          )}
        </div>
      </React.Fragment>
    );
  });
};

export default PackCountryList;
