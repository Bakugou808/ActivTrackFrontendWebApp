import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Sound Imports
import BellSound from "../../Sounds/BellSound.mp3";
import useSound from "use-sound";
// * Component Imports
import Timers from "./Timers";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Paper, TextField, Button } from "@material-ui/core";
// * Framer Motion Imports
import { motion } from "framer-motion";

export const RestPeriodCard = (props) => {
  const {
    showRPCard,
    stopWatch,
    handleSubmitStats,
    endEx,
    startEx,
    bell,
    restPeriod,
    nextExObj,
    handleRestPeriod,
    device,
    orientation,
  } = props;
  const classes = useStyles();
  const [timeAlert, setTimeAlert] = useState(false);
  const [showRpForm, setShowRpForm] = useState(false);
  const [rp2, setRp2] = useState();
  const [playBell, { stop, isPlaying }] = useSound(BellSound);

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
    if (restInSec == timeInSec) {
      bell && !isPlaying && playBell();
    }
  };

  return (
    <div className="restPeriodCard">
      {showRPCard && (
        <motion.div
          className="attFields"
          initial={{ y: "200vw" }}
          animate={orientation === "portrait" ? { y: -435 } : { y: -390 }}
          transition={{ duration: 0.5 }}
        >
          <Paper data-tour="sw14" className={classes.card} elevation={3}>
            <div className="centerDiv2 removeMarginBottom blueGreen breakTitle fsize20">
              Take A Break
            </div>
            <div className="centerDiv2 removeMarginBottom blueGreen fsize20 nextEx">
              <h4>Up Next</h4> <p>{nextExObj}</p>
            </div>
            <div className={"timeAlert"}>
              {timeAlert && "RestTime Exceeded!!!"}
            </div>
            <div className="" onClick={handleStartPause}>
              <Timers
                stopWatch={stopWatch}
                endEx={endEx}
                setTimeAlert={setTimeAlert}
                handleExceededRest={handleExceededRest}
                showRPCard={showRPCard}
              />
            </div>
            <div className="horizontal2 cardRepRest rpInput">
              <div>{`Rest Period: `}</div>
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
                  className="restPeriodDisplay restPeriodDisplay2 pointer "
                  onClick={() => setShowRpForm(true)}
                >
                  <p>{` ${restPeriod.num} ${restPeriod.unit}`}</p>
                </span>
              )}
            </div>

            <div data-tour="sw15" className="startButton">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmitStats(stopWatch.time)}
                className={classes.btn}
              >
                Go To Next
              </Button>
            </div>

            <div></div>
          </Paper>
        </motion.div>
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RestPeriodCard);

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: "25px",
    width: "100%",
    margin: "15px",
    height: "5vh",
  },
  UiFrame: {
    backgroundColor: "revert",
  },
  ExTitlePaper: {
    margin: "10px",
  },
  card: {
    backgroundColor: "#f9e79f",
    padding: "15px",
  },
}));
