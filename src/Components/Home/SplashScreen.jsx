import React from "react";
import { connect } from "react-redux";

export const SplashScreen = () => {
  return (
    <div>
      <h3>SPLASH PAGE... THINGS ARE LOADING...</h3>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
