import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import folders from "../../SCSS/folders.jpg";
import workouts from "../../SCSS/workouts.jpg";
import stats from "../../SCSS/stats.jpg";

export const MyCarousel = ({
  data,
  history,
  match,
  category,
  device,
  orientation,
}) => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  const [data2, setData2] = useState(null);
  useEffect(() => {
    data && setData2(["", ...data, ""]);
  }, [data]);

  const useStyles = makeStyles(() => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6vw",
      margin: "5px",
      backgroundSize: "cover",
      backgroundColor: "#f57c00",
      "&:hover": {
        backgroundColor: "#26a69a",
        color: "darkorange",
      },
      opacity: ".7",
      cursor: "pointer",
      color: "palegoldenrod",
      fontSize: "2.5vh",
      fontWeight: "initial",
      height: "6vh",
      width: "fit-content",
    },
    mobPortFontSize: {
      fontSize: "2.5vw",
    },
  }));
  useEffect(() => {
    // switch (category) {
    //   case "folders":
    //     setBackgroundImg(folders);
    //     break;
    //   case "workouts":
    //     setBackgroundImg(workouts);
    //     break;
    //   case "stats":
    //     setBackgroundImg(stats);
    //     break;
    //   default:
    //     break;
    // }
  }, []);

  const handleRedirect = (path) => {
    history.push(path);
  };
  const classes = useStyles();
  const renderData = () => {
    return data.map((path) => {
      let split = path.split("/");
      let title = split[split.length - 2];
      return (
        <div key={uuidv4()} className="cardWrap">
          <Paper
            className={
              device === "mobile" && orientation === "landscape"
                ? [classes.paper, classes.mobPortFontSize]
                : classes.paper
            }
            onClick={() => handleRedirect(path)}
          >
            {title}
          </Paper>
        </div>
      );
    });
  };

  return <div className="myCarousel">{data && renderData()}</div>;
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);
