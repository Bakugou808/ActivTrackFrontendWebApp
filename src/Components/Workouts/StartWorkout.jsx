import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTimer } from "use-timer";
import useSound from "use-sound";

import BellSound from "../../Sounds/BellSound.mp3";
// * ReactTour Imports
import Tour from "reactour";
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
import {
  activateTour,
  deactivateTour,
  endTour,
} from "../../Redux/Actions/TourActions";

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
    onActivateTour,
    onDeactivateTour,
    onEndTour,
    tourOn1,
    tourOn2,
    tourOn2B,
    tourOn3,
    tourOn4,
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
  const [playBell, { stop }] = useSound(BellSound);
  // *exDrawer Scroll
  const [exRef, setExRef] = useState(null);
  const [bell, setBell] = useState(true);
  // *tour state
  const [takeTour, setTakeTour] = useState(true);

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
    console.log("inStart Workout");
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
    tourOn2B && handleTourSwitch();
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
    tourOn4 && onEndTour();
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

    onPatchSession(sessionData, sideEffects);
  };

  const pauseTimers = () => {
    // fullRestTime.pause();
    // fullActiveTime.pause();
    // fullTime.pause();
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

  const handleTourSwitch = () => {
    onDeactivateTour("sW2B");
    onActivateTour("sW3");
  };

  const openTour = () => {
    onActivateTour("sW1");
  };

  return (
    <div>
      {takeTour && (
        <div className="tourNotification">
          <div>Take a Tour?</div>
          <Button onClick={openTour}>Yes</Button>
          <Button onClick={() => setTakeTour(false)}>No Thanks</Button>
        </div>
      )}
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS1}
        isOpen={tourOn1}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS2}
        isOpen={tourOn2}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS2B}
        isOpen={tourOn2B}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={ATT_STEPS}
        isOpen={tourOn3}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={REST_STEPS}
        isOpen={tourOn4}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />

      <div
        data-tour="sw1"
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
        {useLivePatch()}{" "}
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
          className={
            showDrawer ? "runWorkoutContainer" : "runWorkoutContainer2"
          }
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
              // playBell={playBell}
              bell={bell}
              setBell={setBell}
              setExRef={setExRef}
              fullTime={fullTime}
              attributesComponent={Attributes}
              handleSubmitStats={handleSubmitStats}
              submitClicked={submitClicked}
              showRPCard={showRPCard}
            />

            <AttributeFields
              exObj={exObj}
              startEx={startEx}
              setGoToNext={setGoToNext}
              stopWatch={stopWatch}
              setExStats={setExStats}
              submitClicked={submitClicked}
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
              // playBell={playBell}
              startEx={startEx}
              nextExObj={nextExObj}
              handleRestPeriod={handleRestPeriod}
            />
          </div>
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
  tourOn1: store.tour.sW1,
  tourOn2: store.tour.sW2,
  tourOn2B: store.tour.sW2B,
  tourOn3: store.tour.sW3,
  tourOn4: store.tour.sW4,
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
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  onEndTour: () => dispatch(endTour()),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StartWorkout)
);

const accentColor = "#ff5722";

const START_WORKOUT_STEPS1 = [
  {
    selector: '[data-tour = "sw1"]',
    content: () => (
      <div>
        This is where you can run your workout and track your progress. Lets
        take a look at whats available.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw2"]',
    content: () => (
      <div>
        This is the Sound Switch. It will turn off the bell sound you hear at
        the beginning and end of an exercise. It is set to "On" by default.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw3"]',
    content: () => (
      <div>
        This is the AutoRoll Switch. It will skip a section at the end of an
        exercise so you "roll" into the next exercise without a delay. It is set
        to "Off" by default.
      </div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw4"]',
    content: () => (
      <div>
        This is your Info Card. It displays all the info you'll want during your
        workout. It seems a bit empty at the moment. Lets move on.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw5"]',
    content: () => <div>Click the button, there's more to see!</div>,
    position: "top",
  },
];

const START_WORKOUT_STEPS2 = [
  {
    selector: '[data-tour = "sw4"]',
    content: () => (
      <div>Nice. Now that the card is filled. Lets do a quick breakdown.</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw6"]',
    content: () => (
      <div>
        This is your header. It has the name of the exercise and what Set Number
        you are out of the Total Number of Sets.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw7"]',
    content: () => (
      <div>
        These are your Timers. The one on the left tracks the entire time since
        the start of the workout. The one on the right tracks the time it takes
        to finish the exercise you're on.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw8"]',
    content: () => (
      <div>
        {`This is the Rest Period section.
        
        Click on the text to add time. You can set the unit to 'sec' or 'min'. 

        Press 'Enter' to save. 
        `}
      </div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw9"]',
    content: () => (
      <div>
        This is your Attributes Section. It displays all the attributes and
        their target values.
      </div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw10"]',
    content: () => (
      <div>{`Here you can see what Phase you are in as well as the Type of exercise you're doing.`}</div>
    ),
    position: "top",
  },
  {
    selector: '[data-tour = "sw16"]',
    content: () => (
      <div>{`Nice. Thats it for the Info Card.
    
    But it be really nice to know what was next in the workout... 
    
    Click this button here!
    `}</div>
    ),
    position: "right",
  },
];
const START_WORKOUT_STEPS2B = [
  {
    selector: '[data-tour = "sw11"]',
    content: () => (
      <div>{`All the exercises you have within the workout are here. Click on the Exercise Name in the Info Card and the list will jump to your current exercise. 
    
    * You can modify any exercise by clicking the Set Button or Card Number except the current exercise. `}</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw12"]',
    content: () => (
      <div>{`Great. Now lets go on to the next section.
    
    Click "FINISHED".`}</div>
    ),
    position: "right",
  },
];

const ATT_STEPS = [
  {
    selector: '[data-tour = "sw13"]',
    content: () => (
      <div>{`This is your Attributes Card. If you hit your target(s) for the attribute(s) you can simply click "SUBMIT". Or adjust the values and continue.`}</div>
    ),
    position: "right",
  },
];

const REST_STEPS = [
  {
    selector: '[data-tour = "sw14"]',
    content: () => (
      <div>{`If you set a Rest Period, you will get a notification when it runs out. To add a time click the text.
        
    Note: If "AutoRoll" is set to "On" the next card will go directly to the next exercise in the workout. Otherwise, you will be prompted to start the next exercise.`}</div>
    ),
    position: "right",
  },
  {
    selector: '[data-tour = "sw15"]',
    content: () => (
      <div>{`And thats the end of that folx.     
    
    When you're ready to move on to the next exercise click the button and get active!
    `}</div>
    ),
    position: "right",
  },
];
