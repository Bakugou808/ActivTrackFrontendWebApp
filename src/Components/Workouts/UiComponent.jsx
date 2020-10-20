import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const UiComponent = (props) => {
  const {
    exObj,
    startEx,
    endEx,
    stopWatch,
    handleEndEx,
    setNum,
    restPeriod,
  } = props;
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);
  const [isSet, setIsSet] = useState(false);
  const [showRpForm, setShowRpForm] = useState(false)

  useEffect(() => {
    if (exObj) {
      exObj.circuit_type === "circuit" ? setIsSet(true) : setIsSet(false);
    }
  }, [exObj]);
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
          <div className="text">Active Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    } else if (endEx) {
      return (
        <div className="timer">
          {/* <div className="text">Remaining</div> */}
          <div className="text">Rest Time</div>
          {/* <div className="value">{remainingTime}</div> */}
          <div className="value">{timerValue}</div>
        </div>
      );
    }
  };

  const handleStartPause = () => {
    startEx && (stopWatch.isRunning ? stopWatch.pause() : stopWatch.start());
  };

  return (
    <div>
      <div className="container grid">
        <div className="addNewString">
          <div>
            {exObj && (
              <>
                <div> {exObj.circuit_phase} </div>
                <div> {exObj.circuit_type} </div>
                <div> {exObj.ex_name} </div>
              </>
            )}
          </div>
        </div>
        <div className="addNewString">
          <p> {exObj && `Set #: ${setNum}`} </p>
          -----------------------------------------
          <p> {exObj && `Set Total: ${exObj.circuit_sets}`} </p>
        </div>
        <div className="addNewString">
          <p>
            {exObj && `Rep Goal: ${exObj.circuit_exercise_attributes.reps}`}{" "}
          </p>
          <p>
            Rest Period:{" "}
            {restPeriod.message
              ? 
              (showRpForm ? 
                // show form
                :
                <div>{restPeriod.message}</div>
                )
              
              : 
              ()
              `${restPeriod.num} ${restPeriod.unit}`}
          </p>
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
          {startEx && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEndEx(stopWatch.time)}
            >
              Finished
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);
