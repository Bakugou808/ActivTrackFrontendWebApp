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

  const renderCircuits = (phase) => {
    return phase.map((circuit) => {
      return <Paper elevation={6}>{circuit.ex_name}</Paper>;
    });
  };

  return (
    <div>
      <div className="container grid">
        <div className="container">
          //*Warm up
          <div>
            {formattedWorkout && renderCircuits(formattedWorkout.warmup)}
          </div>
        </div>

        <div className="container">
          //*Body
          <div>{formattedWorkout && renderCircuits(formattedWorkout.body)}</div>
        </div>

        <div className="container">
          //*Cool Down
          <div>
            {formattedWorkout && renderCircuits(formattedWorkout.cool_down)}
          </div>
        </div>
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
