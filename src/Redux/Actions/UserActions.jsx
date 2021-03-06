const token = () => localStorage.getItem("token");

export const URL = `https://activtrack-api.herokuapp.com`;

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};
// --------GREETING---------  **********
export const setGreeting = (payload) => {
  return {
    type: "SET_HOME_GREETING",
    setting: payload,
  };
};

// --------LOGIN---------  **********

export const loginUserRequest = () => {
  return {
    type: "LOGIN_USER_REQUEST",
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    user: user,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: "LOGIN_USER_FAILURE",
    error: error,
  };
};
// --------THUNK LOGIN--------

export const loginUser = (userData, history) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    fetch(`${URL}/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          dispatch(loginUserFailure(user.error));
        } else {
          localStorage.setItem("token", user.jwt);
          let name = user.user.username;
          !localStorage.getItem(`${name}RecentFolders`) &&
            localStorage.setItem(`${name}RecentFolders`, "[]");
          !localStorage.getItem(`${name}RecentWorkouts`) &&
            localStorage.setItem(`${name}RecentWorkouts`, "[]");
          !localStorage.getItem(`${name}RecentStats`) &&
            localStorage.setItem(`${name}RecentStats`, "[]");

          dispatch(loginUserSuccess(user));
          history.push("/home");
        }
      });
  };
};

// --------SIGNUP---------  **********

export const signUpUserFailure = (error) => {
  return {
    type: "SIGN_UP_USER_FAILURE",
    error: error,
  };
};

export const signUpUserRequest = () => {
  return {
    type: "SIGN_UP_USER_REQUEST",
  };
};

export const signUpUserSuccess = (user) => {
  return {
    type: "SIGN_UP_USER_SUCCESS",
    user: user,
  };
};

// --------THUNK SIGNUP--------  **********

export const signUpUser = (userData, history) => {
  return (dispatch) => {
    dispatch(signUpUserRequest());
    fetch(`${URL}/users`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          dispatch(signUpUserFailure(user.error));
        } else {
          let name = user.username;
          localStorage.setItem(`token`, user.jwt);
          localStorage.setItem(`${name}RecentFolders`, `[]`);
          localStorage.setItem(`${name}RecentWorkouts`, `[]`);
          localStorage.setItem(`${name}RecentStats`, `[]`);
          dispatch(signUpUserSuccess(user));
          history.push("/home");
        }
      });
  };
};
