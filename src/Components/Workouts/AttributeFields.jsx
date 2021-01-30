import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Paper, TextField, Button } from "@material-ui/core";
// * Framer Motion Imports
import { motion } from "framer-motion";

import { activateTour, deactivateTour } from "../../Redux/Actions/TourActions";

export const normalizeString = (str) => {
  if (typeof str == "string") {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  } else {
    return str;
  }
};

export const AttributeFields = (props) => {
  const {
    exObj,
    setExStats,
    handleSubmitStats,
    setSubmitClicked,
    submitClicked,
    focusAttFields,
    setShowRPCard,
    device,
    orientation,
    onActivateTour,
    tourOn,
    onDeactivateTour,
  } = props;
  const [exAtts, setExAtts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    exObj && setExAtts(exObj.circuit_exercise_attributes);
  }, [exObj]);

  const handleChange = (e) => {
    const obj = { [e.target.name]: e.target.value };
    setExStats((prev) => ({ ...prev, ...obj }));
    setExAtts((prev) => ({ ...prev, ...obj }));
  };

  const renderAtts = () => {
    const x = [];
    for (const [key, val] of Object.entries(exAtts)) {
      let key1 = normalizeString(key);
      let att = normalizeString(exAtts[key]);
      key !== "restPeriod" &&
        x.push(
          <div key={key} className={"centerDiv"}>
            <TextField
              size="small"
              color="primary"
              variant="outlined"
              label={key1}
              name={key}
              value={att}
              onChange={handleChange}
              className={"attFields"}
            />
          </div>
        );
    }

    return x.map((div) => {
      return div;
    });
  };

  const handleSubmit = () => {
    setSubmitClicked(true);
    setShowRPCard(true);
    tourOn && handleTourSwitch();
  };

  const handleTourSwitch = () => {
    onDeactivateTour("sW3");
    onActivateTour("sW4");
  };

  return (
    <div className="attributes">
      {focusAttFields && !submitClicked && (
        <motion.div
          className="attFields"
          initial={{ y: "200vw" }}
          animate={device === "mobile" ? { y: -410 } : { y: -315 }}
          transition={{ duration: 0.5 }}
        >
          <Paper data-tour="sw13" className={classes.paper} elevation={3}>
            <div className="centerDiv2 removeMarginBottom orange fsize20">
              Attributes
            </div>
            <div>{exAtts && renderAtts()}</div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.subBtn}
            >
              Submit
            </Button>
            <div></div>
          </Paper>
        </motion.div>
      )}
    </div>
  );
};
const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
  tourOn: store.tour.sW3,
});

const mapDispatchToProps = (dispatch) => ({
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AttributeFields);

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "max-content",
    display: "inline-block",
    padding: "2vw 5vw",
    margin: "20px",
  },
  btn: {
    padding: "25px",
    width: "100%",
    margin: "15px",
  },
  subBtn: {
    width: "100%",
  },
}));
