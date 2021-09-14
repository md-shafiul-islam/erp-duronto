import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Row, Spinner} from "react-bootstrap";
import * as Yup from "yup";
import { isFieldError } from "../../../../utils/helper/esFunc";

const RejectAction = (params) => {
  const validationScema = () => {
    return Yup.object().shape({
      rejectNote: Yup.string().min(0, 0, "Please, Input Reject Note"),
    });
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          rejectNote: "",
        }}
        validationSchema={validationScema}
        onSubmit={(values) => {
          //   values.publicId = recharge.publicId;
          values.status = 3;
          values.rejectStatus = 1;
          params.action(values);
        }}
      >
        {(props) => (
          <Form>
            <Row className="card-pay-row">
              <Col md={{ span: 8, offset: 2 }}>
                <label className="form-label" htmlFor="rejectNote">
                  Reject Note.{" "}
                </label>
                <textarea
                  placeholder="rejected note here..."
                  name={`rejectNote`}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`rejectNote`}
                  className={`form-control ${
                    isFieldError(props.errors, props.touched, "rejectNote").cls
                  }`}
                >
                  {props.values.rejectNote ? props.values.rejectNote : ""}
                </textarea>
                <div className="invalid-feedback">
                  {isFieldError(props.errors, props.touched, "rejectNote").msg}
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
                <Button className="btn btn-block" type="submit" disabled={props.isSubmitting ? true : false}>
                  Reject Confirm {props.isSubmitting ? <Spinner animation="border" variant="warning" size="sm" /> : ""}
                </Button>{" "}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default RejectAction;
