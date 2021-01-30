import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import CircuitFormPt1 from "./CircuitFormPt1";
import CircuitFormPt2 from "./CircuitFormPt2";
import CircFlowCont from "./CircFlowCont";
// * ReactTour Imports
// import Tour from "reactour";
// * Material UI Imports
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, type, setType, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "auto",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "auto",
    width: "85vw",
  },
}));

function TabBar(props) {
  const { showModal, setShowModal, tourOn, orientation } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [nextPage, goToNextPage] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={orientation === "portrait" ? "circ2Cont" : classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          data-tour="es1"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <AntTab label="Exercise" />
          <AntTab label="Circuit" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CircFlowCont
            goToNextPage={goToNextPage}
            setShowModal={setShowModal}
            circuit_type="stack"
            nextPage={nextPage}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CircFlowCont
            goToNextPage={goToNextPage}
            setShowModal={setShowModal}
            circuit_type="circuit"
            nextPage={nextPage}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = (store) => ({
  orientation: store.device.orientation,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    display: "flex",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
