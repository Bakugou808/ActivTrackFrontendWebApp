import React, { useState } from "react";
import { connect } from "react-redux";
// Material Imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// action imports
import { loginUser } from "../../Redux/Actions/UserActions";
// component imports

export const Login = (props) => {
  const { loginError, onLoginUser, history, orientation, device } = props;
  const [fields, setFields] = useState({ username: "", password: "" });

  const classes = useStyles();
  function handleChange(e) {
    let obj = { [e.target.name.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoginUser({ user: { ...fields } }, history);
  }

  return (
    <Container component="main" maxWidth="xs">
      {props.error
        ? alert(`Sorry, that Login didn't work, try again...`)
        : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"span"} component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={device === "mobile" ? classes.formMob : classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={fields.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {loginError && (
        <div className="phaseTitle2 setDisplay marginTop10">{`${loginError}: Please Sign Up`}</div>
      )}
      <Box mt={8} className="copyRight">
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  loginError: store.user.error,
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (userData, history) => dispatch(loginUser(userData, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  formMob: {
    width: "240px", 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography
      component={"span"}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://activtrack.com/">
        ActivTrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
