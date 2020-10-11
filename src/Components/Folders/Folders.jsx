import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// Component Imports
import FolderForm from "./FolderForm";
// Material UI Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Action Imports
import { fetchFolders, postFolder } from "../../Redux/Actions/FolderActions";

export const Folders = (props) => {
  const { onPostFolder, userId, folders, onFetchFolders } = props;
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOnPostFolder = (folderData) => {
    onPostFolder(folderData, setShowForm);
  };

  useEffect(() => {
    userId && onFetchFolders(userId);
  }, [userId]);

  const renderFolders = () => {
    return folders.map((folder) => {
      return (
        <div>
          <Grid item xs>
            <Paper className={classes.paper2}> {folder.folder_name}</Paper>
          </Grid>
        </div>
      );
    });
  };

  return (
    <div className={""}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <span className={""} onClick={() => setShowForm(true)}>
            + Add New Folder
          </span>
        </Grid>
        <Grid item xs>
          {/* <div className={classes.folderContainer}> */}
          <Grid
            className={classes.folderContainer}
            container
            direction="row"
            // justify="center"
            // alignItems="center"
            spacing={3}
          >
            {folders && renderFolders()}
          </Grid>
          {/* </div> */}
        </Grid>
      </Grid>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <FolderForm handleOnPostFolder={handleOnPostFolder} userId={userId} />
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (store) => ({
  userId: store.user.user.id,
  folders: store.folders.folders,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFolders: (userId) => dispatch(fetchFolders(userId)),
  onPostFolder: (folderData, setShowForm) =>
    dispatch(postFolder(folderData, setShowForm)),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Folders));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  folderContainer: {
    display: "grid",
    "grid-auto-flow": "column",
    "grid-column-gap": "10px",
    margin: "10px",
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // "min-width": "25vw",
    "max-width": "50px",
  },
}));
