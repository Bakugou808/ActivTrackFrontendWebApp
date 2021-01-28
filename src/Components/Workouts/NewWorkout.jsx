import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * Component Imports
import MyModal from "../Modal";
import TabBar from "../Circuits/TabBar";
import PatchFlowCont from "./PatchFlowCont";
import RenderExercises from "./RenderExercises";
import NewWorkoutRide from "../JoyRide/NewWorkoutRide";
// * ReactTour Imports
import Tour from "reactour";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import QueueIcon from "@material-ui/icons/Queue";
import { Tooltip, Fab, Button, TextField } from "@material-ui/core";

// * Action Imports
import { fetchFolder } from "../../Redux/Actions/FolderActions";
import { clearPosValCircEx } from "../../Redux/Actions/CircExActions";
import {
  setPhase,
  setPositionCircuitToX,
  clearCircuitPhasePositions,
} from "../../Redux/Actions/CircuitActions";
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
    onClearPosValCircEx,
    formattedWorkout,
    warmup,
    body,
    coolDown,
    onSetPositionCircuitToX,
    onClearCircuitPhasePositions,
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
    formattedWorkout && handleCircuitPositions();
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

  const handleCircuitPositions = () => {
    const warmUpLength = {
      x: formattedWorkout.warmup.length,
      phase: "Warm Up",
    };
    const bodyLength = { x: formattedWorkout.body.length, phase: "Body" };
    const cDLength = {
      x: formattedWorkout.cool_down.length,
      phase: "Cool Down",
    };

    onSetPositionCircuitToX(warmUpLength);
    onSetPositionCircuitToX(bodyLength);
    onSetPositionCircuitToX(cDLength);
  };

  const closeForms = () => {
    setShowTitleForm(false);
    setShowDescForm(false);
  };

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowFormEdit(true);
  };
  const [takeTour, setTakeTour] = useState(true);

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const handleAdd = (phase) => {
    isTourOpen && setIsTourOpen(false);
    isTourOpen && setIsShowingMore(true);
    onSetPhase(phase);
    setShowForm(true);
  };

  const handleSave = () => {
    onClearPosValCircEx();
    onClearCircuitPhasePositions();
    history.push(
      `/workouts/${folderName}/${folderId}/${workoutTitle}/${workoutId}`
    );
  };

  const toggleShowMore = () => {
    setIsShowingMore((prev) => !prev);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  return (
    <div>
      {/* <NewWorkoutRide /> */}
      {takeTour && (
        <div className="tourNotification">
          <div>Take a Tour?</div>
          <Button onClick={openTour}>Yes</Button>
          <Button onClick={() => setTakeTour(false)}>No Thanks</Button>
        </div>
      )}
      <div className="center2 container horizontal3">
        {/* Title Input */}
        <div data-tour="nws1">
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
                className="exTitle fsize20 horizontal2 cursorPointer "
                onClick={() => setShowTitleForm(false)}
              >
                Cancel
              </div>
            </>
          ) : (
            <div
              className="exTitle fsize20 horizontal2 cursorPointer "
              onClick={() => setShowTitleForm(true)}
            >
              {title}
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

      <div className="container grid margin30px " data-tour="nws2">
        <div>
          {" "}
          <div className="phaseTitle2"> Warm up</div>
          <div>
            <Tooltip title="Add" aria-label="add">
              <Fab
                color="primary"
                size="medium"
                onClick={() => handleAdd("Warm Up")}
              >
                <QueueIcon data-tour="nws3" />
              </Fab>
            </Tooltip>
          </div>
          <div className="container grid">
            {warmup && (
              <RenderExercises
                phase={warmup}
                handlePatch={handlePatch}
                workoutId={workoutId}
              />
            )}
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
            {body && (
              <RenderExercises
                phase={body}
                handlePatch={handlePatch}
                workoutId={workoutId}
              />
            )}
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
            {coolDown && (
              <RenderExercises
                phase={coolDown}
                handlePatch={handlePatch}
                workoutId={workoutId}
              />
            )}
          </div>
        </div>
      </div>
      <MyModal
        showModal={showForm}
        setShowModal={setShowForm}
        isShowingMore={isShowingMore}
        setIsShowingMore={setIsShowingMore}
        component={
          <TabBar
            setShowModal={setShowForm}
            isShowingMore={isShowingMore}
            setIsShowingMore={setIsShowingMore}
          />
        }
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
      <Tour
        onRequestClose={() => setIsTourOpen(false)}
        steps={NEW_WORKOUT_STEPS}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
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
  onSetPositionCircuitToX: (payload) =>
    dispatch(setPositionCircuitToX(payload)),
  onClearPosValCircEx: () => dispatch(clearPosValCircEx()),
  onClearCircuitPhasePositions: () => dispatch(clearCircuitPhasePositions()),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(NewWorkout)
);

const useStyles = makeStyles((theme) => ({
  fab: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const accentColor = "#ff5722";

const NEW_WORKOUT_STEPS = [
  {
    selector: '[data-tour = "nws1"]',
    content: () => (
      <div>
        This is your header. It displays your Workout's title and description
        (if available). Click on the title to rename it.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "nws2"]',
    content: () => (
      <div>
        All Workouts are divided into 3 phases: 'Warm up', 'Body', and 'Cool
        Down'. You don't need to add exercises to each section if you don't feel
        like it. But its here for you if you decide to use them.
        <br />
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "nws3"]',
    content: () => (
      <div>
        This icon will let open a form to add an exercise to the respective
        phase. Give it a click.
      </div>
    ),
    position: "center",
  },
  // {
  //   selector: '[data-tour = "nws3"]',
  //   content: () => (
  //     <div>
  //       This is your navigation icon. Click here to get to the Folders page to
  //       start building your folders and workouts. You can also click on the
  //       Stats tab to view your progress as you complete more and more workouts.
  //     </div>
  //   ),
  //   position: "top",
  // },
];
