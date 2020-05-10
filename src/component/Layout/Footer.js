import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        {/*Footer Start*/}
        <footer className="main-footer">
          <strong>
            Copyright © 2014-2019 <a href="/">...</a>.
          </strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block"></div>
        </footer>
        {/*Footer End*/}
      </div>
    );
  }
}

export default Footer;
