import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * Component Imports
import MyModal from "../Modal";
import PatchFlowCont from "./PatchFlowCont";
import RenderExercises from "./RenderExercises";
// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
  clearPatchedCircExAndCircuitFromState,
} from "../../Redux/Actions/WorkoutActions";
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { postSession } from "../../Redux/Actions/SessionsActions";
import { setPositionCircuitToX } from "../../Redux/Actions/CircuitActions";
import { patchCircEx } from "../../Redux/Actions/CircExActions";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    loading,
    onSetPositionCircuitToX,
    onPatchCircEx,
    onClearPatchedCircExAndCircuitFromState,
  } = props;
  const folderId = match.params.folderId;
  const workoutId = match.params.workoutId;
  const folderName = match.params.folderName;
  const workoutTitle = match.params.workoutTitle;
  const classes = useStyles();

  const [showForm, setShowForm] = useState(false);
  const [patchRecord, setPatchRecord] = useState(null);

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowForm(true);
  };

  const patchCircToStack = (record) => {
    record.circuit_type = "stack";
    onPatchCircEx(record);
  };

  useEffect(() => {
    workoutId && onFetchWorkout(workoutId);
    workoutId && onFetchFormattedWorkout(workoutId);

    !selectedFolder && onFetchFolder(folderId);
    handleRecentLS();
  }, [workoutId]);

  const handleRecentLS = () => {
    // /workouts/:folderName/:folderId/:workoutTitle/:workoutId
    let path = `/workouts/${folderName}/${folderId}/${workoutTitle}/${workoutId}`;
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

  const handleStartWorkout = () => {
    onClearPatchedCircExAndCircuitFromState();
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

  const handleCircuitPositions = () => {
    const warmUpLength = {
      x: formattedWorkout.warmup.length,
      phase: "Warm Up",
    };
    const bodyLength = { x: formattedWorkout.body.length, phase: "Body" };
    const cDLength = {
      x: formattedWorkout.cool_down.length,
      phase: "Cool Down",
    };

    onSetPositionCircuitToX(warmUpLength);
    onSetPositionCircuitToX(bodyLength);
    onSetPositionCircuitToX(cDLength);
  };

  const handleEditWorkout = () => {
    // "/edit_workout/:folderName/:folderId/:workoutTitle/:workoutId"
    handleCircuitPositions();
    history.push(
      `/edit_workout/${folderName}/${folderId}/${workoutTitle}/${workoutId}`
    );
  };

  return (
    <div>
      <div className={"centerDiv "}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditWorkout}
          // className={"centerDiv pointer button editWorkoutBtn"}
          className={"button editWorkoutBtn"}
        >
          Add Exercise
        </Button>
      </div>
      <div className={"centerDiv"}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartWorkout}
          className={"centerDiv pointer button"}
        >
          Start Workout
        </Button>
      </div>

      <div className="container grid">
        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Warm Up</div>
          {formattedWorkout && (
            <RenderExercises
              phase={formattedWorkout.warmup}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>

        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Body</div>

          {formattedWorkout && (
            <RenderExercises
              phase={formattedWorkout.body}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>

        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Cool Down</div>

          {formattedWorkout && (
            <RenderExercises
              phase={formattedWorkout.cool_down}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>
      </div>
      <MyModal
        showModal={showForm}
        setShowModal={setShowForm}
        component={
          <PatchFlowCont
            setShowForm={setShowForm}
            record={patchRecord}
            workoutId={workoutId}
          />
        }
      />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedFolder: store.folders.selectedFolder,
  selectedWorkout: store.workouts.selectedWorkout,
  formattedWorkout: store.workouts.formattedWorkout,
  loading: store.workouts.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
  onPostSession: (sessionData, sideEffects) =>
    dispatch(postSession(sessionData, sideEffects)),
  onSetPositionCircuitToX: (payload) =>
    dispatch(setPositionCircuitToX(payload)),
  onPatchCircEx: (circData, sideEffects) =>
    dispatch(patchCircEx(circData, sideEffects)),
  onClearPatchedCircExAndCircuitFromState: () =>
    dispatch(clearPatchedCircExAndCircuitFromState()),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Workout));

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.main,
    minHeight: "3rem",
    maxWidth: "20 rem",
    justifyContent: "center",
    alignItems: "center",
    opacity: ".9",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
  button: {
    textSizeAdjust: "1 rem",
    maxWidth: "30rem",
    margin: "2rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
