import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../AuthHOC";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

// Component Imports
import FolderForm from "./FolderForm";
import MenuPopper from "./MenuPopper";
import MyModal from "../Modal";
// Material UI Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Action Imports
import {
  fetchFolders,
  postFolder,
  patchFolder,
  deleteFolder,
  clearFoldersState,
} from "../../Redux/Actions/FolderActions";

export const Folders = (props) => {
  const {
    onPostFolder,
    onPatchFolder,
    onDeleteFolder,
    userId,
    folders,
    onFetchFolders,
    history,
    match,
    loading,
  } = props;

  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [folder, setFolder] = useState(null);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    userId && onFetchFolders(userId);
  }, [userId]);

  const handleFolderClick = (folder) => {
    history.push(`${match.url}/${folder.folder_name}/${folder.id}`);
  };

  const handleOnPostFolder = (folderData) => {
    onPostFolder(folderData, setShowForm);
  };
  const handleOnPatchFolder = (folderData) => {
    const sideEffects = () => {
      setShowFormEdit(false);
    };
    onPatchFolder(folderData, sideEffects);
  };

  const renderFolders = () => {
    const handleDelete = (folderId) => {
      const sideEffects = () => {
        onFetchFolders(userId);
      };
      onDeleteFolder(folderId, sideEffects);
    };

    return folders.map((folder) => {
      return (
        <div>
          <Paper key={folder.id} className={classes.folder}>
            <div
              className={classes.folderItem1}
              onClick={() => handleFolderClick(folder)}
            >
              {folder.folder_name}
            </div>
            <div className={classes.folderItemMenu}>
              <MenuPopper
                folder={folder}
                setFolder={setFolder}
                setShowFormEdit={setShowFormEdit}
                handleDelete={handleDelete}
              />
            </div>
          </Paper>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <span className={classes.addNew} onClick={() => setShowForm(true)}>
          + Add New Folder
        </span>
      </div>

      <div className={"container grid "}>{folders && renderFolders()}</div>

      <MyModal
        component={
          <FolderForm handleOnPostFolder={handleOnPostFolder} userId={userId} />
        }
        showModal={showForm}
        setShowModal={setShowForm}
      />

      <MyModal
        component={
          <FolderForm
            handleOnPatchFolder={handleOnPatchFolder}
            userId={userId}
            folder={folder}
          />
        }
        showModal={showFormEdit}
        setShowModal={setShowFormEdit}
      />

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = (store) => ({
  userId: store.user.user.id,
  folders: store.folders.folders,
  loading: store.folders.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFolders: (userId) => dispatch(fetchFolders(userId)),
  onPostFolder: (folderData, setShowForm) =>
    dispatch(postFolder(folderData, setShowForm)),
  onClearFoldersState: () => dispatch(clearFoldersState()),
  onPatchFolder: (folderData, sideEffects) =>
    dispatch(patchFolder(folderData, sideEffects)),
  onDeleteFolder: (folderId, sideEffects) =>
    dispatch(deleteFolder(folderId, sideEffects)),
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
  folder: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.light,
    height: "4vw",
    maxWidth: "20 rem",

    justifyContent: "center",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    opacity: ".8",
  },
  folderItem1: {
    flex: "0 0 90%",
    padding: "20px 5px",
    cursor: "pointer",
  },
  folderItemMenu: {
    flex: "0 0 10%",
    cursor: "pointer",
  },
  addNew: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
