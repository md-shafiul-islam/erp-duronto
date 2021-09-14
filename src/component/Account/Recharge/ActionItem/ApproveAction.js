import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Row, Spinner} from "react-bootstrap";
import * as Yup from "yup";
import { isFieldError } from "../../../../utils/helper/esFunc";

const ApproveAction = (params) => {
  const validationScema = () => {
    return Yup.object().shape({
      chargeAmount: Yup.number()
        .min(0, 0, "Optional. Please, Input only number")
        .typeError("Charge takes only Number 0-9"),
    });
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          chargeAmount: "",
        }}
        validationSchema={validationScema}
        onSubmit={(values, action, formike) => {
          //   values.publicId = recharge.publicId;
          console.log("Formik Submiting Value ", values, " Actions ", action);
          values.status = 1;
          values.rejectStatus = 0;
          if(!action.isSubmitting){
            params.approveAction(values);
            action.setSubmitting(true);
          }
          
        }}
      >
        {({handleChange, handleBlur, errors, touched, isSubmitting}) => (
          <Form>
            <Row className="card-pay-row">
              <Col md={{ span: 8, offset: 2 }}>
                <label className="form-label" htmlFor="chargeAmount">
                  Charge Amount.{" "}
                </label>
                <Field
                  placeholder="Charge Amount If have"
                  name={`chargeAmount`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={`chargeAmount`}
                  className={`form-control ${
                    isFieldError(errors, touched, "chargeAmount")
                      .cls
                  }`}
                />
                <div className="invalid-feedback">
                  {
                    isFieldError(errors, touched, "chargeAmount")
                      .msg
                  }
                </div>
              </Col>
            </Row>
            <Row className="approve-action-area">
              <Col md={{ span: 4, offset: 2 }}>
                <Button
                  className="btn btn-block btn-danger"
                  onClick={() => {
                    params.cancelAction(false);
                  }}
                >
                  Cancel
                </Button>
              </Col>

              <Col md={6}>
                <Button className="btn btn-block btn-success" type="submit" disabled={isSubmitting ? true : false}>
                  Confirm Approval {isSubmitting ? <Spinner animation="border" variant="warning" size="sm" /> : ""}
                </Button>{" "}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ApproveAction;
