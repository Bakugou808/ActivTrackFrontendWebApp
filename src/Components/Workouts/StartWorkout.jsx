import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTimer } from "use-timer";

// * Component Imports
import UiComponent from "./UiComponent";
import AutoRollSwitch from "./AutoRollSwitch";
import AttributeFields from "./AttributeFields";
// * Material UI Imports
import { Tooltip, Fab, Button } from "@material-ui/core";

// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
} from "../../Redux/Actions/WorkoutActions";
import { postStat } from "../../Redux/Actions/StatsActions";
import { fetchSession } from "../../Redux/Actions/SessionsActions";

//*! add the session id to the url path to have access for refresh, maybe add the circ_ex id as well and keep the route open... that way on refresh during a session you can fetch the exercise the user was on and slice the exObjs from indexOf(circ_ex) to the end*/

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
  } = props;
  const workoutId = match.params.workoutId;
  const sessionId = match.params.sessionId;
  const [exObj, setExObj] = useState(false);
  const [exObjs, setExObjs] = useState([]);
  const [goToNext, setGoToNext] = useState(false);
  // *start/stop exercise
  const [startEx, setStartEx] = useState(false);
  const [endEx, setEndEx] = useState(false);
  // *log total time for entire workout
  const [totalTime, setTotalTime] = useState(0);
  // *store stats (att + active/rest times + note?)
  const [exStats, setExStats] = useState({ activeTime: 0 });
  const [submitClicked, setSubmitClicked] = useState(false);
  //  *expand att fields once exercise is completed
  const [focusAttFields, setFocusAttFields] = useState(false);
  // * autoroll to the next exercise as soon as you click go to next, or start on click let's go
  const [autoRoll, setAutoRoll] = useState(false);
  // *state and functions for timer hook --> rename the props and see if you can have more than one timer?
  const { time, start, pause, reset, isRunning } = useTimer({
    // endTime: 10,
    onTimeUpdate: (time) => {
      // console.log("Time is over", time);
    },
  });

  const stopWatch = { time, start, pause, reset, isRunning };

  useEffect(() => {
    formattedWorkout ? formatExObjs(formattedWorkout) : fetchWorkouts();
    !selectedSession && onFetchSession(sessionId);
  }, [formattedWorkout]);

  const fetchWorkouts = () => {
    onFetchWorkout(workoutId);
    onFetchFormattedWorkout(workoutId);
  };

  const formatExObjs = (nestedArr) => {
    const workout = [nestedArr.warmup, nestedArr.body, nestedArr.cool_down];
    workout.map((phase) => {
      phase.map((item) => {
        let key = Object.keys(item)[0];
        item[key].map((ex) => setExObjs((prev) => [...prev, ex]));
      });
    });
    setGoToNext(true);
  };

  // 1. user starts workout
  const handleStartWorkout = () => {
    deliverNextExObj();
    setGoToNext(false);
    setStartEx(true);
    setEndEx(false);
    setSubmitClicked(false);
    start();
  };

  // 2. when the user finshes executing ex. stop timer and restart for rest period
  const handleEndEx = (t) => {
    setStartEx(false);
    setEndEx(true);
    setExStats((prev) => ({ ...prev, activeTime: t }));
    // setFocusAttFields(true);
    reset();
    start();
  };

  // 3. user is prompted to fill att values and submit -> autoRoll ? run handleSubmitState : set submitClicked(true)
  // !but take into account rest time.

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
      if (autoRoll) {
        handleStartWorkout();
      } else {
        reset();
        setGoToNext(true);
      }
    };

    onPostStat(statData, sideEffects);
    setFocusAttFields(false);
  };

  const deliverNextExObj = () => {
    debugger;
    setExObj(exObjs[0]);
    setExObjs((prev) => prev.slice(1));
    // !have a catch for if its at the last exObj --> success page --> stats/home redirect
  };

  return (
    <div className="container grid">
      {goToNext && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartWorkout}
        >
          Ready? Lets Go!
        </Button>
      )}
      <div>
        <AutoRollSwitch autRoll={autoRoll} setAutoRoll={setAutoRoll} />{" "}
      </div>
      <div>
        <UiComponent
          exObj={exObj}
          startEx={startEx}
          endEx={endEx}
          stopWatch={stopWatch}
          handleEndEx={handleEndEx}
        />
      </div>
      <div>
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
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  selectedWorkout: store.workouts.selectedWorkout,
  formattedWorkout: store.workouts.formattedWorkout,
  selectedSession: store.sessions.selectedSession,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
  onPostStat: (statData, sideEffects) =>
    dispatch(postStat(statData, sideEffects)),
  onFetchSession: (sessionId) => dispatch(fetchSession(sessionId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);
