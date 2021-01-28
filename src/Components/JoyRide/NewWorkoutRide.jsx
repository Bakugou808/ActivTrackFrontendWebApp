import React, { useEffect, useState, useReducer } from "react";

import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Button from "@material-ui/core/Button";

const TOUR_STEPS = [
  {
    target: ".newWorkoutStep1",
    content:
      "This is your header. It displays your Workout's title and description (if available). Click on the title to rename it.",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: ".newWorkoutStep2",
    content:
      "All Workouts are divided into 3 phases: 'Warm up', 'Body', and 'Cool Down'. You don't need to add exercises to each section if you don't feel like it. But its here for you if you decide to use them.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".newWorkoutStep3",
    content:
      "This icon will let open a form to add an exercise to the respective phase. Give it a click.",
    placement: "right-end",
  },
  {
    target: ".newWorkoutStep4",
    content:
      "This is the Recent Workouts section. As you visit different workouts, the most recent ones will be available here for you. Click on the workout and it will take you there.",
    placement: "auto",
  },
  {
    target: ".newWorkoutStep5",
    content:
      "This is the Recent Stats section. As you visit different stats, the most recent ones will be available here for you. Click on the stat and it will take you there.",
    placement: "auto",
  },
  {
    target: ".newWorkoutStep6",
    content:
      "This is your navigation icon. Click here to get to the Folders page to start building your folders & workouts. You can also click on the Stats tab to view your progress as you complete more and more workouts.",
    placement: "auto",
  },
  { target: ".newWorkoutStep6", content: "Awesome. Lets get Activ." },
  { target: ".newWorkoutStep7", content: "" },
];

// Define our state
const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

// Set up the reducer function
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

export const NewWorkoutRide = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [tour, setTour] = useState(true);

  //   useEffect(() => {
  //     dispatch({ type: "START" });
  //   }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };
  const startTour = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <div>
      {tour && (
        <div className="tourNotification">
          <div>Take a Tour?</div>
          <Button onClick={startTour}>Yes</Button>
          <Button onClick={() => setTour(false)}>No Thanks</Button>
        </div>
      )}
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        spotlightClicks={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },

          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
        }}
      />
    </div>
  );
};

export default NewWorkoutRide;
