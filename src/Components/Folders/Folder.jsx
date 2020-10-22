import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
import WorkoutForm from "../Workouts/WorkoutForm";
//* Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import {
  postWorkout,
  fetchWorkout,
  clearSelectedAndFormattedWorkouts,
} from "../../Redux/Actions/WorkoutActions";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

export const Folder = (props) => {
  const {
    match,
    history,
    onFetchFolder,
    workouts,
    onPostWorkout,
    onFetchWorkout,
    onClearSelectedAndFormattedWorkouts,
  } = props;
  const folderId = parseInt(match.params.folderId);
  const folderName = match.params.folderName;
  const [showForm, setShowForm] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  useEffect(() => {
    folderId && onFetchFolder(folderId);
  }, [folderId]);

  const redirectNewWorkout = (path) => {
    setShowForm(false);
    history.push(`/new_workout/${folderName}/${folderId}/${path}`);
  };

  const redirectToWorkout = (workout) => {
    console.log(workout);
    onFetchWorkout(workout.id);
    history.push(
      `/workouts/${folderName}/${folderId}/${workout.title}/${workout.id}`
    );
  };

  const renderWorkout = () => {
    return workouts.map((workout) => {
      return (
        <Paper
          key={workout.id}
          onClick={() => redirectToWorkout(workout)}
          // className={"displayPaper pointer center"}
          className={classes.workout}
          elevation={6}
        >
          {workout.title}
        </Paper>
      );
    });
  };

  const handleOnPostWorkout = (workoutData) => {
    // onPostWorkout(workoutData, setShowForm, history);
    onPostWorkout(workoutData, redirectNewWorkout);
  };

  const handleNewWorkout = () => {
    onClearSelectedAndFormattedWorkouts();
    setShowForm(true);
  };

  return (
    <div>
      <div>
        <span className={classes.addNew} onClick={handleNewWorkout}>
          + Add New Workout
        </span>
      </div>

      <div className={"container grid "}>{workouts && renderWorkout()}</div>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paperModal}>
          <WorkoutForm
            handleOnPostWorkout={handleOnPostWorkout}
            folderId={folderId}
          />
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (store) => ({
  workouts: store.workouts.workouts,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onPostWorkout: (workoutData, redirectNewWorkout) =>
    dispatch(postWorkout(workoutData, redirectNewWorkout)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onClearSelectedAndFormattedWorkouts: () =>
    dispatch(clearSelectedAndFormattedWorkouts()),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Folder));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  workout: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.dark,
    // minHeight: "3rem",
    height: "4vw",

    maxWidth: "20 rem",
    cursor: "pointer",
    justifyContent: "center",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    opacity: ".8",
    // backgroundColor: "#ffee58",
    // backgroundColor: "#fff179",
  },
  addNew: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));
