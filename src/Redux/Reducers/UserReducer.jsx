const initialState = {
  user: [],
  fetching: false,
  error: false,
  greeting: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOME_GREETING":
      return {
        ...state,
        greeting: false,
      };
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
        user: action.user.user,
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
    // AUTHORIZATION
    case "FETCH_AUTHORIZE_USER_SUCCESS":
      return {
        ...state,
        user: action.user.user,
        fetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default userReducer;
