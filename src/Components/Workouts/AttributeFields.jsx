import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Paper, TextField, Button } from "@material-ui/core";

export const AttributeFields = (props) => {
  const { exObj, stopWatch, setExStats } = props;
  const [exAtts, setExAtts] = useState([]);

  useEffect(() => {
    exObj && setExAtts(exObj.circuit_exercise_attributes);
  }, [exObj]);

  const handleChange = (e) => {
    const obj = { [e.target.name]: e.target.value };
    setExStats((prev) => ({ ...prev, ...obj }));
    setExAtts((prev) => ({ ...prev, ...obj }));
  };

  const normalizeString = (str) => {
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

  const renderAtts = () => {
    const x = [];
    for (const [key, val] of Object.entries(exAtts)) {
      let key1 = normalizeString(key);
      key !== "restPeriod" &&
        x.push(
          <div key={key}>
            <TextField
              size="small"
              color="primary"
              variant="outlined"
              label={key1}
              name={key}
              value={exAtts[key]}
              onChange={handleChange}
            />
          </div>
        );
    }

    return x.map((div) => {
      return div;
    });
  };

  const handleSubmitAtts = () => {
    console.log(exAtts);
  };

  return (
    <div className="addNewString">
      <Paper className="container grid" elevation={3}>
        <div>Attributes</div>
        <form className="container grid" onSubmit={handleSubmitAtts}>
          {exAtts && renderAtts()}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAtts}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeFields);
