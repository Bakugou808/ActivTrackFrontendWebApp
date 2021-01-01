import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Graph AutoSizer Imports
import { AutoSizer } from "react-virtualized";
// * Function Import
import { normalizeString } from "../Workouts/AttributeFields";
// * Component Imports
import MyResponsiveLine from "./MyResponsiveLine";

export const ExGraph = (props) => {
  const {
    rawData,
    setKeys,
    exAttKeys,
    selectedExKey,
    device,
    orientation,
  } = props;
  const [lineData, setLineData] = useState([]);
  const [displayData, setDisplayData] = useState(null);
  const [legendY, setLegendY] = useState();

  useEffect(() => {
    rawData && formatData();
    selectedExKey && formatDispData(selectedExKey);
  }, [rawData, selectedExKey, device, orientation]);

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
    let sessTemp = {};
    let data = { id: "", color: "", data: [] };
    let finData = {};
    for (const [key, value] of Object.entries(rawData)) {
      if (sessTemp[key]) {
        sessTemp[key].push(consolidateSessionData(value));
      } else {
        sessTemp[key] = [];
        sessTemp[key].push(consolidateSessionData(value));
      }
    }
    // debugger;
    for (const [date, attArr] of Object.entries(sessTemp)) {
      for (const [att, value] of Object.entries(attArr[0])) {
        data = { id: "", color: "", data: [] };
        data.id = normalizeString(att);
        data.color = get_random_color();
        let x = { x: date, y: value };
        data.data.push(x);

        let k = normalizeString(att);
        if (finData[k]) {
          finData[k].data.push(x);
        } else {
          finData[k] = data;
        }
      }
    }
    // debugger;
    setLineData(finData);
  };

  const formatDispData = (key) => {
    switch (key) {
      case `Weight`:
        setLegendY(`${key} (lbs)`);
        break;
      case `Hold Time`:
        setLegendY(`${key} (Mins)`);
        break;
      case `Rest Period`:
        setLegendY(`${key} (Mins)`);
        break;
      case `Active Time`:
        setLegendY(`${key} (Mins)`);
        break;
      case `Reps`:
        setLegendY(`Reps`);
        break;
      default:
        setLegendY(`Level`);
        break;
    }
    setDisplayData([lineData[key]]);
  };

  const consolidateSessionData = (sessData) => {
    let tempAtts = {};
    let keys = {};
    let keys2 = [];
    // debugger;
    sessData.map((totalSets) => {
      let key = Object.keys(totalSets)[0];

      totalSets[key].map((singSet) => {
        for (const [key, value] of Object.entries(singSet)) {
          if (tempAtts[key]) {
            if (key === "Strap Length") {
              tempAtts[key] += parseInt(value.match(/\d/g)[0])
                ? parseInt(value.match(/\d/g)[0])
                : 0;
            } else {
              tempAtts[key] += value ? parseInt(value) : 0;
            }
          } else {
            if (key === "Strap Length") {
              tempAtts[key] = parseInt(value.match(/\d/g)[0])
                ? parseInt(value.match(/\d/g)[0])
                : 0;
            } else {
              tempAtts[key] = value ? parseInt(value) : 0;
            }
          }
          if (keys[key]) {
            keys[key] += value ? 1 : 0;
          } else {
            keys[key] = 1;
          }
        }
      });
    });
    // debugger;
    for (const [key, value] of Object.entries(tempAtts)) {
      tempAtts[key] = Math.round(tempAtts[key] / keys[key]);
      if (key === "restPeriod" || key === "activeTime") {
        // tempAtts[key] = new Date(tempAtts[key] * 1000)
        //   .toISOString()
        //   .substr(11, 8);
        // debugger;
        let t = tempAtts[key] / 60;
        t = t.toFixed(2);

        tempAtts[key] = t;
      }
      let k = normalizeString(key);
      if (!keys2.includes(k)) {
        keys2.push(k);
      }
    }
    // debugger;
    setKeys(keys2);
    return tempAtts;
  };

  return (
    <div
      className={
        device === "mobile"
          ? orientation === "landscape"
            ? "statByExGraphMobLand"
            : "statByExGraphMobLand widthUnset"
          : "statByExGraph"
      }
    >
      {displayData && (
        <AutoSizer>
          {({ height, width }) => (
            <MyResponsiveLine
              data={displayData}
              legendY={legendY}
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

export default connect(mapStateToProps, mapDispatchToProps)(ExGraph);
