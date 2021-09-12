import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";
import Thumb from "./Thumb";

const ImageField = (params) => {

  const [thumbFile, setThumbFile] = useState(undefined)
  
  let {    
    rowClazz,
    name,
    errorClazz,
    changeHandler,
    errorMsg,
    label,
    thumArea,
  } = params;

   return (
    <Row className={rowClazz}>
      <Col md={8} className="add-image">
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
        <input
          className={`form-control cst-fille ${errorClazz}`}
          type="file"
          name={name}
          id={name}
          onChange={(e)=>{
            changeHandler(e);     
            setThumbFile(e.currentTarget&&e.currentTarget.files[0])
          }}
        />
        <div className="invalid-feedback">{errorMsg}</div>
      </Col>
      <Col md={4}>
        <Thumb file={thumbFile} contentClass={thumArea} />
      </Col>
    </Row>
  );
};

export default ImageField;
