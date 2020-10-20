import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import { handleRestPeriod } from "./StartWorkout";
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

export const UiComponent = (props) => {
  const {
    exObj,
    startEx,
    endEx,
    stopWatch,
    handleEndEx,
    setNum,
    restPeriod,
    handleRestPeriod,
  } = props;
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);
  const [isSet, setIsSet] = useState(false);
  const [showRpForm, setShowRpForm] = useState(false);
  const [rp2, setRp2] = useState();
  const [timeAlert, setTimeAlert] = useState(false);

  useEffect(() => {}, [exObj, restPeriod]);

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(stopWatch.time / 60);
    const seconds = stopWatch.time - minutes * 60;

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    const timerValue =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    if (!endEx) {
      setTimeAlert(false);
      return (
        <div className="timer">
          <div className="text">Active Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    } else if (endEx) {
      handleExceededRest();
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

  const handleRpSubmit = (e) => {
    e.preventDefault();
    let obj = { circuit_exercise_attributes: { restPeriod: `${rp2}` } };
    handleRestPeriod(obj);
    setShowRpForm(false);
  };

  const handleExceededRest = () => {
    let timeInSec = stopWatch.time;
    let restInSec = 0;

    if (restPeriod.unit.includes("sec")) {
      restInSec = restPeriod.num;
    } else if (restPeriod.unit.includes("min")) {
      restInSec = restPeriod.num * 60;
    }

    if (restInSec <= timeInSec) {
      setTimeAlert(true);
    } else {
      setTimeAlert(false);
    }
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
          <div>
            Rest Period:{" "}
            {restPeriod.message ? (
              showRpForm ? (
                // show form
                <form onSubmit={handleRpSubmit}>
                  <TextField
                    type="text"
                    margin="dense"
                    placeholder={`${restPeriod.num} ${restPeriod.unit}`}
                    onChange={(e) => setRp2(e.target.value)}
                    value={rp2}
                  />
                </form>
              ) : (
                <div onClick={() => setShowRpForm(true)}>
                  {restPeriod.message}
                </div>
              )
            ) : showRpForm ? (
              <form onSubmit={handleRpSubmit}>
                <TextField
                  type="text"
                  margin="dense"
                  placeholder={`${restPeriod.num} ${restPeriod.unit}`}
                  onChange={(e) => setRp2(e.target.value)}
                  value={rp2}
                />
              </form>
            ) : (
              <div onClick={() => setShowRpForm(true)}>
                {restPeriod.num} {restPeriod.unit}
              </div>
            )}
          </div>
          {timeAlert && "RestTime Exceeded!!!"}
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
