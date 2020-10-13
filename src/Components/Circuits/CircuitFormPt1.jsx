import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Action Imports
import {
  postExercise,
  patchExercise,
} from "../../Redux/Actions/ExerciseActions";

// * Component Imports
import CheckBoxes from "./CheckBoxes";
import CustAttForm from "./CustAttForm";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

export const CircuitFormPt1 = (props) => {
  const {
    phase,
    circuit_type,
    selectedExercise,
    onPostExercise,
    onPatchExercise,
    goToNextPage,
  } = props;

  const classes = useStyles();
  //   *Exercise Field State
  const [exFields, setExFields] = useState({
    exercise_name: "Add Exercise",
    description: "Add Description",
  });
  const [showExFormName, setShowExFormName] = useState(false);
  const [showExFormDesc, setShowExFormDesc] = useState(false);
  // * Circuit_Exercise/Attributes Field State
  const [showCustomAttFields, setShowCustomAttFields] = useState(false);
  const [customAtts, setCustomAtts] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [error, setError] = useState(false);

  const [checked, setChecked] = useState({
    reps: false,
    weight: false,
    height: false,
    restPeriod: false,
  });

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
    console.log(exFields);
  };

  const handleExSubmit = (e) => {
    e.preventDefault();
    selectedExercise
      ? onPatchExercise({ exercise: { ...exFields, id: selectedExercise.id } })
      : onPostExercise({ exercise: { ...exFields } });
    closeExForms(false);
  };

  const closeExForms = () => {
    showExFormName && setShowExFormName(false);
    showExFormDesc && setShowExFormDesc(false);
  };

  const handleNext = (e) => {
    selectedExercise ? goToNextPage(true) : setError(true);
  };

  return (
    <>
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
                    //   id="outlined-multiline-flexible"
                    label="Exercise Description"
                    //   multiline
                    //   rowsMax={4}
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
              <CheckBoxes
                checked={checked}
                setChecked={setChecked}
                customAtts={customAtts}
                setCustomAtts={setCustomAtts}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                {showCustomAttFields ? (
                  <CustAttForm
                    setCustomAtts={setCustomAtts}
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
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert onClose={handleCloseSnackBar} severity="success">
            Added {customAtts[customAtts.length - 1]} To Attributes
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
    </>
  );
};

const mapStateToProps = (store) => ({
  selectedExercise: store.exercises.selectedExercise,
});

const mapDispatchToProps = (dispatch) => ({
  onPostExercise: (exData) => dispatch(postExercise(exData)),
  onPatchExercise: (exData) => dispatch(patchExercise(exData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CircuitFormPt1);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
