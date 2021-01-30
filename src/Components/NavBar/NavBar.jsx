import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// Action Imports
import { logOut } from "../../Redux/Actions/AuthActions";
import { showExDrawer } from "../../Redux/Actions/WorkoutActions";
// Material Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

// Action Imports
import { clearFoldersState } from "../../Redux/Actions/FolderActions";
import {
  activateTour,
  deactivateTour,
  endTour,
} from "../../Redux/Actions/TourActions";

function NavBar(props) {
  const classes = useStyles();
  const {
    history,
    match,
    auth,
    onLogOut,
    isLoggedIn,
    onClearFoldersState,
    onShowExDrawer,
    device,
    orientation,
    location,
    tourOn,
    onActivateTour,
    onDeactivateTour,
  } = props;

  useEffect(() => {
    history.location.pathname && handleWorkoutPage();
  }, [history.location.pathname, device, orientation]);

  const handleWorkoutPage = () => {
    history.location.pathname.includes("start_workouts")
      ? setWorkoutPage(true)
      : setWorkoutPage(false);
  };

  const onLogout = () => {
    const { onSignOutUser, user } = props;
    onSignOutUser(user.id);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    props.history.push("/");
  };

  const [state, setState] = useState({
    left: false,
  });

  const [workoutPage, setWorkoutPage] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const redirect = (path) => {
    history.push(`/${path}`);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          ["Home", <HomeIcon />, "home"],
          ["Folders", <FolderOpenIcon />, "folders"],
          ["Stats", <BubbleChartIcon />, "statsPage"],
        ].map((arr, index) => (
          <ListItem button key={index} onClick={() => redirect(arr[2])}>
            <ListItemIcon>{arr[1]}</ListItemIcon>
            <ListItemText primary={arr[0]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const toggleExDrawer = () => {
    onShowExDrawer();
    tourOn && handleTourSwitch();
  };

  const handleTourSwitch = () => {
    onDeactivateTour("sW2");
    onActivateTour("sW2B");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              edge="start"
              className={
                device === "mobile" ? classes.menuBtnMob : classes.menuButton
              }
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon data-tour="hs5" />
            </IconButton>
          )}
          {/* {workoutPage && (
            <IconButton
              edge="start"
              className={
                device === "mobile" ? classes.menuBtnMob : classes.menuButton
              }
              color="inherit"
              aria-label="exercise_menu"
              onClick={toggleExDrawer}
            >
              <AccountTreeIcon />
            </IconButton>
          )} */}
          <Typography component={"span"} variant="h6" className={classes.title}>
            {isLoggedIn ? (
              <Link href="/home" color="inherit">
                ActivTrack
              </Link>
            ) : (
              <Link href="/about" color="inherit">
                ActivTrack
              </Link>
            )}
          </Typography>
          {isLoggedIn ? (
            workoutPage ? (
              <IconButton
                data-tour="sw16"
                edge="start"
                className={
                  device === "mobile" ? classes.menuBtnMob : classes.menuButton
                }
                color="inherit"
                aria-label="exercise_menu"
                onClick={toggleExDrawer}
              >
                <AccountTreeIcon />
              </IconButton>
            ) : (
              <Typography
                component={"span"}
                variant="subtitle1"
                className={classes.login}
              >
                <Link
                  className={classes.link}
                  onClick={onLogOut}
                  color="inherit"
                >
                  <ExitToAppIcon />
                </Link>
              </Typography>
            )
          ) : (
            location.pathname != "/signin" &&
            !workoutPage &&
            location.pathname != "/about" &&
            location.pathname != "/" &&
            location.pathname != "/signup" && (
              <Typography
                component={"span"}
                variant="subtitle1"
                className={classes.login}
              >
                <Link href="/signin" color="inherit">
                  Sign In
                </Link>
              </Typography>
            )
          )}
        </Toolbar>
      </AppBar>
      {isLoggedIn && (
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      )}
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
    isLoggedIn: store.authorized.isLoggedIn,
    device: store.device.device,
    orientation: store.device.orientation,
    tourOn: store.tour.sW2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logOut()),
    onClearFoldersState: () => dispatch(clearFoldersState()),
    onShowExDrawer: () => dispatch(showExDrawer()),
    onActivateTour: (tourId) => dispatch(activateTour(tourId)),
    onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    height: "55px",
    marginBottom: "30px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuBtnMob: {},
  title: {
    flexGrow: 1,
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "margin-top": "15px",
    "margin-bottom": "15px",
  },
  login: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  link: {
    cursor: "pointer",
  },
  linkMob: {
    cursor: "pointer",
    fontSize: "10px",
  },
}));
