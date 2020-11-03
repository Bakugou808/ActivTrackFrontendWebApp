import React, { Component } from "react";
import { connect } from "react-redux";
import { ResponsiveLine } from "@nivo/line";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

export const LineChart = (props) => {
  const { data, lineData, session } = props;
  const classes = useStyles();

  function titleCase(string) {
    let sentence = string.toLowerCase().split("_");
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  }

  const formatToolTipInfo = (obj) => {
    let infoArr = [];

    for (const [key, value] of Object.entries(obj)) {
      let str;
      switch (key) {
        case "exercise_name":
          str = `${titleCase(key)}: ${value}`;
          infoArr.push(str);
          break;
        case "aggregate_reps":
          str = `${titleCase(key)}: ${value}`;
          infoArr.push(str);
          break;
        case "set_att_data":
          str = formatSets(value);
          infoArr.push(str);
        default:
          let timeValue = formatTime(value);
          str = `${titleCase(key)}: ${timeValue}`;
          infoArr.push(str);
      }
    }
    return infoArr.map((stat) => <ul>{stat}</ul>);
  };

  const formatSets = (arr) => {
    let strArr = [];
    let i = 1;
    arr.forEach((obj) => {
      strArr.push(`Set ${i}`);
      for (const [key, value] of Object.entries(obj)) {
        let str = "";
        let timeValue = 0;
        switch (key) {
          case "restPeriod":
            timeValue = formatTime(value);
            str = `${titleCase(key)}: ${timeValue}`;
            strArr.push(str);
          case "activeTime":
            timeValue = formatTime(value);
            str = `${titleCase(key)}: ${timeValue}`;
            strArr.push(str);
          default:
            str = `${titleCase(key)}: ${value}`;
        }
      }
      i++;
    });
    return strArr.join(", ");
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    const timeValue =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    return timeValue;
  };

  const handleToolTip = (point, event) => {
    let name = point.point.data.x;
    let obj = "";
    if (data) {
      obj = data.filter((obj) => obj.exercise_name === name)[0];
    } else if (session) {
      obj = session.filter((obj) => obj.exercise_name === name)[0];
    }
    if (name) {
      return (
        <Paper className={[classes.paper, classes.root]}>
          {formatToolTipInfo(obj)}
        </Paper>
      );
    }
  };

  return (
    <>
      <div className="lineChart">
        <ResponsiveLine
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
        />
      </div>
    </>
  );
};

const mapStateToProps = (store) => ({
  data: store.stats.workoutsStats.stats,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "auto",
    height: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));