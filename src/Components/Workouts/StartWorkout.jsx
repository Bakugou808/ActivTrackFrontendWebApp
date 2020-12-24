import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTimer } from "use-timer";
import useSound from "use-sound";

import BellSound from "../../Sounds/BellSound.mp3";

// * Component Imports
import { AuthHOC } from "../AuthHOC";
import UiComponent from "./UiComponent";
import AutoRollSwitch from "./AutoRollSwitch";
import AttributeFields from "./AttributeFields";
import ExListDrawer from "./ExListDrawer";
import ExListDrawerMobPortrait from "./ExListDrawerMobPortrait";
import RestPeriodCard from "./RestPeriodCard";
// * Material UI Imports
import { Tooltip, Fab, Button } from "@material-ui/core";

// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
  clearPatchedCircExAndCircuitFromState,
} from "../../Redux/Actions/WorkoutActions";
import { postStat } from "../../Redux/Actions/StatsActions";
import {
  fetchSession,
  patchSession,
} from "../../Redux/Actions/SessionsActions";
import { FormatListNumberedOutlined } from "@material-ui/icons";

// *for LATER
//*! add the session id to the url path to have access for refresh, maybe add the circ_ex id as well and keep the route open... that way on refresh during a session you can fetch the exercise the user was on and slice the exObjs from indexOf(circ_ex) to the end*/
// * TO-DO: incorporate default rest time, sound effects on start and end and finished workout (add that to EndWorkout Component)
const StartWorkout = (props) => {
  const {
    history,
    match,
    formattedWorkout,
    selectedWorkout,
    onFetchSession,
    onFetchWorkout,
    onFetchFormattedWorkout,
    onPostStat,
    selectedSession,
    showDrawer,
    onClearPatchedCircExAndCircuitFromState,
    patchedCircExAtt,
    patchedCircuitSet,
    patchedExTitle,
    device,
    orientation,
    onPatchSession,
  } = props;

  const workoutId = match.params.workoutId;
  const sessionId = match.params.sessionId;
  const folderName = match.params.folderName;
  const folderId = match.params.folderId;
  const workoutTitle = match.params.workoutTitle;

  const [exObj, setExObj] = useState(false);
  const [nextExObj, setNextExObj] = useState(false);
  const [exObjs, setExObjs] = useState([]);
  const [goToNext, setGoToNext] = useState(false);
  // *for determining set values
  const [records, setRecords] = useState([]);
  const [setNum, setSetNum] = useState(1);
  const [restPeriod, setRestPeriod] = useState({ num: 0, unit: "min" });

  // *start/stop exercise
  const [startEx, setStartEx] = useState(false);
  const [endEx, setEndEx] = useState(false);
  const [startWorkout, setStartWorkout] = useState(false);
  // *log total time for entire workout
  const [totalTime, setTotalTime] = useState(0);
  // *store stats (att + active/rest times + note?)
  const [exStats, setExStats] = useState({ activeTime: 0 });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showRPCard, setShowRPCard] = useState(false);
  //  *expand att fields once exercise is completed
  const [focusAttFields, setFocusAttFields] = useState(false);
  // * autoroll to the next exercise as soon as you click go to next, or start on click let's go
  const [autoRoll, setAutoRoll] = useState(false);
  // *state and functions for timer hook --> rename the props and see if you can have more than one timer?
  const { time, start, pause, reset, isRunning } = useTimer({
    onTimeUpdate: (time) => {},
  });

  const fullTime = useTimer();
  const fullActiveTime = useTimer();
  const fullRestTime = useTimer();

  // *sound effects
  const [playBell] = useSound(BellSound);
  // *exDrawer Scroll
  const [exRef, setExRef] = useState(null);
  const [bell, setBell] = useState(true);

  const stopWatch = { time, start, pause, reset, isRunning };
  useEffect(() => {
    formattedWorkout ? formatExObjs(formattedWorkout) : fetchWorkouts();
    !selectedSession && onFetchSession(sessionId);
  }, []);

  function useLivePatch() {
    useEffect(() => {
      const data = {
        circEx: patchedCircExAtt,
        circ: patchedCircuitSet,
        exercise: patchedExTitle,
      };
      handlePatchExObj(data);
    }, [patchedCircExAtt, patchedCircuitSet, patchedExTitle]);
  }

  const handlePatchExObj = (data) => {
    const circEx = data.circEx;
    const circ = data.circ;
    const ex = data.exercise;
    if (circEx && circ && ex) {
      let newObjs = exObjs;
      let index = newObjs.findIndex(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      );
      let newObj = exObjs.filter(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      )[0];

      newObj.circuit_exercise_attributes = circEx.ex_attributes;
      newObj.circuit_sets = circ.sets;
      newObj.ex_name = ex.exercise_name;
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (circEx && circ) {
      let newObjs = exObjs;
      let index = newObjs.findIndex(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      );
      let newObj = exObjs.filter(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      )[0];

      newObj.circuit_exercise_attributes = circEx.ex_attributes;
      newObj.circuit_sets = circ.sets;
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (circEx && ex) {
      let newObjs = exObjs;
      let index = newObjs.findIndex(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      );
      let newObj = exObjs.filter(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      )[0];

      newObj.circuit_exercise_attributes = circEx.ex_attributes;
      newObj.ex_name = ex.exercise_name;
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (circ && ex) {
      let newObjs = exObjs;
      let newObj = exObjs.filter((exObj) => exObj.circuit_id === circ.id)[0];

      newObj.circuit_sets = circ.sets;
      newObj.ex_name = ex.exercise_name;

      let index = newObjs.findIndex((exObj) => exObj.circuit_id === circ.id);
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (ex) {
      let newObjs = exObjs;
      let newObj = exObjs.filter((exObj) => exObj.ex_id === ex.id)[0];
      newObj.ex_name = ex.exercise_name;

      let index = newObjs.findIndex((exObj) => exObj.ex_id === ex.id);
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (circEx) {
      let newObjs = exObjs;
      let newObj = exObjs.filter(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      )[0];
      newObj.circuit_exercise_attributes = circEx.ex_attributes;
      let index = newObjs.findIndex(
        (exObj) => exObj.circuit_exercise_id === circEx.id
      );
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else if (circ) {
      let newObjs = exObjs;
      let newObj = exObjs.filter((exObj) => exObj.circuit_id === circ.id)[0];

      newObj.circuit_sets = circ.sets;
      let index = newObjs.findIndex((exObj) => exObj.circuit_id === circ.id);
      newObjs[`${index}`] = newObj;

      setExObjs(newObjs);
    } else {
      return null;
    }
    onClearPatchedCircExAndCircuitFromState();
  };

  const handleSetNum = (nxtObj) => {
    if (
      records.length > 0 &&
      records[records.length - 1].circuit_id === nxtObj.circuit_id
    ) {
      let count = records.filter((ex) => ex === nxtObj);
      setSetNum(count.length + 1);
      setRecords((prev) => [...prev, nxtObj]);
    } else {
      setSetNum(1);
      setRecords([nxtObj]);
    }
  };

  const handleRestPeriod = (nxtObj) => {
    const numberPattern = /\d+/g;

    if (nxtObj.circuit_exercise_attributes.restPeriod) {
      let num = nxtObj.circuit_exercise_attributes.restPeriod.match(
        numberPattern
      );
      let unit = nxtObj.circuit_exercise_attributes.restPeriod
        .replace(/[^a-zA-Z]+/g, "")
        .toLowerCase();
      unit
        ? setRestPeriod({ num: num, unit: unit })
        : setRestPeriod((prev) => ({ num: num, unit: prev.unit }));
    } else {
      setRestPeriod((prev) => ({ ...prev, message: "Add Rest Period" }));
    }
  };

  const fetchWorkouts = () => {
    onFetchWorkout(workoutId);
    onFetchFormattedWorkout(workoutId);
  };

  const formatExObjs = (nestedArr) => {
    const workout = [nestedArr.warmup, nestedArr.body, nestedArr.cool_down];
    workout.map((phase) => {
      phase.map((item) => {
        let key = Object.keys(item)[0];

        let setCount = item[key][0].circuit_sets;
        let circuitArr = [];
        for (let i = 0; i < setCount; i++) {
          item[key].map((ex) => {
            circuitArr.push(ex);
          });
        }
        setExObjs((prev) => [...prev, ...circuitArr]);
      });
    });
    setGoToNext(true);
  };

  const handleBeginWorkout = () => {
    deliverNextExObj();
    handleStartWorkout();
    setStartWorkout(true);
    // playBell()
  };

  // 1. user starts workout
  const handleStartWorkout = () => {
    setGoToNext(false);
    setStartEx(true);
    setEndEx(false);
    setSubmitClicked(false);
    bell && playBell();
    start();
    fullTime.start();
    fullActiveTime.start();
    fullRestTime.isRunning && fullRestTime.pause();
  };

  // 2. when the user finishes executing ex. stop timer and restart for rest period
  const handleEndEx = (t) => {
    setStartEx(false);
    fullActiveTime.pause();
    setEndEx(true);
    setExStats((prev) => ({ ...prev, activeTime: t }));
    setFocusAttFields(true);
    reset();
    // playBell();
    fullRestTime.start();
    start();
  };

  // 3. user is prompted to fill att values and submit -> autoRoll ? run handleSubmitState : set submitClicked(true)

  // when user is ready to move to next workout submit
  const handleSubmitStats = (t) => {
    const statsObj = {
      ...exObj.circuit_exercise_attributes,
      ...exStats,
      ...{ restPeriod: t },
    };
    const statData = {
      circuit_exercise_session_detail: {
        stats: statsObj,
        ...{
          session_id: selectedSession.id,
          circuit_exercise_id: exObj.circuit_exercise_id,
        },
      },
    };

    const sideEffects = () => {
      reset();
      setSubmitClicked(false);
      if (autoRoll) {
        handleStartWorkout();
        deliverNextExObj();
      } else {
        reset();
        deliverNextExObj();
        setGoToNext(true);
      }
    };

    onPostStat(statData, sideEffects);
    setFocusAttFields(false);
    setShowRPCard(false);
  };

  const handleFinishWorkout = () => {
    let fullRT = fullRestTime.time;
    let fullAT = fullActiveTime.time;
    let totalTime = fullTime.time;
    let sessionData = {
      session: {
        id: selectedSession.id,
        active_time: fullAT,
        rest_time: fullRT,
        total_time: totalTime,
      },
    };

    const sideEffects = () => {
      history.push(
        `/workout_finished/${folderName}/${folderId}/${workoutTitle}/${workoutId}/${sessionId}`
      );
    };

    // patchSession
    onPatchSession(sessionData, sideEffects);

    // !clear states where necessary
  };

  const pauseTimers = () => {
    fullRestTime.pause();
    fullActiveTime.pause();
    fullTime.pause();
  };

  const deliverNextExObj = () => {
    setExObj(exObjs[0]);
    exObjs[1]
      ? setNextExObj(exObjs[1].ex_name)
      : setNextExObj("End of Workout. Way to go!");
    exObjs[0] && handleSetNum(exObjs[0]);
    exObjs[0] && handleRestPeriod(exObjs[0]);

    if (exObjs.length > 0) {
      setExObjs((prev) => prev.slice(1));
    } else {
      pauseTimers();
      handleFinishWorkout();
    }
  };

  const Attributes = () => {
    return (
      <AttributeFields
        exObj={exObj}
        startEx={startEx}
        setGoToNext={setGoToNext}
        stopWatch={stopWatch}
        setExStats={setExStats}
        submitClicked={submitClicked}
        handleSubmitStats={handleSubmitStats}
        setSubmitClicked={setSubmitClicked}
        focusAttFields={focusAttFields}
      />
    );
  };

  return (
    <div
      className={
        device === "computer"
          ? showDrawer
            ? "startWorkoutContainerGrid"
            : "startWorkoutContainerFlex"
          : orientation === "portrait"
          ? showDrawer
            ? "startWorkoutContainerMobPortraitGrid"
            : "startWorkoutContainerMobPortraitFlex"
          : "startWorkoutContainerMobPortraitLandscape"
      }
    >
      {useLivePatch()}
      {showDrawer &&
        (device === "computer" ? (
          <ExListDrawer
            currentEx={exObj}
            exRef={exRef}
            history={history}
            match={match}
            workoutStarted={true}
          />
        ) : orientation === "portrait" ? (
          <ExListDrawerMobPortrait
            currentEx={exObj}
            exRef={exRef}
            history={history}
            match={match}
          />
        ) : (
          <ExListDrawer
            currentEx={exObj}
            exRef={exRef}
            history={history}
            match={match}
          />
        ))}
      <div
        className={showDrawer ? "runWorkoutContainer" : "runWorkoutContainer2"}
      >
        <div className="UiCompAttFieldsCont">
          <UiComponent
            exObj={exObj}
            startEx={startEx}
            endEx={endEx}
            stopWatch={stopWatch}
            handleEndEx={handleEndEx}
            goToNext={goToNext}
            setNum={setNum}
            restPeriod={restPeriod}
            setRestPeriod={setRestPeriod}
            handleRestPeriod={handleRestPeriod}
            autoRoll={autoRoll}
            setAutoRoll={setAutoRoll}
            startWorkout={startWorkout}
            handleBeginWorkout={handleBeginWorkout}
            handleStartWorkout={handleStartWorkout}
            playBell={playBell}
            bell={bell}
            setBell={setBell}
            setExRef={setExRef}
            fullTime={fullTime}
            attributesComponent={Attributes}
            handleSubmitStats={handleSubmitStats}
            submitClicked={submitClicked}
          />

          <AttributeFields
            exObj={exObj}
            startEx={startEx}
            setGoToNext={setGoToNext}
            stopWatch={stopWatch}
            setExStats={setExStats}
            submitClicked={submitClicked}
            // handleSubmitStats={handleSubmitStats}
            setShowRPCard={setShowRPCard}
            setSubmitClicked={setSubmitClicked}
            focusAttFields={focusAttFields}
          />

          <RestPeriodCard
            showRPCard={showRPCard}
            stopWatch={stopWatch}
            handleSubmitStats={handleSubmitStats}
            endEx={endEx}
            restPeriod={restPeriod}
            bell={bell}
            startEx={startEx}
            nextExObj={nextExObj}
            handleRestPeriod={handleRestPeriod}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedWorkout: store.workouts.selectedWorkout,
  formattedWorkout: store.workouts.formattedWorkout,
  selectedSession: store.sessions.selectedSession,
  showDrawer: store.workouts.showDrawer,
  patchedCircExAtt: store.workouts.patchedCircExAtt,
  patchedCircuitSet: store.workouts.patchedCircuitSet,
  patchedExTitle: store.workouts.patchedExTitle,
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onPostStat: (statData, sideEffects) =>
    dispatch(postStat(statData, sideEffects)),
  onFetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
  onClearPatchedCircExAndCircuitFromState: () =>
    dispatch(clearPatchedCircExAndCircuitFromState()),
  onPatchSession: (sessionData, sideEffects) =>
    dispatch(patchSession(sessionData, sideEffects)),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StartWorkout)
);
