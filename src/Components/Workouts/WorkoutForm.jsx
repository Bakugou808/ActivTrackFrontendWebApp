import React, { useState, useEffect } from "react";

// Material UI Imports
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function WorkoutForm(props) {
  const { folderId, handleOnPostWorkout } = props;
  const [fields, setFields] = useState({
    folder_id: "",
    title: "",
    description: "",
  });
  const classes = useStyles();

  useEffect(() => {
    folderId && setFields({ folder_id: folderId });
  }, [folderId]);

  function handleChange(e) {
    let obj = { [e.target.name.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleOnPostWorkout({ workout: { ...fields } });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Workout Title"
        name="title"
        autoFocus
        value={fields.title}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        autoFocus
        value={fields.description}
        onChange={handleChange}
      />
      <Button
        className={classes.submit}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
