import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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

  useEffect(() => {
    handleFalseClick();
  }, [currentEx]);

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowFormEdit(true);
  };

  const handleFalseClick = () => {
    exRef && exRef.click();
  };

  const handlePhantomDivs = () => {
    return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((num) => {
      return (
        <div key={uuidv4()} className="phantomDiv">
          {" "}
        </div>
      );
    });
  };

  return (
    <div
      className={
        orientation === "portrait"
          ? "exSideDrawerParentMobPort"
          : "exSideDrawerParent"
      }
    >
      <div
        className={
          device === "mobile"
            ? orientation === "landscape"
              ? "exSideDrawerHeaderMobLand"
              : "exSideDrawerHeaderMobPortrait"
            : "exSideDrawerHeader"
        }
      >
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
      {currentEx != patchRecord ? (
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
      ) : (
        () => setShowFormEdit(false)
      )}
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
