import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

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
// * Material Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const StatsContainerParent = (props) => {
  const {
    match,
    history,
    statsByTotalReps,
    statsByEx,
    onFetchWorkoutsStatsByTotalReps,
    onFetchWorkoutsStatsByEx,
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

    if (localStorage.getItem("recentStats")) {
      let recentStats = JSON.parse(localStorage.getItem("recentStats"));
      if (recentStats.includes(path)) {
        recentStats = recentStats.filter((val) => val != path);
        recentStats.unshift(path);
      } else if (!(recentStats.length > 9)) {
        recentStats.unshift(path);
      } else {
        recentStats.pop().unshift(path);
      }
      recentStats = JSON.stringify(recentStats);
      localStorage.setItem("recentStats", recentStats);
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

  return (
    <div>
      <div className="statsHeader">{workoutTitle} Stats</div>
      <div className="statsParentFlexCont">
        <div className="statsParentContainer">
          <div className="graphHeader">
            {/* <div className="graphHeaderExTitle">{selectedEx}</div> */}
            <div className="graphHeaderTitle">Performance By Exercise</div>
            {exCaption && <div className="graphCaption">{exCaption}</div>}
          </div>
          <div className="statsByExRow">
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

          {/* ---------------- */}
          <div className="graphHeader">
            {/* <div className="graphHeaderExTitle">{selectedSess}</div> */}
            <div className="graphHeaderTitle">Performance By Session</div>
            {sessCaption && <div className="graphCaption">{sessCaption}</div>}
          </div>
          <div className="statsByTotalRepsRow">
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
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWorkoutsStatsByTotalReps: (workoutId, numOfSessions, sideEffects) =>
    dispatch(
      fetchWorkoutsStatsByTotalReps(workoutId, numOfSessions, sideEffects)
    ),
  onFetchWorkoutsStatsByEx: (workoutId, numOfSessions, sideEffects) =>
    dispatch(fetchWorkoutsStatsByEx(workoutId, numOfSessions, sideEffects)),
});
export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainerParent)
);
