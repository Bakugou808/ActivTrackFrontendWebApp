const initialState = {
  isLoggedIn: false,
  token: null,
  isLoading: true,
  error: null,
  fetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // RESTORE TOKEN
    case "RESTORE_TOKEN":
      return {
        ...state,
        token: action.token,
        // isLoggedIn: true,
        isLoading: false,
      };

    // LOG IN
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        token: action.user.jwt,

        // fetching: false,
        // error: false,
      };
    // SIGNUP
    case "SIGN_UP_USER_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        token: action.user.jwt,

        // fetching: false,
        // error: false,
      };
    // LOGOUT
    case "LOGGING_OUT":
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        isLoading: false,
        error: null,
        fetching: false,
      };
    // AUTHORIZE USER
    case "FETCH_AUTHORIZE_USER_REQUEST":
      return {
        ...state,
        fetching: true,
        isLoading: true,
      };
    case "FETCH_AUTHORIZE_USER_FAILED":
      return {
        ...state,
        error: action.error,
        fetching: false,
        isLoading: false,
        isLoggedIn: false,
      };
    case "FETCH_AUTHORIZE_USER_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        token: action.user.jwt,

        fetching: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
