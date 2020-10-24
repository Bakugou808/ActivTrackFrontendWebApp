import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * Component Imports
import MyModal from "../Modal";
import TabBar from "../Circuits/TabBar";
import PatchFlowCont from "./PatchFlowCont";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import QueueIcon from "@material-ui/icons/Queue";
import { Tooltip, Fab, Button, TextField } from "@material-ui/core";
// * Function Imports
import { renderCirc, renderExercises } from "./Workout";

// * Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { setPhase } from "../../Redux/Actions/CircuitActions";
import {
  postWorkout,
  patchWorkout,
  fetchWorkout,
  fetchFormattedWorkout,
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
    onFetchFormattedWorkout,
    onFetchFolder,
    onSetPhase,
    formattedWorkout,
    warmup,
    body,
    coolDown,
  } = props;

  const folderId = parseInt(match.params.folderId);
  const folderName = match.params.folderName;
  const workoutId = parseInt(match.params.workoutId);
  const workoutTitle = match.params.workoutTitle;
  const [title, setTitle] = useState("Add Title");
  const [showTitleForm, setShowTitleForm] = useState(false);
  const [showDescForm, setShowDescForm] = useState(false);
  const [desc, setDesc] = useState("Add Description");
  const [circuitPosition, setCircuitPosition] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [patchRecord, setPatchRecord] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    !selectedWorkout && onFetchWorkout(workoutId);
    !selectedWorkout && onFetchFormattedWorkout(workoutId);
    !selectedFolder && onFetchFolder(folderId);
    selectedWorkout && setTitle(selectedWorkout.title);
    selectedWorkout && setDesc(selectedWorkout.description);
  }, [selectedWorkout, formattedWorkout]);

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

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowFormEdit(true);
  };

  const handleAdd = (phase) => {
    onSetPhase(phase);
    setShowForm(true);
  };

  const handleSave = () => {
    history.push(
      `/workouts/${folderName}/${folderId}/${workoutTitle}/${workoutId}`
    );
  };

  return (
    <div>
      <div className="center2 container horizontal3">
        {/* Title Input */}
        <div>
          {showTitleForm ? (
            <>
              <form
                onSubmit={handleTitleDescSubmit}
                className="exTitle fsize20 horizontal2"
              >
                <TextField
                  required
                  type="text"
                  placeholder="Add Title"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </form>
              <div
                className="exTitle fsize20 horizontal2"
                onClick={() => setShowTitleForm(false)}
              >
                Cancel
              </div>
            </>
          ) : (
            <div
              className="exTitle fsize20 horizontal2"
              onClick={() => setShowTitleForm(true)}
            >
              {" "}
              {title}{" "}
            </div>
          )}
        </div>
        {/* Desc Input */}
        <div>
          {showDescForm ? (
            <>
              <form
                onSubmit={handleTitleDescSubmit}
                className="exTitle horizontal2"
              >
                <TextField
                  required
                  // size={30}
                  type="text"
                  placeholder="Add Description"
                  value={desc}
                  name="title"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </form>
              <div
                className="exTitle horizontal2"
                onClick={() => setShowDescForm(false)}
              >
                Cancel
              </div>
            </>
          ) : (
            <div>
              <div
                className="exTitle horizontal2"
                onClick={() => setShowDescForm(true)}
              >
                {desc}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="saveButtonCont">
        <Button
          variant="contained"
          color="secondary"
          className="saveButton"
          onClick={handleSave}
        >
          Save Workout
        </Button>
      </div>

      <div className="container grid marginLeft20">
        <div>
          {" "}
          <div className="phaseTitle2"> Warm up</div>
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                // className={classes.fab}
                color="primary"
                size="medium"
                onClick={() => handleAdd("Warm Up")}
              >
                <QueueIcon />
              </Fab>
            </Tooltip>
          </div>
          <div className="container grid">
            {warmup && renderExercises(warmup, handlePatch)}
          </div>
        </div>

        <div>
          {" "}
          <div className="phaseTitle2"> Body</div>
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                color="primary"
                size="medium"
                onClick={() => handleAdd("Body")}
              >
                <QueueIcon />
              </Fab>
            </Tooltip>
          </div>
          <div className="container grid">
            {body && renderExercises(body, handlePatch)}
          </div>
        </div>

        <div>
          {" "}
          <div className="phaseTitle2"> Cool Down</div>
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
          <div className="container grid">
            {coolDown && renderExercises(coolDown, handlePatch)}
          </div>
        </div>
      </div>
      <MyModal
        showModal={showForm}
        setShowModal={setShowForm}
        component={<TabBar setShowModal={setShowForm} />}
      />
      <MyModal
        showModal={showFormEdit}
        setShowModal={setShowFormEdit}
        component={
          <PatchFlowCont
            setShowForm={setShowFormEdit}
            record={patchRecord}
            workoutId={workoutId}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedFolder: store.folders.selectedFolder,
  selectedWorkout: store.workouts.selectedWorkout,
  formattedWorkout: store.workouts.formattedWorkout,
  warmup:
    store.workouts.formattedWorkout && store.workouts.formattedWorkout.warmup,
  body: store.workouts.formattedWorkout && store.workouts.formattedWorkout.body,
  coolDown:
    store.workouts.formattedWorkout &&
    store.workouts.formattedWorkout.cool_down,
});

const mapDispatchToProps = (dispatch) => ({
  onPostWorkout: (workoutData, setShowForm) =>
    dispatch(postWorkout(workoutData, setShowForm)),
  onPatchWorkout: (workoutData, setShowForm) =>
    dispatch(patchWorkout(workoutData, setShowForm)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onFetchFolder: (folderId) => dispatch(fetchFolder(folderId)),
  onSetPhase: (phase) => dispatch(setPhase(phase)),
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
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
