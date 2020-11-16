import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import MyModal from "../Modal";
import PatchFlowCont from "./PatchFlowCont";
import SetIconUi from "./SetIconUi";
// * Material Imports
import { Paper } from "@material-ui/core";

// * Function Imports
import { normalizeString } from "./AttributeFields";

export const ExListDrawerMobPortrait = ({
  warmup,
  body,
  coolDown,
  currentEx,
  exRef,
  match,
  device,
  orientation,
}) => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [patchRecord, setPatchRecord] = useState(null);
  const [exs, setExs] = useState(null);
  const workoutId = match.params.workoutId;

  const renderExercises = (phase, handlePatch = null, workoutId) => {
    return phase.map((circuit) => {
      let keyName = Object.keys(circuit)[0];
      let arr = circuit[keyName];
      if (arr[0].circuit_type === "circuit") {
        return renderCirc(arr, handlePatch, workoutId);
      } else {
        return arr.map((record) => {
          return (
            <div
              className={"exContainer"}
              id={`${record.ex_id}-${record.circuit_position}-${record.phase_position}`}
            >
              <SetIconUi
                setCount={record.circuit_sets}
                circuitId={record.circuit_id}
                workoutId={workoutId}
              />
              <div className="exStack ">
                <Paper
                  elevation={6}
                  className={"exPaper pointer exStackPort"}
                  onClick={() => handlePatch(record)}
                >
                  <p className="exTitle">{record.ex_name}</p>
                  <p className={"exPaperAtts"}>{renderExDetails(record)}</p>
                </Paper>
              </div>
            </div>
          );
        });
      }
    });
  };

  const renderExDetails = (ex) => {
    const obj = ex.circuit_exercise_attributes;
    const arr = [];
    for (const [key, val] of Object.entries(obj)) {
      let str = `${normalizeString(key)}: ${val}`;
      arr.push(str);
    }
    return arr.join(", ");
  };

  const renderCirc = (arr, handlePatch, workoutId) => {
    const setCount = arr[0].circuit_sets;
    const circuitId = arr[0].circuit_id;
    return (
      <div className={"exContainer"}>
        <SetIconUi
          setCount={setCount}
          circuitId={circuitId}
          workoutId={workoutId}
        />
        <div className="exCircuit">
          {arr.map((ex) => {
            return (
              <Paper
                elevation={6}
                className={"exPaper pointer"}
                onClick={() => handlePatch(ex)}
                id={`${ex.ex_id}-${ex.circuit_position}-${ex.phase_position}`}
              >
                <p className="exTitle">{ex.ex_name}</p>
                <p className={"exPaperAtts"}>{renderExDetails(ex)}</p>
              </Paper>
            );
          })}
        </div>
      </div>
    );
  };

  const handlePatch = (record) => {
    setPatchRecord(record);
    setShowFormEdit(true);
  };

  useEffect(() => {
    handleFalseClick();
    handleExs();
  }, [currentEx]);

  const handleFalseClick = () => {
    exRef && exRef.click();
  };

  const handleExs = () => {
    const exArr = [...warmup, ...body, ...coolDown];
    setExs(exArr);
  };

  const handlePhantomDivs = () => {
    return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((num) => {
      return <div className="phantomDiv"> </div>;
    });
  };

  return (
    <div className="exSideDrawerParent">
      <div className="exSideDrawerHeader">
        <div className="exCardCont ">
          {exs && renderExercises(exs, handlePatch, workoutId)}
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExListDrawerMobPortrait);
