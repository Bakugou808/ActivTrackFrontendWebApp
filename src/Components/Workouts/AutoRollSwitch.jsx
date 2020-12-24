import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const OrangeSwitch = withStyles({
  switchBase: {
    color: orange[300],
    "&$checked": {
      color: orange[500],
    },
    "&$checked + $track": {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function AutoRollSwitch(props) {
  const { autoRoll, setAutoRoll, label } = props;

  const handleChange = () => {
    setAutoRoll((prev) => !prev);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <OrangeSwitch
            checked={autoRoll}
            onChange={handleChange}
            name="checkedA"
          />
        }
        size="Small"
        labelPlacement="Top"
        label={label}
        className={"autoRollText"}
      />
    </FormGroup>
  );
}
