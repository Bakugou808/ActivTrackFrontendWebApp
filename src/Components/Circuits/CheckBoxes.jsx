import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const GreenCheckbox = withStyles({
  root: {
    color: orange[300],
    "&$checked": {
      color: orange[700],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckBoxes(props) {
  const { checked, setChecked, handleCustomAttAdd, customAtts } = props;

  const handleCheckBoxChange = (e) => {
    const name = e.target.name;
    const obj = { [e.target.name]: !checked[e.target.name] };
    setChecked((prev) => ({ ...prev, ...obj }));
    handleCustomAttAdd(name);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        disabled
        control={
          <GreenCheckbox
            checked={checked.reps}
            onChange={handleCheckBoxChange}
            name="reps"
          />
        }
        label="Reps"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checked.weight}
            onChange={handleCheckBoxChange}
            name="weight"
          />
        }
        label="Weight"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checked.height}
            onChange={handleCheckBoxChange}
            name="holdTime"
          />
        }
        label="Hold Time"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checked.restPeriod}
            onChange={handleCheckBoxChange}
            name="restPeriod"
          />
        }
        label="Rest Period"
      />
      {/* <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
        label="Custom icon"
      /> */}
    </FormGroup>
  );
}
