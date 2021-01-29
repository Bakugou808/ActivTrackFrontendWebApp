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
// import {
//   activateTour,
//   deactivateTour,
//   endTour,
// } from "../../Redux/Actions/TourActions";

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
}));

function TabBar(props) {
  const {
    showModal,
    setShowModal,
    tourOn,
    // onActivateTour,
    // onDeactivateTour,
    // onEndTour,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [nextPage, goToNextPage] = useState(false);

  // useEffect(() => {
  //   tourOn && setIsTourOpen(true);
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      {/* <Tour
        onRequestClose={() => onEndTour()}
        steps={EX1STEPS}
        isOpen={tourOn}
        maskClassName="mask"
        className="helper"
        rounded={5}
        disableFocusLock={true}
        accentColor={accentColor}
        update={nextPage}
      /> */}
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
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = (store) => ({
  // tourOn: store.tour.nWS2,
});

const mapDispatchToProps = (dispatch) => ({
  // onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  // onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  // onEndTour: () => dispatch(endTour()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
// To Do - - - strategy: cut off the tour once the next button is triggered (nextPage === true) -> either swap the steps array into the tour component, or render two separate tour components with separate steps and use state to trigger what needs to be delivered.
// const accentColor = "#ff5722";

// const EX1STEPS = [
//   {
//     selector: '[data-tour = "es1"]',
//     content: () => (
//       <div>
//         This is the Tab bar. You can choose to add a single exercise or chain a
//         series of exercises in a circuit. Click on the tab to change the form
//         then come back to Exercise.
//       </div>
//     ),
//     position: "top",
//   },
//   {
//     selector: '[data-tour = "es2"]',
//     content: () => (
//       <div>
//         Go ahead and enter the name of the exercise. Make sure to hit 'Enter' or
//         click 'Save' afterwards. If you want to change it, just click on the
//         text and the form will appear again!
//         <br />
//       </div>
//     ),
//     position: "top",
//   },
//   {
//     selector: '[data-tour = "es3"]',
//     content: () => (
//       <div>
//         Click to add a description if you like, then hit 'Enter' or click 'Save'
//         once you're done. If you'd like to change the description, just click on
//         the text!
//       </div>
//     ),
//     position: "top",
//   },
//   {
//     selector: '[data-tour = "es4"]',
//     content: () => (
//       <div>
//         Here are some pre-defined attributes you can add to this exercise. When
//         you add an attribute, it will become part of your stats. Reps will
//         always have a minimum of 1 so it will always be checked!
//         <br></br>
//         If you want to add weight, simply click on the checkbox, to remove it,
//         simply uncheck the box.
//       </div>
//     ),
//     position: "top",
//   },
//   {
//     selector: '[data-tour = "es5"]',
//     content: () => (
//       <div>
//         If you'd like to add a custom attribute, ex. 'jumping height for box
//         jumps' or 'strap length for gymnastic rings', simply click the text and
//         type in the attribute. It could be anything! So feel free to get
//         creative about with it. Whatever it is, it can be added to the exercise.
//       </div>
//     ),
//     position: "bottom",
//   },
//   {
//     selector: '[data-tour = "es6"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the
//         next page. Then hit the 'Next' arrow.
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es7"]',
//     content: () => (
//       <div>
//         Here you can set your target values for each of the attributes. They
//         will be saved for every session, and you can change them as you level
//         up.
//         <br></br>
//         ex. 'Reps: 12, Weight: 50 lbs, Hold Time: 20 sec, Rest Period: 2 min '
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es8"]',
//     content: () => (
//       <div>Sweet. If it looks good, lets go ahead and save it!</div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es9"]',
//     content: () => <div>Nice job. You just added an exercise!</div>,
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es10"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the
//         next page.
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es11"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the
//         next page.
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es12"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the
//         next page.
//       </div>
//     ),
//     position: "right",
//   },
// ];

// const EX2STEPS = [
//   {
//     selector: '[data-tour = "es7"]',
//     content: () => (
//       <div>
//         Here you can set your target values for each of the attributes. They
//         will be saved for every session, and you can change them as you level
//         up.
//         <br></br>
//         ex. 'Reps: 12, Weight: 50 lbs, Hold Time: 20 sec, Rest Period: 2 min '
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es8"]',
//     content: () => (
//       <div>Sweet. If it looks good, lets go ahead and save it!</div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es9"]',
//     content: () => <div>Nice job. You jus</div>,
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es10"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the next page.
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es11"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the next page.
//       </div>
//     ),
//     position: "right",
//   },
//   {
//     selector: '[data-tour = "es12"]',
//     content: () => (
//       <div>
//         Now, if everything looks good go ahead and hit this button to get to the next page.
//       </div>
//     ),
//     position: "right",
//   },
// ];

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
