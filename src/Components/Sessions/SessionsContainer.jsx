import React from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

export const SessionsContainer = () => {
  return <div>I am a Sessions Container</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(SessionsContainer)
);
