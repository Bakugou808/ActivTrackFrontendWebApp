import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import MyModal from "../Modal";
import PatchFlowCont from "./PatchFlowCont";
import RenderExercises from "./RenderExercises";

export const ExListDrawer = ({
  warmup,
  body,
  coolDown,
  currentEx,
  exRef,
  match,
  device,
  orientation,
  workoutStarted,
}) => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [patchRecord, setPatchRecord] = useState(null);
  const workoutId = match.params.workoutId;

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowFormEdit(true);
  };

  useEffect(() => {
    handleFalseClick();
  }, [currentEx]);

  const handleFalseClick = () => {
    exRef && exRef.click();
  };

  const handlePhantomDivs = () => {
    return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((num) => {
      return <div className="phantomDiv"> </div>;
    });
  };

  return (
    <div className="exSideDrawerParent">
      <div className="exSideDrawerHeader">
        <div className="container ">
          {warmup && (
            <RenderExercises
              phase={warmup}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>
        <div className="container ">
          {body && (
            <RenderExercises
              phase={body}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>
        <div className="container ">
          {coolDown && (
            <RenderExercises
              phase={coolDown}
              handlePatch={handlePatch}
              workoutId={workoutId}
            />
          )}
        </div>
        <div>{handlePhantomDivs()}</div>
      </div>
      <div>
        <MyModal
          showModal={showFormEdit}
          setShowModal={setShowFormEdit}
          component={
            <PatchFlowCont
              setShowForm={setShowFormEdit}
              record={patchRecord}
              workoutId={workoutId}
              workoutStarted={workoutStarted}
            />
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  formattedWorkout: store.workouts.formattedWorkout,
  warmup:
    store.workouts.formattedWorkout && store.workouts.formattedWorkout.warmup,
  body: store.workouts.formattedWorkout && store.workouts.formattedWorkout.body,
  coolDown:
    store.workouts.formattedWorkout &&
    store.workouts.formattedWorkout.cool_down,
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExListDrawer);
