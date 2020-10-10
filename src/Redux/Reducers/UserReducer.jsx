const initialState = {
  user: [],
  fetching: false,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case "LOGIN_USER_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        user: action.user,
        error: false,
      };
    case "LOGIN_USER_FAILURE":
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    // AUTH
    case "FETCH_CURRENT_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        user: action.user.user,
        error: false,
      };
    // LOGOUT
    case "LOGGING_OUT":
      return {
        ...state,
        user: [],
        error: false,
      };
    // SIGNUP
    case "SIGN_UP_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        user: action.user,
        error: false,
      };
    case "SIGN_UP_USER_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "SIGN_UP_USER_FAILURE":
      return {
        ...state,
        user: [],
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
