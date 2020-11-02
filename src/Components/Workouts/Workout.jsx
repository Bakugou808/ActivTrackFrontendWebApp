import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
import { normalizeString } from "./AttributeFields";
// * Component Imports
import SetIconUi from "./SetIconUi";
import MyModal from "../Modal";
import PatchFlowCont from "./PatchFlowCont";
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

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

// * create a new button -> onClick will open a form field in the button --> onSubmit will patch the Circuit and change the value -> place the button in front of the Paper tag

export const renderExercises = (phase, handlePatch) => {
  return phase.map((circuit) => {
    let keyName = Object.keys(circuit)[0];
    let arr = circuit[keyName];
    if (arr[0].circuit_type === "circuit") {
      return renderCirc(arr, handlePatch);
    } else {
      return arr.map((record) => {
        return (
          <div className={"exContainer"}>
            <SetIconUi
              setCount={record.circuit_sets}
              circuitId={record.circuit_id}
            />
            <div className="exStack">
              <Paper
                elevation={6}
                className={"exPaper pointer"}
                onClick={() => handlePatch(record)}
              >
                <p className="exTitle">{record.ex_name}</p>
                <p className={"exPaperAtts"}>{renderExDetails(record)}</p>
              </Paper>
            </div>
          </div>
        );
      });
    }
  });
};

const renderExDetails = (ex) => {
  const obj = ex.circuit_exercise_attributes;
  const arr = [];
  for (const [key, val] of Object.entries(obj)) {
    let str = `${normalizeString(key)}: ${val}`;
    arr.push(str);
  }
  return arr.join(", ");
};

export const renderCirc = (arr, handlePatch) => {
  const setCount = arr[0].circuit_sets;
  const circuitId = arr[0].circuit_id;
  return (
    <div className={"exContainer"}>
      <SetIconUi setCount={setCount} circuitId={circuitId} />
      <div className="exCircuit">
        {arr.map((ex) => {
          return (
            <Paper
              elevation={6}
              className={"exPaper pointer"}
              onClick={() => handlePatch(ex)}
            >
              <p className="exTitle">{ex.ex_name}</p>
              <p className={"exPaperAtts"}>{renderExDetails(ex)}</p>
            </Paper>
          );
        })}
      </div>
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
    loading,
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
      <div className={"centerDiv"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartWorkout}
          className={"centerDiv pointer button"}
        >
          Start Workout
        </Button>
      </div>
      <div className="container grid">
        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Warm Up</div>
          <div>
            {formattedWorkout &&
              renderExercises(formattedWorkout.warmup, handlePatch)}
          </div>
        </div>

        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Body</div>

          <div>
            {formattedWorkout &&
              renderExercises(formattedWorkout.body, handlePatch)}
          </div>
        </div>

        <div className={classes.paper}>
          <div className={"centerDiv phaseTitle"}>Cool Down</div>

          <div>
            {formattedWorkout &&
              renderExercises(formattedWorkout.cool_down, handlePatch)}
          </div>
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
