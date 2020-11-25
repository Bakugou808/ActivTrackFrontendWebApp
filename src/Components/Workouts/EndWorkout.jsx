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
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    onFetchWorkoutsStatsByTotalReps(workoutId, 2);
    onFetchWorkout(workoutId);
  }, []);

  return (
    <div className="container grid">
      {showStats ? (
        <StatsContainer />
      ) : (
        <div>
          <div>Congrats on finishing!</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowStats(true)}
          >
            View Stats
          </Button>
        </div>
      )}
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
