import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI Imports
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const MyModal = (props) => {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const { component, showModal, setShowModal, device, orientation } = props;
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={modalStyle}
        className={
          device === "mobile"
            ? orientation === "portrait"
              ? classes.paperModalMobPort
              : classes.paperModalMob
            : classes.paperModal
        }
      >
        {component}
      </div>
    </Modal>
  );
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MyModal);

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
    position: "absolute",
    width: "88vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  paperModalMob: {
    position: "absolute",
    width: "88vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    overflow: "auto",
    height: "80vh",
  },
  paperModalMobPort: {
    position: "absolute",
    width: "85vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    overflow: "auto",
    height: "85vh",
  },
}));
