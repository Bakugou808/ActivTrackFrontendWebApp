import React, { useEffect } from "react";
import { connect } from "react-redux";

export const Timers = (props) => {
  const {
    stopWatch,
    endEx,
    setTimeAlert,
    handleExceededRest,
    device,
    orientation,
    showRPCard,
  } = props;

  useEffect(() => {}, [device, orientation]);

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
        <div
          className={
            device === "mobile"
              ? orientation === "landscape"
                ? "timer mobTimer"
                : "timer mobTimerPort"
              : "timer"
          }
        >
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "textMobLand"
                : "text"
            }
          >
            Active Time
          </div>
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "value valMob"
                : "value"
            }
          >
            {timerValue}
          </div>
        </div>
      );
    } else if (endEx && showRPCard) {
      handleExceededRest();
      return (
        <div
          className={
            device === "mobile"
              ? orientation === "landscape"
                ? "timer mobTimer"
                : "timer mobTimerPort"
              : "timer"
          }
        >
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "textMobLand"
                : "text"
            }
          >
            Rest Time
          </div>
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "value valMob"
                : "value"
            }
          >
            {timerValue}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            device === "mobile"
              ? orientation === "landscape"
                ? "timer mobTimer"
                : "timer mobTimerPort"
              : "timer"
          }
        >
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "textMobLand"
                : "text"
            }
          >
            Active Time
          </div>
          <div
            className={
              device === "mobile" && orientation === "landscape"
                ? "value valMob"
                : "value"
            }
          >
            {timerValue}
          </div>
        </div>
      );
    }
  };

  return <div className="timerContainer">{renderTheTime()}</div>;
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
