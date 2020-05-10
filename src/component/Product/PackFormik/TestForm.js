import React, { Component, createRef } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import FileWithDropZone from "../../Helper/FileWithDropZone";
import { EditorState, Editor } from "draft-js";
import UsoitCKEditor from "../../UsoitCKEditor";

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
};

const dropzoneRef = createRef();

const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
};

class TestForm extends Component {
  handleSubmit = (e) => {
    console.log("run File Change: ");

    console.log(JSON.stringify(e, null, 2));
  };

  render() {
    return (
      <div className="container" style={{ marginLeft: 380, marginTop: 20 }}>
        <Formik
          initialValues={{
            editor: "",
          }}
          onSubmit={(values) => {
            values.preventDefault();
            alert(JSON.stringify(values, null, 2));
            console.log(values);
          }}
          render={(props) => (
            <React.Fragment>
              <div className="col-md-12">
                <form onSubmit={props.onSubmit}>
                  <div className="form-group">
                    <label>Editor</label>

                    <UsoitCKEditor
                      onChange={(e, editor) => {
                        console.log(editor.getData());
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                </form>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

export default TestForm;
