import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
} from "../../Redux/Actions/WorkoutActions";
import { fetchFolder } from "../../Redux/Actions/FolderActions";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const Workout = (props) => {
  const {
    history,
    match,
    onFetchFormattedWorkout,
    onFetchWorkout,
    onFetchFolder,
    selectedFolder,
    selectedWorkout,
    formattedWorkout,
  } = props;
  const folderId = match.params.folderId;
  const workoutId = match.params.workoutId;

  useEffect(() => {
    workoutId && onFetchWorkout(workoutId);
    workoutId && onFetchFormattedWorkout(workoutId);

    !selectedFolder && onFetchFolder(folderId);
  }, [workoutId]);

  const renderExercises = (phase) => {
    return phase.map((circuit) => {
      let keyName = Object.keys(circuit)[0];
      let arr = circuit[keyName];
      if (arr[0].circuit_type === "circuit") {
        return renderCirc(arr);
      } else {
        return arr.map((record) => {
          return (
            <div className="container grid stack">
              <Paper elevation={6}> {record.ex_name} </Paper>{" "}
            </div>
          );
        });
      }
    });
  };

  const renderCirc = (arr) => {
    return (
      <div className="container grid circuit">
        {arr.map((ex) => {
          return <Paper elevation={6}> {ex.ex_name} </Paper>;
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="container grid">
        <Paper elevation={3} className="container">
          //*Warm up
          <div>
            {formattedWorkout && renderExercises(formattedWorkout.warmup)}
          </div>
        </Paper>

        <Paper elevation={6} className="container">
          //*Body
          <div>
            {formattedWorkout && renderExercises(formattedWorkout.body)}
          </div>
        </Paper>

        <Paper elevation={6} className="container">
          //*Cool Down
          <div>
            {formattedWorkout && renderExercises(formattedWorkout.cool_down)}
          </div>
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedFolder: store.folders.selectedFolder,
  selectedWorkout: store.workouts.selectedWorkout,
  formattedWorkout: store.workouts.formattedWorkout,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Workout));
