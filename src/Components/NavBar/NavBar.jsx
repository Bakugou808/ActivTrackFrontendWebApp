import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// Action Imports
import { logOut } from "../../Redux/Actions/AuthActions";
// Material Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BorderColorIcon from "@material-ui/icons/BorderColor";
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

function NavBar(props) {
  const classes = useStyles();
  const { history, auth, onLogOut, isLoggedIn } = props;

  const onLogout = () => {
    const { onSignOutUser, user } = props;
    onSignOutUser(user.id);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    props.history.push("/");
  };

  const [state, setState] = React.useState({
    left: false,
  });

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
    console.log(path);
    // const clearStates = () => {
    //!add actions to clear store on logout/or redirect if necessary
    // }
    // clearStates()
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
          ["Search", <SearchIcon />, ""],
          ["Home", <HomeIcon />, "home"],
          ["Folders", <CollectionsBookmarkIcon />, "folders"],
          ["Stats", <FormatListBulletedIcon />, "stats"],
        ].map((arr, index) => (
          <ListItem button key={index} onClick={() => redirect(arr[2])}>
            <ListItemIcon>{arr[1]}</ListItemIcon>
            <ListItemText primary={arr[0]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            {isLoggedIn && <MenuIcon />}
          </IconButton>
          <Typography component={"span"} variant="h6" className={classes.title}>
            <Link href="/" color="inherit">
              ActivTrack
            </Link>
          </Typography>
          {isLoggedIn ? (
            <Typography
              component={"span"}
              variant="subtitle1"
              className={classes.login}
            >
              <Link className={classes.link} onClick={onLogOut} color="inherit">
                Sign Out
              </Link>
            </Typography>
          ) : (
            <Typography
              component={"span"}
              variant="subtitle1"
              className={classes.login}
            >
              <Link href="/signin" color="inherit">
                Sign In
              </Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
    isLoggedIn: store.authorized.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));
