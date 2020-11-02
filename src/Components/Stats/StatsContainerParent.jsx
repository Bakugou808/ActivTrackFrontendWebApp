import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import StatsContainer from "./StatsContainer";

export const StatsContainerParent = (props) => {
  const { match, history } = props;

  return <div>I am stats container Parent</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainerParent)
);
