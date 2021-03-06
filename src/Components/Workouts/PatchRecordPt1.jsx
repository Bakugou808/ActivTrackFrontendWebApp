import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import CustAttForm from "../Circuits/CustAttForm";
import CheckBoxes2 from "../Circuits/CheckBoxes2";

// * Action Imports
import { patchExercise } from "../../Redux/Actions/ExerciseActions";
import { fetchFormattedWorkout } from "../../Redux/Actions/WorkoutActions";
import {
  clearSelectedCircEx,
  clearPosValCircEx,
  deleteCircEx,
} from "../../Redux/Actions/CircExActions";
import { clearSelectedExercise } from "../../Redux/Actions/ExerciseActions";
import { deleteCircuit } from "../../Redux/Actions/CircuitActions";

// * Material UI Imports
import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Grid, Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

export const PatchRecordPt1 = (props) => {
  const {
    record,
    onPatchExercise,
    goToNextPage,
    exFields,
    setExFields,
    setShowModal,
    handleCustomAdd,
    onFetchFormattedWorkout,
    onClearSelectedCircEx,
    onClearSelectedExercise,
    onClearPosValCircEx,
    workoutId,
    onDeleteCircuit,
    onDeleteCircEx,
    workoutStarted,
  } = props;
  const classes = useStyles();

  //   * taken from circuitformpt`1
  const [showExFormName, setShowExFormName] = useState(false);
  const [showExFormDesc, setShowExFormDesc] = useState(false);

  // * Circuit_Exercise/Attributes Field State
  const [showCustomAttFields, setShowCustomAttFields] = useState(false);
  const [customAtts, setCustomAtts] = useState({ reps: 1 });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [newCustAtt, setNewCustAtt] = useState("");

  const [error, setError] = useState(false);

  const [checked, setChecked] = useState({
    reps: true,
    weight: false,
    holdTime: false,
    restPeriod: false,
  });

  useEffect(() => {
    if (record) {
      let exData = {
        exercise_name: record.ex_name,
        description: record.ex_description,
      };
      setExFields(exData);
      handleCheckBoxes(record);
      setCustomAtts(record.circuit_exercise_attributes);
    }
  }, [record]);

  const handleCheckBoxes = (record) => {
    const atts = record.circuit_exercise_attributes;
    const keyArr = Object.keys(atts);
    keyArr.forEach((kx) => {
      let obj = {};
      obj[`${kx}`] = true;
      setChecked((prev) => ({ ...prev, ...obj }));
    });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  const handleExChange = (e) => {
    e.preventDefault();
    const data = { [e.target.name]: e.target.value };
    setExFields((prev) => ({ ...prev, ...data }));
  };

  const handleExSubmit = (e) => {
    e.preventDefault();
    const sideEffects = () => {
      onFetchFormattedWorkout();
    };
    onPatchExercise(
      { exercise: { ...exFields, id: record.ex_id } },
      sideEffects
    );
    closeExForms();
  };

  const closeExForms = () => {
    showExFormName && setShowExFormName(false);
    showExFormDesc && setShowExFormDesc(false);
  };
  
  const handleNext = (e) => {
    handleCustomAdd(customAtts, goToNextPage);
  };

  const handleCustomAttAdd = (custAtt) => {
    if (custAtt in customAtts) {
      delete customAtts[custAtt];
    } else {
      const newAtts = customAtts;
      newAtts[custAtt] = 0;
      setCustomAtts(newAtts);
      setNewCustAtt(custAtt);
      setOpenSnackBar(true);
    }
  };

  const handleDelete = () => {
    const sideEffects = () => {
      setShowModal(false);
      onFetchFormattedWorkout(workoutId);
      onClearSelectedCircEx();
      onClearSelectedExercise();
      onClearPosValCircEx();
    };
    record.circuit_type === "circuit"
      ? onDeleteCircEx(record.circuit_exercise_id, sideEffects)
      : onDeleteCircuit(record.circuit_id, sideEffects);
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {showExFormName ? (
                <form onSubmit={handleExSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="Exercise Name"
                    name="exercise_name"
                    value={exFields.exercise_name}
                    onChange={handleExChange}
                    variant="outlined"
                  />
                </form>
              ) : (
                <div onClick={() => setShowExFormName((prev) => !prev)}>
                  {exFields.exercise_name}
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {showExFormDesc ? (
                <form onSubmit={handleExSubmit}>
                  <TextField
                    label="Exercise Description"
                    name="description"
                    value={exFields.description}
                    onChange={handleExChange}
                    variant="outlined"
                  />
                </form>
              ) : (
                <div onClick={() => setShowExFormDesc((prev) => !prev)}>
                  {exFields.description}
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CheckBoxes2
                checked={checked}
                setChecked={setChecked}
                customAtts={customAtts}
                handleCustomAttAdd={handleCustomAttAdd}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                {showCustomAttFields ? (
                  <CustAttForm
                    handleCustomAttAdd={handleCustomAttAdd}
                    customAtts={customAtts}
                    setShowCustomAttFields={setShowCustomAttFields}
                    setOpenSnackBar={setOpenSnackBar}
                  />
                ) : (
                  <div onClick={() => setShowCustomAttFields(true)}>
                    Add Custom Attribute
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {!workoutStarted && (
              <Button
                variant="outlined"
                className={classes.paper}
                onClick={handleDelete}
                color="secondary"
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              className={classes.paper}
              onClick={handleNext}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
      <div>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={4000}
          onClose={handleCloseSnackBar}
        >
          <Alert onClose={handleCloseSnackBar} severity="success">
            {newCustAtt != "restPeriod" && newCustAtt != "holdTime"
              ? `Added ${newCustAtt} To Attributes`
              : newCustAtt === "restPeriod"
              ? `Added Rest Period To Attributes`
              : "Added Hold Time To Attributes"}
          </Alert>
        </Snackbar>
      </div>
      <div>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleCloseErrorSnackBar}
        >
          <Alert onClose={handleCloseErrorSnackBar} severity="warning">
            Please Add an Exercise Before Moving Forward.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onPatchExercise: (exData, sideEffects) =>
    dispatch(patchExercise(exData, sideEffects)),
  onClearSelectedCircEx: () => dispatch(clearSelectedCircEx()),
  onClearSelectedExercise: () => dispatch(clearSelectedExercise()),
  onClearPosValCircEx: (data, sideEffects) =>
    dispatch(clearPosValCircEx(data, sideEffects)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
  onDeleteCircuit: (circuitId, sideEffects) =>
    dispatch(deleteCircuit(circuitId, sideEffects)),
  onDeleteCircEx: (circExId, sideEffects) =>
    dispatch(deleteCircEx(circExId, sideEffects)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatchRecordPt1);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.main,
    minHeight: "3rem",
    maxWidth: "20 rem",
    justifyContent: "center",
    // background: theme.palette.
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
    color: theme.palette.secondary.dark,
  },
}));
