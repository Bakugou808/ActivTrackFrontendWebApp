import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
import WorkoutForm from "../Workouts/WorkoutForm";
//* Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { postWorkout } from "../../Redux/Actions/WorkoutActions";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

export const Folder = (props) => {
  const { match, history, onFetchFolder, workouts, onPostWorkout } = props;
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

  const renderWorkout = () => {
    return workouts.map((workout) => {
      return (
        <Paper key={workout.id} className={classes.workout}>
          {workout.title}
        </Paper>
      );
    });
  };

  const handleOnPostWorkout = (workoutData) => {
    // onPostWorkout(workoutData, setShowForm, history);
    onPostWorkout(workoutData, redirectNewWorkout);
  };

  return (
    <div>
      <div>
        <span className={"addNewString"} onClick={() => setShowForm(true)}>
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
    color: theme.palette.text.secondary,
    "min-height": "30px",
    cursor: "pointer",
  },
}));
