import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";

const WalletWithDrawApproveForm = (params) => {
  return (
    <React.Fragment>
      <Formik>
        {(props) => {
          return (
            <Form>
              <Row>
                <Col md={6}>
                    <Field />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default WalletWithDrawApproveForm;
