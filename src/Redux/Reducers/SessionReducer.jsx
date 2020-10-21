// *rxreducer

const initialState = {
  selectedSession: null,
  // sessionStats: [],
  workoutsSessions: [],
  sessions: [],
  fetching: false,
  error: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set Selected Session
    case "SET_SELECTED_SESSION":
      return { ...state, selectedSession: action.session };
    //* Set Sessions Based On Selected Folder
    case "FETCH_FOLDER_SUCCESSFUL":
      return { ...state, sessions: action.folder.sessions };

    // * Clear Selected Session and Formatted Session Sessione
    case "CLEAR_SELECTED_AND_FORMATTED_SESSION_STATE":
      return { ...state, selectedSession: null, formattedSession: null };

    //* Fetch Sessions Belonging To User

    case "FETCH_SESSIONS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_SESSIONS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_SESSIONS_SUCCESSFUL":
      return { ...state, fetching: false, sessions: action.sessions };

    //* Fetch SHOW Session

    case "FETCH_SESSION_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_SESSION_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_SESSION_SUCCESSFUL":
      return { ...state, fetching: false, selectedSession: action.session };

    //* Fetch FORMATTED Session

    case "FETCH_FORMATTED_SESSION_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_FORMATTED_SESSION_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_FORMATTED_SESSION_SUCCESSFUL":
      return { ...state, fetching: false, formattedSession: action.session };

    //* POST New Session

    case "POST_SESSION_REQUEST":
      return { ...state, fetching: true };
    case "POST_SESSION_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_SESSION_SUCCESSFUL":
      //   const newSessionsPOST = [...state.sessions, action.session];
      //   return { ...state, fetching: false, sessions: newSessionsPOST };
      if (state.sessions) {
        return {
          ...state,
          fetching: false,
          sessions: [...state.sessions, action.session],
          selectedSession: action.session,
        };
      } else {
        return {
          ...state,
          fetching: false,
          sessions: [action.session],
          selectedSession: action.session,
        };
      }

    //* PATCH session

    case "PATCH_SESSION_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_SESSION_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_SESSION_SUCCESSFUL":
      const newSessionsPATCH = [
        ...[
          ...state.sessions.filter(
            (session) => session.id != action.session.id
          ),
        ],
        action.session,
      ];
      const sortedPATCH = newSessionsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        sessions: sortedPATCH,
        selectedSession: action.session,
      };
    //* DESTROY session

    case "DELETE_SESSION_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_SESSION_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_SESSION_SUCCESSFUL":
      const newSessionsDESTROY = [
        ...state.sessions.filter((session) => session.id != action.session.id),
      ];
      return { ...state, fetching: false, sessions: newSessionsDESTROY };
    default:
      return state;
  }
};

export default sessionReducer;
