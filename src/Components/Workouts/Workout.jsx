import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
} from "../../Redux/Actions/WorkoutActions";
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { postSession } from "../../Redux/Actions/SessionsActions";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";

export const renderExercises = (phase) => {
  return phase.map((circuit) => {
    let keyName = Object.keys(circuit)[0];
    let arr = circuit[keyName];
    if (arr[0].circuit_type === "circuit") {
      return renderCirc(arr);
    } else {
      return arr.map((record) => {
        return (
          <div key={record.id} className="container grid stack">
            <Paper elevation={6}> {record.ex_name} </Paper>{" "}
          </div>
        );
      });
    }
  });
};

export const renderCirc = (arr) => {
  return (
    <div className="container grid circuit">
      {arr.map((ex) => {
        return (
          <Paper key={ex.id} elevation={6}>
            {" "}
            {ex.ex_name}{" "}
          </Paper>
        );
      })}
    </div>
  );
};

const Workout = (props) => {
  const {
    history,
    match,
    onFetchFormattedWorkout,
    onFetchWorkout,
    onFetchFolder,
    selectedFolder,
    selectedWorkout,
    formattedWorkout,
    onPostSession,
  } = props;
  const folderId = match.params.folderId;
  const workoutId = match.params.workoutId;
  const folderName = match.params.folderName;
  const workoutTitle = match.params.workoutTitle;

  useEffect(() => {
    workoutId && onFetchWorkout(workoutId);
    workoutId && onFetchFormattedWorkout(workoutId);

    !selectedFolder && onFetchFolder(folderId);
  }, [workoutId]);

  const handleStartWorkout = () => {
    const sideEffects = (sessionId) => {
      history.push(
        `/start_workouts/${folderName}/${folderId}/${workoutTitle}/${workoutId}/${sessionId}`
      );
    };

    // post session here then patch at the end of workout
    const count =
      selectedWorkout.sessions.length > 0
        ? selectedWorkout.sessions.length + 1
        : 1;
    const sessionData = {
      session: {
        workout_id: workoutId,
        count: count,
        active_time: 0,
        rest_time: 0,
        total_time: 0,
      },
    };
    onPostSession(sessionData, sideEffects);
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartWorkout}
        >
          Start Workout
        </Button>
      </div>
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
  onPostSession: (sessionData, sideEffects) =>
    dispatch(postSession(sessionData, sideEffects)),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Workout));
