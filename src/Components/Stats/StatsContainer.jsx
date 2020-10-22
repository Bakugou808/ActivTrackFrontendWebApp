import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import LineChart from "./LineChart";

export const StatsContainer = (props) => {
  const { data, selectedWorkout } = props;
  const [fLData, setFLData] = useState([]);

  useEffect(() => {
    data && selectedWorkout && setLineData();
  }, [selectedWorkout, data]);

  const formatData = () => {
    const d = data.map((stat) => {
      return { x: stat.exercise_name, y: stat.aggregate_reps };
    });
    return d;
  };

  const setLineData = () => {
    const lineData = [
      {
        id: `${selectedWorkout.title}`,
        color: `hsl(302, 70%, 50%)`,
        data: formatData(),
      },
    ];
    setFLData(lineData);
  };

  const renderCharts = () => {
    // !remember you are calling 2 sets of data so if you have time figure out how to render both
  };

  return (
    <div className="container grid">{<LineChart lineData={fLData} />}</div>
  );
};

const mapStateToProps = (store) => ({
  data: store.stats.workoutsStats.stats,
  selectedWorkout: store.workouts.selectedWorkout,
});

const mapDispatchToProps = {};

export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
);
