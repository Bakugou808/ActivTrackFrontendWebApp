import React, { useState } from "react";
// Material UI Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const MyModal = (props) => {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const { component, showModal, setShowModal } = props;
  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paperModal}>
          {component}
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    display: "flex",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "relative",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    margin: "5px",
  },
}));
