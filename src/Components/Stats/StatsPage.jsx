import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import StatsContainerParent from "./StatsContainerParent";
// * Action Imports
import {
  fetchAllWorkoutsWithStats,
  setWorkoutsStats,
  fetchWorkoutsStatsByEx,
  fetchWorkoutsStatsByTotalReps,
} from "../../Redux/Actions/StatsActions";
// * Material Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const StatsPage = (props) => {
  const {
    history,
    onFetchAllWorkoutsWithStats,
    workouts,
    user,
    onFetchWorkoutsStatsByTotalReps,
    onFetchWorkoutsStatsByEx,
    device,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    user && onFetchAllWorkoutsWithStats(user.id);
  }, [user]);

  const redirectToWorkoutStats = (workInfo, workoutHash) => {
    history.push(`/displayStats/${workInfo.title}/${workInfo.id}`);
    onFetchWorkoutsStatsByTotalReps(workInfo.id, 20);
    onFetchWorkoutsStatsByEx(workInfo.id, 20);
  };

  const renderWorkout = () => {
    return workouts.data.map((workoutHash) => {
      let title = Object.keys(workoutHash)[0];
      let subHash = workoutHash[`${title}`];

      let id = subHash.workout_id;
      let workInfo = { title: title, id: id };
      return (
        <Paper
          key={id}
          onClick={() => redirectToWorkoutStats(workInfo, workoutHash)}
          className={classes.workout}
          elevation={6}
        >
          {title}
        </Paper>
      );
    });
  };

  return (
    <div>
      <div className={"container grid graphs"}>
        {workouts.data && renderWorkout()}
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  workouts: store.stats.allWorkoutsWithStats,
  user: store.user.user,
  device: store.device.device,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchAllWorkoutsWithStats: (workoutId, sideEffects) =>
    dispatch(fetchAllWorkoutsWithStats(workoutId, sideEffects)),
  onFetchWorkoutsStatsByTotalReps: (workoutId, numOfSessions, sideEffects) =>
    dispatch(
      fetchWorkoutsStatsByTotalReps(workoutId, numOfSessions, sideEffects)
    ),
  onFetchWorkoutsStatsByEx: (workoutId, numOfSessions, sideEffects) =>
    dispatch(fetchWorkoutsStatsByEx(workoutId, numOfSessions, sideEffects)),
});
export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(StatsPage));

const useStyles = makeStyles((theme) => ({
  workout: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.dark,
    height: "4vw",
    maxWidth: "20 rem",
    cursor: "pointer",
    justifyContent: "center",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    opacity: ".8",
  },
  addNew: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));
