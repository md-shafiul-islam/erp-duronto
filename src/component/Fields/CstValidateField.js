import React from "react";
import { Field } from "formik";
import { esIsFieldError } from "../../utils/helper/errorAction";

/**
 * 
 * <CstValidateField
    {...props}
    placeholder="Password"
    name="pwd"
    type="password"
  />
 */

/**
 *
 * @param {placeholder, name, label, errors, touched, handleChange, handleBlur} params
 * @returns Validate Field Using BootStarp & Formik
 */
const CstValidateField = ({
  placeholder,
  label = undefined,
  name,
  errors,
  touched,
  handleChange,
  handleBlur,
  type = undefined,
  checkIsValid=true,
  values
}) => {

  const esGetValidation = ()=>{

    if(checkIsValid){
      return esIsFieldError(errors, touched, name).cls;
    }else{

      if(values){

        return values[name] && values[name].length > 0 ? esIsFieldError(errors, touched, name).cls : "";
      }
    }

  }
  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}

      <Field
        placeholder={placeholder}
        type={type ? type : "text"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        className={`form-control ${esGetValidation()}`}
      />
      <div className="invalid-feedback">
        {esIsFieldError(errors, touched, name).msg}
      </div>
    </React.Fragment>
  );
};

export default CstValidateField;
