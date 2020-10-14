import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * Component Imports
import MyModal from "../Modal";
import TabBar from "../Circuits/TabBar";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import QueueIcon from "@material-ui/icons/Queue";
import { Tooltip, Fab, IconButton } from "@material-ui/core";

// * Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { setPhase } from "../../Redux/Actions/CircuitActions";
import {
  postWorkout,
  patchWorkout,
  fetchWorkout,
} from "../../Redux/Actions/WorkoutActions";

export const NewWorkout = (props) => {
  const {
    history,
    onPostWorkout,
    onPatchWorkout,
    selectedWorkout,
    selectedFolder,
    match,
    onFetchWorkout,
    onFetchFolder,
    onSetPhase,
  } = props;

  const folderId = parseInt(match.params.folderId);
  const workoutId = parseInt(match.params.workoutId);
  const [title, setTitle] = useState("Add Title");
  const [showTitleForm, setShowTitleForm] = useState(false);
  const [showDescForm, setShowDescForm] = useState(false);
  const [desc, setDesc] = useState("Add Description");
  const [circuitPosition, setCircuitPosition] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    !selectedWorkout && onFetchWorkout(workoutId);
    !selectedFolder && onFetchFolder(folderId);
    selectedWorkout && setTitle(selectedWorkout.title);
    selectedWorkout && setDesc(selectedWorkout.description);
  }, [selectedWorkout]);

  const handleTitleDescSubmit = (e) => {
    e.preventDefault();
    onPatchWorkout(
      {
        workout: {
          id: selectedWorkout.id,
          folder_id: match.params.folderId,
          title: title,
          description: desc,
        },
      },
      closeForms
    );
  };

  const closeForms = () => {
    setShowTitleForm(false);
    setShowDescForm(false);
  };

  const handleAdd = (phase) => {
    onSetPhase(phase);
    setShowForm(true);
  };

  return (
    <div>
      <div className="addNewString container">
        {/* Title Input */}
        <div>
          {showTitleForm ? (
            <>
              <form onSubmit={handleTitleDescSubmit}>
                <input
                  required
                  type="text"
                  placeholder="Add Title"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </form>
              <div onClick={() => setShowTitleForm(false)}>Cancel</div>
            </>
          ) : (
            <div>
              <div onClick={() => setShowTitleForm(true)}> {title} </div>
            </div>
          )}
        </div>
        {/* Desc Input */}
        <div>
          {showDescForm ? (
            <>
              <form onSubmit={handleTitleDescSubmit}>
                <input
                  required
                  size={30}
                  type="text"
                  placeholder="Add Description"
                  value={desc}
                  name="title"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </form>
              <div onClick={() => setShowDescForm(false)}>Cancel</div>
            </>
          ) : (
            <div>
              <div onClick={() => setShowDescForm(true)}> {desc} </div>
            </div>
          )}
        </div>
      </div>

      <div className="container grid">
        <div>
          {" "}
          //*Warm up
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                className={classes.fab}
                size="medium"
                onClick={() => handleAdd("Warm Up")}
              >
                <QueueIcon />
              </Fab>
            </Tooltip>
          </div>
          <div className="addNewString"></div>
          {/* {warmUpEx && renderWarmUp()} */}
        </div>

        <div>
          {" "}
          //*Body
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                color="secondary"
                size="medium"
                onClick={() => handleAdd("Body")}
              >
                <QueueIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>

        <div>
          {" "}
          //*Cool Down
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                color="primary"
                size="medium"
                onClick={() => handleAdd("Cool Down")}
              >
                <QueueIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
      <MyModal
        showModal={showForm}
        setShowModal={setShowForm}
        component={<TabBar setShowModal={setShowForm} />}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedFolder: store.folders.selectedFolder,
  selectedWorkout: store.workouts.selectedWorkout,
});

const mapDispatchToProps = (dispatch) => ({
  onPostWorkout: (workoutData, setShowForm) =>
    dispatch(postWorkout(workoutData, setShowForm)),
  onPatchWorkout: (workoutData, setShowForm) =>
    dispatch(patchWorkout(workoutData, setShowForm)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onSetPhase: (phase) => dispatch(setPhase(phase)),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(NewWorkout)
);

const useStyles = makeStyles((theme) => ({
  fab: {
    // margin: theme.spacing(20),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));