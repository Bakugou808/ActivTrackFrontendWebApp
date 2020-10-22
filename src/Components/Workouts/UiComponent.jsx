import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import { handleRestPeriod } from "./StartWorkout";
import AutoRollSwitch from "./AutoRollSwitch";
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper } from "@material-ui/core";

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
    autoRoll,
    setAutoRoll,
    startWorkout,
    handleBeginWorkout,
    handleStartWorkout,
    goToNext,
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
    <Paper elevation={6} className="UiComponentContainer">
      <div className="container grid no-margin">
        <div className="UiComponent">
          <div className="exHeaders">
            {exObj && (
              <div className="horizontal1">
                <div id="phaseDisp">{exObj.circuit_phase}</div>
                <div className="exTitleWorkout">{exObj.ex_name}</div>
                <div id="typeDisp">{exObj.circuit_type}</div>
              </div>
            )}
          </div>
          <div>
            <AutoRollSwitch autoRoll={autoRoll} setAutoRoll={setAutoRoll} />
          </div>
        </div>
        <div className="setDisplay">
          <p className="setNum"> {exObj && `Set #: ${setNum}`} </p>

          <p className="setGoal">
            {" "}
            {exObj && `Set Total: ${exObj.circuit_sets}`}{" "}
          </p>
        </div>

        <div className="horizontal1">
          <div className="horizontal2">
            {`Rep Goal: `}
            <span>{exObj && exObj.circuit_exercise_attributes.reps}</span>
          </div>

          <div className="horizontal2">
            <div>{`Rest Period: `}</div>
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
              <span
                className="restPeriodDisplay pointer"
                onClick={() => setShowRpForm(true)}
              >
                {restPeriod.num} {restPeriod.unit}
              </span>
            )}
          </div>
        </div>
        <div className={"timeAlert"}>{timeAlert && "RestTime Exceeded!!!"}</div>
        <div className="timer" onClick={handleStartPause}>
          <CountdownCircleTimer
            isPlaying={stopWatch.isRunning}
            duration={defTimerVal}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>

        {!startWorkout ? (
          <div className="startButton">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBeginWorkout}
            >
              Ready? Lets Begin!
            </Button>
          </div>
        ) : (
          goToNext && (
            <div className="startButton">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleStartWorkout}
              >
                Ready? Lets Go!
              </Button>
            </div>
          )
        )}
        <div>
          {startEx && (
            <div className="finButton">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEndEx(stopWatch.time)}
                className="center"
              >
                Finished
              </Button>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);
