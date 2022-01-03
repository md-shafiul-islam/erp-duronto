import { Field } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  esIsFieldError,
  helperIsEmpty,
  isEmptyString,
} from "../../utils/helper/esChecks";

const TextAreaInput = ({ field, ...props }) => {
  return (
    <React.Fragment>
      <textarea {...field} {...props}></textarea>
    </React.Fragment>
  );
};

const CstValidateTextArea = ({
  name,
  clazzName = "",
  placeholder,
  label,
  values,
  checkIsValid,
  errors,
  touched,
  ...props
}) => {
  const getIsValided = () => {
    let err = { cls: "", msg: "", status: false };

    if (values !== undefined && values !== null) {
      if (checkIsValid) {
        err = esIsFieldError(errors, touched, name);
      } else {
        if (!isEmptyString(values[name])) {
          err = esIsFieldError(errors, touched, name);
        }
      }
    }

    if (errors !== undefined && errors !== null) {
      console.log("Cst VF Have Error, ", errors);
      if (errors[name] !== undefined && errors[name] !== null) {
        console.log("Befor Return Cst VF Have Error, ", errors);

        err = { cls: "is-invalid", msg: errors[name], status: true };
      }
    }
    return err;
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <label className="form-label" htmlFor="rejectNote">
            Reject Note
          </label>
          <Field
            className={`form-control ${clazzName} ${getIsValided().cls}`}
            name={name}
            placeholder={placeholder}
            component={TextAreaInput}
            onBlur={(e) => {
              e.preventDefault();
              props.setFieldTouched && props.setFieldTouched(name, true);
            }}
            value={!helperIsEmpty(values) ? values[name] : ""}
          />
          <div className="invalid-feedback">
            {getIsValided() && getIsValided().msg}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstValidateTextArea;
