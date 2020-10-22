import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Paper, TextField, Button } from "@material-ui/core";

export const normalizeString = (str) => {
  return (
    str
      // insert a space before all caps
      .replace(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

export const AttributeFields = (props) => {
  const {
    exObj,
    stopWatch,
    setExStats,
    submitClicked,
    handleSubmitStats,
    setSubmitClicked,
    focusAttFields,
    startEx,
  } = props;
  const [exAtts, setExAtts] = useState([]);

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
      key !== "restPeriod" &&
        x.push(
          <div key={key} className={"centerDiv"}>
            <TextField
              size="small"
              color="primary"
              variant="outlined"
              label={key1}
              name={key}
              value={exAtts[key]}
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

  return (
    <div className="attributes">
      {submitClicked ? (
        <div className="startButton">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitStats(stopWatch.time)}
            className="goToNextButton"
          >
            Go To Next
          </Button>
        </div>
      ) : (
        focusAttFields && (
          <div className="attFields">
            <Paper className="container grid" elevation={3}>
              <div className="centerDiv2 removeMarginBottom">Attributes</div>
              <div>{exAtts && renderAtts()}</div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSubmitClicked(true)}
                className="centerDiv submitButton"
              >
                Submit
              </Button>
              <div></div>
            </Paper>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeFields);
