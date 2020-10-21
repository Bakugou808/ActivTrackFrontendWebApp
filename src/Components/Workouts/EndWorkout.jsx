import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports

// * Material UI Imports

// * Action Imports
import { fetchWorkoutsStats } from "../../Redux/Actions/StatsActions";

export const EndWorkout = (props) => {
  const { history, match, onFetchWorkoutsStats, stats } = props;
  const workoutId = match.params.workoutId;

  useEffect(() => {
    onFetchWorkoutsStats(workoutId);
  }, []);

  const renderStatCards = () => {};

  return <div className="container grid">Congrats on finishing!</div>;
};

const mapStateToProps = (store) => ({
  stats: store.stats.workoutsStats,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkoutsStats: (workoutId) => dispatch(fetchWorkoutsStats(workoutId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EndWorkout);
