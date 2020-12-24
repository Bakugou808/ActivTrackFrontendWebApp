import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * Component Imports
import WorkoutForm from "../Workouts/WorkoutForm";
import MenuPopper from "./MenuPopper";
import MyModal from "../Modal";
//* Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import {
  postWorkout,
  fetchWorkout,
  patchWorkout,
  deleteWorkout,
  clearSelectedAndFormattedWorkouts,
} from "../../Redux/Actions/WorkoutActions";
import { clearCircuitPhasePositions } from "../../Redux/Actions/CircuitActions";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Folder = (props) => {
  const {
    match,
    history,
    onFetchFolder,
    workouts,
    onPostWorkout,
    onPatchWorkout,
    onDeleteWorkout,
    onFetchWorkout,
    onClearSelectedAndFormattedWorkouts,
    loading,
    onClearCircuitPhasePositions,
  } = props;

  const folderId = parseInt(match.params.folderId);
  const folderName = match.params.folderName;
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [workout, setWorkout] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    folderId && onFetchFolder(folderId);
    handleRecentLS();
  }, [folderId]);

  const handleRecentLS = () => {
    console.log("modified local storage Recent Folders");
    let path = `/folders/${folderName}/${folderId}`;
    if (localStorage.getItem("recentFolders")) {
      let recentFolders = JSON.parse(localStorage.getItem("recentFolders"));
      if (recentFolders.includes(path)) {
        recentFolders = recentFolders.filter((val) => val != path);
        recentFolders.unshift(path);
      } else if (!(recentFolders.length > 5)) {
        recentFolders.unshift(path);
      } else {
        recentFolders.pop().unshift(path);
      }
      recentFolders = JSON.stringify(recentFolders);
      localStorage.setItem("recentFolders", recentFolders);
    }
  };

  const redirectNewWorkout = (path) => {
    setShowForm(false);
    history.push(`/new_workout/${folderName}/${folderId}/${path}`);
  };

  const redirectToWorkout = (workout) => {
    onFetchWorkout(workout.id);
    history.push(
      `/workouts/${folderName}/${folderId}/${workout.title}/${workout.id}`
    );
  };

  const renderWorkout = () => {
    return workouts.map((workout) => {
      return (
        <Paper key={workout.id} className={classes.workout} elevation={6}>
          <div
            className={classes.workoutItem}
            onClick={() => redirectToWorkout(workout)}
          >
            {workout.title}
          </div>
          <div className={classes.workoutMenu}>
            <MenuPopper
              setShowFormEdit={setShowFormEdit}
              item={workout}
              setItem={setWorkout}
              handleDelete={handleOnDeleteWorkout}
            />
          </div>
        </Paper>
      );
    });
  };

  const handleOnPostWorkout = (workoutData) => {
    onPostWorkout(workoutData, redirectNewWorkout);
  };

  const handleOnPatchWorkout = (workoutData) => {
    const sideEffects = () => {
      setShowFormEdit(false);
      setWorkout(null);
    };
    onPatchWorkout(workoutData, sideEffects);
  };

  const handleOnDeleteWorkout = (workoutId) => {
    const sideEffects = () => {
      onFetchFolder(folderId);
      setWorkout(null);
    };
    onDeleteWorkout(workoutId, sideEffects);
  };

  const handleNewWorkout = () => {
    onClearSelectedAndFormattedWorkouts();
    onClearCircuitPhasePositions();
    setShowForm(true);
  };

  return (
    <div>
      <div className={classes.addNewParent}>
        <span className={classes.addNew} onClick={handleNewWorkout}>
          + Add New Workout
        </span>
      </div>
      {/* render workout cards */}
      <div className={"container grid "}>{workouts && renderWorkout()}</div>
      {/* for new workouts */}
      <MyModal
        component={
          <WorkoutForm
            handleOnPostWorkout={handleOnPostWorkout}
            folderId={folderId}
          />
        }
        showModal={showForm}
        setShowModal={setShowForm}
      />
      {/* for editing workouts */}
      <MyModal
        component={
          <WorkoutForm
            handleOnPatchWorkout={handleOnPatchWorkout}
            folderId={folderId}
            workout={workout}
          />
        }
        showModal={showFormEdit}
        setShowModal={setShowFormEdit}
      />
      {/* for loading/fetching */}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = (store) => ({
  workouts: store.workouts.workouts,
  loading: store.folders.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onPostWorkout: (workoutData, redirectNewWorkout) =>
    dispatch(postWorkout(workoutData, redirectNewWorkout)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onClearSelectedAndFormattedWorkouts: () =>
    dispatch(clearSelectedAndFormattedWorkouts()),
  onPatchWorkout: (workoutData, sideEffects) =>
    dispatch(patchWorkout(workoutData, sideEffects)),
  onDeleteWorkout: (workoutId, sideEffects) =>
    dispatch(deleteWorkout(workoutId, sideEffects)),
  onClearCircuitPhasePositions: () => dispatch(clearCircuitPhasePositions()),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Folder));

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "absolute",
    width: "88vw",
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
    height: "4vw",

    maxWidth: "20 rem",
    justifyContent: "center",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    opacity: ".8",
  },
  workoutItem: {
    flex: "0 0 90%",
    cursor: "pointer",
    padding: "20px 5px",
  },
  workoutMenu: {
    flex: "0 0 10%",
    cursor: "pointer",
  },
  addNew: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
  addNewParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
