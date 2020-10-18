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

const StartWorkout = (props) => {
  const {
    history,
    match,
    formattedWorkout,
    selectedWorkout,
    onFetchWorkout,
    onFetchFormattedWorkout,
  } = props;
  const workoutId = match.params.workoutId;
  const [exObj, setExObj] = useState(false);
  const [exObjs, setExObjs] = useState([]);
  const [goToNext, setGoToNext] = useState(false);
  const [endEx, setEndEx] = useState(false);
  const [startEx, setStartEx] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [exStats, setExStats] = useState({ activeTime: 0, restTime: 0 });

  const { time, start, pause, reset, isRunning } = useTimer({
    // endTime,
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
    deliverNextExObj();
    setStartEx(true);
    start();
  };

  const handleEndEx = (t) => {
    setStartEx(false);
    setEndEx(true);
    setExStats((prev) => ({ ...prev, activeTime: t }));
    reset();
    start();
  };

  const handleSetExStats = (stats) => {
    setExStats();
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
          goToNext={goToNext}
          stopWatch={stopWatch}
          handleEndEx={handleEndEx}
        />
      </div>
      <div>
        <AttributeFields
          exObj={exObj}
          startEx={startEx}
          goToNext={goToNext}
          stopWatch={stopWatch}
          setExStats={setExStats}
          handleSetExStats={handleSetExStats}
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
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFormattedWorkout: (workoutId) =>
    dispatch(fetchFormattedWorkout(workoutId)),
  onFetchWorkout: (workoutId) => dispatch(fetchWorkout(workoutId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);
