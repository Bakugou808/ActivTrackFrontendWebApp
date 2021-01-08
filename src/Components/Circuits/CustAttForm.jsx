import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Material UI Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export const CustAttForm = (props) => {
  const { customAtts, handleCustomAttAdd, setShowCustomAttFields } = props;
  const [customAtt, setCustomAtt] = useState("");
  const classes = useStyles();

  const handleAddAtt = (e) => {
    e.preventDefault();
    handleCustomAttAdd(customAtt);
    setShowCustomAttFields(false);
    setCustomAtt("");
  };

  return (
    <div className="exFormInputBoxCont">
      <form onSubmit={handleAddAtt}>
        <TextField
          id="outlined-basic"
          label="Custom Attribute"
          name="custom_attribute"
          value={customAtt}
          onChange={(e) => setCustomAtt(e.target.value)}
          variant="outlined"
        />
      </form>
      <Button variant="outlined" className={classes.btn} onClick={handleAddAtt}>
        Add
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustAttForm);

const useStyles = makeStyles((theme) => ({
  btn: {
    // padding: theme.spacing(2),
    marginLeft: "20px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
