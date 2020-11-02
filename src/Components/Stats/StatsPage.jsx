import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import StatsContainerParent from "./StatsContainerParent";
// * Action Imports
import {
  fetchAllWorkoutsWithStats,
  setWorkoutsStats,
} from "../../Redux/Actions/StatsActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const StatsPage = (props) => {
  const {
    match,
    history,
    onFetchAllWorkoutsWithStats,
    workouts,
    user,
    onSetWorkoutsStats,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    user && onFetchAllWorkoutsWithStats(user.id);
  }, [user]);

  //*   path="/displayStats/:workoutTitle/:workoutId"
  const redirectToWorkoutStats = (workInfo, workoutHash) => {
    history.push(`/displayStats/${workInfo.title}/${workInfo.id}`);
    onSetWorkoutsStats(workoutHash);
  };

  const renderWorkout = () => {
    return workouts.data.map((workoutHash) => {
      let title = Object.keys(workoutHash)[0];
      let subHash = workoutHash[`${title}`];
      let key = Object.keys(subHash)[0];
      let id = subHash[`${key}`][0].workout_id;
      let workInfo = { title: title, id: id };
      return (
        <Paper
          //   key={workout.id}
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
});

const mapDispatchToProps = (dispatch) => ({
  onFetchAllWorkoutsWithStats: (workoutId, sideEffects) =>
    dispatch(fetchAllWorkoutsWithStats(workoutId, sideEffects)),
  onSetWorkoutsStats: (stats) => dispatch(setWorkoutsStats(stats)),
});
export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(StatsPage));

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "absolute",
    width: "70vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  workout: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.dark,
    // minHeight: "3rem",
    height: "4vw",

    maxWidth: "20 rem",
    cursor: "pointer",
    justifyContent: "center",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    opacity: ".8",
    // backgroundColor: "#ffee58",
    // backgroundColor: "#fff179",
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
