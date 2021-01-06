import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
// *Component Imports
// * Action Imports
import {
  patchCircEx,
  clearSelectedCircEx,
  clearPosValCircEx,
} from "../../Redux/Actions/CircExActions";
import { clearSelectedExercise } from "../../Redux/Actions/ExerciseActions";
import { fetchFormattedWorkout } from "../../Redux/Actions/WorkoutActions";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Paper, Button } from "@material-ui/core";

export const PatchRecordPt2 = (props) => {
  const {
    onPatchCircEx,
    setShowModal,
    exFields,
    customAtts,
    record,
    onFetchFormattedWorkout,
    onClearSelectedCircEx,
    onClearSelectedExercise,
    onClearPosValCircEx,
    workoutId,
  } = props;
  const classes = useStyles();
  const [atts, setAtts] = useState({});
  const [addEx, setAddEx] = useState(false);

  useEffect(() => {
    customAtts && setAtts(customAtts);
  }, [customAtts]);

  const handleChange = (e) => {
    const obj = { [e.target.name]: e.target.value };
    setAtts((prev) => ({ ...prev, ...obj }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const circExData = {
      circuit_exercise: {
        id: record.circuit_exercise_id,
        ex_attributes: { ...atts },
      },
    };
    onPatchCircEx(circExData, sideEffects);
  };

  const sideEffects = () => {
    setShowModal(false);
    onFetchFormattedWorkout(workoutId);
    onClearSelectedCircEx();
    onClearSelectedExercise();
    onClearPosValCircEx();
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
              key={uuidv4()}
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
              key={uuidv4()}
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
              key={uuidv4()}
              id="outlined-basic"
              type="number"
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
              key={uuidv4()}
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {exFields && exFields.exercise_name}
          </Paper>
        </Grid>
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
        </Grid>
      </Grid>
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
  onPatchCircEx: (circExData, sideEffects) =>
    dispatch(patchCircEx(circExData, sideEffects)),
  onClearSelectedCircEx: () => dispatch(clearSelectedCircEx()),
  onClearSelectedExercise: () => dispatch(clearSelectedExercise()),
  onClearPosValCircEx: (data, sideEffects) =>
    dispatch(clearPosValCircEx(data, sideEffects)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatchRecordPt2);

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
