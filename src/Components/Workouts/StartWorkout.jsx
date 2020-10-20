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
  } = props;
  const workoutId = match.params.workoutId;
  const sessionId = match.params.sessionId;
  const folderName = match.params.folderName;
  const folderId = match.params.folderId;
  const workoutTitle = match.params.workoutTitle;

  const [exObj, setExObj] = useState(false);
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
      debugger;
      let unit = nxtObj.circuit_exercise_attributes.restPeriod
        .replace(/[^a-zA-Z]+/g, "")
        .toLowerCase();
      setRestPeriod({ num: num, unit: unit });
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
  };

  // 1. user starts workout
  const handleStartWorkout = () => {
    // deliverNextExObj();
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
    // setFocusAttFields(false);
  };

  const handleFinishWorkout = () => {
    history.push(
      `/workout_finished/${folderName}/${folderId}/${workoutTitle}/${workoutId}/${sessionId}`
    );
    // !clear states where necessary
  };

  const deliverNextExObj = () => {
    setExObj(exObjs[0]);
    exObjs[0] && handleSetNum(exObjs[0]);
    exObjs[0] && handleRestPeriod(exObjs[0]);

    exObjs.length > 0
      ? setExObjs((prev) => prev.slice(1))
      : handleFinishWorkout();
  };

  return (
    <div className="container grid">
      {!startWorkout ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBeginWorkout}
        >
          Ready? Lets Begin!
        </Button>
      ) : (
        goToNext && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStartWorkout}
          >
            Ready? Lets Go!
          </Button>
        )
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
          goToNext={goToNext}
          setNum={setNum}
          restPeriod={restPeriod}
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
