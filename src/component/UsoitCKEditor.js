import React from "react";
import CKEdito from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

function UsoitCKEditor(props) {
  return (
    <div className="content out-line-only">
      <CKEdito
        onInit={(editor) => {
          // Insert the toolbar before the editable area.
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        editor={DecoupledEditor}
        onChange={props.onChange}
        data={props.data}
      />
    </div>
  );
}

export default UsoitCKEditor;
