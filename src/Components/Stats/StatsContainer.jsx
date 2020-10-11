import React from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
export const StatsContainer = () => {
  return <div>I am a Stats Container</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
);
