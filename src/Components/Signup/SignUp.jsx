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
import { signUpUser } from "../../Redux/Actions/UserActions";
import { TrendingUpRounded } from "@material-ui/icons";

export const SignUp = (props) => {
  const { onSignUpUser, history } = props;
  const [error, setError] = useState({
    error: false,
    message:
      "A Condition Was Not Met: Please Enter A Valid Email, As Well As A Username And Password With At Least 3 Characters Long.",
  });

  const [fields, setFields] = useState({
    username: "",
    password: "",
    email: "",
  });

  const classes = useStyles();

  function handleChange(e) {
    let obj = { [e.target.name.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      fields.password.length >= 3 &&
      fields.username.length >= 3 &&
      fields.email.includes(".com") &&
      fields.email.includes("@")
    ) {
      setError((prev) => ({ ...prev, error: false }));
      onSignUpUser({ user: { ...fields } }, history);
    } else {
      setError((prev) => ({ ...prev, error: true }));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={fields.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={fields.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={handleChange}
                value={fields.email}
              />
            </Grid>
            {/* {error && (
              <Grid item xs={12}>
                "Passwords Must Match"
              </Grid>
            )} */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {error.error && error.message}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSignUpUser: (userData, history) => dispatch(signUpUser(userData, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
