import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// *Component Imports
import CircFlowCont from "./CircFlowCont";
// * Action Imports
import {
  patchCircEx,
  increasePositionCircEx,
  clearSelectedCircEx,
  clearPosValCircEx,
} from "../../Redux/Actions/CircExActions";
import { postWorkCircuit } from "../../Redux/Actions/WorkCircuitsActions";
import { clearSelectedExercise } from "../../Redux/Actions/ExerciseActions";
import { fetchFormattedWorkout } from "../../Redux/Actions/WorkoutActions";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const CircuitFormPt2 = (props) => {
  const {
    positionCircEx,
    circuit_type,
    selectedExercise,
    selectedCircEx,
    selectedWorkout,
    selectedCircuit,
    onPatchCircEx,
    onIncreasePositionCircEx,
    onPostWorkCircuit,
    onClearSelectedCircEx,
    onClearSelectedExercise,
    onClearPosValCircEx,
    onFetchFormattedWorkout,
    setShowModal,
  } = props;
  const classes = useStyles();
  const [atts, setAtts] = useState({});
  const [addEx, setAddEx] = useState(false);

  useEffect(() => {
    selectedCircEx && setAtts(selectedCircEx.ex_attributes);
  }, [selectedCircEx]);

  const handleChange = (e) => {
    const obj = { [e.target.name]: e.target.value };
    setAtts((prev) => ({ ...prev, ...obj }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const circExData = {
      circuit_exercise: { id: selectedCircEx.id, ex_attributes: { ...atts } },
    };
    onPatchCircEx(circExData, handlePostWorkCircuit);
  };

  const handlePostWorkCircuit = () => {
    const data = {
      workout_circuit: {
        workout_id: selectedWorkout.id,
        circuit_id: selectedCircuit.id,
      },
    };
    const sideEffects = () => {
      onClearPosValCircEx();
      onFetchFormattedWorkout(selectedWorkout.id);
      setShowModal(false);
    };
    onPostWorkCircuit(data, sideEffects);
  };

  const handleAddEx = () => {
    const circExData = {
      circuit_exercise: { id: selectedCircEx.id, ex_attributes: { ...atts } },
    };
    const sideEffects = () => {
      onIncreasePositionCircEx();
      onClearSelectedCircEx();
      onClearSelectedExercise();
      setAddEx(true);
    };
    onPatchCircEx(circExData, sideEffects);
  };
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const renderAttFields = () => {
    return Object.keys(atts).map((att) => {
      switch (att) {
        case "restPeriod":
          return (
            <TextField
              id="outlined-basic"
              label={"Rest Period"}
              name={att}
              value={atts[att]}
              onChange={handleChange}
              variant="outlined"
            />
          );
        case "holdTime":
          return (
            <TextField
              id="outlined-basic"
              label={"Hold Time"}
              name={att}
              value={atts[att]}
              onChange={handleChange}
              variant="outlined"
            />
          );
        case "reps":
          return (
            <TextField
              id="outlined-basic"
              type="number"
              //! min={"1"} doesn't apply to MatUi
              defaultValue={1}
              label={"Reps"}
              name={att}
              value={atts[att]}
              onChange={handleChange}
              variant="outlined"
            />
          );
        default:
          return (
            <TextField
              id="outlined-basic"
              label={toTitleCase(att)}
              name={att}
              value={atts[att]}
              onChange={handleChange}
              variant="outlined"
            />
          );
      }
    });
  };

  return (
    <div className={classes.root}>
      {!addEx ? (
        <Grid container spacing={3}>
          {circuit_type === "circuit" && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {selectedExercise
                  ? `Exercise #${positionCircEx}: ${selectedExercise.exercise_name}`
                  : `Exercise #${positionCircEx} `}
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="container grid">
                Set Default Values For Attributes
                {atts && renderAttFields()}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              className={classes.paper}
              onClick={handleSubmit}
            >
              Save
            </Button>
            {circuit_type === "circuit" && (
              <Button
                variant="outlined"
                className={classes.paper}
                onClick={handleAddEx}
              >
                Add Exercise
              </Button>
            )}
          </Grid>
        </Grid>
      ) : (
        <CircFlowCont setShowModal={setShowModal} circuit_type="circuit" />
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedExercise: store.exercises.selectedExercise,
  selectedCircEx: store.circExs.selectedCircEx,
  selectedWorkout: store.workouts.selectedWorkout,
  selectedCircuit: store.circuits.selectedCircuit,
  positionCircEx: store.circExs.position,
  phase: store.circuits.phase,
});

const mapDispatchToProps = (dispatch) => ({
  onPatchCircEx: (circExData, handlePostWorkCircuit) =>
    dispatch(patchCircEx(circExData, handlePostWorkCircuit)),
  onPostWorkCircuit: (workCircData, sideEffects) =>
    dispatch(postWorkCircuit(workCircData, sideEffects)),
  onIncreasePositionCircEx: () => dispatch(increasePositionCircEx()),
  onClearSelectedCircEx: () => dispatch(clearSelectedCircEx()),
  onClearSelectedExercise: () => dispatch(clearSelectedExercise()),
  onClearPosValCircEx: (data, sideEffects) =>
    dispatch(clearPosValCircEx(data, sideEffects)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CircuitFormPt2);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));
