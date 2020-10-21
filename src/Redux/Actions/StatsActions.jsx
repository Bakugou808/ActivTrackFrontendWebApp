const API = "http://localhost:3000/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// *rxaction -> action template

// ------- CLEAR SELECTED STAT AND FORMATTED STAT FROM STATE ACTIONS--------

export const clearSelectedAndFormattedStats = () => ({
  type: "CLEAR_SELECTED_AND_FORMATTED_STAT_STATE",
});

// ------- FETCH FOLDER STATS ACTIONS--------

export const fetchStatsRequest = () => ({
  type: "FETCH_STATS_REQUEST",
});

export const fetchStatsFailed = (error) => ({
  type: "FETCH_STATS_FAILED",
  error: error,
});

export const fetchStatsSuccess = (stats) => ({
  type: "FETCH_STATS_SUCCESSFUL",
  stats: stats,
});

// ------- FETCH FOLDER STATS FUNCTION--------

export const fetchStats = (statId) => {
  return (dispatch) => {
    dispatch(fetchStatsRequest());
    fetch(`${API}/circuit_exercise_session_details/${statId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchStatsFailed(data.error));
        } else {
          dispatch(fetchStatsSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW STAT ACTIONS--------

export const fetchStatRequest = () => ({
  type: "FETCH_STAT_REQUEST",
});

export const fetchStatFailed = (error) => ({
  type: "FETCH_STAT_FAILED",
  error: error,
});

export const fetchStatSuccess = (stat) => ({
  type: "FETCH_STAT_SUCCESSFUL",
  stat: stat,
});

// ------- FETCH SHOW STAT FUNCTION--------

export const fetchStat = (statId) => {
  return (dispatch) => {
    dispatch(fetchStatRequest());
    fetch(`${API}/circuit_exercise_session_details/${statId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchStatFailed(data.error));
        } else {
          dispatch(fetchStatSuccess(data));
        }
      });
  };
};

// ------- FETCH FORMATTED STAT ACTIONS--------

export const fetchWorkoutsStatsRequest = () => ({
  type: "FETCH_WORKOUTS_STATS_REQUEST",
});

export const fetchWorkoutsStatsFailed = (error) => ({
  type: "FETCH_WORKOUTS_STATS_FAILED",
  error: error,
});

export const fetchWorkoutsStatsSuccess = (stats) => ({
  type: "FETCH_WORKOUTS_STATS_SUCCESSFUL",
  stats: stats,
});

// ------- FETCH WORKOUTS STATS FUNCTION--------
// *You May Not Need This

export const fetchWorkoutsStats = (workoutId, numOfSessions = null) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsStatsRequest());
    fetch(`${API}/workouts_stats/${workoutId}/${numOfSessions}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutsStatsFailed(data.error));
        } else {
          dispatch(fetchWorkoutsStatsSuccess(data));
        }
      });
  };
};

// ------- POST NEW STAT ACTIONS--------

export const postStatRequest = () => ({
  type: "POST_STAT_REQUEST",
});

export const postStatFailed = (error) => ({
  type: "POST_STAT_FAILED",
  error: error,
});

export const postStatSuccess = (stat) => ({
  type: "POST_STAT_SUCCESSFUL",
  stat: stat,
});

// ------- POST NEW STAT FUNCTION--------

export const postStat = (statData, sideEffects) => {
  return (dispatch) => {
    dispatch(postStatRequest());
    fetch(`${API}/circuit_exercise_session_details`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(statData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postStatFailed(data.error));
        } else {
          dispatch(postStatSuccess(data));
          sideEffects();
        }
      });
  };
};

// ------- PATCH NEW STAT ACTIONS--------

export const patchStatRequest = () => ({
  type: "PATCH_STAT_REQUEST",
});

export const patchStatFailed = (error) => ({
  type: "PATCH_STAT_FAILED",
  error: error,
});

export const patchStatSuccess = (stat) => ({
  type: "PATCH_STAT_SUCCESSFUL",
  stat: stat,
});

// ------- PATCH NEW STAT FUNCTION--------

export const patchStat = (statData, setShowForm) => {
  return (dispatch) => {
    dispatch(patchStatRequest());
    fetch(`${API}/circuit_exercise_session_details/${statData.stat.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(statData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchStatFailed(data.error));
        } else {
          dispatch(patchStatSuccess(data));
          setShowForm();
        }
      });
  };
};

// ------- DELETE NEW STAT ACTIONS--------

export const deleteStatRequest = () => ({
  type: "DELETE_STAT_REQUEST",
});

export const deleteStatFailed = (error) => ({
  type: "DELETE_STAT_FAILED",
  error: error,
});

export const deleteStatSuccess = (stat) => ({
  type: "DELETE_STAT_SUCCESSFUL",
  stat: stat,
});

// ------- DELETE NEW STAT FUNCTION--------

export const deleteStat = (statId) => {
  return (dispatch) => {
    dispatch(deleteStatRequest());
    fetch(`${API}/circuit_exercise_session_details/${statId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteStatFailed(data.error));
        } else {
          dispatch(deleteStatSuccess(statId));
        }
      });
  };
};
