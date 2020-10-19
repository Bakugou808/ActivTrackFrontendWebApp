import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

export const EndWorkout = () => {
  return <div>Congrats on finishing!</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndWorkout);
