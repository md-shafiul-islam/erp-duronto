import React, { Component } from "react";
import NoAction from "../Helper/NoAction";
import { connect } from "react-redux";
import { logOut } from "../../actions/securityActions";
import { PropTypes } from "prop-types";

class Header extends Component {
  state = {
    redirectStatus: false,
  };
  actionLogout = () => {
    this.props.logOut();
    this.setState({ redirectStatus: true });
    window.location.reload(false);
  };

  render() {
    let { validToken } = this.props.security;

    let clasnameHeader = "";
    if (validToken) {
      clasnameHeader =
        "main-header navbar navbar-expand navbar-white navbar-light visibale-active";
    } else {
      clasnameHeader =
        "main-header navbar navbar-expand navbar-white navbar-light visibale-inactive";
    }

    return (
      <div>
        {/* navbar */}

        <nav className={clasnameHeader}>
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="javascript:void(0);"
                onClick={NoAction}
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
          <form className="form-inline ml-3">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown">
                {" "}
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a className="dropdown-item">
                  {" "}
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="/dist/img/user1-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel{" "}
                        <span className="float-right text-sm text-danger">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>{" "}
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  {" "}
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="/dist/img/user8-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce{" "}
                        <span className="float-right text-sm text-muted">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>{" "}
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  {" "}
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="/dist/img/user3-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester{" "}
                        <span className="float-right text-sm text-warning">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>{" "}
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item dropdown-NoActionter">
                  See All Messages
                </a>
              </div>
            </li>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown">
                {" "}
                <i className="far fa-bell" />{" "}
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  {" "}
                  <i className="fas fa-envelope mr-2" /> 4 new messages{" "}
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  {" "}
                  <i className="fas fa-users mr-2" /> 8 friend requests{" "}
                  <span className="float-right text-muted text-sm">
                    12 hours
                  </span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  {" "}
                  <i className="fas fa-file mr-2" /> 3 new reports{" "}
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item dropdown-NoActionter">
                  See All Notifications
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown">
                {" "}
                <i className="fas fa-users-cog" />
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">User</span>
                <div className="dropdown-divider" />
                <a href="/user/details" className="dropdown-item">
                  <i className="fas fa-user mr-2" />
                  View Profile
                </a>
                <div className="dropdown-divider" />
                {validToken ? (
                  <a
                    href={`javascript:void(0);`}
                    onClick={this.actionLogout}
                    className="dropdown-item"
                  >
                    <i className="fas fa-lock" /> Log Out
                  </a>
                ) : (
                  <a href={`/login`} className="dropdown-item">
                    <i className="fas fa-lock" /> Log In
                  </a>
                )}
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
              >
                {" "}
                <i className="fas fa-th-large" />
              </a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
      </div>
    );
  }
}

Header.prototypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});
export default connect(mapStateToProps, { logOut })(Header);
