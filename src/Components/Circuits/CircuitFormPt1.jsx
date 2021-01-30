import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * ReactTour Imports
import Tour from "reactour";
// * Action Imports
import {
  postExercise,
  patchExercise,
} from "../../Redux/Actions/ExerciseActions";
import { postCircEx } from "../../Redux/Actions/CircExActions";
import { postCircuit } from "../../Redux/Actions/CircuitActions";
import {
  activateTour,
  deactivateTour,
  endTour,
} from "../../Redux/Actions/TourActions";
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
    onActivateTour,
    onDeactivateTour,
    onEndTour,
    tourOn,
  } = props;

  const classes = useStyles();
  //   *Exercise Field State
  const [exFields, setExFields] = useState({
    exercise_name: null,
    description: null,
  });
  const [showExFormName, setShowExFormName] = useState(true);
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
    // showExFormName
    exFields.exercise_name && setShowExFormName(false);
    // showExFormDesc
    exFields.description && setShowExFormDesc(false);
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
      tourOn && handleTourSwitch();
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

  const handleTourSwitch = () => {
    onDeactivateTour("nWS2");
    onActivateTour("nWS3");
  };

  return (
    <>
      <div className={classes.root}>
        <Tour
          onRequestClose={() => onEndTour()}
          steps={EX1STEPS}
          isOpen={tourOn}
          maskClassName="mask"
          className="helper"
          rounded={5}
          disableFocusLock={true}
          accentColor={accentColor}
        />
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
                <div className="exFormInputBoxCont" data-tour="es2">
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
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={handleExSubmit}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div
                  data-tour="es2"
                  onClick={() => setShowExFormName((prev) => !prev)}
                >
                  {exFields.exercise_name}
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {showExFormDesc ? (
                <div className="exFormInputBoxCont" data-tour="es3">
                  <form onSubmit={handleExSubmit}>
                    <TextField
                      label="Exercise Description"
                      name="description"
                      value={exFields.description}
                      onChange={handleExChange}
                      variant="outlined"
                    />
                  </form>
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => setShowExFormDesc(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    onClick={handleExSubmit}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div
                  data-tour="es3"
                  onClick={() => setShowExFormDesc((prev) => !prev)}
                >
                  {exFields.description
                    ? exFields.description
                    : "Add Description"}
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} data-tour="es4">
              <CheckBoxes
                checked={checked}
                setChecked={setChecked}
                customAtts={customAtts}
                handleCustomAttAdd={handleCustomAttAdd}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} data-tour="es5">
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
              data-tour="es6"
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
  tourOn: store.tour.nWS2,
});

const mapDispatchToProps = (dispatch) => ({
  onPostExercise: (exData) => dispatch(postExercise(exData)),
  onPatchExercise: (exData) => dispatch(patchExercise(exData)),
  onPostCircEx: (circExData, goToNextPage) =>
    dispatch(postCircEx(circExData, goToNextPage)),
  onPostCircuit: (circuitData) => dispatch(postCircuit(circuitData)),
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  onEndTour: () => dispatch(endTour()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CircuitFormPt1);

const accentColor = "#ff5722";

const EX1STEPS = [
  {
    selector: '[data-tour = "es1"]',
    content: () => (
      <div>
        This is the Tab bar. You can choose to add a single exercise or chain a
        series of exercises in a circuit.
        <br />
        Click on the tab to change the form then come back to Exercise tab and
        continue by pressing the next arrow.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es2"]',
    content: () => (
      <div>
        Go ahead and enter the name of the exercise. <br /> <br />
        Make sure to hit 'Enter' or click 'Save' afterwards. If you want to
        change it, just click on the text and the form will appear again!
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es3"]',
    content: () => (
      <div>
        If you'd like, you can add or edit a description. <br /> <br />
        Click the text, then hit 'Enter' or click 'Save'.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es4"]',
    content: () => (
      <div>
        Here are some pre-defined attributes you can add to this exercise. *
        Reps will always have a minimum of 1 so it will always be checked!
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es5"]',
    content: () => (
      <div>
        Click the text to add a custom attribute, <br />
        <br />
        ex. 'jumping height for box jumps' or 'strap length for gymnastic rings'{" "}
      </div>
    ),
    position: "top",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "es6"]',
    content: () => (
      <div>
        Now, if everything looks good go ahead and hit this button to get to the
        next page.
      </div>
    ),
    // position: "top",
    style: {
      margin: "45px",
    },
  },
];

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
  btn: {
    // padding: theme.spacing(2),
    marginLeft: "20px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
