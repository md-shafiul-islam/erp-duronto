import React from "react";
import Dropzone from "react-dropzone";

const FileWithDropZone = (props) => {
  const { fieldName, setData } = props;

  return (
    <React.Fragment>
      <Dropzone
        fileName={fieldName}
        onDropAccepted={(e) => {
          props.setData(fieldName, e);
        }}
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <section>
            <div className="container">
              <div
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <input className="input-area" {...getInputProps()} />
                <a className="upload-area" href="javascript:void(0);">
                  <i class="fas fa-cloud-upload-alt fa-2x"></i>
                </a>
              </div>
              <aside>
                <ul className="file_label">
                  {acceptedFiles.map((file) => (
                    <li key={file.path}>
                      {file.path} - {file.size} bytes
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        )}
      </Dropzone>
    </React.Fragment>
  );
};
export default FileWithDropZone;
