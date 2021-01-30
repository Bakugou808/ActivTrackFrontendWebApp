import { ErrorOutlineOutlined } from "@material-ui/icons";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Action Imports
import {
  fetchAuthorizeUserSuccess,
  fetchAuthorizeUserFailure,
} from "../Redux/Actions/AuthActions";
import {
  setDisplayOrientation,
  setDevice,
} from "../Redux/Actions/DeviceActions";

// Redux free Fetch
const token = () => localStorage.getItem("token");

const URL = `https://activtrack-api.herokuapp.com/`;

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

export const AuthHOC = (WrappedComponent) => {
  class AuthHOC extends React.Component {
    state = {
      authorized: false,
      pending: true,
    };

    detectListener = () => {
      window.addEventListener("resize", this.detect);
    };

    detect = () => {
      this.props.onSetDevice();
      this.props.onSetOrientation();
    };

    renderAuth = () => {
      if (this.state.pending) {
        return null;
      } else if (this.state.authorized) {
        return <WrappedComponent {...this.props} />;
      } else {
        this.props.history.push("/signin");
      }
    };

    componentDidMount() {
      this.checkLogin();
    }

    checkLogin = () => {
      if (!localStorage.getItem("token")) {
        this.setState({ pending: false, authorized: false });
      } else {
        fetch(`${URL}/authorize`, {
          headers: headers(),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              this.setState({ pending: false, authorized: false });
              this.props.history.push("/signin");
              this.props.onFetchAuthorizeUserFailure(data.error);
            } else {
              localStorage.setItem("token", data.jwt);
              this.setState({ authorized: true, pending: false });
              this.props.onFetchAuthorizeUserSuccess(data);
            }
          });
      }
    };

    render() {
      return (
        <div>
          <div>{this.detectListener()}</div>
          {this.renderAuth()}
        </div>
      );
    }
  }

  const mapStateToProps = (store) => ({});

  const mapDispatchToProps = (dispatch) => ({
    onFetchAuthorizeUserSuccess: (user) =>
      dispatch(fetchAuthorizeUserSuccess(user)),
    onFetchAuthorizeUserFailure: (error) =>
      dispatch(fetchAuthorizeUserFailure(error)),
    onSetDevice: () => dispatch(setDevice()),
    onSetOrientation: () => dispatch(setDisplayOrientation()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthHOC);
};
