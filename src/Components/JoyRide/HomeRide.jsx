import React, { useEffect, useState, useReducer } from "react";

import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Button from "@material-ui/core/Button";

const TOUR_STEPS = [
  //   {
  //     target: ".home1",
  //     content: "Would you like to take a tour of the Home page?",
  //     disableBeacon: true,
  //     placement: "auto",
  //   },
  {
    target: ".home2",
    content:
      "This is the beginning of your 'Recents' sections. As you build and complete workouts the windows will fill with the most recent page you've visited. If they're a little thin right now, its because we're just getting started!",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".home3",
    content:
      "This is the Recent Folders section. As you visit different folders, the most recent ones will be available here for you. Click on the folder and it will take you there.",
    placement: "right-end",
  },
  {
    target: ".home4",
    content:
      "This is the Recent Workouts section. As you visit different workouts, the most recent ones will be available here for you. Click on the workout and it will take you there.",
    placement: "auto",
  },
  {
    target: ".home5",
    content:
      "This is the Recent Stats section. As you visit different stats, the most recent ones will be available here for you. Click on the stat and it will take you there.",
    placement: "auto",
  },
  {
    target: ".home6",
    content:
      "This is your navigation icon. Click here to get to the Folders page to start building your folders & workouts. You can also click on the Stats tab to view your progress as you complete more and more workouts.",
    placement: "auto",
  },
  //   { target: ".home6", content: "Awesome. Lets get Activ." },
  //   { target: ".home7", content: "" },
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

export const HomeRide = () => {
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

export default HomeRide;
