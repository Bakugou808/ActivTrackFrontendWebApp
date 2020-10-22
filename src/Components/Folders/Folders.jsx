import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";
// Component Imports
import FolderForm from "./FolderForm";
// Material UI Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Action Imports
import { fetchFolders, postFolder } from "../../Redux/Actions/FolderActions";

export const Folders = (props) => {
  const {
    onPostFolder,
    userId,
    folders,
    onFetchFolders,
    history,
    match,
  } = props;
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

  const handleFolderClick = (folder) => {
    history.push(`${match.url}/${folder.folder_name}/${folder.id}`);
  };

  const renderFolders = () => {
    return folders.map((folder) => {
      return (
        <Paper
          key={folder.id}
          className={classes.folder}
          onClick={() => handleFolderClick(folder)}
        >
          {folder.folder_name}
        </Paper>
      );
    });
  };

  return (
    <div>
      <div>
        <span className={"center pointer"} onClick={() => setShowForm(true)}>
          + Add New Folder
        </span>
      </div>

      <div className={"container grid "}>{folders && renderFolders()}</div>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paperModal}>
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  folder: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    "min-height": "30px",
    cursor: "pointer",
  },
}));
