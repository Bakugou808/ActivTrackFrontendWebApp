const API = "https://activtrack-api.herokuapp.com/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// ------- SET WORKOUTS STATS ACTIONS--------

export const setWorkoutsStats = (stats) => ({
  type: "SET_WORKOUTS_STATS",
  stats: stats,
});

// ------- CLEAR SELECTED STAT AND FORMATTED STAT FROM STATE ACTIONS--------

export const clearSelectedAndFormattedStats = () => ({
  type: "CLEAR_SELECTED_AND_FORMATTED_STAT_STATE",
});

// ------- FETCH WORKOUTS STATS ACTIONS--------

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

// ------- FETCH WORKOUTS STATS FUNCTION--------

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
// * --------------------------------------- ******************** -------------------------------------------- * //
// ------- FETCH STATS BY EX ACTIONS--------

export const fetchWorkoutsStatsByExRequest = () => ({
  type: "FETCH_WORKOUTS_STATS_BY_EX_REQUEST",
});

export const fetchWorkoutsStatsByExFailed = (error) => ({
  type: "FETCH_WORKOUTS_STATS_BY_EX_FAILED",
  error: error,
});

export const fetchWorkoutsStatsByExSuccess = (stats) => ({
  type: "FETCH_WORKOUTS_STATS_BY_EX_SUCCESSFUL",
  stats: stats,
});

// ------- FETCH STATS BY EX FUNCTION--------

export const fetchWorkoutsStatsByEx = (
  workoutId,
  numOfSessions = null,
  sideEffects
) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsStatsByExRequest());
    fetch(`${API}/workouts_stats_by_ex/${workoutId}/${numOfSessions}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutsStatsByExFailed(data.error));
        } else {
          dispatch(fetchWorkoutsStatsByExSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- FETCH STATS BY TOTAL REPS ACTIONS--------

export const fetchWorkoutsStatsByTotalRepsRequest = () => ({
  type: "FETCH_WORKOUTS_STATS_BY_TOTAL_REPS_REQUEST",
});

export const fetchWorkoutsStatsByTotalRepsFailed = (error) => ({
  type: "FETCH_WORKOUTS_STATS_BY_TOTAL_REPS_FAILED",
  error: error,
});

export const fetchWorkoutsStatsByTotalRepsSuccess = (stats) => ({
  type: "FETCH_WORKOUTS_STATS_BY_TOTAL_REPS_SUCCESSFUL",
  stats: stats,
});

// ------- FETCH STATS BY TOTAL REPS FUNCTION--------

export const fetchWorkoutsStatsByTotalReps = (
  workoutId,
  numOfSessions = null,
  sideEffects
) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsStatsByTotalRepsRequest());
    fetch(`${API}/workouts_stats_by_total_reps/${workoutId}/${numOfSessions}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutsStatsByTotalRepsFailed(data.error));
        } else {
          dispatch(fetchWorkoutsStatsByTotalRepsSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- FETCH STATS BY ACTIVE TIME ACTIONS--------

export const fetchWorkoutsStatsByActiveTimeRequest = () => ({
  type: "FETCH_WORKOUTS_STATS_BY_ACTIVE_TIME_REQUEST",
});

export const fetchWorkoutsStatsByActiveTimeFailed = (error) => ({
  type: "FETCH_WORKOUTS_STATS_BY_ACTIVE_TIME_FAILED",
  error: error,
});

export const fetchWorkoutsStatsByActiveTimeSuccess = (stats) => ({
  type: "FETCH_WORKOUTS_STATS_BY_ACTIVE_TIME_SUCCESSFUL",
  stats: stats,
});

// ------- FETCH STATS BY ACTIVE TIME FUNCTION--------

export const fetchWorkoutsStatsByActiveTime = (
  workoutId,
  dates = null,
  sideEffects
) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsStatsByActiveTimeRequest());
    fetch(
      `${API}/workouts_stats_by_date/${workoutId}/${dates.start}/${dates.end}`,
      {
        method: "GET",
        headers: headers(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutsStatsByActiveTimeFailed(data.error));
        } else {
          dispatch(fetchWorkoutsStatsByActiveTimeSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// *------- FETCH ALL WORKOUTS WITH STATS ACTIONS ---------*

export const fetchAllWorkoutsWithStatsRequest = () => ({
  type: "FETCH_ALL_WORKOUTS_WITH_STATS_REQUEST",
});

export const fetchAllWorkoutsWithStatsFailed = (error) => ({
  type: "FETCH_ALL_WORKOUTS_WITH_STATS_FAILED",
  error: error,
});

export const fetchAllWorkoutsWithStatsSuccess = (stats) => ({
  type: "FETCH_ALL_WORKOUTS_WITH_STATS_SUCCESSFUL",
  stats: stats,
});

// *------- FETCH ALL WORKOUTS WITH STATS FUNCTION--------

export const fetchAllWorkoutsWithStats = (userId, sideEffects) => {
  return (dispatch) => {
    dispatch(fetchAllWorkoutsWithStatsRequest());
    fetch(`${API}/all_workouts_with_stats/${userId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchAllWorkoutsWithStatsFailed(data.error));
        } else {
          dispatch(fetchAllWorkoutsWithStatsSuccess(data));
          sideEffects && sideEffects();
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
