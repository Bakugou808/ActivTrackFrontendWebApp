import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Action Imports
import { patchCircEx } from "../../Redux/Actions/CircExActions";
import { postWorkCircuit } from "../../Redux/Actions/WorkCircuitsActions";
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
    selectedCircEx,
    selectedWorkout,
    selectedCircuit,
    onPatchCircEx,
    onPostWorkCircuit,
    setShowModal,
  } = props;
  const classes = useStyles();
  const [atts, setAtts] = useState({});

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
    // onPostWorkCircuit({
    //   workout_circuit: {
    //     workout_id: selectedWorkout.id,
    //     circuit_id: selectedCircuit.id,
    //   },
    // }, setShowModal);
    // console.log(atts);
  };

  const handlePostWorkCircuit = () => {
    const data = {
      workout_circuit: {
        workout_id: selectedWorkout.id,
        circuit_id: selectedCircuit.id,
      },
    };
    onPostWorkCircuit(data, setShowModal);
  };

  const renderAttFields = () => {
    return Object.keys(atts).map((att) => {
      return (
        <TextField
          id="outlined-basic"
          label={att}
          name={att}
          value={atts[att]}
          onChange={handleChange}
          variant="outlined"
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {circuit_type === "circuit" && (
          <Grid item xs={12}>
            <Paper className={classes.paper}>Exercise #{positionCircEx}</Paper>
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
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedCircEx: store.circExs.selectedCircEx,
  selectedWorkout: store.workouts.selectedWorkout,
  selectedCircuit: store.circuits.selectedCircuit,
  positionCircEx: store.circExs.position,
  phase: store.circuits.phase,
});

const mapDispatchToProps = (dispatch) => ({
  onPatchCircEx: (circExData, handleWorkCirc) =>
    dispatch(patchCircEx(circExData, handleWorkCirc)),
  onPostWorkCircuit: (workCircData, setShowModal) =>
    dispatch(postWorkCircuit(workCircData, setShowModal)),
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
