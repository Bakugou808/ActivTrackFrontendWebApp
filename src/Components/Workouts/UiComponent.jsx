import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const UiComponent = (props) => {
  const { goToNext, exObj, startEx, endEx, stopWatch, handleEndEx } = props;
  const [setNum, setSetNum] = useState(1);
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(stopWatch.time / 60);
    const seconds = stopWatch.time - minutes * 60;

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    const timerValue =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    if (!endEx) {
      return (
        <div className="timer">
          <div className="value">{timerValue}</div>
        </div>
      );
    } else if (endEx) {
      return (
        <div className="timer">
          <div className="text">Remaining</div>
          <div className="value">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      );
    }
  };

  const handleStartPause = () => {
    startEx && (stopWatch.isRunning ? stopWatch.pause() : stopWatch.start());
  };

  const handleReset = () => {
    stopWatch.reset();
  };

  return (
    <div>
      {" "}
      title, set: reps: timer
      <div className="container grid">
        <div className="addNewString">
          <div>
            {exObj && (
              <>
                <div> {exObj.circuit_phase} </div>
                <div> {exObj.ex_name} </div>
              </>
            )}
          </div>
          {/* <p>Set: {exObj.attributes.circuit_position} </p> */}
        </div>
        <div className="addNewString">
          <p>Set #: {startEx && setNum} </p>
          {/* <p>Set: {exObj.attributes.circuit_position} </p> */}
        </div>
        <div className="addNewString">
          <p>Rep Goal: {exObj && exObj.circuit_exercise_attributes.reps} </p>
          {/* <p>Set: {exObj.attributes.circuit_position} </p> */}
        </div>
        <div className="addNewString" onClick={handleStartPause}>
          <CountdownCircleTimer
            isPlaying={stopWatch.isRunning}
            duration={defTimerVal}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleEndEx(stopWatch.time)}
          >
            Finished
          </Button>
        </div>
        {/* <div className="addNewString">
          <div>
            <button onClick={stopWatch.start}>Start</button>
            <button onClick={stopWatch.pause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
          </div>
          <p>Elapsed time: {stopWatch.time}</p>
          {stopWatch.isRunning && <p>Running...</p>}
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);
