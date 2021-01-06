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
import { v4 as uuidv4 } from "uuid";

import { normalizeString } from "../Workouts/AttributeFields";

const GreenCheckbox = withStyles({
  root: {
    color: orange[300],
    "&$checked": {
      color: orange[700],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckBoxes2(props) {
  const { checked, setChecked, handleCustomAttAdd, customAtts } = props;

  const handleCheckBoxChange = (e) => {
    const name = e.target.name;
    const obj = { [e.target.name]: !checked[e.target.name] };
    setChecked((prev) => ({ ...prev, ...obj }));
    handleCustomAttAdd(name);
  };

  const renderCheckBoxes = () => {
    const arr = [];
    for (const [key, value] of Object.entries(checked)) {
      if (key != "reps") {
        arr.push(
          <FormControlLabel
            key={uuidv4()}
            control={
              <GreenCheckbox
                checked={value}
                onChange={handleCheckBoxChange}
                name={key}
              />
            }
            label={normalizeString(key)}
          />
        );
      }
    }
    return arr.map((form) => {
      return form;
    });
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
      {renderCheckBoxes()}
    </FormGroup>
  );
}
