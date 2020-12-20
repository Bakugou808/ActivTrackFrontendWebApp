import React, { Component } from "react";
import { connect } from "react-redux";

export const Timers = (props) => {
  const { stopWatch, endEx, setTimeAlert, handleExceededRest } = props;

  const renderTheTime = () => {
    const minutes = Math.floor(stopWatch.time / 60);
    const seconds = stopWatch.time - minutes * 60;

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    const timerValue =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    if (!endEx) {
      setTimeAlert(false);
      return (
        <div className="timer">
          <div className="text">Active Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    } else if (endEx) {
      handleExceededRest();
      return (
        <div className="timer">
          <div className="text">Rest Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    } else {
      return (
        <div className="timer">
          <div className="text">Active Time</div>
          <div className="value">{timerValue}</div>
        </div>
      );
    }
  };

  return <div className="timerContainer">{renderTheTime()}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
