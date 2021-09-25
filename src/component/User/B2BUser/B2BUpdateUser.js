import React, { Component } from "react";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import * as Yup from "yup";
import CstValidateField from "../../Fields/CstValidateField";
import WrapperCardContent from "../../Layout/WrapperCardContent";
import { isEmptyString } from "../../../utils/helper/errorAction";

class B2BUpdateUser extends Component {
  changeAction = (item) => {
    console.log("Selected B2B Client");
  };

  validationSchema = ()=>{

    return Yup.object().shape({
      dCommission: Yup.number().typeError("Please Enter Number"),
      inCommission: Yup.number().typeError("Please Enter Number")
    })
  }

  render() {
    return (
      <React.Fragment>
        <WrapperCardContent title="All B2B Update User">
          <Row className="mt-3 mb-3">
            <Col md={8}>
              <Select
                placeholder="Selcet One B2B User ID"
                name="b2bUserId"
                onChange={(item) => {
                  this.changeAction(item);
                }}
              />
            </Col>
          </Row>
          <Formik
            initialValues={{
              dCommission: "",
              inCommission: "",
            }}

            validationSchema={this.validationSchema}
          >
            {(props) => {
              return (
                <Form>
                  <Row className="mt-3 mb-3">
                    <Col md={6}>
                      <CstValidateField
                        {...props}
                        name="dCommission"
                        placeholder="Domestic Commission"
                        checkIsValid={false}
                      />
                    </Col>
                    <Col md={6}>
                      <CstValidateField
                        {...props}
                        name="inCommission"
                        placeholder="International Commission"
                        checkIsValid={false}

                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </WrapperCardContent>
      </React.Fragment>
    );
  }
}

export default B2BUpdateUser;
