import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import { AuthHOC } from "../AuthHOC";
import StatsContainer from "../Stats/StatsContainer";
// * Material UI Imports
import { Button } from "@material-ui/core";

// * Action Imports
import { fetchWorkoutsStatsByTotalReps } from "../../Redux/Actions/StatsActions";
import { fetchWorkout } from "../../Redux/Actions/WorkoutActions";

export const EndWorkout = (props) => {
  const {
    history,
    match,
    onFetchWorkoutsStatsByTotalReps,
    stats,
    onFetchWorkout,
  } = props;
  const workoutId = match.params.workoutId;
  const workoutTitle = match.params.workoutTitle;
  const folderId = match.params.folderId;
  const folderName = match.params.folderName;

  useEffect(() => {
    onFetchWorkoutsStatsByTotalReps(workoutId, 2);
    onFetchWorkout(workoutId);
    handleRecentLS();
  }, []);

  const handleRecentLS = () => {
    let path = `/workouts/${folderName}/${folderId}/${workoutTitle}/${workoutId}`;
    console.log("modified local storage Recent Workouts");

    if (localStorage.getItem("recentWorkouts")) {
      let recentWorkouts = JSON.parse(localStorage.getItem("recentWorkouts"));
      if (recentWorkouts.includes(path)) {
        recentWorkouts = recentWorkouts.filter((val) => val != path);
        recentWorkouts.unshift(path);
      } else if (!(recentWorkouts.length > 9)) {
        recentWorkouts.unshift(path);
      } else {
        recentWorkouts.pop().unshift(path);
      }
      recentWorkouts = JSON.stringify(recentWorkouts);
      localStorage.setItem("recentWorkouts", recentWorkouts);
    }
  };

  const redirectToStats = () => {
    history.push(`/displayStats/${workoutTitle}/${workoutId}`);
  };

  return (
    <div className="endWorkout">
      <div className="congratsMsg">Congrats on finishing!</div>
      <div className="goToStatBtnCon">
        <Button
          className="goToStatBtn"
          variant="contained"
          color="primary"
          onClick={() => redirectToStats()}
        >
          View Stats
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  stats: store.stats.workoutsStats,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkoutsStatsByTotalReps: (workoutId, numOfSessions) =>
    dispatch(fetchWorkoutsStatsByTotalReps(workoutId, numOfSessions)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(EndWorkout)
);
