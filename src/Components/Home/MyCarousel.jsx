import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const MyCarousel = ({ data, history, match }) => {
  const classes = useStyles();

  const handleRedirect = (path) => {
    history.push(path);
  };

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

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6vw",
    margin: "15px",
    backgroundColor: "#f57c00",
    "&:hover": {
      backgroundColor: "#26a69a",
    },
    opacity: ".7",
    cursor: "pointer",
  },
}));
