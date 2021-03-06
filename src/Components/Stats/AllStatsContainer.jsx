import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

// * Component Imports
import LineChart from "./LineChart";

export const StatsContainer = (props) => {
  const { data } = props;

  useEffect(() => {}, [data]);

  const formatData = (data2) => {
    const d = data2.map((stat) => {
      return { x: stat.exercise_name, y: stat.aggregate_reps };
    });
    return d;
  };

  const setLineData = (title, data) => {
    const lineData = [
      {
        id: `${title}`,
        color: `hsl(200, 100%, 30%)`,
        data: data,
      },
    ];
    return lineData;
  };

  const renderCharts = () => {
    let key = Object.keys(data)[0];
    let sessions = Object.values(data[`${key}`]);
    return sessions.map((sess) => {
      let data2 = formatData(sess);
      let lineData = setLineData(sess[0].workout_title, data2);
      return <LineChart key={uuidv4()} lineData={lineData} session={sess} />;
    });
  };

  return <div className="grid-container">{data && renderCharts()}</div>;
};

const mapStateToProps = (store) => ({
  data: store.stats.workoutsStats,
});

const mapDispatchToProps = {};

export default AuthHOC(
  connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
);
