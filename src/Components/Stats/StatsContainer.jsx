import React from "react";
import { connect } from "react-redux";

export const StatsContainer = () => {
  return <div>I am a Stats Container</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
