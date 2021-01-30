const API = "https://activtrack-api.herokuapp.com//api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// ------- FETCH FOLDER SESSIONS ACTIONS--------

export const fetchSessionsRequest = () => ({
  type: "FETCH_SESSIONS_REQUEST",
});

export const fetchSessionsFailed = (error) => ({
  type: "FETCH_SESSIONS_FAILED",
  error: error,
});

export const fetchSessionsSuccess = (sessions) => ({
  type: "FETCH_SESSIONS_SUCCESSFUL",
  sessions: sessions,
});

// ------- FETCH WORKOUT SESSIONS FUNCTION--------

export const fetchSessions = (sessionId) => {
  return (dispatch) => {
    dispatch(fetchSessionsRequest());
    fetch(`${API}/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchSessionsFailed(data.error));
        } else {
          dispatch(fetchSessionsSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW SESSION ACTIONS--------

export const fetchSessionRequest = () => ({
  type: "FETCH_SESSION_REQUEST",
});

export const fetchSessionFailed = (error) => ({
  type: "FETCH_SESSION_FAILED",
  error: error,
});

export const fetchSessionSuccess = (session) => ({
  type: "FETCH_SESSION_SUCCESSFUL",
  session: session,
});

// ------- FETCH SHOW SESSION FUNCTION--------

export const fetchSession = (sessionId) => {
  return (dispatch) => {
    dispatch(fetchSessionRequest());
    fetch(`${API}/sessions/${sessionId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchSessionFailed(data.error));
        } else {
          dispatch(fetchSessionSuccess(data));
        }
      });
  };
};

// ------- FETCH FORMATTED SESSION ACTIONS--------

export const fetchFormattedSessionRequest = () => ({
  type: "FETCH_FORMATTED_SESSION_REQUEST",
});

export const fetchFormattedSessionFailed = (error) => ({
  type: "FETCH_FORMATTED_SESSION_FAILED",
  error: error,
});

export const fetchFormattedSessionSuccess = (session) => ({
  type: "FETCH_FORMATTED_SESSION_SUCCESSFUL",
  session: session,
});

// ------- FETCH FORMATTED SESSION FUNCTION--------
// *You May Not Need This

// export const fetchFormattedSession = (sessionId) => {
//   return (dispatch) => {
//     dispatch(fetchFormattedSessionRequest());
//     fetch(`${API}/formatted_session/${sessionId}`, {
//       method: "GET",
//       headers: headers(),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           dispatch(fetchFormattedSessionFailed(data.error));
//         } else {
//           dispatch(fetchFormattedSessionSuccess(data));
//         }
//       });
//   };
// };

// ------- POST NEW SESSION ACTIONS--------

export const postSessionRequest = () => ({
  type: "POST_SESSION_REQUEST",
});

export const postSessionFailed = (error) => ({
  type: "POST_SESSION_FAILED",
  error: error,
});

export const postSessionSuccess = (session) => ({
  type: "POST_SESSION_SUCCESSFUL",
  session: session,
});

// ------- POST NEW SESSION FUNCTION--------

export const postSession = (sessionData, sideEffects) => {
  return (dispatch) => {
    dispatch(postSessionRequest());
    fetch(`${API}/sessions`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(sessionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postSessionFailed(data.error));
        } else {
          dispatch(postSessionSuccess(data));
          sideEffects(data.id);
        }
      });
  };
};

// ------- PATCH NEW SESSION ACTIONS--------

export const patchSessionRequest = () => ({
  type: "PATCH_SESSION_REQUEST",
});

export const patchSessionFailed = (error) => ({
  type: "PATCH_SESSION_FAILED",
  error: error,
});

export const patchSessionSuccess = (session) => ({
  type: "PATCH_SESSION_SUCCESSFUL",
  session: session,
});

// ------- PATCH NEW SESSION FUNCTION--------

export const patchSession = (sessionData, sideEffects = false) => {
  return (dispatch) => {
    dispatch(patchSessionRequest());
    fetch(`${API}/sessions/${sessionData.session.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(sessionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchSessionFailed(data.error));
        } else {
          dispatch(patchSessionSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- DELETE NEW SESSION ACTIONS--------

export const deleteSessionRequest = () => ({
  type: "DELETE_SESSION_REQUEST",
});

export const deleteSessionFailed = (error) => ({
  type: "DELETE_SESSION_FAILED",
  error: error,
});

export const deleteSessionSuccess = (session) => ({
  type: "DELETE_SESSION_SUCCESSFUL",
  session: session,
});

// ------- DELETE NEW SESSION FUNCTION--------

export const deleteSession = (sessionId) => {
  return (dispatch) => {
    dispatch(deleteSessionRequest());
    fetch(`${API}/sessions/${sessionId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteSessionFailed(data.error));
        } else {
          dispatch(deleteSessionSuccess(sessionId));
        }
      });
  };
};
