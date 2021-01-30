const token = () => localStorage.getItem("token");

export const URL = `https://activtrack-api.herokuapp.com/`;

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// --------LOG OUT---------  **********

export const logOut = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGGING_OUT",
  };
};

// --------AUTHORIZE USER--------  **********

export const fetchAuthorizeUserRequest = () => {
  return {
    type: "FETCH_AUTHORIZE_USER_REQUEST",
  };
};

export const fetchAuthorizeUserSuccess = (user) => {
  return {
    type: "FETCH_AUTHORIZE_USER_SUCCESS",
    user: user,
  };
};

export const fetchAuthorizeUserFailure = (error) => {
  return {
    type: "FETCH_AUTHORIZE_USER_FAILED",
    error: error,
  };
};

// --------THUNK FETCH AUTHORIZE USER--------  **********

export const authorizeUserFetch = (history) => {
  return (dispatch) => {
    dispatch(fetchAuthorizeUserRequest());
    fetch(`${URL}/authorize`, {
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchAuthorizeUserFailure(data.error));
          this.props.history.push("/signin");
        } else {
          dispatch(fetchAuthorizeUserSuccess(data));
          localStorage.setItem("token", data.jwt);
        }
      });
  };
};
