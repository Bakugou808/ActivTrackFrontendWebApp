import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { normalizeString } from "./AttributeFields";
import { connect } from "react-redux";
import useSound from "use-sound";

import BellSound from "../../Sounds/BellSound.mp3";
// * Component Imports
import { handleRestPeriod } from "./StartWorkout";
import AutoRollSwitch from "./AutoRollSwitch";
import Timers from "./Timers";
import TotalTime from "./TotalTime";
import AttsCard from "./AttsCard";
// * Package Imports
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper } from "@material-ui/core";

// * Action Imports
import { setCurrExRef } from "../../Redux/Actions/WorkoutActions";
import {
  activateTour,
  deactivateTour,
  endTour,
} from "../../Redux/Actions/TourActions";

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
    // playBell,
    setBell,
    fullTime,
    device,
    orientation,
    handleSubmitStats,
    submitClicked,
    onActivateTour,
    onDeactivateTour,
    onEndTour,
    tourSW1,
    showRPCard,
  } = props;
  const [defTimerVal, setDefTimerVal] = useState(10);
  const [defRestPeriod, setDefRestPeriod] = useState(120);
  const [isSet, setIsSet] = useState(false);
  const [showRpForm, setShowRpForm] = useState(false);
  const [rp2, setRp2] = useState();
  const [timeAlert, setTimeAlert] = useState(false);
  const [play, setPlay] = useState(false);
  const [playBell, { stop, isPlaying }] = useSound(BellSound);
  const [phase, setPhase] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);

  const minutes = Math.floor(stopWatch.time / 60);
  const seconds = stopWatch.time - minutes * 60;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
  const timerValue =
    str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

  const classes = useStyles();
  useEffect(() => {
    exObj && handleTitleCase();
  }, [exObj, restPeriod, formattedWorkout, orientation, device]);

  const handleTitleCase = () => {
    setPhase(toTitleCase(exObj.circuit_phase));
    setName(toTitleCase(exObj.ex_name));
    setType(toTitleCase(exObj.circuit_type));
  };

  const handleStartPause = () => {
    startEx && (stopWatch.isRunning ? stopWatch.pause() : stopWatch.start());
  };

  const renderAtts = () => {
    let arr = Object.entries(exObj.circuit_exercise_attributes);

    return arr.map((kv) => {
      return <p key={uuidv4()}>{`${kv}`}</p>;
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
      bell && !isPlaying && playBell() && console.log("made a sound");
    }
  };

  const handleBeginWorkoutPre = () => {
    handleBeginWorkout();
    tourSW1 && handleTourSwitch();
  };

  const handleTourSwitch = () => {
    onDeactivateTour("sW1");
    onActivateTour("sW2");
  };

  return (
    <>
      {device === "computer" && (
        <div className="frameHeader">
          <div data-tour="sw3" className="autoRollSwitch">
            <AutoRollSwitch
              autoRoll={autoRoll}
              setAutoRoll={setAutoRoll}
              label={"AutoRoll"}
            />
          </div>

          <div data-tour="sw2" className="soundSwitch">
            <AutoRollSwitch
              autoRoll={bell}
              setAutoRoll={setBell}
              label={"Sound"}
            />
          </div>
        </div>
      )}

      <div className="flexKit">
        <Paper
          data-tour="sw4"
          elevation={6}
          className="UiComponentContainer UiCC2"
        >
          <div className="UiComponentContainer w50vw">
            {exObj && (
              <div className="setDisplay" data-tour="sw6">
                <a
                  className={
                    device === "mobile"
                      ? "exTitleWorkout exTitleWorkoutMob"
                      : "exTitleWorkout"
                  }
                  href={`#${exObj.ex_id}-${exObj.circuit_position}-${exObj.phase_position}`}
                  ref={(input) => setExRef(input)}
                >
                  {name}
                </a>

                <p
                  className={
                    device === "mobile" ? "setNum setNumMob" : "setNum"
                  }
                >
                  {`Set Number ${setNum} Out Of ${exObj.circuit_sets}`}
                </p>
              </div>
            )}

            <div className="exHeaders" data-tour="sw7">
              <div
                className={
                  device === "mobile" && orientation === "landscape"
                    ? "timer mobTimer"
                    : "timer"
                }
              >
                <TotalTime stopWatch={fullTime} endEx={endEx} />
              </div>
              <div></div>
              <div
                className={
                  device === "mobile" && orientation === "landscape"
                    ? "timer mobTimer"
                    : "timer"
                }
              >
                <Timers
                  stopWatch={stopWatch}
                  endEx={endEx}
                  setTimeAlert={setTimeAlert}
                  handleExceededRest={handleExceededRest}
                  showRPCard={showRPCard}
                />
              </div>
            </div>

            <div data-tour="sw8" className="">
              <div
                className={
                  device === "mobile"
                    ? "cardRepRestMob"
                    : "horizontal2 cardRepRest"
                }
              >
                <div
                  className={device === "mobile" && "restPeriodMobile"}
                >{`Rest Period: `}</div>
                {restPeriod.message ? (
                  showRpForm ? (
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
                    <div
                      className={
                        device === "mobile" ? "restPeriodMobile" : "noRp"
                      }
                      onClick={() => setShowRpForm(true)}
                    >
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
                    <p className={device === "mobile" && "restPeriodMobile"}>
                      {restPeriod.num
                        ? ` ${restPeriod.num} ${restPeriod.unit}`
                        : `Add Time`}
                    </p>
                  </span>
                )}
              </div>
            </div>

            <div data-tour="sw9" className="attCards">
              <Paper className="phaseNtype" elevation={1}>
                <AttsCard exObj={exObj} />
              </Paper>
            </div>
            <div data-tour="sw10" className="pntR1">
              <div
                className={device === "mobile" ? "exPhase0Mob" : "exPhase0"}
              >{`Phase: ${phase}`}</div>
              <div></div>
              <div className={device === "mobile" ? "exType0Mob" : "exType0"}>
                {`Type: ${type}`}{" "}
              </div>
            </div>
          </div>
        </Paper>
      </div>

      {!startWorkout ? (
        <div className="startButton" data-tour="sw5">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBeginWorkoutPre}
            className={
              device === "mobile" && orientation === "landscape"
                ? classes.btnMobLand
                : classes.btn
            }
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
              className={
                device === "mobile" && orientation === "landscape"
                  ? classes.btnMobLand
                  : classes.btn
              }
            >
              Ready? Lets Go!
            </Button>
          </div>
        )
      )}
      <div>
        {startEx && (
          <div data-tour="sw12" className="finButton">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEndEx(stopWatch.time)}
              className={
                device === "mobile" && orientation === "landscape"
                  ? classes.btnMobLand
                  : classes.btn
              }
            >
              Finished
            </Button>
          </div>
        )}
      </div>
      {device === "mobile" && (
        <div className="frameHeader">
          <div className="autoRollSwitch">
            <AutoRollSwitch
              autoRoll={autoRoll}
              setAutoRoll={setAutoRoll}
              label={"AutoRoll"}
            />
          </div>

          <div className="soundSwitch">
            <AutoRollSwitch
              autoRoll={bell}
              setAutoRoll={setBell}
              label={"Sound"}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (store) => ({
  formattedWorkout: store.workouts.formattedWorkout,
  device: store.device.device,
  orientation: store.device.orientation,
  tourSW1: store.tour.sW1,
  tourSW2: store.tour.sW2,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCurrExRef: (ref) => dispatch(setCurrExRef(ref)),
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  onEndTour: () => dispatch(endTour()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UiComponent);

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: "25px",
    width: "100%",
    margin: "15px",
  },
  UiFrame: {
    backgroundColor: "revert",
  },
  ExTitlePaper: {
    margin: "10px",
  },
  btnMobLand: {
    padding: "25px",
    width: "100%",
    margin: "15px",
    height: "20px",
  },
}));
