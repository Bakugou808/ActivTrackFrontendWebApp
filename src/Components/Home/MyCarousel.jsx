import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import folders from "../../SCSS/folders.jpg";
import workouts from "../../SCSS/workouts.jpg";
import stats from "../../SCSS/stats.jpg";

export const MyCarousel = ({ data, history, match, category }) => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  const useStyles = makeStyles(() => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6vw",
      margin: "15px",
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundColor: "#f57c00",
      "&:hover": {
        backgroundColor: "#26a69a",
        color: "darkorange",
      },
      opacity: ".7",
      cursor: "pointer",
      color: "palegoldenrod",
      fontSize: "30px",
      fontWeight: "initial",
    },
  }));
  useEffect(() => {
    switch (category) {
      case "folders":
        setBackgroundImg(folders);
        break;
      case "workouts":
        setBackgroundImg(workouts);
        break;
      case "stats":
        setBackgroundImg(stats);
        break;
      default:
        break;
    }
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
        <Paper className={classes.paper} onClick={() => handleRedirect(path)}>
          {title}
        </Paper>
      );
    });
  };

  return <div className="myCarousel">{data && renderData()}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);

// const useStyles = makeStyles(() => ({
//   paper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "6vw",
//     margin: "15px",
//     backgroundImage: `url(${backgroundImg})`,
//     backgroundColor: "#f57c00",
//     "&:hover": {
//       backgroundColor: "#26a69a",
//     },
//     opacity: ".7",
//     cursor: "pointer",
//   },
// }));
