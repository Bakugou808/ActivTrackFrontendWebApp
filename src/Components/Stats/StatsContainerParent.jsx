import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import StatsContainer from "./StatsContainer";
import SideList from "./SideList";
import ExGraph from "./ExGraph";
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

  const [sessStats, setSessStats] = useState(null);
  const [sessList, setSessList] = useState([]);

  useEffect(() => {
    !statsByTotalReps && onFetchWorkoutsStatsByTotalReps(workoutId, 20);
    !statsByEx && onFetchWorkoutsStatsByEx(workoutId, 20);
    statsByEx && handleExList();
    statsByTotalReps && handleSessList();
  }, [statsByEx, statsByTotalReps]);

  const handleExClick = (exStat) => {
    setExStats(exStat);
    console.log(exStat);
  };

  const handleSessionClick = (sessStat) => {
    setSessStats(sessStat);
    console.log(sessStat);
  };

  const handleExList = () => {
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
      setSessList((prev) => [...prev, [key, statArr]]);
    });
  };

  return (
    <div className="statsParentContainer">
      <div className="statsByExRow">
        {/* exercise list and graph */}
        {exList && <SideList sourceList={exList} handleClick={handleExClick} />}
        {/* <div className="statByExGraph"> graph </div>
         */}
        {exStats && <ExGraph data={exStats} />}
      </div>
      <div className="statsByTotalRepsRow">
        {/* sessions date/timeline list and graph */}
        {sessList && (
          <SideList sourceList={sessList} handleClick={handleSessionClick} />
        )}
        {sessStats && <ExGraph data={sessStats} />}

        <div className="statByTotalRepsGraph"> graph</div>
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
