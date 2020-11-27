import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Chart Import
import { ResponsiveLine } from "@nivo/line";

export const ExGraph = (props) => {
  const { rawData } = props;
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    rawData && formatData();
  }, [rawData]);

  const formatData = () => {
    let sessTemp = {};
    let data = { id: "", color: "", data: [] };
    let finData = {};
    for (const [key, value] of Object.entries(rawData)) {
      sessTemp[key] = consolidateSessionData(value);
    }

    for (const [date, attObj] of Object.entries(sessTemp)) {
      let attKeys = Object.keys(attObj);
      let color = "hsl(39, 70%, 50%)";
      for (const [att, value] of Object.entries(attObj)) {
        data = { id: "", color: "", data: [] };
        data.id = att;
        data.color = "hsl(39, 70%, 50%)";
        let x = { x: date, y: value };
        data.data.push(x);
        if (finData[att]) {
          finData[att].data.push(x);
        } else {
          finData[att] = data;
        }
      }
    }
    setLineData(finData);
  };

  const consolidateSessionData = (sessData) => {
    let tempAtts = {};
    let keys = {};

    sessData.map((totalSets) => {
      let key = Object.keys(totalSets)[0];
      // debugger;
      totalSets[key].map((singSet) => {
        // debugger;
        for (const [key, value] of Object.entries(singSet)) {
          if (tempAtts[key]) {
            tempAtts[key] += value ? value : 0;
          } else {
            tempAtts[key] = value ? value : 0;
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
      tempAtts[key] = tempAtts[key] / keys[key];
    }
    // debugger;
    return tempAtts;
  };

  return (
    <div className="statByExGraph">
      {/* <ResponsiveLine
        data={lineData}
        //   onClick={(point, event) => handleClick(point, event)}
        // tooltip={handleToolTip}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        colors="#004466"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Exercise",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total Reps",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="yFormatted"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: -8,
            translateY: -50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 16,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExGraph);
