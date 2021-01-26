import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Action Imports
import {
  postExercise,
  patchExercise,
} from "../../Redux/Actions/ExerciseActions";
import { postCircEx } from "../../Redux/Actions/CircExActions";
import { postCircuit } from "../../Redux/Actions/CircuitActions";

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
import { TrendingUpOutlined } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

export const CircuitFormPt1 = (props) => {
  const {
    phase,
    circuit_type,
    selectedExercise,
    selectedCircuit,
    onPostExercise,
    onPatchExercise,
    goToNextPage,
    onPostCircEx,
    positionCircEx,
    positionCircuit,
    onPostCircuit,
  } = props;

  const classes = useStyles();
  //   *Exercise Field State
  const [exFields, setExFields] = useState({
    exercise_name: "",
    description: "",
  });
  const [showExFormName, setShowExFormName] = useState(true);
  const [showExFormDesc, setShowExFormDesc] = useState(TrendingUpOutlined);
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

    if (selectedExercise) {
      onPatchExercise({ exercise: { ...exFields, id: selectedExercise.id } });
    } else if (!selectedCircuit) {
      onPostExercise({ exercise: { ...exFields } });
      handleCircuitSubmit();
    } else {
      onPostExercise({ exercise: { ...exFields } });
    }
    closeExForms();
  };

  const handleCircuitSubmit = () => {
    let pos = positionCircuit();
    onPostCircuit({
      circuit: {
        phase: phase,
        position: pos,
        sets: 1,
        circuit_type: circuit_type,
      },
    });
  };

  const closeExForms = () => {
    showExFormName && setShowExFormName(false);
    showExFormDesc && setShowExFormDesc(false);
  };
  const handleNext = (e) => {
    if (selectedExercise) {
      const circExData = {
        circuit_exercise: {
          circuit_id: selectedCircuit.id,
          exercise_id: selectedExercise.id,
          position: positionCircEx,
          ex_attributes: customAtts,
        },
      };
      onPostCircEx(circExData, goToNextPage);
    } else {
      setError(true);
    }
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

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          {circuit_type === "circuit" && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Exercise #{positionCircEx}
              </Paper>
            </Grid>
          )}
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
              <CheckBoxes
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
    </>
  );
};

const mapStateToProps = (store) => ({
  selectedExercise: store.exercises.selectedExercise,
  selectedCircuit: store.circuits.selectedCircuit,
  positionCircEx: store.circExs.position,
  positionCircuit: () => {
    switch (store.circuits.phase) {
      case "Warm Up":
        return store.circuits.posWarmUp;
      case "Body":
        return store.circuits.posBody;
      case "Cool Down":
        return store.circuits.posCoolDown;
      default:
        return null;
    }
  },
  phase: store.circuits.phase,
});

const mapDispatchToProps = (dispatch) => ({
  onPostExercise: (exData) => dispatch(postExercise(exData)),
  onPatchExercise: (exData) => dispatch(patchExercise(exData)),
  onPostCircEx: (circExData, goToNextPage) =>
    dispatch(postCircEx(circExData, goToNextPage)),
  onPostCircuit: (circuitData) => dispatch(postCircuit(circuitData)),
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
