import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// * ReactTour Imports
import Tour from "reactour";
// * Component Imports
import StatsContainer from "./StatsContainer";
import SideList from "./SideList";
import ExGraph from "./ExGraph";
import SessGraph from "./SessGraph";
// * Action Imports
import {
  fetchWorkoutsStatsByEx,
  fetchWorkoutsStatsByTotalReps,
} from "../../Redux/Actions/StatsActions";
import {
  activateTour,
  deactivateTour,
  endTour,
} from "../../Redux/Actions/TourActions";

// * Material Imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";

export const StatsContainerParent = (props) => {
  const {
    match,
    history,
    statsByTotalReps,
    statsByEx,
    onFetchWorkoutsStatsByTotalReps,
    onFetchWorkoutsStatsByEx,
    device,
    orientation,
    username,
    onActivateTour,
    onDeactivateTour,
    onEndTour,
    tourOn,
  } = props;

  const workoutId = match.params.workoutId;
  const workoutTitle = match.params.workoutTitle;

  const [exStats, setExStats] = useState(null);
  const [exList, setExList] = useState([]);
  const [selectedEx, setSelectedEx] = useState([]);
  const [selectedExKey, setSelectedExKey] = useState(null);

  const [sessStats, setSessStats] = useState(null);
  const [sessList, setSessList] = useState([]);
  const [selectedSess, setSelectedSess] = useState([]);
  // *tour state
  const [takeTour, setTakeTour] = useState(true);

  const [exAttKeys, setExAttKeys] = useState([]);

  const exCaption =
    "Graphs Illustrate Average Values Derived From Data From Each Session";

  const sessCaption =
    "Graphs Illustrate Aggregated Number Of Reps Performed During A Single Session";
  useEffect(() => {
    !statsByTotalReps && onFetchWorkoutsStatsByTotalReps(workoutId, 20);
    !statsByEx && onFetchWorkoutsStatsByEx(workoutId, 20);
    statsByEx && handleExList();
    statsByTotalReps && sessList.length === 0 && handleSessList();
    handleRecentLS();
  }, [statsByEx, statsByTotalReps]);

  const handleRecentLS = () => {
    let path = `/displayStats/${workoutTitle}/${workoutId}`;

    if (localStorage.getItem(`${username}RecentStats`)) {
      let recentStats = JSON.parse(
        localStorage.getItem(`${username}RecentStats`)
      );
      if (recentStats.includes(path)) {
        recentStats = recentStats.filter((val) => val != path);
        recentStats.unshift(path);
      } else if (!(recentStats.length > 9)) {
        recentStats.unshift(path);
      } else {
        recentStats.pop().unshift(path);
      }
      recentStats = JSON.stringify(recentStats);
      localStorage.setItem(`${username}RecentStats`, recentStats);
    }
  };

  const handleExClick = (exStat) => {
    setExStats(exStat[1]);
    setSelectedEx(exStat[0]);
    setSelectedExKey(null);
  };

  const handleSessionClick = (sessStat) => {
    setSessStats(sessStat[1]);
    setSelectedSess(sessStat[0]);
  };

  const handleExList = () => {
    setExAttKeys([]);
    setExList([]);

    let title = Object.keys(statsByEx.stats);

    for (const [key, value] of Object.entries(statsByEx.stats[title])) {
      if (key != "workout_id") {
        let nu = [key, value];
        setExList((prev) => [...prev, nu]);
      }
    }
  };

  const handleSessList = () => {
    statsByTotalReps.stats.map((sessObj) => {
      let key = Object.keys(sessObj);
      let statArr = sessObj[key];
      let date = key[0].split(" - ")[1];
      setSessList((prev) => [...prev, [date, statArr]]);
    });
  };

  const openTour = () => {
    onActivateTour("dS1");
  };

  return (
    <div data-tour="st3">
      {takeTour && (
        <div className="tourNotification">
          <div>Take a Tour?</div>
          <Button onClick={openTour}>Yes</Button>
          <Button onClick={() => setTakeTour(false)}>No Thanks</Button>
        </div>
      )}
      <Tour
        onRequestClose={() => onEndTour()}
        steps={device === "mobile" ? STAT_STEPS2 : STAT_STEPS}
        isOpen={tourOn}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <div
        className={
          device === "mobile" && orientation === "portrait"
            ? "statsHeader statsHeaderMob"
            : "statsHeader"
        }
      >
        {workoutTitle} Stats
      </div>
      <div className="statsParentFlexCont">
        <div className="statsParentContainer">
          <div className="graphHeader">
            <div
              className={
                device === "mobile" && orientation === "portrait"
                  ? "graphHeaderTitle graphHeaderTitleMob"
                  : "graphHeaderTitle"
              }
            >
              Performance By Exercise
            </div>
            {exCaption && <div className="graphCaption">{exCaption}</div>}
          </div>
          <div
            data-tour="st1"
            className={
              device === "mobile"
                ? orientation === "landscape"
                  ? "statsByExRowMobLand"
                  : "statsByExRowMobPort"
                : "statsByExRow"
            }
          >
            {/* exercise list and graph */}
            {exList && (
              <div className="sideListCol">
                <SideList
                  sourceList={exList}
                  handleClick={handleExClick}
                  exAttKeys={exAttKeys}
                  selected={selectedEx}
                  setSelectedKey={setSelectedExKey}
                />
              </div>
            )}

            {exStats && (
              <ExGraph
                rawData={exStats}
                selected={selectedEx}
                setKeys={setExAttKeys}
                exAttKeys={exAttKeys}
                selectedExKey={selectedExKey}
                caption={exCaption}
              />
            )}
          </div>

          <div data-tour="st2" className="graphHeader">
            <div
              className={
                device === "mobile" && orientation === "portrait"
                  ? "graphHeaderTitle graphHeaderTitleMob"
                  : "graphHeaderTitle"
              }
            >
              Performance By Session
            </div>
            {sessCaption && <div className="graphCaption">{sessCaption}</div>}
          </div>
          <div
            className={
              device === "mobile"
                ? orientation === "landscape"
                  ? "statsByExRowMobLand"
                  : "statsByExRowMobPort"
                : "statsByTotalRepsRow"
            }
          >
            {sessList && (
              <div className="sideListCol">
                <SideList
                  sourceList={sessList}
                  handleClick={handleSessionClick}
                  selected={selectedSess}
                />
              </div>
            )}
            {sessStats && (
              <SessGraph
                rawData={sessStats}
                selected={selectedSess}
                header={"Performance By Session"}
                caption={sessCaption}
                sessStats={sessStats}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  statsByEx: store.stats.statsByEx,
  statsByTotalReps: store.stats.statsByTotalReps,
  device: store.device.device,
  orientation: store.device.orientation,
  username: store.user.user.username,
  tourOn: store.tour.dS1,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkoutsStatsByTotalReps: (workoutId, numOfSessions, sideEffects) =>
    dispatch(
      fetchWorkoutsStatsByTotalReps(workoutId, numOfSessions, sideEffects)
    ),
  onFetchWorkoutsStatsByEx: (workoutId, numOfSessions, sideEffects) =>
    dispatch(fetchWorkoutsStatsByEx(workoutId, numOfSessions, sideEffects)),
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  onEndTour: () => dispatch(endTour()),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainerParent)
);

const accentColor = "#ff5722";

const STAT_STEPS = [
  {
    selector: '[data-tour = "st1"]',
    content: () => (
      <div>{`This is your Exercise List.
    
    It displays all the exercises you have within the workout. Click on the Exercise Name and its attributes will appear beneath. Click on the attribute to see the average value you performed that day.  `}</div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "st2"]',
    content: () => (
      <div>{`This section shows you stats by Session Date.
    
    Click on the Session Date and the total reps for each exercise will be displayed in the graph.  `}</div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  {
    selector: '[data-tour = "st3"]',
    content: () => <div>{`Great. Thats it! Enjoy!`}</div>,
    position: "center",
    style: {
      margin: "45px",
    },
  },
];
const STAT_STEPS2 = [
  {
    selector: '[data-tour = "st1"]',
    content: () => (
      <div>
        Click an exercise title to view its attributes. Click the attribute to
        see the average values you logged.
      </div>
    ),
    position: "right",
    style: {
      margin: "45px",
    },
  },
  // {
  //   selector: '[data-tour = "st2"]',
  //   content: () => (
  //     <div>{`This section shows you stats by Session Date.

  //   Click on the Session Date and the total reps for each exercise will be displayed in the graph.  `}</div>
  //   ),
  //   position: "right",
  //   style: {
  //     margin: "45px",
  //   },
  // },
  // {
  //   selector: '[data-tour = "st3"]',
  //   content: () => <div>{`Great. Thats it! Enjoy!`}</div>,
  //   position: "center",
  //   style: {
  //     margin: "45px",
  //   },
  // },
];
