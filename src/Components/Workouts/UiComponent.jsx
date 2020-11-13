import React, { useState, useEffect } from "react";
import { normalizeString } from "./AttributeFields";
import { connect } from "react-redux";
import useSound from "use-sound";

import BellSound from "../../Sounds/BellSound.mp3";
// * Component Imports
import { handleRestPeriod } from "./StartWorkout";
import AutoRollSwitch from "./AutoRollSwitch";
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper } from "@material-ui/core";

// * Action Imports
import { setCurrExRef } from "../../Redux/Actions/WorkoutActions";

function toTitleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

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
    setExRef,
    formattedWorkout,
    bell,
    setBell,
  } = props;
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);
  const [isSet, setIsSet] = useState(false);
  const [showRpForm, setShowRpForm] = useState(false);
  const [rp2, setRp2] = useState();
  const [timeAlert, setTimeAlert] = useState(false);
  const [play, setPlay] = useState(false);
  const [playTimesUp, { stop }] = useSound(BellSound);
  const [phase, setPhase] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);

  const classes = useStyles();
  useEffect(() => {
    exObj && handleTitleCase();
  }, [exObj, restPeriod, formattedWorkout]);

  const handleTitleCase = () => {
    setPhase(toTitleCase(exObj.circuit_phase));
    setName(toTitleCase(exObj.ex_name));
    setType(toTitleCase(exObj.circuit_type));
  };

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
          <div className="text">Rest Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    }
  };

  const handleStartPause = () => {
    startEx && (stopWatch.isRunning ? stopWatch.pause() : stopWatch.start());
  };

  const renderAtts = () => {
    let arr = Object.entries(exObj.circuit_exercise_attributes);

    return arr.map((kv) => {
      return <p>{`${kv}`}</p>;
    });
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
    if (restInSec == timeInSec) {
      handleTimesUp();
    }
  };

  const handleTimesUp = () => {
    playTimesUp() && setTimeout(stop(), 3000);
  };
  const handleTimesUp10sec = () => {
    playTimesUp() && setTimeout(stop(), 1000);
  };

  return (
    <>
      <Paper elevation={6} className="UiComponentContainer UiCC2">
        <div className="UiComponentContainer w50vw">
          <div className="exHeaders">
            {exObj && (
              <a
                className="exTitleWorkout"
                href={`#${exObj.ex_id}-${exObj.circuit_position}-${exObj.phase_position}`}
                ref={(input) => setExRef(input)}
              >
                {name}
              </a>
            )}
          </div>
          <div className="switches">
            <div className="autoRollSwitch">
              <AutoRollSwitch
                autoRoll={autoRoll}
                setAutoRoll={setAutoRoll}
                label={"AutoRoll"}
              />
            </div>
            <div className="autoRollSwitch">
              <AutoRollSwitch
                autoRoll={bell}
                setAutoRoll={setBell}
                label={"Sound"}
              />
            </div>
          </div>
          {/* <div className="setDisplay">
            <p className="setNum"> {exObj && `Set #: ${setNum}`} </p>
            <p className="setGoal">
              {exObj && `Set Total: ${exObj.circuit_sets}`}
            </p>
          </div> */}

          <div className="horizontal1">
            {/* <div className="horizontal2 cardRepRest">
              {`Rep Goal: `}
              {exObj && (
                <span className="repDisplay">{` ${exObj.circuit_exercise_attributes.reps}`}</span>
              )}
            </div> */}

            <div className="horizontal2 cardRepRest">
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
                  <div className="noRp" onClick={() => setShowRpForm(true)}>
                    {` ${restPeriod.message}`}
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
                  <p>{` ${restPeriod.num} ${restPeriod.unit}`}</p>
                </span>
              )}
            </div>
          </div>
          <div className={"timeAlert"}>
            {timeAlert && "RestTime Exceeded!!!"}
          </div>
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
          <div className="attCards">
            <Paper className="phaseNtype" elevation={1}>
              <div className="pntR3">
                <div className="horizontal2 cardRepRest">
                  {`Rep Goal: `}
                  {exObj && (
                    <span className="repDisplay">{` ${exObj.circuit_exercise_attributes.reps}`}</span>
                  )}
                </div>
              </div>
              <div className="setDisplay">
                {/* <p className="setNum"> {exObj && `Set #: ${setNum}`} </p>
                <p className="setGoal">
                  {exObj && `Set Total: ${exObj.circuit_sets}`}
                </p> */}
                {exObj && (
                  <p className="setNum">
                    {`Set Number ${setNum} Out Of ${exObj.circuit_sets}`}
                  </p>
                )}
              </div>
              {/* <div className="pntR1">
                <div className="exPhaseType">{`Phase: ${phase}`}</div>
                <div></div>
                <div className="exPhaseType">{`Type: ${type}`} </div>
              </div> */}
            </Paper>

            {/* <Paper className="atts" elevation={3}>
              {exObj && renderAtts()}
            </Paper> */}
          </div>
          <div className="pntR1">
            <div className="exPhase0">{`Phase: ${phase}`}</div>
            <div></div>
            <div className="exType0">{`Type: ${type}`} </div>
          </div>
        </div>
      </Paper>

      {!startWorkout ? (
        <div className="startButton">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBeginWorkout}
            className={classes.btn}
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
              className={classes.btn}
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
              className={classes.btn}
            >
              Finished
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (store) => ({
  formattedWorkout: store.workouts.formattedWorkout,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCurrExRef: (ref) => dispatch(setCurrExRef(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: "25px",
    width: "100%",
    margin: "15px",
  },
}));
