import React from "react";
import { connect } from "react-redux";

export const SplashScreen = (props) => {
  const { history } = props;
  const handleRedirect = (path) => {
    history.push(`/${path}`);
  };
  return (
    <div>
      <div className="loginSignupAbout">
        <div className="aboutLinks" onClick={() => handleRedirect("signin")}>
          Sign in
        </div>
        <div className="aboutLinks" onClick={() => handleRedirect("about")}>
          About
        </div>
        <div className="aboutLinks" onClick={() => handleRedirect("signup")}>
          Signup
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
