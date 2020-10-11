import React, { useState, useEffect } from "react";

// Material UI Imports
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function FolderForm(props) {
  const { folder, userId, handleOnPostFolder } = props;
  const [fields, setFields] = useState({ folder_name: "", user_id: null });
  const classes = useStyles();

  useEffect(() => {
    setFields((prev) => ({ ...prev, user_id: userId }));
    folder && setFields({ folder_name: folder.folder_name, user_id: userId });
  }, []);

  function handleChange(e) {
    let obj = { [e.target.name.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleOnPostFolder({ folder: { ...fields } });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="folder_name"
        label="Folder Name"
        name="folder_name"
        autoFocus
        value={fields.folder_name}
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
