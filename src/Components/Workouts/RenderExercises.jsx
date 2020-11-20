import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { normalizeString } from "./AttributeFields";

// * Action Imports
import { patchCircuit } from "../../Redux/Actions/CircuitActions";
// * Component Imports
import SetIconUi from "./SetIconUi";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";

export const RenderExercises = (props) => {
  const { phase, handlePatch = null, workoutId, onPatchCircuit } = props;
  const patchCircToStack = (record) => {
    const circData = {
      circuit: { id: record.circuit_id, circuit_type: "stack" },
    };
    onPatchCircuit(circData);
  };
  const renderExercises = () => {
    return phase.map((circuit) => {
      let keyName = Object.keys(circuit)[0];
      let arr = circuit[keyName];

      if (arr[0].circuit_type === "circuit" && arr.length > 1) {
        return renderCirc(arr, handlePatch, workoutId);
      } else {
        if (arr[0].circuit_type === "circuit" && arr.length === 1) {
          patchCircToStack(arr[0]);
        }
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
              <div className="exStack">
                <Paper
                  elevation={6}
                  className={"exPaper pointer"}
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

  return <div>{phase && renderExercises()}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onPatchCircuit: (circData, sideEffects) =>
    dispatch(patchCircuit(circData, sideEffects)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderExercises);
