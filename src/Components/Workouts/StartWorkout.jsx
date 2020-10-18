import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTimer } from "use-timer";

// * Component Imports
import UiComponent from "./UiComponent";

import AttributeFields from "./AttributeFields";
// * Material UI Imports
import { Tooltip, Fab, Button } from "@material-ui/core";

// * Action Imports
import {
  fetchWorkout,
  fetchFormattedWorkout,
} from "../../Redux/Actions/WorkoutActions";
import { postStat } from "../../Redux/Actions/StatsActions";

//*! add the session id to the url path to have access for refresh, maybe add the circ_ex id as well and keep the route open... that way on refresh during a session you can fetch the exercise the user was on and slice the exObjs from indexOf(circ_ex) to the end*/

const StartWorkout = (props) => {
  const {
    history,
    match,
    formattedWorkout,
    selectedWorkout,
    onFetchWorkout,
    onFetchFormattedWorkout,
    onPostStat,
    selectedSession,
  } = props;
  const workoutId = match.params.workoutId;
  const [exObj, setExObj] = useState(false);
  const [exObjs, setExObjs] = useState([]);
  const [goToNext, setGoToNext] = useState(false);
  // *start/stop exercise
  const [startEx, setStartEx] = useState(false);
  const [endEx, setEndEx] = useState(false);
  // *log total time for entire workout
  const [totalTime, setTotalTime] = useState(0);
  // *store stats (att + active/rest times + note?)
  const [exStats, setExStats] = useState({ active_time: 0, rest_time: 0 });
  const [submitClicked, setSubmitClicked] = useState(false);
  //  *expand att fields once exercise is completed
  const [focusAttFields, setFocusAttFields] = useState(false);
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
  };

  const handleStartWorkout = () => {
    !exObj && deliverNextExObj();
    setStartEx(true);
    start();
  };

  const handleEndEx = (t) => {
    setStartEx(false);
    setEndEx(true);
    setExStats((prev) => ({ ...prev, active_time: t }));
    setFocusAttFields(true);
    reset();
    start();
  };

  const handleSubmitStats = (t) => {
    const statData = {
      circuit_exercise_session_details: {
        stats: exStats,
        ...{
          rest_time: t,
          session_id: selectedSession.id,
          circuit_exercise_id: exObj.circuit_exercise_id,
        },
      },
    };

    const sideEffects = () => {
      deliverNextExObj();
      reset();
      setStartEx(true);
      setEndEx(false);
      start();
    };

    onPostStat(statData, sideEffects);
    setFocusAttFields(false);
  };

  const deliverNextExObj = () => {
    setExObj(exObjs[0]);
    setExObjs((prev) => prev.slice(1));
  };

  return (
    <div className="container grid">
      {(!startEx || endEx) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStartWorkout}
        >
          Ready? Lets Go!
        </Button>
      )}
      <div>
        <UiComponent
          exObj={exObj}
          startEx={startEx}
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
      {endEx && (
        <Button onClick={() => setGoToNext(true)}>Go To Next Exercise</Button>
      )}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);
