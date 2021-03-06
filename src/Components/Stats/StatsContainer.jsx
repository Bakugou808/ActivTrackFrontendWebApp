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
        data: formatData(),
      },
    ];
    setFLData(lineData);
  };

  return (
    <div className="graph-container">
      {
        <LineChart
          lineData={fLData}
          colors="set2"
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 80,
          }}
        />
      }
    </div>
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
