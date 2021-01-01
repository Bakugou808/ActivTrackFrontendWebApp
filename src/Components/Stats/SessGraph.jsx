import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Graph AutoSizer Imports
import { AutoSizer } from "react-virtualized";

// * Function Import
import { normalizeString } from "../Workouts/AttributeFields";
// * Component Imports
import MyResponsiveLine from "./MyResponsiveLine";
import LineChart from "./LineChart";

export const SessGraph = (props) => {
  const {
    rawData,
    selected,
    device,
    orientation,
    sessStats,
    header,
    caption,
  } = props;
  const [displayData, setDisplayData] = useState(null);
  const [legendY, setLegendY] = useState("Total Reps");
  const [legendX, setLegendX] = useState("Exercise");

  useEffect(() => {
    rawData && setLineData();
    // selectedExKey && formatDispData(selectedExKey);
  }, [rawData, device, orientation]);

  //   [rawData, selectedExKey]

  function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  function get_random_color() {
    var h = rand(1, 360);
    var s = rand(0, 100);
    var l = rand(0, 100);
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  const formatData = () => {
    const d = rawData.map((stat) => {
      return { x: stat.exercise_name, y: stat.aggregate_reps };
    });
    return d;
  };

  const setLineData = () => {
    const lineData = [
      {
        id: `${selected}`,
        data: formatData(),
      },
    ];
    setDisplayData(lineData);
  };

  return (
    <div
      className={
        device === "mobile"
          ? orientation === "landscape"
            ? "statByTotalRepsGraphMobLand"
            : "statByTotalRepsGraphMobLand widthUnset"
          : "statByTotalRepsGraph"
      }
    >
      {displayData && (
        <AutoSizer>
          {({ height, width }) => (
            <LineChart
              data={displayData}
              legendY={legendY}
              legendX={legendX}
              sessStats={sessStats}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SessGraph);
