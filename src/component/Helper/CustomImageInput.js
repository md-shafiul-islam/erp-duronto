import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: undefined,
    imagePreviewUrl: undefined,
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file);
    }
  }

  showPreloadImage() {
    const { errorMessage, classes } = this.props;
    const { name } = this.props.field;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;

    if (errorMessage) {
      comp = <Icon style={{ fontSize: 36 }}>error_outline</Icon>;
    } else if (file) {
      comp = (
        <img className={classes.avatarThumb} src={imagePreviewUrl} alt="..." />
      );
    } else {
      comp = <Icon style={{ fontSize: 36 }}>folder</Icon>;
    }
    return comp;
  }

  componentDidMount() {
    console.log(this.fileUpload.current);
  }

  render() {
    const { errorMessage, title, classes } = this.props;
    const { name } = this.props;

    return (
      <div className="form-group">
        <input
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
          // onBlur={onBlur}
          className="form-control"
        />
        <Typography className="form-control" variant="h5">
          {title}
        </Typography>

        {errorMessage ? (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    );
  }
}

export default CustomImageInput;
