import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
// * Package Imports
import ReactTimerStopwatch from "react-stopwatch-timer";

// * Material Ui Imports
// Date(yr, month, day, hour, min, sec, millisec)
const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

export const UiComponent = (props) => {
  const { goToNext, exObj, startEx, endEx } = props;
  const [setNum, setSetNum] = useState(1);
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);
  const [stopWatchOn, setStopWatchOn] = useState(false);

  return (
    <div>
      {" "}
      title, set: reps: timer
      <div className="container grid">
        <div className="addNewString">
          <p>Set #: {startEx && setNum} </p>
          {/* <p>Set: {exObj.attributes.circuit_position} </p> */}
        </div>
        <div className="addNewString">
          <ReactTimerStopwatch
            isOn={stopWatchOn}
            className="react-stopwatch-timer__table"
            watchType="stopwatch"
            displayCricle={true}
            color="green"
            hintColor="red"
            fromTime={fromTime}
            displayHours={false}
          >
            <button onClick={() => setStopWatchOn(true)}>START</button>
          </ReactTimerStopwatch>
        </div>
        <div className="addNewString"></div>
        <div className="addNewString">
          <p>Rep Goal: {exObj && exObj.circuit_exercise_attributes.reps} </p>
          {/* <p>Set: {exObj.attributes.circuit_position} </p> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);
